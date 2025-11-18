import { VercelRequest, VercelResponse } from '@vercel/node';

module.exports = function handler(req: VercelRequest, res: VercelResponse): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Используем квадратные скобки для доступа к свойствам process.env
    const supabaseUrl = process.env['POSTGRES_SUPABASE_URL'];
    const supabaseKey = process.env['POSTGRES_SUPABASE_ANON_KEY'];
    const togetherApiKey = process.env['TOGETHER_API_KEY'];
    const hhClientId = process.env['HH_CLIENT_ID'];
    const hhClientSecret = process.env['HH_CLIENT_SECRET'];

    console.log('Environment variables check:', {
      hasSupabaseUrl: !!supabaseUrl,
      hasSupabaseKey: !!supabaseKey,
      hasTogetherApiKey: !!togetherApiKey,
      hasHhClientId: !!hhClientId,
      hasHhClientSecret: !!hhClientSecret
    });

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing required environment variables');
      res.status(500).json({
        error: 'Missing required environment variables',
        required: ['POSTGRES_SUPABASE_URL', 'POSTGRES_SUPABASE_ANON_KEY'],
        received: {
          POSTGRES_SUPABASE_URL: !!supabaseUrl,
          POSTGRES_SUPABASE_ANON_KEY: !!supabaseKey,
          TOGETHER_API_KEY: !!togetherApiKey,
          HH_CLIENT_ID: !!hhClientId,
          HH_CLIENT_SECRET: !!hhClientSecret
        }
      });
      return;
    }

    const config = {
      supabaseUrl,
      supabaseKey,
      togetherApiKey: togetherApiKey,
      hhClientId: hhClientId,
      hhClientSecret: hhClientSecret,
      superJobClientId: process.env['SUPERJOB_CLIENT_ID'] || '',
      superJobClientSecret: process.env['SUPERJOB_CLIENT_SECRET'] || '',
      habrClientId: process.env['HABR_CLIENT_ID'] || '',
      habrClientSecret: process.env['HABR_CLIENT_SECRET'] || ''
    };

    console.log('Returning config:', {
      supabaseUrl: supabaseUrl ? '***' + supabaseUrl.slice(-8) : 'MISSING',
      supabaseKey: supabaseKey ? '***' + supabaseKey.slice(-8) : 'MISSING',
      togetherApiKey: togetherApiKey ? '***' + togetherApiKey.slice(-8) : 'MISSING',
      hhClientId: hhClientId ? '***' + hhClientId.slice(-8) : 'MISSING',
      hhClientSecret: hhClientSecret ? '***' : 'MISSING',
      hasSuperJobClientId: !!config.superJobClientId,
      hasSuperJobClientSecret: !!config.superJobClientSecret
    });

    res.status(200).json(config);

  } catch (error) {
    console.error('Error in config API:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};