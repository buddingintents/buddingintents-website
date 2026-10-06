# Validation — 6 October 2026

Passed:
- Astro production build: six pages plus editor configuration endpoint.
- Headless Chromium: homepage and both product pages, contact and privacy routes load without page JavaScript errors.
- 390px viewport: no horizontal overflow on these five routes.
- Theme toggle persists after reload.
- Contact form with missing endpoint explicitly reports unavailable; no false success state.
- Decap editor loads and displays Login with GitHub, without page JavaScript errors.
- OAuth function returns 503 without configuration, sets an HttpOnly state cookie when configured, and rejects a callback without a matching state cookie.
- Desktop light-theme screenshot visually inspected; light/dark screenshots included separately.

Not yet verified (requires owner accounts):
- GitHub OAuth completion and repository access.
- CMS edit -> Git commit -> Cloudflare rebuild.
- Real Formspree delivery, spam controls, and notification email.
- Cloudflare deployment, redirects, DNS, TLS, and custom domain.

Do not replace the live website until the account-dependent checks pass.
