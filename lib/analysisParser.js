// Helpers for reading the AI service's reply. Kept free of imports so they can
// be tested on their own.

/** Joins every plain-text block in the reply. Returns null if there is none
 *  (for example when the first block is a reasoning block, or the reply was
 *  cut off before any text). */
export function extractText(data) {
  if (!data || !Array.isArray(data.content)) return null;
  const text = data.content
    .filter((block) => block && block.type === 'text' && typeof block.text === 'string')
    .map((block) => block.text)
    .join('\n')
    .trim();
  return text || null;
}

/** A safe summary of a reply's shape for server logs (no photo, no text). */
export function describeResponse(data) {
  return {
    type: data && data.type,
    stopReason: data && data.stop_reason,
    blockTypes: Array.isArray(data && data.content) ? data.content.map((b) => b && b.type) : 'no content array',
  };
}

/** Pulls the JSON object out of the reply, even if it is wrapped in a code
 *  fence or surrounded by extra words. Throws if there is no usable JSON. */
export function parseAnalysisJson(text) {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end <= start) throw new Error('No JSON object found in the reply');
  return JSON.parse(text.slice(start, end + 1));
}

/** Turns the model's matches into trusted records. Only species ids that exist
 *  in our own database are kept, duplicates are dropped, at most three are
 *  returned, and confidence must be a real number (clamped to 0-100). */
export function normaliseMatches(parsed, speciesList) {
  const list = Array.isArray(parsed && parsed.matches) ? parsed.matches : [];
  const seen = new Set();
  const out = [];
  for (const m of list) {
    if (out.length === 3) break;
    const id = Number(m && m.speciesId);
    const record = speciesList.find((s) => s.id === id);
    const confidence = Math.round(Number(m && m.confidence));
    if (!record || seen.has(id) || !Number.isFinite(confidence)) continue;
    seen.add(id);
    out.push({
      confidence: Math.max(0, Math.min(100, confidence)),
      reasoning: typeof m.reasoning === 'string' ? m.reasoning : '',
      species: record,
    });
  }
  return out;
}
