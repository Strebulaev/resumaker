import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { vacancyId, resumeData, accessToken, userId } = req.body;

  if (!vacancyId || !resumeData || !accessToken || !userId) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    // First, create or update resume on SuperJob
    const resumeResponse = await createOrUpdateSJResume(resumeData, accessToken);

    if (!resumeResponse.success || !resumeResponse.resumeId) {
      throw new Error(`Failed to create/update resume: ${resumeResponse.error}`);
    }

    // Then apply to the vacancy
    const applyResponse = await applyToSJVacancy(vacancyId, resumeResponse.resumeId, accessToken);

    if (!applyResponse.success) {
      throw new Error(`Failed to apply: ${applyResponse.error}`);
    }

    return res.status(200).json({
      success: true,
      application: {
        vacancyId,
        resumeId: resumeResponse.resumeId,
        status: 'applied',
        appliedAt: new Date().toISOString(),
        platform: 'superjob.ru'
      }
    });

  } catch (error: any) {
    console.error('SuperJob apply error:', error);
    return res.status(500).json({
      error: 'Application failed',
      message: error.message
    });
  }
}

async function createOrUpdateSJResume(resumeData: any, accessToken: string): Promise<{ success: boolean; resumeId?: string; error?: string }> {
  try {
    // Check if user already has resumes
    const resumesResponse = await fetch('https://api.superjob.ru/2.0/resumes/', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Api-App-Id': process.env['SJ_APP_ID'] || '',
        'User-Agent': 'Rezulution/1.0 (career-platform)'
      }
    });

    if (!resumesResponse.ok) {
      throw new Error(`Failed to fetch resumes: ${resumesResponse.status}`);
    }

    const resumesData = await resumesResponse.json();
    let resumeId: string | null = null;

    // Find existing resume or create new one
    if (resumesData.objects && resumesData.objects.length > 0) {
      // Use the first resume
      resumeId = resumesData.objects[0].id.toString();
    } else {
      // Create new resume
      const createResponse = await fetch('https://api.superjob.ru/2.0/resumes/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'X-Api-App-Id': process.env['SJ_APP_ID'] || '',
          'Content-Type': 'application/json',
          'User-Agent': 'Rezulution/1.0 (career-platform)'
        },
        body: JSON.stringify({
          profession: resumeData.position || 'Разработчик',
          town: { id: resumeData.area || 4 }, // Moscow by default
          payment_from: resumeData.salary,
          currency: 'rub',
          age_from: resumeData.age_from,
          age_to: resumeData.age_to,
          education: resumeData.education || [],
          experience: resumeData.experience || [],
          skills: resumeData.skills || [],
          about: resumeData.about || 'Резюме создано через платформу Rezulution'
        })
      });

      if (!createResponse.ok) {
        const errorData = await createResponse.text();
        throw new Error(`Failed to create resume: ${createResponse.status} - ${errorData}`);
      }

      const newResume = await createResponse.json();
      resumeId = newResume.id.toString();
    }

    // Update resume with latest data
    if (resumeId) {
      const updateResponse = await fetch(`https://api.superjob.ru/2.0/resumes/${resumeId}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'X-Api-App-Id': process.env['SJ_APP_ID'] || '',
          'Content-Type': 'application/json',
          'User-Agent': 'Rezulution/1.0 (career-platform)'
        },
        body: JSON.stringify({
          profession: resumeData.position || 'Разработчик',
          town: { id: resumeData.area || 4 },
          payment_from: resumeData.salary,
          currency: 'rub',
          education: resumeData.education || [],
          experience: resumeData.experience || [],
          skills: resumeData.skills || [],
          about: resumeData.about || 'Резюме создано через платформу Rezulution'
        })
      });

      if (!updateResponse.ok) {
        console.warn(`Failed to update resume: ${updateResponse.status}`);
      }
    }

    return { success: true, resumeId: resumeId || undefined };

  } catch (error: any) {
    console.error('Resume creation/update error:', error);
    return { success: false, error: error.message };
  }
}

async function applyToSJVacancy(vacancyId: string, resumeId: string, accessToken: string): Promise<{ success: boolean; applicationId?: string; error?: string }> {
  try {
    const applyResponse = await fetch('https://api.superjob.ru/2.0/resume/send/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Api-App-Id': process.env['SJ_APP_ID'] || '',
        'Content-Type': 'application/json',
        'User-Agent': 'Rezulution/1.0 (career-platform)'
      },
      body: JSON.stringify({
        vacancy_id: parseInt(vacancyId),
        resume_id: parseInt(resumeId),
        message: 'Отклик через платформу Rezulution - автоматизированная система поиска работы'
      })
    });

    if (!applyResponse.ok) {
      const errorData = await applyResponse.text();
      throw new Error(`Application failed: ${applyResponse.status} - ${errorData}`);
    }

    const applyData = await applyResponse.json();

    return { success: true, applicationId: applyData.id?.toString() };

  } catch (error: any) {
    console.error('Application error:', error);
    return { success: false, error: error.message };
  }
}