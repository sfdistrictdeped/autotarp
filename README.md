# AutoTarp v1.4
**Automated Tarpapel Maker — Printing Art Simplified**

Public, browser-based poster tiling tool for San Fernando District and other educators.

## Publish on GitHub Pages

1. Create or open the GitHub repository intended for AutoTarp.
2. Upload the *contents* of this package (not the enclosing folder) to the repository root:
   - `index.html`
   - `AutoTarp.html`
   - `manifest.json`
   - `service-worker.js`
   - `assets/` (including all images)
3. Commit the files to the default branch.
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the default branch (usually `main`) and the `/(root)` folder, then save.
7. Wait for GitHub Pages to publish the site. Open the URL shown in Settings → Pages.
8. Test on both desktop and mobile. Install the PWA from the browser menu if offered.

## Important
- GitHub Pages is static hosting; no server or database is required for poster generation.
- Image processing, tiling, PDF generation and browser printing happen in the visitor's browser.
- The service worker/PWA install and offline cache require HTTPS, which GitHub Pages provides.
- When publishing under a repository path, keep all asset and service-worker paths relative (`./` or `assets/...`) so the app works at `https://<account>.github.io/<repository>/`.
- After updates, bump the service-worker cache name to invalidate cached app files.
- Browser printing is sensitive to browser/printer-driver settings. Confirm paper size and Actual Size / 100%, and test a sheet before printing a full poster.

## Release notes
- Home screen: removed the duplicate district developer line; the complete developer attribution remains in About.
- Theme switch is now at the upper-right of both the home screen and Poster Layout screen. The selected theme is remembered on the device.
- Changelog now lists releases from v1.4 back to Beta 0.1.0.

## Credits
### App Developers / Concept
- Robert G. Nicolas — Administrative Officer II
- Vincent L. Bergantin — Administrative Officer II

### Testers
- Rey B. Cantonjos — Administrative Officer II
- Fermar R. Danao — Administrative Officer II

**Coding:** ChatGPT  
**Developed by:** San Fernando District ICT and ISM Team  
**2026 San Fernando District ICT and ISM Innovation.**


## v1.0 quality-of-life features
- Smart poster summary with sheet count and approximate assembled dimensions
- Local saved presets and remembered light/dark theme
- Undo/redo for configuration changes
- Fit artwork to a single sheet
- Independent custom margin fields for workflow reference
- Image-resolution warnings
- Numbered assembly guide with downloadable text instructions
- Keyboard shortcuts and clearer upload/storage errors

Presets and theme preference are stored locally in the current browser. Do not clear browser site data if you want to retain them. The core PDF export and browser-print paths remain the existing tested implementation.


## Automatic updates (v1.4)

When hosted over HTTPS, AutoTarp checks for a service-worker update on app load, when the app becomes visible, and when the device reconnects. If a new version is installed while an older one is active, a notification offers **Reload to update**. Users can dismiss it and continue using the current session. Browser scheduling and network availability can affect when an update is detected.


## Version 1.4 update
- Default tile overlap is 25.4 mm (1 inch) per adjoining edge.
- Tile overlap remains adjustable in Print & Export settings (0–50 mm).
- Changelog entries identify update type with red Initial Release, green Minor Update, and blue Major Update labels.
- Includes UI workflow, preview/print geometry, image selection, clarity-warning, and quality-of-life fixes.


## v1.4.1 print-margin adjustment
- Default printer margin changed to 25.4 mm (1 inch) to provide a wider white gluing border.
- Adjustable printer margin range increased to 0–40 mm.
- Tile overlap remains a separate adjustable setting (default 25.4 mm); it controls repeated image area, not the white border.
- Service-worker cache bumped to v1-4-7.
