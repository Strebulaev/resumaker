// /api/superjob/token.js
export default async function handler(req, res) {
  console.log('ENV SUPERJOB_CLIENT_ID:', process.env.SUPERJOB_CLIENT_ID);
  console.log('ENV SUPERJOB_CLIENT_SECRET:', process.env.SUPERJOB_CLIENT_SECRET ? '***' + process.env.SUPERJOB_CLIENT_SECRET.slice(-4) : 'UNDEFINED');
  console.log('Request body:', req.body);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { code, refresh_token } = req.body;

    // Проверяем что переменные действительно существуют
    if (!process.env.SUPERJOB_CLIENT_ID || !process.env.SUPERJOB_CLIENT_SECRET) {
      throw new Error('Missing SuperJob credentials in environment variables');
    }

    let formData = new URLSearchParams();
    formData.append('client_id', process.env.SUPERJOB_CLIENT_ID);
    formData.append('client_secret', process.env.SUPERJOB_CLIENT_SECRET);

    if (code) {
      formData.append('code', code);
      formData.append('redirect_uri', process.env.SJ_REDIRECT_URI || 'https://rezulution.vercel.app/auth/superjob-callback');
      formData.append('grant_type', 'authorization_code');
      console.log('Using authorization_code flow');
    } else if (refresh_token) {
      formData.append('refresh_token', refresh_token);
      formData.append('grant_type', 'refresh_token');
      console.log('Using refresh_token flow');
    } else {
      return res.status(400).json({ 
        error: 'Bad Request',
        message: 'Either "code" or "refresh_token" parameter is required' 
      });
    }

    console.log('Sending to SuperJob with client_id:', process.env.SUPERJOB_CLIENT_ID);

    const sjResponse = await fetch('https://api.superjob.ru/2.0/oauth2/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString()
    });

    const responseText = await sjResponse.text();
    console.log('SuperJob response status:', sjResponse.status);
    console.log('SuperJob response text:', responseText);

    if (!sjResponse.ok) {
      throw new Error(`SuperJob API error: ${sjResponse.status} ${responseText}`);
    }

    const sjData = JSON.parse(responseText);
    res.status(200).json(sjData);

  } catch (error) {
    console.error('FULL ERROR in /api/superjob/token:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
      details: 'Check server logs for complete error information'
    });
  }
}