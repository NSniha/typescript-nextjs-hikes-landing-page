<div align="center">
  <h1>SYNTASK</h1>
  <p><strong>Find the best hikes for your next trip.</strong></p>
  <p>A responsive hiking and adventure landing page built with Next.js, TypeScript, Tailwind CSS, and Motion for React.</p>
  <br />
  <p>
    <a href="https://nextjs.org/" title="Next.js"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg" alt="Next.js logo" width="48" height="48" /></a>
    &nbsp;&nbsp;
    <a href="https://react.dev/" title="React"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="React logo" width="48" height="48" /></a>
    &nbsp;&nbsp;
    <a href="https://www.typescriptlang.org/" title="TypeScript"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="TypeScript logo" width="48" height="48" /></a>
    &nbsp;&nbsp;
    <a href="https://tailwindcss.com/" title="Tailwind CSS"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind CSS logo" width="48" height="48" /></a>
    &nbsp;&nbsp;
    <a href="https://nodejs.org/" title="Node.js"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" alt="Node.js logo" width="48" height="48" /></a>
    &nbsp;&nbsp;
    <a href="https://webpack.js.org/" title="Webpack"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/webpack/webpack-original.svg" alt="Webpack logo" width="48" height="48" /></a>
    &nbsp;&nbsp;
    <a href="https://git-scm.com/" title="Git"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg" alt="Git logo" width="48" height="48" /></a>
  </p>
  <p><strong>Next.js · React · TypeScript · Tailwind CSS · Motion · Lucide</strong></p>
</div>

<img width="1366" height="852" alt="gofullpage-hikes-landing-page-vercel-app-2026-11-16-00_43_33" src="https://github.com/user-attachments/assets/9991afa0-b878-468b-ba17-b119ff535d3d" />


## Overview

SYNTASK brings trail discovery into a single, interactive landing page. Visitors can explore hiking collections, search sample trails, compare route information, save favorites, and build a personal itinerary.

The visual design pairs forest and mountain photography with a dark background, lime accents, spacious typography, and scroll animations. A redesigned mega footer brings navigation, newsletter signup, sharing, and useful hiking information into one place.

**Current edition:** an interactive frontend with browser-local persistence. Explorer profiles and forms demonstrate the product experience; authentication, email delivery, payments, live maps, and a production database are future integrations.

## Tech Stack

| Technology | Version in the project | Responsibility |
| --- | --- | --- |
| [Next.js](https://nextjs.org/) | `16.4.6` | App Router, page metadata, image components, and static export |
| [React](https://react.dev/) | `19.3.1` in the lockfile | Components, state, hooks, and interactive UI |
| [TypeScript](https://www.typescriptlang.org/) | `5.9.3` in the lockfile | Strict typing for components, trail data, and browser state |
| [Tailwind CSS](https://tailwindcss.com/) | `4.3.5` | Theme tokens and utilities, combined with custom responsive CSS |
| [Tailwind PostCSS](https://tailwindcss.com/docs/installation/using-postcss) | `4.3.5` | CSS processing through `@tailwindcss/postcss` |
| [Motion for React](https://motion.dev/docs/react) | `14.14.0` | Scroll reveals, parallax, transitions, and animated counters |
| [Lucide React](https://lucide.dev/) | `0.468.0` in the lockfile | Interface and navigation icons |
| [Node.js](https://nodejs.org/) | `20.9+` required | Development tools and the included static preview server |
| [Webpack](https://webpack.js.org/) | Bundled with Next.js | Alternative bundler for environments without working Turbopack native bindings |
| [DM Sans](https://fonts.google.com/specimen/DM+Sans) | Self-hosted | Local font files in four weights |

Exact installed dependency versions are recorded in `package-lock.json`. Next.js uses Turbopack by default; the Webpack setup is documented under [Troubleshooting](#troubleshooting).

## Features

### Trail discovery

- Search by trail name, location, country, difficulty, or collection keyword.
- Filter results by **Easy**, **Moderate**, or **Challenging** difficulty.
- Sort by featured order, highest rating, shortest distance, or longest distance.
- Combine search and filters, see result counts, and reset the selection.
- Display a helpful empty state when no trails match.
- Explore twelve sample trail cards with photographs, names, author avatars, and additional information on interaction.

### Trail details and personal planning

- Open each trail in an animated detail dialog.
- View location, difficulty, distance, estimated duration, elevation gain, and route type.
- Switch between **Overview**, **Route preview**, and **Reviews** panels.
- Save or unsave a trail from its card or detail dialog.
- Add and remove hikes from a personal itinerary.
- Review saved and planned hikes in a shared list.
- Copy a trail link that can reopen the same detail dialog.

The route panel contains an illustrative elevation profile. The reviews panel presents sample ratings and a community preview.

### Curated hiking collections

| Collection | Filter ID |
| --- | --- |
| With Kids | `with-kids` |
| Pet Friendly | `pet-friendly` |
| Family Trip | `family-trip` |
| Challenging | `challenging` |
| Scenic Views | `scenic-views` |
| Historical Sites | `historical-sites` |

Selecting a collection filters the trail grid and moves the visitor to the results section.

### Motion and interaction

- Parallax movement on the hero background.
- Scroll-triggered reveals for headings, sections, trail cards, and collection cards.
- Staggered entrances across card groups.
- Image zoom, bookmark states, and directional button interactions.
- Floating phone and community preview.
- Animated community counters.
- Dialog, mobile-menu, FAQ, filter-panel, and notification transitions.
- Reduced-motion support through Motion and CSS media queries.

### Responsive navigation and mega footer

- Sticky navigation after scrolling.
- Expandable mobile menu with section links.
- Saved-hike access from the header and footer.
- Newsletter form with email validation and a local confirmation state.
- Footer links to collections, membership, app previews, and community content.
- FAQ accordion, hiking essentials, field notes, privacy, and terms dialogs.
- Website-link copying, a Facebook sharing action, and back-to-top navigation.

### Explorer profile and product previews

- Create and edit a local explorer profile using a name and email address.
- Sign out of the local profile.
- Compare the free Explorer experience with the planned Trail Pro offering.
- Save interest in the planned iOS or Android app through a preview form.
- Present an HTML/CSS phone mockup that opens a sample trail.

Profile creation is a browser-local experience. Newsletter and app-interest forms save preview data on the current device and do not send emails or create server-side accounts.

## Page Sections

| Section | Anchor | Contents |
| --- | --- | --- |
| Hero and navigation | `#home` | Brand, navigation, review summary, headline, search, and benefit strip |
| Trending hikes | `#trails` | Twelve trail cards, filters, sorting, and empty states |
| Explore without limits | `#how-it-works` | Platform introduction and six hiking collections |
| App experience | `#the-app` | Planned app benefits, store-interest buttons, and phone preview |
| Community statistics | `#community` | Four animated sample statistics |
| Mega footer | `#footer` | Newsletter, exploration links, help, sharing, and legal information |

All main sections are on `/`. Trail links use a query parameter to open a detail dialog, for example:

```text
http://localhost:3000/?trail=sunset-peak#trails
```

Trail locations, distances, ratings, statistics, elevation profiles, and field notes are illustrative content. The app-feature copy describes a planned mobile product.

## Getting Started

### Requirements

- Node.js **20.9 or newer**.
- npm, included with Node.js.
- A modern browser.
- Internet access for the initial dependency installation.

### Install and run

Clone or download the repository, then open a terminal in the project root: the folder containing `package.json`.

```bash
npm install
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)**. Keep the terminal running while using the development site. If the terminal prints a different Local URL, use that address.

If Windows reports that Turbopack native bindings are unavailable, apply the [Webpack setup](#windows-swc-or-turbopack-binding-error) below.

### Environment configuration

The current frontend runs without an `.env` file, API keys, database credentials, or an email provider. Fonts and website images are included in `public/`.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm install` | Install dependencies using the included lockfile |
| `npm ci` | Perform a clean dependency installation from the lockfile |
| `npm run dev` | Start the development server through `scripts/dev.mjs` |
| `npm run dev -- --webpack` | Start with Webpack when the dev script does not already include the flag |
| `npm run dev -- --port 3001` | Use a different development port |
| `npm run typecheck` | Run TypeScript validation without emitting JavaScript |
| `npm run build` | Create the production static export in `out/` |
| `npm start` | Serve the existing `out/` folder through `scripts/serve.mjs` |

### Preview the production build

```bash
npm run typecheck
npm run build
npm start
```

The included server uses port `3000` by default and accepts the `PORT` environment variable. Build the project before running `npm start`.

## Project Structure

| Path | Responsibility |
| --- | --- |
| [`src/app/page.tsx`](./src/app/page.tsx) | Landing-page entry point |
| [`src/app/layout.tsx`](./src/app/layout.tsx) | Root layout, metadata, Open Graph information, and viewport |
| [`src/app/globals.css`](./src/app/globals.css) | Tailwind theme, custom styles, breakpoints, and CSS animations |
| [`src/app/icon.svg`](./src/app/icon.svg) | Mountain favicon |
| [`src/components/hiking-landing.tsx`](./src/components/hiking-landing.tsx) | Main sections, filters, local state, footer, and supporting dialogs |
| [`src/components/trail-dialog.tsx`](./src/components/trail-dialog.tsx) | Trail facts, information tabs, save, planning, and sharing actions |
| [`src/components/phone-preview.tsx`](./src/components/phone-preview.tsx) | Phone mockup and community-chat presentation |
| [`src/components/dialog.tsx`](./src/components/dialog.tsx) | Reusable native dialog with close, focus, and scroll handling |
| [`src/components/motion.tsx`](./src/components/motion.tsx) | Reusable scroll reveal and animated-number components |
| [`src/lib/data.ts`](./src/lib/data.ts) | Trail types, sample trails, collections, feature copy, statistics, and FAQs |
| [`src/lib/use-local-storage.ts`](./src/lib/use-local-storage.ts) | Hydration-aware browser persistence with error handling |
| [`public/images/`](./public/images/) | Hero, trail, collection, and avatar images |
| [`public/fonts/`](./public/fonts/) | DM Sans font files and their license |
| [`scripts/dev.mjs`](./scripts/dev.mjs) | Development command wrapper and CLI argument forwarding |
| [`scripts/serve.mjs`](./scripts/serve.mjs) | Node.js server for the exported static site |
| [`next.config.ts`](./next.config.ts) | Static-export and image configuration |
| [`postcss.config.mjs`](./postcss.config.mjs) | Tailwind PostCSS integration |
| [`tsconfig.json`](./tsconfig.json) | Strict TypeScript settings and the `@/*` import alias |
| [`IMAGE-GUIDE-BN.md`](./IMAGE-GUIDE-BN.md) | Detailed Bengali image replacement guide |

## Customization

### Replace photographs

Use your original high-resolution photographs in the existing asset folders. Keeping the same filenames and extensions updates the page without changing image paths in the components.

| Asset | Location | Suggested dimensions |
| --- | --- | --- |
| Hero background | `public/images/hero.jpg` | `2400 × 1600 px` or larger |
| Trail photographs | `public/images/trails/` | `1200 × 1000 px` |
| Collection photographs | `public/images/collections/` | `800 × 1100 px` |
| Hiker avatars | `public/images/avatars/hiker-1.jpg` through `hiker-12.jpg` | `100 × 100 px` or larger |

Use a text-free photograph for the hero; its headline and search form are rendered as HTML. Adjust `.hero-image` in `globals.css` to change the crop position.

If filenames or formats change, update the corresponding paths in `src/lib/data.ts`, `src/components/hiking-landing.tsx`, `src/components/phone-preview.tsx`, and `src/app/layout.tsx` as applicable. The phone and chat preview reuse existing trail and collection photographs.

See **[IMAGE-GUIDE-BN.md](./IMAGE-GUIDE-BN.md)** for the exact image-to-card mapping.

### Edit trail and collection content

Update `src/lib/data.ts` to change trail names, descriptions, locations, difficulty, distance, duration, elevation, ratings, authors, collection assignments, FAQs, and sample statistics. New trail objects should follow the exported `Trail` type. Each collection assignment should use a valid collection ID from the collection table above.

When adding more than the original twelve trails, provide matching avatar assets or update the avatar mapping in `hiking-landing.tsx`.

### Change the visual theme

The core design tokens live in `src/app/globals.css`:

```css
:root {
  --background: #151411;
  --panel: #292623;
  --lime: #edff00;
  --text: #f8f8f5;
  --muted: #bfbdb7;
}
```

Update the corresponding `@theme inline` tokens if you also change the Tailwind theme colors. Typography uses locally hosted DM Sans in weights `400`, `500`, `600`, and `700`.

### Update branding and metadata

- Change the brand and marketing copy in `src/components/hiking-landing.tsx`.
- Update the title, description, Open Graph image, and `metadataBase` in `src/app/layout.tsx`.
- Replace the example domain `https://syntask.example` with the deployed domain.
- Replace `src/app/icon.svg` to change the favicon.
- Update the preview privacy and terms text when introducing new data collection or backend services.

## Local Data and Product Scope

The custom storage hook reads saved values after hydration and handles unavailable or invalid browser storage. If persistence is unavailable, in-memory interactions remain usable for that visit.

| Storage key | Saved information |
| --- | --- |
| `syntask:saved:v1` | Bookmarked trail IDs |
| `syntask:itinerary:v1` | Planned trail IDs |
| `syntask:profile:v1` | Local explorer name and email |
| `syntask:newsletter:v1` | Newsletter preview email entries |
| `syntask:app-waitlist:v1` | App-interest emails and selected platforms |

Data belongs to the current browser and origin. It is not synchronized across devices. Visitors can remove saved hikes, remove itinerary entries, and sign out of their local profile. Clearing this site's browser storage removes all local preview data.

| Capability | Current behavior |
| --- | --- |
| Explorer profile | Local profile creation, editing, and sign out |
| Saved hikes and itinerary | Interactive, stored in the browser |
| Newsletter and app interest | Validated preview forms with local persistence |
| Pricing and membership | Informational preview; no checkout or payment processing |
| Route information | Sample trail facts and an illustrative elevation profile |
| Reviews | Sample ratings and a preview panel |
| Offline maps, live location, and app downloads | Presented as planned product capabilities |

No backend authentication, database, email delivery service, payment gateway, live GPS integration, or app-store listing is connected in this edition.

## Accessibility and Responsive Design

- Mobile, tablet, laptop, and desktop layouts with responsive grids and typography.
- Semantic landmarks, labeled form fields, descriptive image alternatives, and a skip-to-content link.
- Visible keyboard focus and accessible labels for icon-only controls.
- Native modal dialogs with browser focus containment, Escape dismissal, backdrop close, and focus restoration.
- Live announcements for result summaries, newsletter confirmation, and action notifications.
- Reduced-motion handling for visitors who prefer less movement.
- Local images and fonts, including a prioritized hero image and responsive image-size hints.

Images use `next/image` with `images.unoptimized: true` to support the static export. The current configuration serves local image assets without the Next.js runtime image-optimization service.

## Deployment

### Vercel

1. Push the project to a Git repository and import it into Vercel.
2. Set the root directory to the folder containing `package.json`.
3. Use the **Next.js** framework preset and build command `npm run build`.
4. Keep the framework-detected output settings; no project-specific environment variables are required.
5. Deploy, then update the page metadata to use the real domain.

Vercel automatically configures supported framework build settings. See its [build configuration documentation](https://vercel.com/docs/builds/configure-a-build) when changing overrides.

### Static hosting

The project already enables static export:

```ts
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
};
```

Run `npm run build`, then publish the generated **`out/`** directory to a static host. For a host asking for explicit settings, use:

| Setting | Value |
| --- | --- |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Publish directory | `out` |

Rebuild after changing source files or replacing photographs. Keep the exported `404.html` for unknown paths. If you later introduce server-only features, revisit the static-export configuration and deployment approach.

## Verification

Run the available checks before publishing changes:

```bash
npm run typecheck
npm run build
```

For a quick manual review, check search and reset, difficulty and sorting controls, collection filtering, trail dialogs, bookmark persistence after reload, itinerary removal, mobile navigation, newsletter confirmation, and FAQ expansion.

The supplied project includes TypeScript and production-build validation commands. Automated unit-test, browser-test, and CI workflows are not included.

## Troubleshooting

### Windows SWC or Turbopack binding error

If the terminal reports that native SWC bindings could not load and Turbopack requires native bindings, switch development and production builds to Webpack. Run these commands from the project root; they work in Windows CMD and PowerShell:

```bash
npm pkg set "scripts.dev=node scripts/dev.mjs --webpack"
npm pkg set "scripts.build=next build --webpack"
npm run dev
```

The first two commands update `package.json` permanently. Afterward, use the usual `npm run dev` and `npm run build` commands.

A native SWC warning can remain when Next.js successfully uses its WASM fallback with Webpack. `Ready` and a `GET / 200` response indicate that the development server has served the homepage successfully.

Reference: [Next.js supported platforms and Webpack fallback](https://nextjs.org/docs/app/api-reference/turbopack#supported-platforms).

### Port 3000 is already in use

Choose another port and use the Local URL shown in the terminal:

```bash
npm run dev -- --port 3001
```

### A photograph does not appear

Check the exact filename, extension, and letter case. Public asset references start with `/images/`, not `/public/images/`. Rebuild the export after replacing assets on a deployed static site.

### Production preview reports no exported build

Generate `out/` before starting the included static server:

```bash
npm run build
npm start
```

### Saved data looks different on another device

Saved trails and profiles use browser-local storage. A different browser, device, port, or domain has a separate storage origin and a separate saved list.

## Roadmap

- [ ] Add authenticated accounts and a production database.
- [ ] Synchronize saved hikes and itineraries across devices.
- [ ] Connect an email provider for newsletter and launch updates.
- [ ] Replace illustrative routes with verified map and route data.
- [ ] Add real community reviews, photographs, and trip contributions.
- [ ] Connect published mobile apps and a live membership flow.

## Author

**Nobonita Saha Niha**  
[GitHub: @NSniha](https://github.com/NSniha)

## Credits and References

- Visual direction is based on the supplied hiking landing-page reference; the mega footer was redesigned for this project.
- Temporary trail, collection, and avatar images were prepared from the supplied reference. Replace them with original high-resolution assets for the finished website.
- The temporary hero photograph is credited to [Gabi Lardi on Unsplash](https://unsplash.com/photos/HdLj1-ICOrg).
- [DM Sans](https://fonts.google.com/specimen/DM+Sans) is included with its [SIL Open Font License](./public/fonts/OFL.txt).
- Technology logo artwork is provided by [Devicon](https://github.com/devicons/devicon).
- [Next.js static-export documentation](https://nextjs.org/docs/app/guides/static-exports).
- [Motion for React documentation](https://motion.dev/docs/react).
- [Lucide React documentation](https://lucide.dev/guide/packages/lucide-react).
