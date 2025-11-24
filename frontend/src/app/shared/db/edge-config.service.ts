import { get } from '@vercel/edge-config';

export class EdgeConfigService {
  async getPlatformConfigs() {
    return await get('platformConfigs') || {
      hh: { enabled: true, rateLimit: 100 },
      superjob: { enabled: true, rateLimit: 50 },
      habr: { enabled: false }
    };
  }

  async getFeatureFlags() {
    return await get('featureFlags') || {
      aiResumeGeneration: true,
      interviewPrep: true,
      coverLetterTemplates: false,
      newUI: false
    };
  }

  async getAIPrompts() {
    return await get('aiPrompts') || {
      resume: "Сгенерируй профессиональное резюме...",
      coverLetter: "Создай сопроводительное письмо...",
      interview: "Подготовь план собеседования..."
    };
  }

  async getCacheConfig() {
    return await get('cacheConfig') || {
      vacancyCacheTtl: 3600,
      resumeCacheTtl: 7200,
      profileCacheTtl: 1800
    };
  }
}