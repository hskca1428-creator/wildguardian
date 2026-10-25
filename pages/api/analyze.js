import { species } from '../../data/species';
import { checkRateLimit } from '../../lib/rateLimit';
import { extractText, describeResponse, parseAnalysisJson, normaliseMatches } from '../../lib/analysisParser';
export const config = { api: { bodyParser: { sizeLimit: '4mb', }, }, };

// The model can be changed without a code change by setting ANALYZE_MODEL in Vercel.
const MODEL = process.env.ANALYZE_MODEL || 'claude-sonnet-5';

// Visitors never see technical error text. Every failure path says the same
// kind thing, and always keeps the emergency reminder.
const EMERGENCY_HINT = "If you may have been bitten or stung, don't wait for a photo result. Call 000.";
const FAILED_MESSAGE = `We couldn't analyse that photo just now. Please try again in a moment. ${EMERGENCY_HINT}`;
const BUSY_MESSAGE = `The photo check is very busy right now. Please try again in a minute. ${EMERGENCY_HINT}`;

// Build a compact reference list for the model so it only ever matches
// against species we actually have first-aid data for, instead of
// free-associating a name we can't back up.
const speciesReference = species
  .map((s) => `${s.id}. ${s.name} (${s.scientificName}) — ${s.category}, ${s.risk} risk. ${s.identification}`)
  .join('\n');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { image, focus, state } = req.body;
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

  if (!ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY not found');
    return res.status(500).json({
      error: 'Server configuration error',
      details: 'API key not configured',
    });
  }

  if (!image) {
    return res.status(400).json({ error: 'No image provided' });
  }

  // Only accept a real base64 data URL for a type the AI service supports.
  // (Anything else is rejected here, before it can use up a visitor's quota or
  // reach the paid API.)
  if (typeof image !== 'string') {
    return res.status(400).json({ error: 'Invalid image data' });
  }

  const prefix = image.match(/^data:(image\/(?:jpeg|png|webp|gif));base64,/);
  if (!prefix) {
    return res
      .status(400)
      .json({ error: 'Unsupported image type', details: 'Please upload a JPG, PNG, WebP or GIF photo.' });
  }

  const mediaType = prefix[1];
  const base64Data = image.slice(prefix[0].length);

  if (!base64Data || !/^[A-Za-z0-9+/]+={0,2}$/.test(base64Data)) {
    return res.status(400).json({ error: 'Invalid image data' });
  }

  // Rate limit before the (paid) AI call. If the limiter itself fails
  // unexpectedly we let the request through rather than block a real user.
  let limit = null;
  try {
    limit = await checkRateLimit(req);
  } catch (err) {
    console.error('Rate limiter error (allowing request):', err);
  }
  if (limit) {
    res.setHeader('X-RateLimit-Store', limit.store);
    if (!limit.allowed) {
      res.setHeader('Retry-After', String(limit.retryAfter));
      return res.status(limit.status).json({
        error: 'Rate limit exceeded',
        details: limit.message,
        reason: limit.reason,
      });
    }
  }

  const focusLine = focus
    ? `The person specifically thinks this may be a ${focus} — pay extra attention to distinguishing features relevant to that group, but do not force a match if the evidence points elsewhere.`
    : '';
  const stateLine = state
    ? `The photo was taken in ${state}, Australia — use this to weigh which species are geographically plausible, but don't rule out a strong visual match purely on range.`
    : '';

  const prompt = `You are helping someone identify a species from a photo they just took in Australia, most likely because they encountered it in person and want to know if it's dangerous.

Here is the reference list of species you may match against, with their id numbers:
${speciesReference}

${focusLine}
${stateLine}

Instructions:
- Only ever return species ids from the reference list above. Never invent a species that isn't listed.
- If the animal in the photo isn't a confident match for anything on the list (wrong list, unclear photo, not an animal, etc.), say so honestly instead of forcing a guess.
- Return your top 1-3 candidate matches, most likely first, each with an honest confidence percentage. If you're only confident about one, only return one.
- If the photo is too blurry, too dark, too zoomed out, or doesn't show enough distinguishing detail, set "imageQuality" to a short note explaining what's missing (e.g. "too blurry to see head shape clearly") — otherwise leave it as null.

Respond ONLY with valid JSON in this exact shape, nothing else:
{
  "matches": [
    { "speciesId": 1, "confidence": 82, "reasoning": "one short sentence on the key visual features that support this" }
  ],
  "imageQuality": null
}`;

  try {
    let response;
    try {
      response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: 2048,
          messages: [
            {
              role: 'user',
              content: [
                { type: 'image', source: { type: 'base64', media_type: mediaType, data: base64Data } },
                { type: 'text', text: prompt },
              ],
            },
          ],
        }),
      });
    } catch (networkError) {
      console.error('Could not reach the AI service:', networkError && networkError.message);
      return res.status(502).json({ error: 'Analysis failed', details: FAILED_MESSAGE });
    }

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      console.error('AI service error', response.status, body.slice(0, 500));
      const busy = [429, 503, 529].includes(response.status);
      return res
        .status(busy ? 503 : 502)
        .json({ error: 'Analysis failed', details: busy ? BUSY_MESSAGE : FAILED_MESSAGE });
    }

    const data = await response.json();
    const text = extractText(data);
    if (!text) {
      console.error('AI reply had no text block:', JSON.stringify(describeResponse(data)));
      return res.status(502).json({ error: 'Analysis failed', details: FAILED_MESSAGE });
    }

    let parsed;
    try {
      parsed = parseAnalysisJson(text);
    } catch (parseError) {
      console.error('AI reply was not usable JSON:', parseError.message, '| start of reply:', text.slice(0, 200));
      return res.status(502).json({ error: 'Analysis failed', details: FAILED_MESSAGE });
    }

    // Only trusted records from our own database are returned: the model
    // supplies a species id, confidence and a one-line reason, nothing else.
    res.status(200).json({
      matches: normaliseMatches(parsed, species),
      imageQuality: typeof parsed.imageQuality === 'string' && parsed.imageQuality ? parsed.imageQuality : null,
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(502).json({ error: 'Analysis failed', details: FAILED_MESSAGE });
  }
}
