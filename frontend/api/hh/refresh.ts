import { VercelRequest, VercelResponse } from '@vercel/node';

const HH_CLIENT_ID = process.env['HH_CLIENT_ID'];
const HH_CLIENT_SECRET = process.env['HH_CLIENT_SECRET'];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(400).json({ error: 'Missing refresh_token' });
  }

  if (!HH_CLIENT_ID || !HH_CLIENT_SECRET) {
    return res.status(500).json({ error: 'HH.ru configuration missing' });
  }

  try {
    const tokenResponse = await fetch('https://api.hh.ru/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
        client_id: HH_CLIENT_ID,
        client_secret: HH_CLIENT_SECRET
      })
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      throw new Error(`Token refresh failed: ${tokenResponse.status} - ${errorText}`);
    }

    const tokenData = await tokenResponse.json();

    return res.status(200).json({
      success: true,
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      expires_in: tokenData.expires_in
    });

  } catch (error: any) {
    console.error('HH.ru refresh error:', error);
    return res.status(500).json({
      error: 'Token refresh failed',
      message: error.message
    });
  }
}