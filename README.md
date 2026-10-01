# CloudStream-style Stremio addon — legal/public-domain template

This is a working Node.js Stremio addon template.

## Run

1. Install Node.js.
2. Open this folder in a terminal.
3. Run:

   npm install
   npm start

4. In Stremio, install:
   http://127.0.0.1:7000/manifest.json

For remote installation, the addon must be publicly reachable over HTTPS.

## Adding more legal providers

Edit `addon.js` and add entries to `PUBLIC_DOMAIN`.

Each item can contain multiple legal stream URLs. Stremio will display them as separate sources.

Do not add third-party copyrighted streams unless you have the rights/permission to redistribute them.

## Architecture

CloudStream providers and Stremio addons use different APIs. This project is the Stremio side of a bridge: provider-specific adapters can be added later for sources that are legally usable.
