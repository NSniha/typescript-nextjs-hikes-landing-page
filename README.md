# SYNTASK — Hiking landing page

A complete responsive Next.js + TypeScript landing page based on the supplied Hikes reference, with a redesigned mega footer, Tailwind CSS v4, and Motion animations.

## চালু করার নিয়ম

Node.js **20.9 বা নতুন version** লাগবে। ZIP extract করে `hikes-landing` folder VS Code-এ খুলুন। Terminal-এ:

```bash
npm install
npm run dev
```

Browser-এ **http://localhost:3000** খুলুন। কোনো API key বা `.env` লাগবে না। প্রথমবার install করার জন্য internet লাগবে।

Production build এবং TypeScript check:

```bash
npm run typecheck
npm run build
```

`next.config.ts` uses static export. A successful build creates `out/`; deploy that folder to a static host, or import the source into Vercel as a Next.js project. After building, `npm start` serves the exported production site at http://localhost:3000 using the included Node.js static server.

## যা কাজ করে

- Responsive desktop, tablet, and mobile layouts; mobile menu and sticky navigation.
- Hero image parallax, scroll reveals for sections and every card, hover transitions, animated counters, and a floating app preview.
- Search by trail, region, country, or collection keyword.
- Difficulty filters, category filters, sorting, reset, result counts, and an empty state.
- Twelve trail cards with detail dialogs, overview/route/review tabs, save actions, itinerary actions, and copyable trail links.
- Saved hikes and itinerary persist between visits on the same browser.
- Six clickable hiking collections that filter the trail grid.
- A local explorer profile with editable name and email, and sign out.
- Pricing preview, app-interest form, newsletter form with email validation and confirmation.
- Accessible native dialogs, Escape/backdrop close, browser focus containment, visible keyboard focus, skip link, form labels, and live announcements.
- Mega footer with working section links, collection links, sharing, FAQs, field notes, essentials, privacy, terms, and back-to-top.
- Self-hosted fonts and local image assets; reduced-motion preferences respected.

## আপনার ছবি বসাবেন যেভাবে

**[IMAGE-GUIDE-BN.md](./IMAGE-GUIDE-BN.md)**-এ প্রতিটি ছবির exact file name এবং recommended size দেওয়া আছে।

ছবিগুলো `public/images/`-এ একই নামে replace করলেই কাজ হবে। File name বা extension আলাদা হলে `src/lib/data.ts`-এ path বদলান। Hero image path `src/components/hiking-landing.tsx`-এ আছে।

Preview assets: trail/category/avatar placeholders were cropped from the supplied reference. The hero is a temporary Unsplash photograph by Gabi Lardi: https://unsplash.com/photos/HdLj1-ICOrg. Use your own original, high-resolution images for the final reference match. The supplied screenshot itself is not part of the website or ZIP.

## কোন ফাইল কোথায়

| File | Purpose |
| --- | --- |
| `src/app/page.tsx` | Landing page entry |
| `src/app/layout.tsx` | Page metadata and viewport |
| `src/app/globals.css` | Tailwind theme, exact visual styles, breakpoints, animations |
| `src/components/hiking-landing.tsx` | Header, hero, grid, collections, app, footer, and interactions |
| `src/components/trail-dialog.tsx` | Trail detail tabs and actions |
| `src/components/phone-preview.tsx` | HTML/CSS phone and community preview |
| `src/components/dialog.tsx` | Reusable accessible modal |
| `src/components/motion.tsx` | Scroll reveals and animated counters |
| `src/lib/data.ts` | Trail titles, categories, image paths, statistics, FAQ copy |
| `src/lib/use-local-storage.ts` | Browser persistence |
| `public/images/` | Replaceable images |
| `public/fonts/` | DM Sans font files and OFL license |

## Frontend preview scope

এই প্রজেক্টটি একটি interactive **frontend landing page**। Profile, bookmarks, itinerary, newsletter signup এবং app interest শুধু browser `localStorage`-এ থাকে। বাস্তব authentication, database, email delivery, payment, live GPS, GPX routes, real user reviews বা app-store download সংযুক্ত করা হয়নি। App এবং Pro buttons স্পষ্টভাবে coming-soon preview দেখায়।

Trail locations, distances, ratings, reviews, statistics, and elevation profiles are illustrative sample data. The landing-page statistics and app-feature text follow the supplied design. Verify and replace them before production use. Field notes are labeled as imagined examples. Change the example `metadataBase` in `src/app/layout.tsx` to your real domain before publishing.

No user data is sent to an application backend in this edition. No authentication secrets are needed. No analytics or advertising cookies are included. Clear the site's browser storage to reset local preview data.

## Design notes

The reference's dark/lime palette, two-line hero, translucent feature strip, edge-to-edge twelve-card grid, split explore section, category collage, app panel, and statistics are preserved. The footer is intentionally redesigned as requested. The supplied screenshot is a desktop reference; mobile layouts were adapted for readable text and usable controls. Final photographic fidelity depends on replacing the temporary images with your originals.

`node_modules`, build caches, editor files, and private environment files are excluded from the ZIP. A lockfile is included for reproducible installs.
