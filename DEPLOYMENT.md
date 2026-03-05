# TuniHome Deployment and Dynamic Readiness

## Current state
- Frontend is production-styled and can be hosted immediately as a static site.
- Data persistence is currently browser-local (`localStorage`), so accounts/listings are not shared across different users/devices.

## What works now
- Fast static hosting on Netlify, Vercel, Cloudflare Pages, GitHub Pages, or any Nginx/Apache host.
- SEO baseline: meta tags, Open Graph/Twitter tags, canonical links, `robots.txt`, `sitemap.xml`, and structured data on key pages.

## Required for true multi-user dynamic production
1. Backend API (Node/Express, NestJS, Laravel, etc.)
2. Database (PostgreSQL/MySQL)
3. Authentication (JWT/session + hashed passwords)
4. Media storage (S3/Cloudinary/Supabase Storage)
5. Real admin moderation endpoints (profiles/listings/verification)
6. Server-side validation and anti-spam protections
7. Email/OTP verification and password reset

## Suggested API modules
- `POST /auth/signup`, `POST /auth/login`, `POST /auth/logout`
- `GET/POST /listings`, `GET /listings/:id`, `PATCH /listings/:id`, `DELETE /listings/:id`
- `POST /listings/:id/report`, `POST /listings/:id/contact`
- `GET/POST /profiles`, `PATCH /profiles/:id`
- `GET/POST /admin/users`, `GET/POST /admin/verification`, `PATCH /admin/listings/:id`

## Hosting checklist
- Set real domain and HTTPS (e.g. `https://tunihome.tn`)
- Update canonical/OG URLs to the final production domain if changed
- Submit sitemap in Google Search Console and Bing Webmaster Tools
- Add analytics (GA4/Plausible) and error tracking (Sentry)
- Add CDN caching for assets and API rate limiting
