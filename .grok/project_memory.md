# Project Memory

- Brand name decided: OrbitCount. Assumed production domain in SEO tags: https://orbitcount.com [2026-09-26]
- Product: multi-platform social insights site — paste YouTube / Instagram / Facebook URLs for public channel stats, plus SEO blog. [2026-09-26]
- Site root being built at artifacts/orbitcount/ as a static multi-page site (HTML/CSS/JS). Live lookups go through /api/youtube and /api/meta (Vercel api/ + Netlify functions). Set YOUTUBE_API_KEY, META_ACCESS_TOKEN, IG_BUSINESS_USER_ID as host env vars. [2026-09-26]
- Domain is set once in assets/js/config.js siteUrl; seo.js rewrites canonical + og:url. [2026-09-26]
- Blog CMS: studio.html edits posts in localStorage and downloads blog/data/posts.json. Listing uses assets/js/blog.js. New slugs render at blog/post.html?slug=. [2026-09-26]
- YouTube official API returns rounded subscriberCount (3 significant figures) for public channels. Instagram/Facebook public competitor stats require Meta Graph + Business Discovery / page tokens; personal IG accounts are not officially queryable. [2026-09-26]
- Visual direction: dark cosmic glassmorphism, violet/cyan/magenta accents, Outfit + Instrument Sans, CSS view transitions and Intersection Observer motion. [2026-09-26]
