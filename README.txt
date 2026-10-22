AUTOTARP STANDALONE PWA IDENTITY FIX

Files included:
- manifest.json
- service-worker.js

Deployment target:
https://sfdistrictdeped.github.io/autotarp/

Upload/replace these two files in the ROOT of the sfdistrictdeped/autotarp repository.
Keep the existing index.html and assets/ folder in place.

Important checks:
1. Confirm these files exist in the repo:
   /index.html
   /manifest.json
   /service-worker.js
   /assets/icon-192.png
   /assets/icon-512.png
   /assets/autotarp-logo.png
   /assets/san-fernando-district-logo.png
   /AutoTarp.html
2. If AutoTarp.html or any listed image does not exist, tell us before relying on this service worker: install precaching will fail if a listed app-shell file is missing. Remove any missing file from APP_SHELL in service-worker.js, or add the file.
3. Confirm index.html links to manifest.json and registers ./service-worker.js (or /autotarp/service-worker.js) with scope /autotarp/.
4. After deployment, visit https://sfdistrictdeped.github.io/autotarp/manifest.json and confirm id, start_url, and scope are all /autotarp/.
5. Uninstall the wrongly identified AutoTarp app, then install it again from the new URL. Do not choose Update on the prompt that appears to replace SFD OneDirectory.

The service worker uses a unique cache prefix and only handles requests under /autotarp/ so it does not intentionally manage SFD OneDirectory's cache or routes.
