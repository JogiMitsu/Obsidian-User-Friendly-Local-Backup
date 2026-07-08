# Installing User-Friendly Local Backup

## Requirements

- **Obsidian Desktop** (Windows, macOS, or Linux)
- **Obsidian 1.7.2+** (1.11.4+ recommended for Obsidian Keychain password storage)
- Not supported on mobile

## Option A — Download from GitHub Release (recommended)

1. Open the [latest release](https://github.com/JogiMitsu/Obsidian-User-Friendly-Local-Backup/releases/latest).
2. Download **`user-friendly-local-backup-1.0.0.zip`**.
3. Extract the `user-friendly-local-backup` folder into your vault:

   ```
   <your-vault>/.obsidian/plugins/user-friendly-local-backup/
   ```

4. In Obsidian: **Settings → Community plugins → Installed plugins → Enable** “User-Friendly Local Backup”.
5. Open **Settings → User-Friendly Local Backup** and configure your output folder and triggers.

### Expected folder layout after install

```
.obsidian/plugins/user-friendly-local-backup/
├── main.js
├── manifest.json
├── styles.css
├── versions.json
├── vendor/
│   ├── 7z-wasm/          # 7z and RAR support
│   ├── compressjs/       # BZIP2 support
│   └── node_modules/
│       └── amdefine/     # compressjs runtime dependency
└── scripts/
    └── decrypt.mjs       # optional: decrypt .enc backups outside Obsidian
```

> **Important:** The `vendor/` folder is required for **BZIP2**, **7z**, and **RAR** restore. Do not install only `main.js` and `manifest.json`.

The plugin **id** in `manifest.json` is `user-friendly-local-backup` — the folder name must match exactly.

## Option B — Clone this repository

Install the bundled plugin folder from this repo:

```bash
git clone https://github.com/JogiMitsu/Obsidian-User-Friendly-Local-Backup.git
cp -r Obsidian-User-Friendly-Local-Backup/user-friendly-local-backup \
  "<your-vault>/.obsidian/plugins/user-friendly-local-backup"
```

Then enable the plugin in Obsidian.

## Option C — Build from source (developers)

If the repository includes source code:

```bash
git clone https://github.com/JogiMitsu/Obsidian-User-Friendly-Local-Backup.git
cd Obsidian-User-Friendly-Local-Backup
npm install
npm run build
bash scripts/prepare-release.sh
cp -r /home/nax112qq/Obsidian-User-Friendly-Local-Backup/user-friendly-local-backup \
  "<your-vault>/.obsidian/plugins/user-friendly-local-backup"
```

## First-time setup

1. Set your **output folder** (or leave empty to save next to the vault).
2. Choose an **archive format** (ZIP is the safest default).
3. Enable at least one trigger: **startup**, **interval**, or **quit**.
4. Run **Back up vault now** from the command palette to verify.
5. Optionally enable **encryption** and configure retention.

## Linux keychain note

On XFCE and some Linux desktops, encryption passwords may fall back to plaintext unless a keychain backend is configured. See the main [README](README.md#linux-xfce-kde--kwallet-manjaro-etc) for `gnome-keyring` / KWallet setup.

## Updating

1. Disable the plugin in Obsidian.
2. Replace the `user-friendly-local-backup` folder with the new release (keep `data.json` if present).
3. Re-enable the plugin.

Your settings in `.obsidian/plugins/user-friendly-local-backup/data.json` are preserved if you do not delete that file.

## Uninstalling

1. Disable the plugin in Obsidian.
2. Delete `.obsidian/plugins/user-friendly-local-backup/`.
3. Your backup archives in the output folder are **not** removed automatically.

## Migrating from a dev install (`Backup-plugin`)

If you previously used the development folder `Backup-plugin`:

1. Disable the old plugin.
2. Install `user-friendly-local-backup` as above.
3. Optionally copy `Backup-plugin/data.json` to `user-friendly-local-backup/data.json`.
4. Remove the old `Backup-plugin` folder.
