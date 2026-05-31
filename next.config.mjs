/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/blog/geo-vs-seo-maroc',
        destination: '/fr/blog/geo-vs-seo-maroc/',
        permanent: true,
      },
      {
        source: '/en/blog/geo-vs-seo-maroc',
        destination: '/fr/blog/geo-vs-seo-maroc/',
        permanent: true,
      },
      {
        source: '/en/blog/tag/ai-overviews-maroc',
        destination: '/fr/blog/tag/ai-overviews-maroc/',
        permanent: true,
      },
      {
        source: '/en/blog/tag/generative-engine-optimization',
        destination: '/fr/blog/tag/generative-engine-optimization/',
        permanent: true,
      },
      {
        source: '/en/blog/tag/llmo',
        destination: '/fr/blog/tag/llmo/',
        permanent: true,
      },
      {
        source: '/en/blog/tag/perplexity-seo',
        destination: '/fr/blog/tag/perplexity-seo/',
        permanent: true,
      },
      {
        source: '/en/blog/tag/seo-maroc',
        destination: '/fr/blog/tag/seo-maroc/',
        permanent: true,
      },
      {
        source: '/en/technical-seo-consultant',
        destination: '/en',
        permanent: true,
      },
      {
        source: '/fr/consultant-seo-technique',
        destination: '/fr',
        permanent: true,
      },
      {
        source: '/en/seo-consultant-morocco',
        destination: '/en',
        permanent: true,
      },
      {
        source: '/fr/consultant-seo-maroc',
        destination: '/fr',
        permanent: true,
      },
      {
        source: '/en/shopify-seo-consultant',
        destination: '/en',
        permanent: true,
      },
      {
        source: '/fr/consultant-seo-shopify',
        destination: '/fr',
        permanent: true,
      },
      {
        source: '/en/ai-search-optimization',
        destination: '/en',
        permanent: true,
      },
      {
        source: '/fr/optimisation-recherche-ia',
        destination: '/fr',
        permanent: true,
      },
      {
        source: '/ai-search-guide',
        destination: '/',
        permanent: true,
      },
      {
        source: '/ai-search-optimization',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blog/sanity-blog-setup',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blog/tag/next-js',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blog/tag/sanity',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blog/tag/technical-seo',
        destination: '/',
        permanent: true,
      },
      {
        source: '/generative-engine-optimization',
        destination: '/',
        permanent: true,
      },
      {
        source: '/llm-optimization',
        destination: '/',
        permanent: true,
      },
      {
        source: '/make-com-seo-automation',
        destination: '/',
        permanent: true,
      },
      {
        source: '/n8n-seo-automation',
        destination: '/',
        permanent: true,
      },
      {
        source: '/shopify-seo-consultant',
        destination: '/',
        permanent: true,
      },
      {
        source: '/technical-seo-automation',
        destination: '/',
        permanent: true,
      },
      {
        source: '/technical-seo-consultant',
        destination: '/',
        permanent: true,
      },
      {
        source: '/technical-seo-consultant-morocco',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
