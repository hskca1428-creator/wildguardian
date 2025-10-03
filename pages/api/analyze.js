export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { image } = req.body;
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

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
              text: `Analyze this security camera image for Australian wildlife. 
              Identify any animals present and assess danger level.
              
              Respond ONLY with valid JSON in this format:
              {
                "detected": "animal name or 'none'",
                "confidence": 85,
                "risk": "CRITICAL|HIGH|MEDIUM|LOW",
                "advice": "specific safety advice"
              }
              
              Known dangerous species: Eastern Brown Snake, Funnel Web Spider, Redback Spider.
              Harmless species: Carpet Python, Possum, Blue Tongue Lizard.`
            }
          ]
        }]
      })
    });

    const data = await response.json();
    const result = JSON.parse(data.content[0].text);
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Analysis failed', details: error.message });
  }
}
