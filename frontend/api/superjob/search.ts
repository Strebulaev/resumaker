import { VercelRequest, VercelResponse } from '@vercel/node';

interface SJVacancy {
  id: number;
  profession: string;
  town: {
    id: number;
    title: string;
  };
  payment_from?: number;
  payment_to?: number;
  currency: string;
  firm_name: string;
  date_published: string;
  link: string;
  vacancyRichText: string;
  experience: {
    id: number;
    title: string;
  };
  type_of_work: {
    id: number;
    title: string;
  };
  place_of_work: {
    id: number;
    title: string;
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { searchParams, accessToken, userId } = req.body;

  if (!searchParams || !userId) {
    return res.status(400).json({ error: 'Missing search parameters or userId' });
  }

  try {
    // Build search query for SuperJob API
    const queryParams = new URLSearchParams();

    // Basic search parameters
    if (searchParams.keyword) {
      queryParams.set('keyword', searchParams.keyword);
    }

    if (searchParams.town) {
      queryParams.set('t', searchParams.town); // Town ID
    }

    if (searchParams.experience) {
      queryParams.set('experience', searchParams.experience); // Experience ID
    }

    if (searchParams.type_of_work) {
      queryParams.set('type_of_work', searchParams.type_of_work); // Work type ID
    }

    if (searchParams.place_of_work) {
      queryParams.set('place_of_work', searchParams.place_of_work); // Place of work ID
    }

    if (searchParams.payment_from) {
      queryParams.set('payment_from', searchParams.payment_from.toString());
    }

    // Pagination and sorting
    queryParams.set('count', '20');
    queryParams.set('page', '0');
    queryParams.set('order_by', 'date'); // Sort by date
    queryParams.set('order_direction', 'desc');

    const searchUrl = `https://api.superjob.ru/2.0/vacancies/?${queryParams.toString()}`;

    const headers: Record<string, string> = {
      'User-Agent': 'Rezulution/1.0 (career-platform)',
      'X-Api-App-Id': process.env['SJ_APP_ID'] || ''
    };

    // Add authorization if token provided
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const response = await fetch(searchUrl, {
      headers
    });

    if (!response.ok) {
      throw new Error(`SuperJob API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Transform SuperJob response to our format
    const vacancies = data.objects.map((item: SJVacancy) => ({
      id: item.id.toString(),
      title: item.profession,
      company: item.firm_name,
      location: item.town.title,
      salary: {
        from: item.payment_from,
        to: item.payment_to,
        currency: item.currency
      },
      experience: item.experience?.title,
      employment: item.type_of_work?.title,
      schedule: item.place_of_work?.title,
      description: item.vacancyRichText,
      url: item.link,
      publishedAt: item.date_published,
      source: 'superjob.ru'
    }));

    return res.status(200).json({
      success: true,
      vacancies,
      total: data.total,
      more: data.more,
      count: data.count,
      page: data.page
    });

  } catch (error: any) {
    console.error('SuperJob search error:', error);
    return res.status(500).json({
      error: 'Search failed',
      message: error.message
    });
  }
}