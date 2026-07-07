# Publishing v1.0.0 to GitHub

Repository: **[JogiMitsu/Obsidian-User-Friendly-Local-Backup](https://github.com/JogiMitsu/Obsidian-User-Friendly-Local-Backup)**

## What is in this folder

```
Obsidian-User-Friendly-Local-Backup/
├── README.md
├── CHANGELOG.md
├── INSTALL.md
├── LICENSE
├── THIRD_PARTY_LICENSES.md
├── PUBLISH.md
├── .gitignore
├── obsidian-user-friendly-local-backup-1.0.0.zip   # GitHub Release asset
└── obsidian-user-friendly-local-backup/             # Plugin install bundle
```

## Plugin identifiers

| Field | Value |
|-------|-------|
| GitHub repo | `JogiMitsu/Obsidian-User-Friendly-Local-Backup` |
| Plugin id | `obsidian-user-friendly-local-backup` |
| Plugin name | `User-Friendly Local Backup` |
| Author | `JogiMitsu` |
| Install path | `.obsidian/plugins/obsidian-user-friendly-local-backup/` |

## Upload to GitHub

```bash
cd /home/nax112qq/Obsidian-User-Friendly-Local-Backup
git init
git add README.md CHANGELOG.md INSTALL.md LICENSE THIRD_PARTY_LICENSES.md PUBLISH.md .gitignore
git add obsidian-user-friendly-local-backup/
git commit -m "Release v1.0.0 — User-Friendly Local Backup for Obsidian"
git branch -M main
git remote add origin https://github.com/JogiMitsu/Obsidian-User-Friendly-Local-Backup.git
git push -u origin main
```

> The zip file is for **GitHub Releases** only — attach it when publishing `v1.0.0`, do not commit large binaries unless you prefer that workflow.

## Create the GitHub Release

1. **GitHub → Releases → Draft a new release**
2. Tag: `v1.0.0`
3. Title: `User-Friendly Local Backup v1.0.0`
4. Description: copy the **1.0.0** section from [CHANGELOG.md](CHANGELOG.md)
5. Attach: **`obsidian-user-friendly-local-backup-1.0.0.zip`**
6. Publish

## User install summary (for release notes)

```text
1. Download obsidian-user-friendly-local-backup-1.0.0.zip
2. Extract into: <vault>/.obsidian/plugins/obsidian-user-friendly-local-backup/
3. Enable "User-Friendly Local Backup" in Obsidian settings
```

## Rebuild this bundle

From the development plugin source:

```bash
bash scripts/prepare-release.sh
```

Output: `/home/nax112qq/Obsidian-User-Friendly-Local-Backup/`
