import { VercelRequest, VercelResponse } from '@vercel/node';

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

  const { planId, userId } = req.body;

  if (!planId || !userId) {
    return res.status(400).json({ error: 'Missing planId or userId' });
  }

  try {
    // Получаем конфигурацию из переменных окружения
    const yookassaShopId = process.env['YOOKASSA_SHOP_ID'];
    const yookassaSecretKey = process.env['YOOKASSA_SECRET_KEY'];

    // Если нет ключей ЮKassa, используем демо-режим
    if (!yookassaShopId || !yookassaSecretKey) {
      console.log('Using demo mode for payment - YooKassa credentials not configured');
      return res.status(200).json({
        paymentUrl: `https://rezulution.vercel.app/payment/success?demo=true&planId=${planId}`,
        paymentId: `demo_${Date.now()}`
      });
    }

    const plans: { [key: string]: { price: number; name: string } } = {
      'basic': { price: 290, name: 'Базовый' },
      'pro': { price: 790, name: 'PRO' }
    };

    const plan = plans[planId];
    if (!plan) {
      throw new Error(`Invalid planId: ${planId}`);
    }

    const paymentPayload = {
      amount: {
        value: plan.price.toFixed(2),
        currency: 'RUB'
      },
      capture: true,
      confirmation: {
        type: 'redirect',
        return_url: `https://rezulution.vercel.app/payment/success`
      },
      description: `Оплата тарифа "${plan.name}" - Rezulution`,
      metadata: {
        userId: userId,
        planId: planId
      }
    };

    console.log('Creating YooKassa payment with shop ID:', yookassaShopId ? '***' + yookassaShopId.slice(-8) : 'MISSING');

    const response = await fetch('https://api.yookassa.ru/v3/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${yookassaShopId}:${yookassaSecretKey}`).toString('base64')}`,
        'Content-Type': 'application/json',
        'Idempotence-Key': Date.now().toString()
      },
      body: JSON.stringify(paymentPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`YooKassa API error: ${response.status} ${errorText}`);
    }

    const paymentData = await response.json();

    console.log('YooKassa payment created successfully:', {
      paymentId: paymentData.id,
      status: paymentData.status,
      confirmationUrl: paymentData.confirmation?.confirmation_url
    });

    return res.status(200).json({
      paymentUrl: paymentData.confirmation.confirmation_url,
      paymentId: paymentData.id
    });

  } catch (error: any) {
    console.error('Payment creation error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}