const http = require('http');

const pages = [
  '/',
  '/blog',
  '/projects/health-supply-770'
];

const locales = ['en', 'fr'];

async function checkPage(path) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          path,
          status: res.statusCode,
          hasError: data.includes('Server Error') || data.includes('Next.js error')
        });
      });
    }).on('error', (err) => {
      resolve({
        path,
        status: 'ERROR',
        error: err.message
      });
    });
  });
}

async function runTests() {
  console.log("Starting tests for local routes...");
  
  for (const locale of locales) {
    console.log(`\nTesting locale: ${locale}`);
    for (const page of pages) {
      const fullPath = `/${locale}${page === '/' ? '' : page}`;
      const result = await checkPage(fullPath);
      
      const statusStr = result.status === 200 && !result.hasError ? '✅ OK' : `❌ FAILED (${result.status})`;
      console.log(`${statusStr} - ${fullPath}`);
    }
  }
}

runTests();
