import { VercelRequest, VercelResponse } from '@vercel/node';

interface GitHubRepoData {
  readme?: string;
  packageJson?: any;
  requirementsTxt?: string;
  pomXml?: string;
  languages?: { [key: string]: number };
  structure?: string[];
}

module.exports = async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { repoUrl, userId } = req.body;

  if (!repoUrl || !userId) {
    return res.status(400).json({ error: 'Missing repoUrl or userId' });
  }

  try {
    // Validate GitHub URL
    const githubRegex = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)$/;
    const match = repoUrl.match(githubRegex);

    if (!match) {
      return res.status(400).json({ error: 'Invalid GitHub repository URL' });
    }

    const [, owner, repo] = match;

    // Fetch repository data from GitHub API
    const repoData = await fetchGitHubRepoData(owner, repo);

    // Get AI configuration
    const togetherApiKey = process.env['TOGETHER_API_KEY'];
    if (!togetherApiKey) {
      return res.status(500).json({ error: 'AI service not configured' });
    }

    // Generate resume content using AI
    const resumeContent = await generateResumeContent(repoData, togetherApiKey);

    return res.status(200).json({
      success: true,
      content: resumeContent,
      repoInfo: {
        owner,
        name: repo,
        url: repoUrl
      }
    });

  } catch (error: any) {
    console.error('GitHub analysis error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};

async function fetchGitHubRepoData(owner: string, repo: string): Promise<GitHubRepoData> {
  const data: GitHubRepoData = {};

  try {
    // Fetch README
    const readmeResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
      headers: {
        'Accept': 'application/vnd.github.v3.raw'
      }
    });

    if (readmeResponse.ok) {
      data.readme = await readmeResponse.text();
    }

    // Fetch package.json
    const packageResponse = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/main/package.json`);
    if (packageResponse.ok) {
      data.packageJson = await packageResponse.json();
    } else {
      // Try master branch
      const packageResponseMaster = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/master/package.json`);
      if (packageResponseMaster.ok) {
        data.packageJson = await packageResponseMaster.json();
      }
    }

    // Fetch requirements.txt
    const requirementsResponse = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/main/requirements.txt`);
    if (requirementsResponse.ok) {
      data.requirementsTxt = await requirementsResponse.text();
    }

    // Fetch pom.xml
    const pomResponse = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/main/pom.xml`);
    if (pomResponse.ok) {
      data.pomXml = await pomResponse.text();
    }

    // Fetch languages
    const languagesResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`);
    if (languagesResponse.ok) {
      data.languages = await languagesResponse.json();
    }

    // Get repository structure (contents of root)
    const contentsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/`);
    if (contentsResponse.ok) {
      const contents = await contentsResponse.json();
      data.structure = contents.map((item: any) => item.name);
    }

  } catch (error) {
    console.error('Error fetching GitHub data:', error);
  }

  return data;
}

async function generateResumeContent(repoData: GitHubRepoData, apiKey: string): Promise<string> {
  // Extract technologies from various sources
  const technologies = extractTechnologies(repoData);

  // Build AI prompt
  const prompt = buildResumePrompt(repoData, technologies);

  // Call Together AI API
  const response = await fetch('https://api.together.xyz/v1/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
      prompt: prompt,
      max_tokens: 1000,
      temperature: 0.7,
      top_p: 0.8,
      stop: ['<|im_end|>', '<|im_start|>']
    })
  });

  if (!response.ok) {
    throw new Error(`AI API error: ${response.status}`);
  }

  const result = await response.json();
  return result.choices?.[0]?.text?.trim() || 'Не удалось сгенерировать описание проекта';
}

function extractTechnologies(repoData: GitHubRepoData): string[] {
  const technologies: string[] = [];

  // From package.json
  if (repoData.packageJson?.dependencies) {
    Object.keys(repoData.packageJson.dependencies).forEach(dep => {
      technologies.push(dep);
    });
  }

  // From requirements.txt
  if (repoData.requirementsTxt) {
    const reqLines = repoData.requirementsTxt.split('\n');
    reqLines.forEach(line => {
      const match = line.match(/^([a-zA-Z0-9\-_]+)/);
      if (match) technologies.push(match[1]);
    });
  }

  // From pom.xml (basic parsing)
  if (repoData.pomXml) {
    // Simple regex to extract dependencies
    const depMatches = repoData.pomXml.match(/<artifactId>([^<]+)<\/artifactId>/g);
    if (depMatches) {
      depMatches.forEach(match => {
        const artifactId = match.replace(/<\/?artifactId>/g, '');
        technologies.push(artifactId);
      });
    }
  }

  // From languages
  if (repoData.languages) {
    Object.keys(repoData.languages).forEach(lang => {
      technologies.push(lang);
    });
  }

  // Remove duplicates and common non-tech items
  return [...new Set(technologies)]
    .filter(tech => !['node', 'npm', 'yarn', 'webpack', 'babel'].includes(tech.toLowerCase()))
    .slice(0, 10); // Limit to top 10
}

function buildResumePrompt(repoData: GitHubRepoData, technologies: string[]): string {
  const repoName = repoData.packageJson?.name || 'Проект';
  const description = repoData.readme ?
    repoData.readme.substring(0, 500) :
    (repoData.packageJson?.description || 'Описание проекта отсутствует');

  return `# ЗАДАЧА: Преобразовать данные GitHub репозитория в профессиональное описание проекта для резюме

## ДАННЫЕ ПРОЕКТА:
**Название:** ${repoName}
**Описание:** ${description}

**Технологии:** ${technologies.join(', ')}

## ТРЕБОВАНИЯ К ВЫХОДУ:
1. **Формат:** 3 предложения описания + 3-5 bullet points достижений
2. **Стиль:** Профессиональный, action-oriented
3. **Фокус:** Технические достижения и бизнес-ценность
4. **Длина:** Конкретно, без воды

## ПРИМЕР ВЫХОДА:
Разработал полнофункциональное веб-приложение для управления задачами с использованием React и Node.js.

• Оптимизировал производительность базы данных, сократив время загрузки на 40%
• Реализовал систему аутентификации с JWT токенами для 1000+ пользователей
• Интегрировал REST API с внешними сервисами для автоматической синхронизации данных
• Внедрил responsive дизайн, повысив удовлетворенность пользователей на 25%

Сгенерируй аналогичное описание для этого проекта:`;
}