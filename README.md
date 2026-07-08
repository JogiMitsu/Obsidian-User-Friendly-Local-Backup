# User-Friendly Local Backup for Obsidian

**Automatic, fully local vault backups — no cloud, no telemetry, no external tools.**

[![Obsidian Desktop](https://img.shields.io/badge/Obsidian-Desktop%20only-7c3aed)](https://obsidian.md)
[![Version](https://img.shields.io/badge/version-1.0.0-blue)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-0BSD-green)](LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-JogiMitsu-181717)](https://github.com/JogiMitsu/Obsidian-User-Friendly-Local-Backup)

User-Friendly Local Backup keeps a time-stamped archive of your entire Obsidian vault on disk, on a schedule you control. Everything runs inside Obsidian: read your vault, write an archive to a folder you choose, optionally encrypt it, and restore when you need to. **Your notes never leave your machine.**


**Repository:** [github.com/JogiMitsu/Obsidian-User-Friendly-Local-Backup](https://github.com/JogiMitsu/Obsidian-User-Friendly-Local-Backup)

---

## Why User-Friendly Local Backup?

| | |
|---|---|
| **100% offline** | No network requests, no analytics, no third-party services |
| **You own the files** | Standard archive formats open in any normal tool |
| **Set and forget** | Startup, interval, and quit triggers with smart skip-if-unchanged |
| **Restore with confidence** | Browse archives, pick files, restore safely or in-place |
| **Desktop-native** | Folder pickers, file-manager reveal, OS keychain for passwords |

---

## Screenshots

> Add screenshots here before publishing (settings status panel, restore tree view, history sidebar).

---

## Quick start

1. [Install](#installation) the plugin into `.obsidian/plugins/user-friendly-local-backup/`.
2. Enable **User-Friendly Local Backup** in **Settings → Community plugins**.
3. Open **Settings → User-Friendly Local Backup**.
4. Set your **output folder** (or leave empty to save next to the vault).
5. Enable triggers: **startup**, **interval**, and/or **quit**.
6. Run **Back up vault now** from the command palette or ribbon icon.

See [INSTALL.md](INSTALL.md) for detailed installation steps.

---

## Features

### Automatic backups

- **On startup** — deferred so Obsidian launch is never blocked
- **On interval** — repeating timer while Obsidian is open
- **On quit** — best-effort backup when you close the app
- **Skip if unchanged** — no duplicate archives when nothing changed

### Manual backups

- **Back up now** — ribbon icon, status bar click, or command palette
- **Named backups** — one-off archives with a custom name; **never auto-deleted**
- **Live progress** — status bar progress bar with phase, percentage, and file count

### Archive formats

| Format | Extension | Create | Restore | Notes |
|--------|-----------|:------:|:-------:|-------|
| **ZIP** | `.zip` | ✓ | ✓ | Default; widest compatibility |
| **TAR** | `.tar` | ✓ | ✓ | Uncompressed |
| **GZIP** | `.tar.gz` | ✓ | ✓ | Good balance of size and speed |
| **BZIP2** | `.tar.bz2` | ✓ | ✓ | Smaller files, slower compression |
| **7z** | `.7z` | ✓ | ✓ | High compression |
| **RAR** | `.rar` | — | ✓ | Restore only (proprietary format) |

All formats support optional **AES-256-GCM encryption** (`.enc` suffix, e.g. `.zip.enc`).

**ZIP options:** `deflate` (smaller) or `store` (fastest — ideal for vaults with already-compressed media).

### Restore

- Pick any backup from your output folder
- **Tree view** — collapsible folders, tri-state folder checkboxes
- **Flat list** — searchable, paginated (200 entries per page)
- **Hide hidden files** by default (`.obsidian`, dotfiles); toggle to reveal
- **New folder (default)** — safe extract beside your vault
- **In place** — overwrite vault paths with safety backup + confirmation
- Encrypted backups: enter password in the restore dialog

### Output & redundancy

- **Per-OS output folders** with native **Browse…** picker
- **Secondary backup (USB / external)** — mirror each finished archive
- Primary always succeeds first; failed USB copy does not undo local backup
- Optional retention on secondary folder (off by default)

### Retention & lifecycle

- **Simple** — keep N days + max N per calendar day
- **GFS** — grandfather–father–son tiers (hourly / daily / weekly / monthly / yearly)
- **Total count** and **total size (MB)** caps
- **Named backups always protected**
- Cleanup only removes this plugin's own backup filenames

### Filtering

Comma-separated wildcard patterns (`*`, `?`) on vault-relative paths:

| Goal | Included paths | Excluded paths |
|------|----------------|----------------|
| Config only | `.obsidian` | *(empty)* |
| Selected content | `.obsidian, Templates, *.canvas` | *(empty)* |
| Everything except heavy paths | *(empty)* | `.git, .trash, node_modules, *.mp4` |

### Encryption

- Optional **AES-256-GCM** with **scrypt** key derivation
- **Open format** — documented layout; standalone decryptor included
- Password in **Obsidian Keychain** or OS keychain when available
- Scheduled backups work unattended once the password is stored securely

### Awareness & history

- **Status panel** — last run, scope estimate, keychain status
- **Stale reminders** — status bar highlight after N days without backup
- **Backup history** — last 25 runs (sidebar or separate window)
- **Backup browser** — search, sort, reveal, restore, delete per archive

### Safety & reliability

- Output folder auto-excluded when inside the vault
- Free disk space check before writing
- Post-write integrity verification
- Configurable retries; async compression (UI stays responsive)
- Actionable notices with **Reveal** and **Open folder**

---

## Commands

| Command | Action |
|---------|--------|
| **Back up vault now** | Immediate full backup |
| **Create named backup** | One-off backup (retention-safe) |
| **Restore from backup** | Pick archive → browse → restore |
| **Open backup history** | Sidebar history panel |
| **Open backup history in new window** | Detached history view |
| **Close backup history** | Close history panel |

### Ribbon icons

| Icon | Action |
|------|--------|
| Archive | Run backup now |
| Archive restore | Open restore dialog |
| History | Open backup history |

### Status bar

Shows last backup time and next interval due. **Click to back up now.**

### File naming

Customize in **File name format**:

- `{vault}` — vault folder name
- `%Y %m %d %H %M %S` — date/time tokens

Example: `{vault}-Backup-%Y_%m_%d-%H_%M_%S` → `MyVault-Backup-2026_07_08-00_30_00.zip`

---

## Installation

Download **`user-friendly-local-backup-1.0.0.zip`** from [Releases](https://github.com/JogiMitsu/Obsidian-User-Friendly-Local-Backup/releases), extract `user-friendly-local-backup` into:

```
<your-vault>/.obsidian/plugins/user-friendly-local-backup/
```

Enable the plugin in Obsidian. Full instructions: [INSTALL.md](INSTALL.md).

> The `vendor/` folder is required for BZIP2, 7z, and RAR. Do not install only `main.js` + `manifest.json`.

---

## Decrypting backups outside Obsidian

```bash
LB_PASSWORD=yourpass node scripts/decrypt.mjs "Vault-Backup-....zip.enc" out.zip
# or omit LB_PASSWORD to be prompted:
node scripts/decrypt.mjs "Vault-Backup-....zip.enc"
```

Works for any encrypted format (`.zip.enc`, `.7z.enc`, `.tar.gz.enc`, etc.). Open the result with any standard archive tool.

### Encryption container format

```
magic  : 6 bytes  ASCII "LBENC1"
version: 1 byte   0x01
salt   : 16 bytes scrypt salt
iv     : 12 bytes AES-GCM nonce
tag    : 16 bytes AES-GCM authentication tag
data   : N bytes  AES-256-GCM ciphertext of the archive
```

Key derivation: `scrypt(password, salt, N=16384, r=8, p=1)` → 32-byte AES key.

---

## Linux (XFCE, KDE / KWallet, Manjaro, etc.)

Electron does not always auto-detect a secret store. If settings show the OS keychain as unavailable:

**XFCE (recommended):** gnome-keyring + libsecret

```bash
sudo pacman -S gnome-keyring libsecret   # Manjaro/Arch
obsidian --password-store=gnome-libsecret
```

**KWallet:** unlock the wallet, then:

```bash
obsidian --password-store=kwallet5   # or kwallet6
```

After the backend works, use **Retry keychain storage** in plugin settings, or toggle encryption off and on again.

> Passwords stored via Obsidian Keychain may not appear in Seahorse — that is expected.

---

## Privacy

- Reads only vault files (respecting include/exclude rules)
- Writes only to folders you configure
- Never spawns shell commands or external archivers
- Retention deletes only auto-generated backups matching this plugin's naming pattern

Your backups are ordinary files — copy them to USB, NAS, or cloud storage on your own terms.

---

## Requirements

| | |
|---|---|
| Platform | Obsidian **Desktop** (Windows, macOS, Linux) |
| Obsidian | **1.7.2+** (1.11.4+ for Obsidian Keychain) |
| Mobile | Not supported |

---

## Development

Source code and build tooling are maintained separately. To build from source:

```bash
git clone https://github.com/JogiMitsu/Obsidian-User-Friendly-Local-Backup.git
cd Obsidian-User-Friendly-Local-Backup
npm install
npm run build    # produces main.js + vendor/
npm test
npm run lint
```

To assemble the release bundle:

```bash
bash scripts/prepare-release.sh
```

---

## Third-party licenses

Runtime WASM/JS dependencies are bundled under `vendor/`. See [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md).

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

---

## License

[0BSD](LICENSE) — use freely, no attribution required.

---

## Author

**[JogiMitsu](https://github.com/JogiMitsu)**

If this plugin saves your notes someday, consider starring the repo or opening an issue with feedback.
https://buymeacoffee.com/jogimitsu
Support is also appreciated :) 
