import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { paymentId } = req.query;

  if (!paymentId || Array.isArray(paymentId)) {
    return res.status(400).json({ error: 'Invalid paymentId' });
  }

  try {
    // Получаем конфигурацию из переменных окружения
    const yookassaShopId = process.env['YOOKASSA_SHOP_ID'];
    const yookassaSecretKey = process.env['YOOKASSA_SECRET_KEY'];

    // УДАЛИТЬ демо-режим
    if (!yookassaShopId || !yookassaSecretKey) {
      throw new Error('Payment system not configured');
    }

    // Для бесплатного тарифа
    if (paymentId.startsWith('free_activation_')) {
      return res.status(200).json({
        status: 'succeeded',
        planId: 'free'
      });
    }

    console.log('Checking YooKassa payment status with shop ID:', yookassaShopId ? '***' + yookassaShopId.slice(-8) : 'MISSING');

    const response = await fetch(`https://api.yookassa.ru/v3/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${yookassaShopId}:${yookassaSecretKey}`).toString('base64')}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`YooKassa API error: ${response.status}`);
    }

    const paymentData = await response.json();

    console.log('YooKassa payment status:', {
      paymentId: paymentData.id,
      status: paymentData.status,
      metadata: paymentData.metadata
    });

    return res.status(200).json({
      status: paymentData.status,
      planId: paymentData.metadata?.planId
    });

  } catch (error: any) {
    console.error('Payment status check error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}