# Hi, I'm Gowtham 👋

**Member of Technical Staff @ [veaiinc](https://github.com/veaiinc)** · Building [Ve Browser](https://github.com/ve-browser)

I build production-ready systems end to end — backend services, infrastructure, AI systems, and web/mobile/desktop apps (Windows & macOS).

### Tech Stack

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Electron](https://img.shields.io/badge/Electron-47848F?style=for-the-badge&logo=electron&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

### Reach me

- LinkedIn: [gowtham-kasala](https://linkedin.com/in/gowtham-kasala)
-  X: [@gowthamkasala](https://x.com/gowthamkasala)
-   GitHub: [@gowthamkasala](https://github.com/gowthamkasala)


## Personal website

The working website is implemented in this checkout with Next.js App Router, React and TypeScript. It was rebuilt directly from the supplied brief after the fleet integration failed; it does not import the inaccessible worker checkpoints.

```sh
npm ci
npm run dev -- --hostname 127.0.0.1 --port 55000
```

Open http://127.0.0.1:55000. The Ve Run configuration uses the workspace’s allocated `VE_PORT` instead of a fixed port.

Production checks: `npm run typecheck` and `npm run build`; serve a production build with `npm start`.

Content lives in `src/data/projects.ts` and `src/data/research.ts`. Identity and links are configured in `src/data/site.ts`. Copy `.env.example` to `.env.local` to supply a real `SITE_URL` (public HTTPS origin), `CONTACT_EMAIL` or `RESUME_URL` (HTTPS URL or root-relative asset path). Missing settings produce no contact links or invented canonical/sitemap hosts. Fonts and their licenses are self-hosted in `public/fonts`.

The research section distinguishes ongoing experiments from established work. No unpublished notes are presented as real articles.

### Vercel deployment

This checkout links to `gowtham-personal-lab` in the `gowthams-projects-2e07a776` Vercel team. Deploy with `vercel --prod`. On Vercel, the site's canonical URL, sitemap and social metadata use the platform-provided `VERCEL_PROJECT_PRODUCTION_URL` when no custom `SITE_URL` is configured. Set `SITE_URL` explicitly when attaching another public domain.

Local Vercel linkage and credentials are ignored by Git and excluded from deployment uploads. GitHub pushes use the current workspace branch; CLI production deployments do not merge that branch into `main`.
