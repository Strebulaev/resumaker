export default async function handler(req, res) {
    const { url, method = 'GET', headers = {}, body } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
  
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'User-Agent': 'RezulutionApp/1.0',
          'X-Api-App-Id': process.env.SUPERJOB_CLIENT_SECRET,
          ...headers
        },
        body: body ? JSON.stringify(body) : undefined
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('CORS proxy error:', error);
      res.status(500).json({ error: error.message });
    }
  }
  
  export const config = {
    api: {
      bodyParser: {
        sizeLimit: '10mb',
      },
    },
  };