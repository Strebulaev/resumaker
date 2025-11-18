const fs = require('fs');
const path = require('path');

const envFile = path.join(__dirname, '../src/environments/environment.prod.ts');
let content = fs.readFileSync(envFile, 'utf8');

content = content
  .replace(/POSTGRES_SUPABASE_URL_PLACEHOLDER/g, process.env.POSTGRES_SUPABASE_URL || '')
  .replace(/POSTGRES_SUPABASE_ANON_KEY_PLACEHOLDER/g, process.env.POSTGRES_SUPABASE_ANON_KEY || '')
  .replace(/TOGETHER_API_KEY_PLACEHOLDER/g, process.env.TOGETHER_API_KEY || '')
  .replace(/HH_CLIENT_ID_PLACEHOLDER/g, process.env.HH_CLIENT_ID || '')
  .replace(/HH_CLIENT_SECRET_PLACEHOLDER/g, process.env.HH_CLIENT_SECRET || '');

fs.writeFileSync(envFile, content);
console.log('Environment variables replaced successfully');