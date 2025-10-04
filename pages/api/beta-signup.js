export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    // For now, just log it (later you can add to database or email service)
    console.log('Beta signup:', email);
    
    // TODO: Add to your email list or database
    // await addToEmailList(email);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Successfully joined beta program!' 
    });
    
  } catch (error) {
    console.error('Beta signup error:', error);
    return res.status(500).json({ 
      error: 'Failed to process signup. Please try again.' 
    });
  }
}
