# Venkat Gopi Namburi — Portfolio

Interactive 3D portfolio: React 18 + Vite + Tailwind + GSAP + Three.js. Version 1.0.0.

## Run
```bash
npm ci
npm run dev       # http://localhost:5173
npm run build     # static output in dist/
```

## Edit content
Everything (bio, experience, skills, certification link) lives in `src/data/profile.js`.
Photo: `public/img/gopi.webp`.

## Deploy
- **Docker:** `docker build -t gopi-portfolio . && docker run -p 8080:80 gopi-portfolio`
- **Vercel:** import the repo; `vercel.json` is already set.
- **AWS:** upload `dist/` to a private S3 bucket behind CloudFront (OAC), SPA fallback to `index.html`.
