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
    // Основные переменные
    const supabaseUrl = process.env['POSTGRES_SUPABASE_URL'];
    const supabaseKey = process.env['POSTGRES_SUPABASE_ANON_KEY'];
    const togetherApiKey = process.env['TOGETHER_API_KEY'];
    const hhClientId = process.env['HH_CLIENT_ID'];
    const hhClientSecret = process.env['HH_CLIENT_SECRET'];
    const superJobClientId = process.env['SUPERJOB_CLIENT_ID'];
    const superJobClientSecret = process.env['SUPERJOB_CLIENT_SECRET'];
    const habrClientId = process.env['HABR_CLIENT_ID'];
    const habrClientSecret = process.env['HABR_CLIENT_SECRET'];
    const yookassaShopId = process.env['YOOKASSA_SHOP_ID'];
    const yookassaSecretKey = process.env['YOOKASSA_SECRET_KEY'];

    const googleAnalyticsId = process.env['GOOGLE_ANALYTICS_ID']; 
    const yandexMetrikaId = process.env['YANDEX_METRIKA_ID'];
    const microsoftClarityId = process.env['MICROSOFT_CLARITY_ID'];
    const hotjarId = process.env['HOTJAR_ID'];

    console.log('Environment variables check:', {
      hasSupabaseUrl: !!supabaseUrl,
      hasSupabaseKey: !!supabaseKey,
      hasTogetherApiKey: !!togetherApiKey,
      hasHhClientId: !!hhClientId,
      hasHhClientSecret: !!hhClientSecret,
      hasSuperJobClientId: !!superJobClientId,
      hasSuperJobClientSecret: !!superJobClientSecret,
      hasHabrClientId: !!habrClientId,
      hasHabrClientSecret: !!habrClientSecret,
      hasYookassaShopId: !!yookassaShopId,
      hasYookassaSecretKey: !!yookassaSecretKey,
      hasGoogleAnalyticsId: !!googleAnalyticsId,
      hasYandexMetrikaId: !!yandexMetrikaId,
      hasMicrosoftClarityId: !!microsoftClarityId,
      hasHotjarId: !!hotjarId,
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
          HH_CLIENT_SECRET: !!hhClientSecret,
          SUPERJOB_CLIENT_ID: !!superJobClientId,
          SUPERJOB_CLIENT_SECRET: !!superJobClientSecret,
          HABR_CLIENT_ID: !!habrClientId,
          HABR_CLIENT_SECRET: !!habrClientSecret,
          YOOKASSA_SHOP_ID: !!yookassaShopId,
          YOOKASSA_SECRET_KEY: !!yookassaSecretKey
        }
      });
      return;
    }

    const config = {
      supabaseUrl,
      supabaseKey,
      togetherApiKey: togetherApiKey || '',
      hhClientId: hhClientId || '',
      hhClientSecret: hhClientSecret || '',
      superJobClientId: superJobClientId || '',
      superJobClientSecret: superJobClientSecret || '',
      habrClientId: habrClientId || '',
      habrClientSecret: habrClientSecret || '',
      yookassaShopId: yookassaShopId || '',
      yookassaSecretKey: yookassaSecretKey || '',
      demoMode: !yookassaShopId || !yookassaSecretKey,
      
      // Аналитика
      analytics: {
        googleAnalyticsId: googleAnalyticsId || '',
        yandexMetrikaId: yandexMetrikaId || '',
        microsoftClarityId: microsoftClarityId || '',
        hotjarId: hotjarId || '',
      }
    };

    console.log('Returning config with analytics:', {
      hasGoogleAnalytics: !!googleAnalyticsId,
      hasYandexMetrika: !!yandexMetrikaId,
      hasMicrosoftClarity: !!microsoftClarityId,
      hasHotjar: !!hotjarId,
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