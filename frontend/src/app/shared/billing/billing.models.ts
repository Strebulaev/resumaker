export interface TariffPlan {
    id: string;
    name: string;
    price: number;
    dailyLimits: {
      resumeGenerations: number;
      coverLetters: number;
      interviewPlans: number;
    };
    features: string[];
    description: string;
    popular?: boolean;
  }
  
  export interface UserSubscription {
    userId: string;
    planId: string;
    status: 'active' | 'canceled' | 'expired' | 'pending';
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
    usage: {
      resumeGenerations: number;
      coverLetters: number;
      interviewPlans: number;
      lastReset: Date;
    };
    paymentId?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface PaymentResult {
    success: boolean;
    paymentUrl?: string;
    paymentId?: string;
    error?: string;
  }
  
  export interface UsageLimit {
    allowed: boolean;
    remaining: number;
    limit: number;
    feature: string;
  }