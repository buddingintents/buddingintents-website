# Budding Intents — Astro + Cloudflare Pages

A redesigned solo studio website with light/dark themes, two app detail pages, Blogger/GitHub links, contact form integration, and a Decap browser editor. No paid theme or CMS subscription is required. Domain renewals remain payable. Free providers impose usage limits and may change their plans.

## What works in this package
- Static Astro pages, responsive styles, persistent theme toggle, working external links.
- Decap content schema for homepage/about/contact information and all app entries.
- Cloudflare Pages Functions for GitHub OAuth (state cookie, exact-origin popup messaging, server-side client secret).
- Formspree submission integration with validation, success/error states. Without an endpoint it reports that it is not connected; it never pretends to send.

## Run locally
Requires Node 22.12+ (tested on Node 24).

    npm ci
    npm run dev

Build: `npm run build`. Output: `dist`. The Pages OAuth functions run on Cloudflare, not Astro's local static server.

## Publish to your Cloudflare account
1. Create a PUBLIC GitHub repository, for example `buddingintents/website`. Upload the project contents, excluding node_modules, dist, .env, and .dev.vars. The OAuth implementation intentionally requests public_repo scope; use this documented public repository setup.
2. In Cloudflare: Workers & Pages > Create application > Pages > Connect to Git. Choose the repository and main branch.
3. Build command: `npm run build`. Output directory: `dist`. Set NODE_VERSION to `24`. Keep the root `functions` folder in the repository; Cloudflare builds the OAuth functions during deployment.
4. Add build environment variables: PUBLIC_CMS_REPO=your-owner/your-repo, PUBLIC_SITE_URL=https://your-project.pages.dev (use the actual initial deployment hostname), PUBLIC_FORMSPREE_ID=your form ID. See `.env.example`.
5. Deploy and review the pages.dev version. Leave the existing website online until the new site is verified.
6. Add www.buddingintents.com through Pages > Custom domains and follow Cloudflare's DNS instructions. For the root buddingintents.com, follow Cloudflare's apex-domain requirements. Preserve existing email/MX records. Choose one canonical host and configure the other to redirect to it.
7. Set PUBLIC_SITE_URL and SITE_ORIGIN to the canonical HTTPS origin, update the GitHub OAuth callback, and redeploy. astro.config.mjs already uses https://www.buddingintents.com as the canonical URL; change it if choosing another canonical host.

## Activate the browser editor (one-time account setup)
1. In GitHub Settings > Developer settings > OAuth Apps, create an OAuth app.
2. Homepage URL: your canonical site origin. Callback URL: https://YOUR_HOST/api/callback.
3. In Cloudflare Pages settings add GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET (encrypted secret), and SITE_ORIGIN=https://YOUR_HOST as runtime environment variables. Never use PUBLIC_ for the secret. Set production values only; do not give untrusted preview builds production credentials.
4. Redeploy. Visit `/admin/` on the exact configured origin and sign in using your GitHub account with repository write access.
5. Edit Website > Studio content, save/publish. Decap commits the changes; Cloudflare rebuilds the site. Allow the build to complete before expecting public changes.
6. Validate one harmless edit end-to-end before launching. GitHub authorization has public-repository access; review the consent screen and use an account appropriate for managing this site.

The editor supports the supplied structured content. Layout/style changes remain code changes. App URL slugs should be kept stable after launch or old URLs redirected.

## Activate the form
Create a free Formspree account and form, verify your destination email, and copy its form ID into PUBLIC_FORMSPREE_ID. Redeploy. Enable the provider's spam protection. Submit a real test message and verify delivery before launch. The currently documented free quota is 50 submissions/month. Do not upgrade or add billing to keep spending at zero. If you need a larger allowance, reconsider the provider before launch.

## Content review before launch
- User confirmed solo studio, both apps, theme toggle, editor, form, and Blogger links.
- Both app listing URLs were checked. No download counts, star ratings, or unsupported privacy/offline promises are displayed.
- This first version links the Blogger archive rather than migrating article content. GitHub links cover experiments. Photography assets were not supplied; no stock images are presented as the owner's photography.
- Text wordmark is not represented as a registered trademark.
- Replace/approve app descriptions and website privacy text; app privacy URLs remain the responsibility of each existing Play listing.
- Contact destination defaults to buddingintents@gmail.com from the existing site. Confirm it in your Formspree account.

## Verification and limits
Build and automated browser checks are recorded in CHECKS.md. Live Cloudflare deployment, DNS, OAuth consent/login, CMS commit/rebuild, and actual contact delivery require your accounts and are not claimed as tested here.

Sources: https://docs.astro.build/ ; https://developers.cloudflare.com/pages/ ; https://decapcms.org/docs/github-backend/ ; https://formspree.io/plans
