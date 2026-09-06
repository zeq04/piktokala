# PIKTOKala — Photography Club Website

A single-page site for the Photography &amp; Cinematography Club of Assam Skill
University, built from your club's PPTX deck (logo, team photos, event
photos, campus gallery, QR codes, and copy all pulled from the slides).

No build step, no dependencies — just HTML, CSS and JS. Open `index.html`
in any browser to preview it locally.

## File structure

```
site/
├── index.html      → all page content
├── style.css       → design system + animations
├── script.js       → shutter intro, scroll reveals, nav, cursor, etc.
└── assets/         → logo, team photos, event photos, gallery, QR codes
```

## Publish it free on GitHub Pages

1. **Create a repository.** On github.com, click **New repository**.
   Name it anything — e.g. `piktokala-site`. Keep it Public (required for
   free GitHub Pages on a personal account). Don't add a README/gitignore
   from GitHub's side, since you already have files.

2. **Upload the files.** Easiest way if you don't use git day-to-day:
   - Open your new repo → **Add file → Upload files**.
   - Drag in `index.html`, `style.css`, `script.js`, and the whole
     `assets` folder (drag the folder in as-is — GitHub preserves the
     folder structure).
   - Commit the upload.

   Or with git from your machine:
   ```bash
   git init
   git add .
   git commit -m "PIKTOKala site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/piktokala-site.git
   git push -u origin main
   ```

3. **Turn on Pages.** In the repo: **Settings → Pages** (left sidebar,
   under "Code and automation"). Under **Build and deployment → Source**,
   choose **Deploy from a branch**. Under **Branch**, choose `main` and
   `/ (root)`, then **Save**.

4. **Wait ~1 minute**, then refresh that Settings → Pages screen — GitHub
   shows the live URL at the top, in the form:
   ```
   https://<your-username>.github.io/piktokala-site/
   ```
   That's it — it's live, free, and there's no realistic storage limit a
   club site like this will ever hit.

5. **Custom domain (optional).** If the club ever gets its own domain,
   add it in the same Settings → Pages screen under "Custom domain," and
   point the domain's DNS at GitHub Pages per
   [GitHub's custom domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Updating content later

- **Swap a photo:** replace the file in `assets/` with the same filename,
  or update the `src="assets/..."` path in `index.html`.
- **Edit team roster / bios:** search `index.html` for `id="team"`.
- **Change WhatsApp/Instagram QR codes:** replace
  `assets/qr-whatsapp.jpg` / `assets/qr-instagram.jpg`.
- Any change you push to the `main` branch redeploys automatically within
  about a minute.

## What's inside, design-wise

- **Palette:** near-black + off-white with a darkroom amber/crimson accent
  (no stock "AI cream" palette).
- **Type:** Anton (bold display headlines), Work Sans (body), JetBrains
  Mono (EXIF-style labels/captions) — loaded from Google Fonts.
- **Signature interaction:** photos sit desaturated at rest and "develop"
  into full colour on hover, like a print coming up in a darkroom tray.
- **Other motion:** a camera-shutter iris intro on load, a scrolling
  35mm film-strip gallery with sprocket holes, a breathing aperture ring
  behind the hero logo, scroll-triggered reveals, and a custom lens-ring
  cursor on desktop. All motion respects `prefers-reduced-motion`.
