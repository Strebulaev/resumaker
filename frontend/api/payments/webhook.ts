// api/payments/webhook.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { event, object } = req.body;

    // Инициализация Supabase клиента
    const supabaseUrl = process.env['POSTGRES_SUPABASE_URL'];
    const supabaseKey = process.env['POSTGRES_SUPABASE_ANON_KEY'];
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase configuration missing');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    if (event === 'payment.succeeded') {
      const { userId, planId } = object.metadata;
      
      if (!userId || !planId) {
        console.error('Missing metadata in payment:', object);
        return res.status(400).json({ error: 'Missing user or plan data' });
      }

      // Активируем подписку пользователя
      const success = await activateUserSubscription(supabase, userId, planId, object.id);
      
      if (success) {
        console.log(`✅ Subscription activated for user ${userId}, plan ${planId}`);
        return res.status(200).json({ 
          received: true, 
          message: 'Subscription activated successfully' 
        });
      } else {
        console.error(`❌ Failed to activate subscription for user ${userId}`);
        return res.status(500).json({ error: 'Failed to activate subscription' });
      }
    }

    // Для других событий платежа просто подтверждаем получение
    return res.status(200).json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: error.message });
  }
}

// Функция активации подписки пользователя
async function activateUserSubscription(
  supabase: any, 
  userId: string, 
  planId: string, 
  paymentId: string
): Promise<boolean> {
  try {
    const planConfig = getPlanConfig(planId);
    const now = new Date();
    const periodEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // +30 дней

    // Исправленный upsert
    const { data, error } = await supabase
      .from('user_subscriptions')
      .upsert({
        user_id: userId,
        plan_id: planId,
        status: 'active',
        current_period_start: now.toISOString(),
        current_period_end: periodEnd.toISOString(),
        payment_id: paymentId,
        usage: {
          resumeGenerations: 0,
          coverLetters: 0,
          interviewPlans: 0,
          lastReset: now.toISOString()
        },
        updated_at: now.toISOString()
      }, {
        onConflict: 'user_id'
      });

    if (error) {
      console.error('Supabase error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Subscription activation error:', error);
    return false;
  }
}

function getPlanConfig(planId: string) {
  const plans: { [key: string]: { name: string; duration: number } } = {
    'free': { name: 'Бесплатный', duration: 365 },
    'basic': { name: 'Базовый', duration: 30 },
    'pro': { name: 'PRO', duration: 30 }
  };
  
  return plans[planId] || plans['free'];
}