# Дуу Таа

A Mongolian song guessing game. Listen to a tiny clip, guess the song in 6 tries.

## 1. Build songs.json

Each artist's top 5 songs are their most viewed songs on YouTube. Only uploads credited to that artist count ("Artist - Title" or the artist's own channel). For each song the script prefers the "Artist - Topic" upload, then "Official Audio", then the official music video.

```bash
brew install ffmpeg
cd ~/mongolian-songless
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python build_songs.py
```

Useful options:

| Command | What it does |
|---|---|
| `python build_songs.py --only "Rokit Bay"` | Rebuild one artist and keep everything else |
| `python build_songs.py --table` | Print the review table again without downloading anything |

Each line of `artists.txt` is `Name | other spellings | extra channels`. The last two parts are optional:

```
Morningstar | mxrningstar, Morning Star
168 | | Harmaf
```

Other spellings are names the artist is credited under in video titles. Extra channels are channels that upload the artist's songs (labels etc.), for example `Harmaf` for 168.

If YouTube blocks downloads ("sign in to confirm you're not a bot"), copy `.env.example` to `.env` and set `YTDLP_COOKIES_BROWSER=chrome` (or `safari`, `firefox`).

## 2. Review songs.json

Each song is one line. Check every song marked `!!` in the table (and `"needsCheck": true` in the file). Click its link: it opens YouTube at the start time.

To fix a song by hand, edit `songs.json`:

- `startSeconds`: where the clip starts (decimals are fine, e.g. `12.35`)
- `youtubeId`: the part after `v=` in a YouTube link
- `"needsCheck": false` once it's checked
- `"locked": true` so later runs of the script never overwrite it
- `"disabled": true` to hide a song from the game without deleting it

## 3. Test locally

```bash
python3 -m http.server 8000
```

Open http://localhost:8000. Opening `index.html` directly from Finder won't work because the browser blocks loading `songs.json` from a file.

## 4. Publish on GitHub Pages

```bash
git init
git add index.html style.css app.js songs.json README.md artists.txt build_songs.py requirements.txt .env.example .gitignore
git commit -m "First version"
git branch -M main
git remote add origin https://github.com/YOUR_NAME/duu-taa.git
git push -u origin main
```

On GitHub: repository → Settings → Pages → Source: "Deploy from a branch" → Branch `main`, folder `/ (root)` → Save. The site goes live at `https://YOUR_NAME.github.io/duu-taa/` within a minute or two.

Never commit `.env`. It's already in `.gitignore`.

## Settings

At the top of `app.js`, `CONFIG` holds the game name, the launch date (daily #1), and the timezone used for the daily switch (UTC+8, Ulaanbaatar).
