# TuniHome

TuniHome is a premium static real-estate marketplace UI for Tunisia.

It includes:
- A homepage with featured listings and agency highlights
- A search experience with filters, list/split/map views, and result summaries
- Property detail pages
- Listing creation, dashboard, favorites, profile, settings, admin, and auth screens
- French as the default language, with English and Arabic support

## Stack

- HTML
- CSS
- Vanilla JavaScript
- Browser `localStorage` for demo persistence

This project is frontend-only. There is no backend or shared database yet.

## Project Structure

- [index.html](/Users/mac/Downloads/darna properties/index.html): homepage
- [search.html](/Users/mac/Downloads/darna properties/search.html): search and filter experience
- [property.html](/Users/mac/Downloads/darna properties/property.html): property detail page
- [list-property.html](/Users/mac/Downloads/darna properties/list-property.html): listing creation flow
- [dashboard.html](/Users/mac/Downloads/darna properties/dashboard.html): user dashboard
- [profile.html](/Users/mac/Downloads/darna properties/profile.html): agency/professional profile
- [styles.css](/Users/mac/Downloads/darna properties/styles.css): shared styles
- [animations.css](/Users/mac/Downloads/darna properties/animations.css): motion layer
- [app.js](/Users/mac/Downloads/darna properties/app.js): shared app logic and UI behavior
- [data.js](/Users/mac/Downloads/darna properties/data.js): demo data source

## Local Preview

Run a simple static server from the project root:

```bash
python3 -m http.server 4173
```

Then open:

- `http://127.0.0.1:4173/index.html`
- `http://127.0.0.1:4173/search.html`
- `http://127.0.0.1:4173/property.html?id=darna-101`

## Language Support

- Default language: French
- Optional: English via `?lang=en`
- Optional: Arabic via `?lang=ar`

Examples:

- `http://127.0.0.1:4173/index.html`
- `http://127.0.0.1:4173/index.html?lang=en`
- `http://127.0.0.1:4173/index.html?lang=ar`

Arabic support includes RTL layout for the core UI. Listing data content remains in the language provided by the demo dataset unless translated separately.

## Current Product State

What is production-ready from a UI/static-hosting perspective:

- Responsive multi-page interface
- Shared design system
- SEO basics: meta tags, Open Graph, canonical links, `robots.txt`, `sitemap.xml`
- Static hosting compatibility

What is still demo/frontend-only:

- Authentication
- Listing persistence across users/devices
- Saved items and alerts
- Admin operations
- Messaging/reporting flows

These features currently rely on browser `localStorage`.

## Deployment

This project can be hosted as a static site on:

- Netlify
- Vercel
- Cloudflare Pages
- GitHub Pages
- Any Nginx/Apache static host

See [DEPLOYMENT.md](/Users/mac/Downloads/darna properties/DEPLOYMENT.md) for backend-readiness notes and a suggested path toward a real multi-user platform.

## GitHub

Repository:

- `https://github.com/hamdijawher-workspace/Tunihome.git`

## Next Recommended Improvements

1. Translate listing data into French and Arabic, not only the interface.
2. Split `styles.css` into page-level styles to reduce override buildup.
3. Replace `localStorage` demo logic with a real backend and database.
4. Add proper forms validation, spam protection, and media upload storage.
