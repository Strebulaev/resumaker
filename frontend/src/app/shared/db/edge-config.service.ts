import { get } from '@vercel/edge-config';

export class EdgeConfigService {
  // Кэширование настроек платформ
  async getPlatformConfigs() {
    return await get('platformConfigs') || {
      hh: { enabled: true, rateLimit: 100 },
      superjob: { enabled: true, rateLimit: 50 },
      habr: { enabled: false }
    };
  }

  // Feature flags для A/B тестирования
  async getFeatureFlags() {
    return await get('featureFlags') || {
      aiResumeGeneration: true,
      interviewPrep: true,
      coverLetterTemplates: false,
      newUI: false
    };
  }

  // Кэш промптов для AI
  async getAIPrompts() {
    return await get('aiPrompts') || {
      resume: "Сгенерируй профессиональное резюме...",
      coverLetter: "Создай сопроводительное письмо...",
      interview: "Подготовь план собеседования..."
    };
  }

  // Настройки кэширования
  async getCacheConfig() {
    return await get('cacheConfig') || {
      vacancyCacheTtl: 3600, // 1 час
      resumeCacheTtl: 7200,  // 2 часа
      profileCacheTtl: 1800  // 30 минут
    };
  }
}