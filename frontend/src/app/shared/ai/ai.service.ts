// src/app/shared/ai/ai.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, retry, throwError, of, BehaviorSubject } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { ErrorHandlerService } from '../error-handler.service';

export interface AIRequest {
  model: string;
  prompt: string;
  max_tokens: number;
  temperature: number;
  top_p: number;
  top_k?: number;
  repetition_penalty?: number;
  stop?: string[];
  stream?: boolean;
}

export interface AIProvider {
  id: string;
  name: string;
  baseUrl: string;
  apiKey: string;
  isConfigured: boolean;
  models: string[];
  isDefault?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AIService {
  private currentProvider: AIProvider | null = null;
  private providers: AIProvider[] = [];
  private providersSubject = new BehaviorSubject<AIProvider[]>([]);
  private currentProviderSubject = new BehaviorSubject<AIProvider | null>(null);

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private errorHandler: ErrorHandlerService
  ) {
    this.initializeProviders();
  }

  private async initializeProviders(): Promise<void> {
    try {
      // Сначала загружаем конфиг
      const config = await this.configService.loadConfig();
      
      // Инициализируем провайдеров
      this.providers = [
        {
          id: 'together',
          name: 'Together AI',
          baseUrl: 'https://api.together.xyz/v1',
          apiKey: config.togetherApiKey || '',
          isConfigured: !!config.togetherApiKey,
          models: ['meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo'],
          isDefault: true
        },
        {
          id: 'deepseek',
          name: 'DeepSeek',
          baseUrl: 'https://api.deepseek.com/v1',
          apiKey: '',
          isConfigured: false,
          models: ['deepseek-chat', 'deepseek-coder']
        },
        {
          id: 'openai',
          name: 'OpenAI',
          baseUrl: 'https://api.openai.com/v1',
          apiKey: '',
          isConfigured: false,
          models: ['gpt-4', 'gpt-3.5-turbo']
        },
        {
          id: 'huggingface',
          name: 'Hugging Face',
          baseUrl: 'https://api-inference.huggingface.co/v1',
          apiKey: '',
          isConfigured: false,
          models: ['mistralai/Mistral-7B-Instruct-v0.2', 'google/flan-t5-xxl']
        }
      ];

      // Пытаемся загрузить сохраненную конфигурацию
      const savedConfig = localStorage.getItem('ai_providers_config');
      if (savedConfig) {
        try {
          const parsedConfig = JSON.parse(savedConfig);
          if (parsedConfig.providers) {
            // Обновляем провайдеров из сохраненной конфигурации
            this.providers.forEach(provider => {
              const savedProvider = parsedConfig.providers.find((p: any) => p.id === provider.id);
              if (savedProvider) {
                provider.apiKey = savedProvider.apiKey;
                provider.isConfigured = savedProvider.isConfigured;
                if (savedProvider.baseUrl) provider.baseUrl = savedProvider.baseUrl;
              }
            });
          }
          
          if (parsedConfig.currentProviderId) {
            const savedCurrentProvider = this.providers.find(p => p.id === parsedConfig.currentProviderId && p.isConfigured);
            if (savedCurrentProvider) {
              this.currentProvider = savedCurrentProvider;
            }
          }
        } catch (e) {
          console.error('Error parsing saved AI config:', e);
        }
      }

      // Если нет сохраненного текущего провайдера, но Together AI настроен - используем его
      if (!this.currentProvider) {
        const togetherProvider = this.providers.find(p => p.id === 'together');
        if (togetherProvider?.isConfigured) {
          this.currentProvider = togetherProvider;
        }
      }

      this.providersSubject.next([...this.providers]);
      this.currentProviderSubject.next(this.currentProvider);
      
    } catch (error) {
      console.error('Failed to initialize AI providers:', error);
      this.errorHandler.showError('Error initializing AI providers', 'AIService');
    }
  }

  getProviders(): AIProvider[] {
    return this.providers;
  }

  getProvidersObservable(): Observable<AIProvider[]> {
    return this.providersSubject.asObservable();
  }

  getCurrentProvider(): AIProvider | null {
    return this.currentProvider;
  }

  getCurrentProviderObservable(): Observable<AIProvider | null> {
    return this.currentProviderSubject.asObservable();
  }

  setCurrentProvider(providerId: string): void {
    const provider = this.providers.find(p => p.id === providerId);
    if (provider && provider.isConfigured) {
      this.currentProvider = provider;
      this.saveProvidersConfig();
      this.currentProviderSubject.next(this.currentProvider);
      this.providersSubject.next([...this.providers]);
    } else {
      this.errorHandler.showError(`Provider ${providerId} not configured or not found`, 'AIService');
    }
  }

  configureProvider(providerId: string, apiKey: string, baseUrl?: string): boolean {
    const provider = this.providers.find(p => p.id === providerId);
    if (provider) {
      provider.apiKey = apiKey;
      if (baseUrl) provider.baseUrl = baseUrl;
      provider.isConfigured = !!apiKey;
      
      this.saveProvidersConfig();
      this.providersSubject.next([...this.providers]);
      return true;
    }
    return false;
  }

  async configureTogetherFromConfig(): Promise<boolean> {
    try {
      const config = await this.configService.loadConfig();
      const togetherProvider = this.providers.find(p => p.id === 'together');
      
      if (togetherProvider && config.togetherApiKey) {
        togetherProvider.apiKey = config.togetherApiKey;
        togetherProvider.isConfigured = true;
        
        // Автоматически устанавливаем как активного провайдера
        this.currentProvider = togetherProvider;
        
        this.saveProvidersConfig();
        this.providersSubject.next([...this.providers]);
        this.currentProviderSubject.next(this.currentProvider);
        
        return true;
      } else {
        this.errorHandler.showError('Together API key not found in configuration', 'AIService');
        return false;
      }
    } catch (error) {
      console.error('Failed to configure Together AI from config:', error);
      this.errorHandler.showError('Error configuring Together AI', 'AIService');
      return false;
    }
  }

  isAnyProviderConfigured(): boolean {
    return this.providers.some(provider => provider.isConfigured);
  }


  generateText(request: AIRequest): Observable<string> {
    if (!this.currentProvider || !this.currentProvider.isConfigured) {
      const error = new Error('AI provider not configured');
      this.errorHandler.showAIError('AI provider not configured. Click the AI button in the top menu to configure.', 'AIService');
      return throwError(() => error);
    }
  
    const url = `${this.currentProvider.baseUrl}/completions`;
  
    return this.http.post<any>(url, request, {
      headers: {
        'Authorization': `Bearer ${this.currentProvider.apiKey}`,
        'Content-Type': 'application/json'
      }
    }).pipe(
      map(response => {
        if (!response.choices?.[0]?.text) {
          throw new Error('Invalid response from AI API');
        }
        return this.cleanGeneratedText(response.choices[0].text);
      }),
      catchError(error => {
        console.error('AI API error:', error);
        
        let errorMessage = 'Error connecting to AI service';

        if (error.status === 0) {
          // CORS error
          errorMessage = 'CORS error: cannot connect to AI API from browser. Use Together AI or set up a proxy';
        } else if (error.status === 401) {
          errorMessage = 'Invalid AI provider API key';
        } else if (error.status === 403) {
          errorMessage = 'Access to AI service denied. Check API key settings';
        } else if (error.status === 429) {
          errorMessage = 'AI service request limit exceeded. Try again later';
        } else if (error.status >= 500) {
          errorMessage = 'Temporary AI service issues. Try again later';
        } else {
          errorMessage = `AI service error: ${error.status} ${error.statusText || error.message}`;
        }
        
        this.errorHandler.showAIError(errorMessage, 'AIService');
        return throwError(() => new Error(errorMessage));
      }),
      retry(2)
    );
  }

  testProviderConnection(providerId: string): Observable<boolean> {
    const provider = this.providers.find(p => p.id === providerId);
    if (!provider || !provider.isConfigured) {
      this.errorHandler.showAIError(`Provider ${providerId} not configured`, 'AIService');
      return of(false);
    }
  
    const testRequest = {
      model: provider.models[0],
      prompt: 'Test connection - ignore this message',
      max_tokens: 5,
      temperature: 0.1
    };
  
    return this.http.post<any>(`${provider.baseUrl}/completions`, testRequest, {
      headers: {
        'Authorization': `Bearer ${provider.apiKey}`,
        'Content-Type': 'application/json'
      }
    }).pipe(
      map(response => {
        // Успешное подключение
        return true;
      }),
      catchError(error => {
        console.error('AI connection test error:', error);
        
        let errorMessage = 'Error connecting to AI provider';

        if (error.status === 0) {
          // CORS error or no network
          if (error.error instanceof ErrorEvent) {
            errorMessage = 'CORS error: cannot connect to AI API from browser. Need to use proxy or server side';
          } else {
            errorMessage = 'No internet connection or CORS error';
          }
        } else if (error.status === 401) {
          errorMessage = 'Invalid API key';
        } else if (error.status === 403) {
          errorMessage = 'Access denied. Check API key and permissions';
        } else if (error.status === 429) {
          errorMessage = 'AI service request limit exceeded';
        } else {
          errorMessage = `Connection error: ${error.status} ${error.statusText || error.message}`;
        }
        
        this.errorHandler.showAIError(errorMessage, 'AIService');
        return of(false);
      })
    );
  }

  private cleanGeneratedText(text: string): string {
    if (!text) return '';
    return text.trim();
  }

  private saveProvidersConfig(): void {
    const config = {
      providers: this.providers,
      currentProviderId: this.currentProvider?.id
    };
    localStorage.setItem('ai_providers_config', JSON.stringify(config));
  }

  async analyzeProfileCompleteness(profile: any): Promise<{
    completeness: number;
    missingFields: string[];
    suggestions: string[];
  }> {
    const prompt = `Analyze the completeness of this job seeker profile and provide suggestions for improvement:

Profile data: ${JSON.stringify(profile, null, 2)}

Please provide:
1. Completeness percentage (0-100)
2. List of missing or incomplete fields
3. Specific suggestions for improvement

Format your response as JSON with keys: completeness, missingFields, suggestions`;

    const request: AIRequest = {
      model: this.currentProvider?.models[0] || 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
      prompt,
      max_tokens: 1000,
      temperature: 0.3,
      top_p: 0.9
    };

    try {
      const response = await this.generateText(request).toPromise();
      if (response) {
        return JSON.parse(response);
      }
    } catch (error) {
      console.error('Error analyzing profile:', error);
    }

    return {
      completeness: 50,
      missingFields: ['Unable to analyze'],
      suggestions: ['Please check profile manually']
    };
  }

  async generateResumeDescription(project: any): Promise<string> {
    const prompt = `Generate a professional description for this project:

Project details: ${JSON.stringify(project, null, 2)}

Write a compelling 2-3 sentence description highlighting the project's impact, technologies used, and your role.`;

    const request: AIRequest = {
      model: this.currentProvider?.models[0] || 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
      prompt,
      max_tokens: 300,
      temperature: 0.7,
      top_p: 0.9
    };

    try {
      const result = await this.generateText(request).toPromise();
      return result || '';
    } catch (error) {
      console.error('Error generating project description:', error);
      return '';
    }
  }

  async optimizeResumeForJob(resume: any, jobDescription: string): Promise<{
    optimizedResume: any;
    keywordMatches: string[];
    suggestions: string[];
  }> {
    const prompt = `Optimize this resume for the following job description:

Job: ${jobDescription}

Resume: ${JSON.stringify(resume, null, 2)}

Provide:
1. Optimized resume content
2. Keywords that match the job
3. Suggestions for further improvement

Format as JSON with keys: optimizedResume, keywordMatches, suggestions`;

    const request: AIRequest = {
      model: this.currentProvider?.models[0] || 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
      prompt,
      max_tokens: 1500,
      temperature: 0.4,
      top_p: 0.9
    };

    return this.generateText(request).pipe(
      map(response => {
        try {
          return JSON.parse(response);
        } catch {
          return {
            optimizedResume: resume,
            keywordMatches: [],
            suggestions: ['Unable to optimize automatically']
          };
        }
      })
    ).toPromise() || {
      optimizedResume: resume,
      keywordMatches: [],
      suggestions: []
    };
  }

  async generateInterviewQuestions(jobDescription: string, candidateProfile: any): Promise<string[]> {
    const prompt = `Generate 5-7 relevant interview questions for this candidate based on the job description:

Job: ${jobDescription}

Candidate profile: ${JSON.stringify(candidateProfile, null, 2)}

Focus on technical skills, experience, and cultural fit.`;

    const request: AIRequest = {
      model: this.currentProvider?.models[0] || 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
      prompt,
      max_tokens: 500,
      temperature: 0.6,
      top_p: 0.9
    };

    try {
      const response = await this.generateText(request).toPromise();
      if (response) {
        return response.split('\n').filter(q => q.trim().length > 0);
      }
    } catch (error) {
      console.error('Error generating interview questions:', error);
    }

    return [];
  }

  async analyzeCandidateMatch(candidate: any, jobRequirements: string): Promise<{
    matchScore: number;
    strengths: string[];
    gaps: string[];
    recommendations: string[];
  }> {
    const prompt = `Analyze how well this candidate matches the job requirements:

Job requirements: ${jobRequirements}

Candidate: ${JSON.stringify(candidate, null, 2)}

Provide match score (0-100), strengths, gaps, and recommendations.

Format as JSON with keys: matchScore, strengths, gaps, recommendations`;

    const request: AIRequest = {
      model: this.currentProvider?.models[0] || 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
      prompt,
      max_tokens: 800,
      temperature: 0.3,
      top_p: 0.9
    };

    return this.generateText(request).pipe(
      map(response => {
        try {
          return JSON.parse(response);
        } catch {
          return {
            matchScore: 50,
            strengths: [],
            gaps: [],
            recommendations: []
          };
        }
      })
    ).toPromise() || {
      matchScore: 50,
      strengths: [],
      gaps: [],
      recommendations: []
    };
  }

  async improveVacancyDescription(vacancy: any): Promise<{
    improvedDescription: string;
    keywords: string[];
    suggestions: string[];
  }> {
    const prompt = `Improve this job vacancy description to attract better candidates:

Current vacancy: ${JSON.stringify(vacancy, null, 2)}

Provide improved description, relevant keywords, and suggestions for the vacancy.

Format as JSON with keys: improvedDescription, keywords, suggestions`;

    const request: AIRequest = {
      model: this.currentProvider?.models[0] || 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
      prompt,
      max_tokens: 1000,
      temperature: 0.5,
      top_p: 0.9
    };

    return this.generateText(request).pipe(
      map(response => {
        try {
          return JSON.parse(response);
        } catch {
          return {
            improvedDescription: vacancy.description || '',
            keywords: [],
            suggestions: []
          };
        }
      })
    ).toPromise() || {
      improvedDescription: '',
      keywords: [],
      suggestions: []
    };
  }

  async predictCareerGrowth(profile: any): Promise<{
    predictedRoles: string[];
    timeline: string;
    requiredSkills: string[];
    recommendations: string[];
  }> {
    const prompt = `Predict career growth for this professional:

Profile: ${JSON.stringify(profile, null, 2)}

Provide predicted career progression, timeline, required skills, and recommendations.

Format as JSON with keys: predictedRoles, timeline, requiredSkills, recommendations`;

    const request: AIRequest = {
      model: this.currentProvider?.models[0] || 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
      prompt,
      max_tokens: 800,
      temperature: 0.4,
      top_p: 0.9
    };

    return this.generateText(request).pipe(
      map(response => {
        try {
          return JSON.parse(response);
        } catch {
          return {
            predictedRoles: [],
            timeline: '',
            requiredSkills: [],
            recommendations: []
          };
        }
      })
    ).toPromise() || {
      predictedRoles: [],
      timeline: '',
      requiredSkills: [],
      recommendations: []
    };
  }

  async generateCoverLetter(profile: any, jobDescription: string): Promise<string> {
    const prompt = `Generate a professional cover letter for this job application:

Job: ${jobDescription}

Candidate profile: ${JSON.stringify(profile, null, 2)}

Write a compelling cover letter that highlights relevant experience and skills.`;

    const request: AIRequest = {
      model: this.currentProvider?.models[0] || 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
      prompt,
      max_tokens: 600,
      temperature: 0.7,
      top_p: 0.9
    };

    try {
      const result = await this.generateText(request).toPromise();
      return result || '';
    } catch (error) {
      console.error('Error generating cover letter:', error);
      return '';
    }
  }

  async smartMatchCandidates(candidates: any[], jobRequirements: string): Promise<Array<{
    candidateId: string;
    matchScore: number;
    reasoning: string;
  }>> {
    const prompt = `Rank these candidates for the job based on match quality:

Job requirements: ${jobRequirements}

Candidates: ${JSON.stringify(candidates, null, 2)}

For each candidate, provide match score (0-100) and brief reasoning.

Format as JSON array with objects having keys: candidateId, matchScore, reasoning`;

    const request: AIRequest = {
      model: this.currentProvider?.models[0] || 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
      prompt,
      max_tokens: 1200,
      temperature: 0.3,
      top_p: 0.9
    };

    return this.generateText(request).pipe(
      map(response => {
        try {
          return JSON.parse(response);
        } catch {
          return candidates.map(c => ({
            candidateId: c.id || '',
            matchScore: 50,
            reasoning: 'Unable to analyze'
          }));
        }
      })
    ).toPromise() || [];
  }
}