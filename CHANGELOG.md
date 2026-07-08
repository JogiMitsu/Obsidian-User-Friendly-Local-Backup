# Changelog

All notable changes to **User-Friendly Local Backup** are documented here.

## [1.0.0] — 2026-07-08

First public release.

### Backup

- Automatic triggers: **startup**, **interval**, and **quit**
- Manual backup via ribbon icon, status bar, and command palette
- **Named backups** — custom one-off archives exempt from retention
- **Skip if unchanged** — automatic runs skip when vault scope is unchanged
- **Multiple archive formats**: ZIP (default), TAR, GZIP (`.tar.gz`), BZIP2 (`.tar.bz2`), 7z
- ZIP compression modes: **deflate** (smaller) or **store** (fastest)
- Custom file name template with `{vault}` and `%Y %m %d %H %M %S` tokens
- Include / exclude wildcard filters
- Live progress bar in the status bar (phase, percentage, file count)
- Configurable retries on failure

### Restore

- Restore from ZIP, TAR, GZIP, BZIP2, 7z, and RAR (restore-only)
- Tree and flat list views with search and pagination
- Select all, per-folder tri-state checkboxes, hide hidden files by default
- **New folder** restore (safe default) or **in-place** restore with safety backup
- Encrypted archive support in the restore dialog

### Output & redundancy

- Per-OS output folders (Windows / macOS/Linux) with native **Browse…** picker
- **Secondary backup** — mirror finished archives to USB/external drive
- Optional retention on secondary folder

### Retention

- **Simple** mode: keep N days + max N per calendar day
- **GFS** mode: grandfather–father–son tiers (hourly / daily / weekly / monthly / yearly)
- Universal total count and total size caps
- Named backups always protected; cleanup only touches this plugin's naming pattern

### Encryption

- Optional AES-256-GCM encryption (`.enc` suffix on any format)
- Open, documented container format
- Standalone `scripts/decrypt.mjs` included (Node built-ins only)
- Password stored in Obsidian Keychain or OS keychain when available

### UI & awareness

- Settings status panel with last run, scope estimate, and keychain status
- Backup browser: search, sort, reveal, restore, delete
- Backup history log (last 25 runs) in sidebar or separate window
- Stale-backup reminders (status bar highlight + optional notice)
- Actionable notices with **Reveal** and **Open folder** buttons

### Safety

- Output folder auto-excluded when inside the vault
- Free disk space check before writing
- Post-write archive integrity verification
- No network requests, no telemetry, no external archiver processes

[1.0.0]: https://github.com/JogiMitsu/Obsidian-User-Friendly-Local-Backup/releases/tag/1.0.0
