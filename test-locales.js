const http = require('http');

const pages = [
  { path: '/', locales: ['en', 'fr'] },
  { path: '/blog/', locales: ['en', 'fr'] },
  { path: '/projects/health-supply-770/', locales: ['en', 'fr'] },
  { path: '/projects/epoptique/', locales: ['en', 'fr'] },
  { path: '/blog/seo-ecommerce-morocco-ai-search-product-pages/', locales: ['en'] },
  { path: '/blog/seo-ecommerce-maroc/', locales: ['fr'] },
  { path: '/blog/tag/seo-shopify-maroc/', locales: ['en', 'fr'] },
  { path: '/blog/tag/seo-woocommerce-maroc/', locales: ['en', 'fr'] },
  { path: '/blog/tag/optimisation-fiche-produit-maroc/', locales: ['en', 'fr'] },
  { path: '/blog/tag/r-f-rencement-e-commerce-maroc/', locales: ['en', 'fr'] },
  { path: '/blog/tag/chatgpt-seo-maroc/', locales: ['en', 'fr'] },
  { path: '/blog/tag/chatgpt-seo-morocco/', locales: ['en', 'fr'] },
  { path: '/blog/tag/shopify-seo-morocco/', locales: ['en', 'fr'] },
  { path: '/blog/tag/ecommerce-seo-morocco/', locales: ['en', 'fr'] },
  { path: '/blog/tag/product-page-seo/', locales: ['en', 'fr'] },
  { path: '/blog/tag/ai-search-optimization-morocco/', locales: ['en', 'fr'] },
  { path: '/blog/tag/woocommerce-seo-morocco/', locales: ['en', 'fr'] },
  { path: '/blog/tag/geo-morocco/', locales: ['en', 'fr'] },
  { path: '/blog/tag/seo-e-commerce-morocco/', locales: ['en', 'fr'] }
];

const resources = [
  '/images/health-supply-770/hs770-ahrefs-ai-citations-organic-growth.svg',
  '/images/health-supply-770/hs770-ahrefs-baseline-dr-organic-traffic.svg',
  '/images/health-supply-770/hs770-google-search-console-21300-clicks-174m-impressions.svg',
  '/images/health-supply-770/hs770-google-merchant-center-free-listings-clicks.svg',
  '/images/epoptique/epoptique-google-business-profile-views-searches-casablanca.svg',
  '/images/epoptique/epoptique-google-business-profile-interactions-chart.svg',
  '/images/epoptique/epoptique-google-business-profile-directions-chart.svg',
  '/images/epoptique/epoptique-google-business-profile-calls-chart.svg',
  '/images/epoptique/epoptique-google-reviews-486-reviews-4-9-stars.svg'
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

async function checkResource(path) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path,
      method: 'HEAD'
    };

    const req = http.request(options, (res) => {
      resolve({
        path,
        status: res.statusCode
      });
    });

    req.on('error', (err) => {
      resolve({
        path,
        status: 'ERROR',
        error: err.message
      });
    });

    req.end();
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

  for (const resourcePath of resources) {
    const result = await checkResource(resourcePath);
    const isSuccess = result.status === 200;
    if (!isSuccess) {
      hasFailed = true;
    }

    const statusStr = isSuccess ? '✅ OK' : `❌ FAILED (${result.status})`;
    console.log(`${statusStr} - ${resourcePath}`);
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
