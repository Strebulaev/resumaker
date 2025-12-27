import { Injectable } from '@angular/core';
import { SupabaseService } from '../db/supabase.service';
import { AIService } from '../ai/ai.service';
import {
  ProjectAnalysis,
  AnalysisRequest,
  AnalysisResult,
  Technology,
  ArchitectureAnalysis,
  QualityAnalysis,
  ComplexityAnalysis,
  Achievement,
  Recommendation,
  ProjectMetadata,
  TechCategory,
  ArchitecturePattern,
  ComplexityLevel,
  AchievementType,
  RecommendationType,
  ProjectSource,
  CodeIssue
} from './project-analysis.models';

@Injectable({
  providedIn: 'root'
})
export class ProjectAnalysisService {
  constructor(
    private supabaseService: SupabaseService,
    private aiService: AIService
  ) {}

  async analyzeProject(request: AnalysisRequest): Promise<AnalysisResult> {
    const startTime = Date.now();

    try {
      let sourceCode = '';
      let metadata: Partial<ProjectMetadata> = {};

      if (request.source === 'github' && request.url) {
        const result = await this.fetchGitHubProject(request.url);
        sourceCode = result.code;
        metadata = result.metadata;
      } else if (request.files) {
        sourceCode = await this.processUploadedFiles(request.files);
      }

      const analysis = await this.performAnalysis(sourceCode, metadata, request.options);

      const result: AnalysisResult = {
        success: true,
        analysis,
        warnings: [],
        processingTime: Date.now() - startTime
      };

      await this.saveAnalysis(analysis);
      return result;

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        warnings: [],
        processingTime: Date.now() - startTime
      };
    }
  }

  private async fetchGitHubProject(url: string): Promise<{ code: string; metadata: Partial<ProjectMetadata> }> {
    const repoInfo = this.parseGitHubUrl(url);
    const response = await fetch(`https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}`);
    const repoData = await response.json();

    const metadata: Partial<ProjectMetadata> = {
      name: repoData.name,
      description: repoData.description,
      version: repoData.default_branch,
      license: repoData.license?.name,
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      issues: repoData.open_issues_count
    };

    const contentsResponse = await fetch(`https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}/contents`);
    const contents = await contentsResponse.json();

    let sourceCode = '';
    for (const item of contents) {
      if (item.type === 'file' && this.isSourceFile(item.name)) {
        try {
          const fileResponse = await fetch(item.download_url);
          const fileContent = await fileResponse.text();
          sourceCode += `// ${item.name}\n${fileContent}\n\n`;
        } catch (e) {
          continue;
        }
      }
    }

    return { code: sourceCode, metadata };
  }

  private parseGitHubUrl(url: string): { owner: string; repo: string } {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) throw new Error('Invalid GitHub URL');
    return { owner: match[1], repo: match[2] };
  }

  private isSourceFile(filename: string): boolean {
    const extensions = ['.js', '.ts', '.py', '.java', '.cpp', '.c', '.php', '.rb', '.go', '.rs', '.swift', '.kt'];
    return extensions.some(ext => filename.endsWith(ext));
  }

  private async processUploadedFiles(files: File[]): Promise<string> {
    let sourceCode = '';
    for (const file of files) {
      if (this.isSourceFile(file.name)) {
        const content = await file.text();
        sourceCode += `// ${file.name}\n${content}\n\n`;
      }
    }
    return sourceCode;
  }

  private async performAnalysis(
    sourceCode: string,
    metadata: Partial<ProjectMetadata>,
    options: any
  ): Promise<ProjectAnalysis> {
    const technologies = await this.detectTechnologies(sourceCode);
    const architecture = await this.analyzeArchitecture(sourceCode, technologies);
    const quality = await this.analyzeQuality(sourceCode);
    const complexity = this.calculateComplexity(sourceCode);
    const achievements = await this.identifyAchievements(sourceCode, technologies, architecture);
    const recommendations = this.generateRecommendations(quality, complexity, architecture);

    return {
      id: this.generateId(),
      projectId: this.generateId(),
      source: ProjectSource.GITHUB,
      analysisDate: new Date(),
      technologies,
      architecture,
      quality,
      complexity,
      achievements,
      recommendations,
      metadata: metadata as ProjectMetadata
    };
  }

  private async detectTechnologies(sourceCode: string): Promise<Technology[]> {
    const technologies: Technology[] = [];

    const patterns = {
      javascript: /\b(import|export|const|let|var|function|class)\b/g,
      typescript: /\b(interface|type|enum|implements)\b/g,
      python: /\b(def|class|import|from|if __name__)\b/g,
      java: /\b(public|private|protected|class|interface|extends|implements)\b/g,
      react: /\b(useState|useEffect|React\.|jsx|tsx)\b/g,
      angular: /\b@Component|@Injectable|@NgModule\b/g,
      node: /\b(require|module\.exports|express|http)\b/g,
      database: /\b(SELECT|INSERT|UPDATE|DELETE|CREATE|mongodb|mongoose)\b/g
    };

    for (const [tech, pattern] of Object.entries(patterns)) {
      const matches = sourceCode.match(pattern);
      if (matches) {
        technologies.push({
          name: tech,
          category: this.mapToCategory(tech),
          confidence: Math.min(matches.length / 10, 1),
          usage: {
            files: 1,
            linesOfCode: sourceCode.split('\n').length,
            percentage: 100,
            primary: true
          }
        });
      }
    }

    return technologies;
  }

  private mapToCategory(tech: string): TechCategory {
    const categories = {
      javascript: TechCategory.LANGUAGE,
      typescript: TechCategory.LANGUAGE,
      python: TechCategory.LANGUAGE,
      java: TechCategory.LANGUAGE,
      react: TechCategory.FRAMEWORK,
      angular: TechCategory.FRAMEWORK,
      node: TechCategory.TOOL,
      database: TechCategory.DATABASE
    };
    return categories[tech as keyof typeof categories] || TechCategory.LIBRARY;
  }

  private async analyzeArchitecture(sourceCode: string, technologies: Technology[]): Promise<ArchitectureAnalysis> {
    const hasMicroservices = /\b(docker|kubernetes|microservice|api-gateway)\b/i.test(sourceCode);
    const hasDatabase = /\b(database|mongodb|postgresql|mysql|redis)\b/i.test(sourceCode);
    const hasFrontend = /\b(react|angular|vue|html|css)\b/i.test(sourceCode);

    let pattern = ArchitecturePattern.MONOLITH;
    if (hasMicroservices) pattern = ArchitecturePattern.MICROSERVICES;
    else if (hasFrontend && hasDatabase) pattern = ArchitecturePattern.MVC;

    const layers: any[] = [];
    if (hasFrontend) layers.push({ name: 'Frontend', technologies: ['HTML', 'CSS', 'JavaScript'] });
    if (technologies.some(t => t.category === TechCategory.LANGUAGE)) {
      layers.push({ name: 'Backend', technologies: technologies.filter(t => t.category === TechCategory.LANGUAGE).map(t => t.name) });
    }
    if (hasDatabase) layers.push({ name: 'Database', technologies: ['Database'] });

    return {
      pattern,
      layers,
      components: [],
      dependencies: [],
      scalability: {
        score: hasMicroservices ? 8 : hasDatabase ? 6 : 4,
        factors: [],
        recommendations: []
      }
    };
  }

  private async analyzeQuality(sourceCode: string): Promise<QualityAnalysis> {
    const lines = sourceCode.split('\n');
    const functions = (sourceCode.match(/\bfunction\b|\bdef\b|\bclass\b/g) || []).length;
    const comments = (sourceCode.match(/\/\/|\/\*|# /g) || []).length;

    const maintainability = Math.min((comments / Math.max(functions, 1)) * 100, 100);
    const issues = this.findIssues(sourceCode);

    return {
      overall: (maintainability + (100 - issues.length * 10)) / 2,
      metrics: [
        { name: 'Maintainability', value: maintainability, benchmark: 70, status: maintainability > 70 ? 'good' : 'average' },
        { name: 'Code Coverage', value: 0, benchmark: 80, status: 'average' }
      ],
      issues,
      maintainability
    };
  }

  private findIssues(sourceCode: string): CodeIssue[] {
    const issues: CodeIssue[] = [];
    const lines = sourceCode.split('\n');

    lines.forEach((line, index) => {
      if (line.includes('console.log') && !line.includes('//')) {
        issues.push({
          type: 'style' as any,
          severity: 'low' as any,
          file: 'unknown',
          line: index + 1,
          description: 'Console.log left in production code',
          suggestion: 'Remove console.log statements'
        });
      }

      if (line.includes('TODO') || line.includes('FIXME')) {
        issues.push({
          type: 'maintainability' as any,
          severity: 'medium' as any,
          file: 'unknown',
          line: index + 1,
          description: 'TODO/FIXME comment found',
          suggestion: 'Address the TODO item'
        });
      }
    });

    return issues;
  }

  private calculateComplexity(sourceCode: string): ComplexityAnalysis {
    const lines = sourceCode.split('\n').filter(line => line.trim());
    const functions = (sourceCode.match(/\bfunction\b|\bdef\b/g) || []).length;
    const classes = (sourceCode.match(/\bclass\b/g) || []).length;
    const conditionals = (sourceCode.match(/\bif\b|\belse\b|\bfor\b|\bwhile\b/g) || []).length;

    const cyclomatic = 1 + conditionals;
    const cognitive = Math.min(cyclomatic + functions + classes, 50);

    let level = ComplexityLevel.SIMPLE;
    if (cognitive > 30) level = ComplexityLevel.VERY_COMPLEX;
    else if (cognitive > 20) level = ComplexityLevel.COMPLEX;
    else if (cognitive > 10) level = ComplexityLevel.MODERATE;

    return {
      cyclomatic,
      cognitive,
      linesOfCode: lines.length,
      files: 1,
      functions,
      classes,
      level
    };
  }

  private async identifyAchievements(
    sourceCode: string,
    technologies: Technology[],
    architecture: ArchitectureAnalysis
  ): Promise<Achievement[]> {
    const achievements: Achievement[] = [];

    if (architecture.pattern === ArchitecturePattern.MICROSERVICES) {
      achievements.push({
        type: AchievementType.ARCHITECTURE,
        title: 'Microservices Architecture',
        description: 'Implemented scalable microservices architecture',
        impact: 'high',
        technologies: ['Docker', 'Kubernetes'],
        evidence: ['Microservices pattern detected']
      });
    }

    if (technologies.some(t => t.name === 'react')) {
      achievements.push({
        type: AchievementType.INNOVATION,
        title: 'Modern Frontend Development',
        description: 'Built responsive user interface with React',
        impact: 'medium',
        technologies: ['React'],
        evidence: ['React components detected']
      });
    }

    return achievements;
  }

  private generateRecommendations(
    quality: QualityAnalysis,
    complexity: ComplexityAnalysis,
    architecture: ArchitectureAnalysis
  ): Recommendation[] {
    const recommendations: Recommendation[] = [];

    if (quality.maintainability < 50) {
      recommendations.push({
        type: RecommendationType.MAINTAINABILITY,
        priority: 'high',
        title: 'Improve Code Maintainability',
        description: 'Add more comments and documentation',
        effort: 'medium',
        impact: 'high'
      });
    }

    if (complexity.level === ComplexityLevel.VERY_COMPLEX) {
      recommendations.push({
        type: RecommendationType.MAINTAINABILITY,
        priority: 'high',
        title: 'Reduce Code Complexity',
        description: 'Break down complex functions into smaller ones',
        effort: 'high',
        impact: 'high'
      });
    }

    if (architecture.pattern === ArchitecturePattern.MONOLITH && architecture.scalability.score < 5) {
      recommendations.push({
        type: RecommendationType.SCALABILITY,
        priority: 'medium',
        title: 'Consider Microservices',
        description: 'Split monolithic application into microservices',
        effort: 'high',
        impact: 'high'
      });
    }

    return recommendations;
  }

  private async saveAnalysis(analysis: ProjectAnalysis): Promise<void> {
    const { error } = await this.supabaseService.client
      .from('project_analyses')
      .insert({
        id: analysis.id,
        project_id: analysis.projectId,
        source: analysis.source,
        source_url: analysis.sourceUrl,
        analysis_date: analysis.analysisDate.toISOString(),
        technologies: analysis.technologies,
        architecture: analysis.architecture,
        quality: analysis.quality,
        complexity: analysis.complexity,
        achievements: analysis.achievements,
        recommendations: analysis.recommendations,
        metadata: analysis.metadata
      });

    if (error) throw error;
  }

  async getAnalysis(projectId: string): Promise<ProjectAnalysis | null> {
    const { data, error } = await this.supabaseService.client
      .from('project_analyses')
      .select('*')
      .eq('project_id', projectId)
      .order('analysis_date', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}