# PAWCAT / $PAWCAT — Ethereum Manga Website

A fully self-contained **single-page** static website based on the structure of the PAWCAT reference that the project owner provided. Original static HTML, CSS, JavaScript and locally bundled visual assets.

## Run locally

Run a lightweight local server (opening `index.html` directly often works, but a server is preferable):

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## Live site

**GitHub Pages:** https://neversmile0825.github.io/PAWCAT/

Repository: https://github.com/NeverSMILE0825/PAWCAT

Pushing to `main` republishes the site automatically (Pages source: `main` / root).

## Deploy

- **GitHub Pages:** already configured from `main` / repository root.
- **Netlify / other static hosts:** upload the root files with the `assets` directory intact.

## Site features

- Responsive, black-and-white hand-inked manga aesthetic.
- PAWCAT's cat-in-white-paw logo emphasized in the hero and art.
- 12 separate artwork tiles with working category filters, random meme feature, modal gallery, keyboard navigation and full image download.
- Single-page anchor navigation, lightweight transitions and reduced-motion support.
- Ethereum tokenomics prefilled: **1,000,000,000 supply**, **0% tax**, **Uniswap V3**, **LP lock planned**. No claim that LP lock has already occurred.
- CA displays **Coming Soon..** with an active Copy button. Change `#contractText` after contract deployment.
- X / Telegram placeholders use `#community` rather than unverified third-party social handles. Replace links after launching your official profiles.
- No Connect Wallet component.

## IMPORTANT before launch

1. Publish and verify the deployed Ethereum contract address.
2. Update contract address in `index.html`; replace any prelaunch text that is no longer accurate.
3. Update official X and Telegram URLs once created.
4. Publish actual LP locker details and on-chain proof *only after locking*.
5. Review and own licensing/usage rights for all meme imagery and PAWCAT name/symbol; site is not presented as an official continuation of any preexisting Solana token.

## Editing the gallery

All gallery data is in the `memes` array at the top of `app.js`. Images are in `assets/gallery_01.webp` through `gallery_12.webp`. Artwork opens uncropped (`object-fit:contain`) both as tiles and in the modal.

## Files

- `index.html` – markup and copy
- `styles.css` – theme, layouts, responsive design and animation
- `app.js` – gallery, modal, navigation, copy CA, accessibility
- `assets/` – optimized images and their source-resolution revisions

Artwork note: some gallery illustrations were generated in prior project steps and then reused; the five named revision PNGs are newly organized and print-textured. The fully transparent hero is isolated from the specific paw-and-cat image supplied by the project owner.
