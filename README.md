# David Khvedelidze – Portfolio

![Performance](badges/performance.svg) ![Accessibility](badges/accessibility.svg) ![Best Practices](badges/best-practices.svg) ![SEO](badges/seo.svg)

A minimalist, terminal‑styled portfolio showcasing my work, blog, and courses. Built with **React**, **TypeScript**, **Tailwind CSS**, and **Vite**.

## Quick Start
```sh
# Clone the repo
git clone https://github.com/khvedela/paris-angular-drive.git
cd paris-angular-drive

# Install dependencies (npm or bun)
npm install   # or bun install

# Run the dev server
npm run dev   # or bun dev
```
The site will be available at `http://localhost:5173`.

## Features
- **Subdomain routing** – `blog.devdavid.me` and `courses.devdavid.me` serve their own sections.
- **Back‑to‑Portfolio** links work correctly across subdomains.
- **Terminal UI** with custom cursor, mini‑games, and interactive commands.
- **Lighthouse CI** – performance, accessibility, best‑practice and SEO scores are displayed as badges above.

## Tech Stack
- **React 18** + **TypeScript**
- **Vite** for fast builds
- **Tailwind CSS** + **shadcn/ui** for styling
- **Framer Motion** for animations
- **Lighthouse CI** for automated performance monitoring

## Deploy
Deploy the `dist` folder to any static host (e.g., Cloudflare Pages). The `_routes.json` file ensures SPA routing works for all routes.

---

*Press `T` to open the terminal UI. Type `help` for commands.*
