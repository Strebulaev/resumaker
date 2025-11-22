import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { event, object } = req.body;

    if (event === 'payment.succeeded') {
      const { userId, planId } = object.metadata;
      
      // Здесь должна быть логика активации подписки пользователя
      // Например, обновление в базе данных
      
      console.log(`Payment succeeded for user ${userId}, plan ${planId}`);
    }

    res.status(200).json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: error.message });
  }
}