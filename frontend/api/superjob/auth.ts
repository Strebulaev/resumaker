import { VercelRequest, VercelResponse } from '@vercel/node';

const SJ_CLIENT_ID = process.env['SJ_APP_ID'];
const SJ_CLIENT_SECRET = process.env['SJ_SECRET_KEY'];
const BASE_URL = process.env['VERCEL_URL'] ? `https://${process.env['VERCEL_URL']}` : 'http://localhost:3000';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // Redirect to SuperJob OAuth
    const redirectUri = `${BASE_URL}/api/superjob/callback`;
    const authUrl = `https://www.superjob.ru/authorize/?client_id=${SJ_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code`;

    return res.redirect(authUrl);
  }

  if (req.method === 'POST') {
    const { code, userId } = req.body;

    if (!code || !userId) {
      return res.status(400).json({ error: 'Missing code or userId' });
    }

    if (!SJ_CLIENT_ID || !SJ_CLIENT_SECRET) {
      return res.status(500).json({ error: 'SuperJob configuration missing' });
    }

    try {
      // Exchange code for access token
      const tokenResponse = await fetch('https://api.superjob.ru/2.0/oauth2/access_token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: SJ_CLIENT_ID,
          client_secret: SJ_CLIENT_SECRET,
          code: code,
          redirect_uri: `${BASE_URL}/api/superjob/callback`
        })
      });

      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text();
        throw new Error(`Token exchange failed: ${tokenResponse.status} - ${errorText}`);
      }

      const tokenData = await tokenResponse.json();

      return res.status(200).json({
        success: true,
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        expires_in: tokenData.expires_in,
        token_type: tokenData.token_type
      });

    } catch (error: any) {
      console.error('SuperJob auth error:', error);
      return res.status(500).json({
        error: 'Authentication failed',
        message: error.message
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}