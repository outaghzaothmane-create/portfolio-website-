const http = require('http');

const pages = [
  { path: '/', locales: ['en', 'fr'] },
  { path: '/blog/', locales: ['en', 'fr'] },
  { path: '/projects/health-supply-770/', locales: ['en', 'fr'] },
  { path: '/blog/seo-ecommerce-morocco-ai-search-product-pages/', locales: ['en'] },
  { path: '/blog/seo-ecommerce-maroc/', locales: ['fr'] }
];

async function checkPage(path) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'GET'
    };

    http.get(options, (res) => {
      // Follow 301/302/307/308 redirects once
      if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
        const redirectUrl = res.headers.location;
        const relativeRedirect = redirectUrl.startsWith('http') 
          ? new URL(redirectUrl).pathname + new URL(redirectUrl).search
          : redirectUrl;

        console.log(`   (Following redirect from ${path} to ${relativeRedirect})`);
        
        http.get(`http://localhost:3000${relativeRedirect}`, (redirectRes) => {
          let data = '';
          redirectRes.on('data', chunk => data += chunk);
          redirectRes.on('end', () => {
            resolve({
              path: relativeRedirect,
              originalPath: path,
              status: redirectRes.statusCode,
              hasError: data.includes('Server Error') || data.includes('Next.js error')
            });
          });
        }).on('error', (err) => {
          resolve({
            path: relativeRedirect,
            originalPath: path,
            status: 'ERROR',
            error: err.message
          });
        });
        return;
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          path,
          originalPath: path,
          status: res.statusCode,
          hasError: data.includes('Server Error') || data.includes('Next.js error')
        });
      });
    }).on('error', (err) => {
      resolve({
        path,
        originalPath: path,
        status: 'ERROR',
        error: err.message
      });
    });
  });
}

async function runTests() {
  console.log("Starting tests for local routes...");
  let hasFailed = false;
  
  for (const pageObj of pages) {
    for (const locale of pageObj.locales) {
      const pagePath = pageObj.path;
      const fullPath = `/${locale}${pagePath === '/' ? '/' : pagePath}`;
      const result = await checkPage(fullPath);
      
      const isSuccess = result.status === 200 && !result.hasError;
      if (!isSuccess) {
        hasFailed = true;
      }
      
      const statusStr = isSuccess ? '✅ OK' : `❌ FAILED (${result.status})`;
      console.log(`${statusStr} - ${fullPath}${result.path !== fullPath ? ` -> ${result.path}` : ''}`);
    }
  }

  if (hasFailed) {
    console.log("\n❌ Route verification failed!");
    process.exit(1);
  } else {
    console.log("\n✅ All routes verified successfully!");
    process.exit(0);
  }
}

runTests();
