export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { image } = req.body;
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

  // Check if API key exists
  if (!ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY not found in environment variables');
    return res.status(500).json({ 
      error: 'Server configuration error',
      details: 'API key not configured'
    });
  }

  // Validate image
  if (!image) {
    return res.status(400).json({ error: 'No image provided' });
  }

  try {
    console.log('Calling Anthropic API...');
    
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

Common dangerous species to detect:
- Eastern Brown Snake (highly venomous)
- Funnel Web Spider (highly venomous)
- Redback Spider (venomous)

Common harmless species:
- Carpet Python (non-venomous)
- Possum (protected, harmless)
- Blue Tongue Lizard (harmless)
- Magpie (can be territorial)
- Kangaroo (usually harmless, can be aggressive if cornered)

Respond ONLY with valid JSON in this exact format:
{
  "detected": "species name in lowercase or 'no wildlife detected'",
  "confidence": 85,
  "risk": "CRITICAL|HIGH|MEDIUM|LOW",
  "advice": "specific safety advice for this species"
}

Be specific about the species. If unsure, use your best judgment based on Australian wildlife.`
            }
          ]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Anthropic API error:', errorData);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('Anthropic response:', data);
    
    // Extract and parse the JSON response
    let resultText = data.content[0].text;
    
    // Remove markdown code blocks if present
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
