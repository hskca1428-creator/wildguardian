import { rateLimitSelfTest } from '../../lib/rateLimit';

// Open /api/rate-limit-status in a browser to check that the photo-check
// limits are using Redis. It exposes no secrets, no visitor data and no counts,
// only whether Redis is connected and working. Safe to leave in place or delete.
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const result = await rateLimitSelfTest();
  return res.status(200).json(result);
}
