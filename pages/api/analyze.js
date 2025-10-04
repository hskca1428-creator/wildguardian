export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { image } = req.body;
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

  if (!ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY not found');
    return res.status(500).json({ 
      error: 'Server configuration error',
      details: 'API key not configured'
    });
  }

  if (!image) {
    return res.status(400).json({ error: 'No image provided' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: image.split(',')[1]
              }
            },
            {
              type: 'text',
              text: `You are an Australian wildlife detection system for home security cameras.

Analyze this image and identify any Australian wildlife present.

Common dangerous species:
- Eastern Brown Snake (highly venomous)
- Funnel Web Spider (highly venomous)
- Redback Spider (venomous)

Common harmless species:
- Carpet Python (non-venomous)
- Possum (protected, harmless)
- Blue Tongue Lizard (harmless)
- Magpie (can be territorial)
- Kangaroo (usually harmless)

Respond ONLY with valid JSON:
{
  "detected": "species name in lowercase or 'no wildlife detected'",
  "confidence": 85,
  "risk": "CRITICAL|HIGH|MEDIUM|LOW",
  "advice": "specific safety advice"
}

Be specific about the species.`
            }
          ]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Anthropic API error:', errorData);
      throw new Error(`API failed: ${response.status}`);
    }

    const data = await response.json();
    let resultText = data.content[0].text;
    resultText = resultText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const result = JSON.parse(resultText);
    
    res.status(200).json(result);
    
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ 
      error: 'Analysis failed', 
      details: error.message 
    });
  }
}
