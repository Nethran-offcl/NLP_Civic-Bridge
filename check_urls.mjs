import fs from 'fs';
import https from 'https';

const checkUrl = (url) => {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (e) => {
      resolve({ url, status: 'error', message: e.message });
    });
  });
};

async function main() {
  const central = JSON.parse(fs.readFileSync('./data/schemes/central_schemes.json', 'utf8'));
  const state = JSON.parse(fs.readFileSync('./data/schemes/state_schemes.json', 'utf8'));
  
  const urls = [...central, ...state].map(s => ({id: s.id, url: s.applicationUrl}));
  const uniqueUrls = [...new Set(urls.map(u => u.url))];
  
  console.log('Checking ' + uniqueUrls.length + ' unique URLs...');
  
  for (const url of uniqueUrls) {
    const result = await checkUrl(url);
    console.log(`${result.status} - ${url}`);
  }
}

main();
