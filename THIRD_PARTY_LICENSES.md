# Third-party components

Local Backup bundles the following runtime dependencies under `vendor/`.
Their licenses apply to those components only; the plugin itself is [0BSD](LICENSE).

## 7z-wasm

- **Purpose:** Create/open 7z archives; restore RAR and some compressed formats
- **Location:** `vendor/7z-wasm/`
- **Upstream:** https://github.com/use-strict/7z-wasm
- **License:** See `vendor/7z-wasm/License.txt` and `vendor/7z-wasm/unRarLicense.txt`

## compressjs

- **Purpose:** BZIP2 compression and decompression for `.tar.bz2` backups
- **Location:** `vendor/compressjs/`
- **Upstream:** https://github.com/cscott/compressjs
- **License:** See `vendor/compressjs/LICENSE.txt` (LGPL/GPL — read before redistribution)

## amdefine

- **Purpose:** Runtime dependency required by compressjs module loading
- **Location:** `vendor/node_modules/amdefine/`
- **Upstream:** https://github.com/jrburke/amdefine
- **License:** BSD-3-Clause or MIT (see package in vendor folder)

## Other libraries (bundled into main.js)

These are compiled into `main.js` at build time and are not shipped as separate files:

| Package    | Purpose              | License   |
|-----------|----------------------|-----------|
| adm-zip   | ZIP read/write       | MIT       |
| tar-stream| TAR / GZIP packing   | MIT       |

See `package.json` in the source repository for full development dependencies.
