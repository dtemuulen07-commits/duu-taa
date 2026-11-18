import argparse
import difflib
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import unicodedata
from pathlib import Path

import numpy as np
import requests
from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parent
MAX_DURATION = 600
ANALYZE_SECONDS = 90
SONGS_PER_ARTIST = 5
ARTIST_QUERIES = ["{name}", "{name} official audio", "{name} official music video", "{name} mv"]

CYR = {
    "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "е": "ye", "ё": "yo", "ж": "j",
    "з": "z", "и": "i", "й": "i", "к": "k", "л": "l", "м": "m", "н": "n", "о": "o",
    "ө": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u", "ү": "u", "ф": "f",
    "х": "h", "ц": "ts", "ч": "ch", "ш": "sh", "щ": "sh", "ъ": "i", "ы": "ii", "ь": "i",
    "э": "e", "ю": "yu", "я": "ya", "ұ": "u", "і": "i",
}

BANNED = [
    "cover", "live", "remix", "karaoke", "караоке", "lyric", "lyrics", "instrumental",
    "sped up", "slowed", "reverb", "nightcore", "8d", "concert", "тоглолт", "амьд",
    "reaction", "tutorial", "минус", "minus", "acoustic version", "piano version",
    "fan made", "fanmade", "remake", "mashup", "bass boosted", "hour", "playlist",
    "full album", "mix", "medley", "teaser", "trailer", "behind the scenes", "interview",
    "ярилцлага", "podcast", "episode", "the voice", "дууны үг", "үгтэй", "boosted", "tiktok",
    "dance practice", "making film", "shorts",
]

NAME_SPLIT = re.compile(r"\s*(?:,|&|\+|×|\bx\b|\bft\b\.?|\bfeat\b\.?|\bfeaturing\b|\band\b|\bwith\b|\bvs\b\.?)\s*", re.IGNORECASE)
FEAT = re.compile(r"[\(\[]?\b(?:ft|feat|featuring)\b\.?\s+([^\)\]]+)[\)\]]?", re.IGNORECASE)


def translit(text):
    text = unicodedata.normalize("NFKC", text.lower())
    out = "".join(CYR.get(ch, ch) for ch in text)
    out = unicodedata.normalize("NFKD", out)
    return "".join(ch for ch in out if not unicodedata.combining(ch))


def loose(text):
    s = translit(text)
    s = s.replace("kh", "h").replace("x", "h").replace("ts", "c").replace("q", "o")
    s = s.replace("w", "u").replace("v", "u").replace("y", "i")
    s = re.sub(r"[^a-z0-9 ]+", " ", s)
    s = re.sub(r"(.)\1+", r"\1", s)
    return re.sub(r"\s+", " ", s).strip()


def slug(text):
    s = re.sub(r"[^a-z0-9]+", "-", translit(text)).strip("-")
    return s or "song"


def similarity(a, b):
    a, b = loose(a), loose(b)
    if not a or not b:
        return 0.0
    if a == b:
        return 1.0
    if len(a) >= 4 and len(b) >= 4 and (a in b or b in a):
        return 0.9
    return difflib.SequenceMatcher(None, a, b).ratio()


def clean_title(text):
    s = "".join(ch for ch in text if unicodedata.category(ch) not in ("So", "Sk", "Cs"))
    s = re.split(r"\s[|｜]\s|//|\s/\s", s)[0]
    s = re.sub(r"[\(\[\{].*?[\)\]\}]", " ", s)
    s = re.sub(r"/[^/]*/", " ", s)
    s = FEAT.sub(" ", s)
    s = re.sub(r"(?i)\bprod\b.*$", " ", s)
    s = re.sub(r"(?i)\b(official|audio|music|video|mv|m/v|hd|4k|visuali[sz]er|clip)\b", " ", s)
    s = re.sub(r"(?i)\bклип\b", " ", s)
    s = s.replace("“", "\"").replace("”", "\"").replace("«", "\"").replace("»", "\"")
    s = re.sub(r"\s+", " ", s).strip(" -–—|:\"'.,")
    if s and s.upper() == s and re.search(r"[A-Za-zА-Яа-яӨөҮү]", s):
        s = s.title()
    return s


def has_banned(title, allowed_title=""):
    c = title.lower()
    s = allowed_title.lower()
    for word in BANNED:
        pattern = r"(?<![a-zа-яөү0-9])" + re.escape(word) + r"(?![a-zа-яөү0-9])"
        if re.search(pattern, c) and not re.search(pattern, s):
            return True
    return False


def names_in(text):
    return {loose(n) for n in NAME_SPLIT.split(text) if loose(n)}


def parse_artists(path):
    items = []
    for raw in Path(path).read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        parts = [p.strip() for p in line.split("|")]
        aliases = [parts[0]]
        if len(parts) > 1:
            aliases += [a.strip() for a in parts[1].split(",") if a.strip()]
        channels = [c.strip() for c in parts[2].split(",") if c.strip()] if len(parts) > 2 else []
        items.append({
            "name": parts[0],
            "aliases": aliases,
            "keys": {loose(a) for a in aliases},
            "channels": channels,
            "channel_keys": {loose(c) for c in channels},
        })
    return items


def ydl_options(extra=None):
    opts = {"quiet": True, "no_warnings": True, "noplaylist": True}
    browser = os.getenv("YTDLP_COOKIES_BROWSER", "").strip()
    if browser:
        opts["cookiesfrombrowser"] = (browser,)
    if extra:
        opts.update(extra)
    return opts


def yt_search(query, count=30):
    import yt_dlp
    try:
        with yt_dlp.YoutubeDL(ydl_options({"extract_flat": True, "skip_download": True})) as ydl:
            info = ydl.extract_info(f"ytsearch{count}:{query}", download=False)
    except Exception as exc:
        print(f"      search failed for '{query}': {str(exc).splitlines()[0][:100]}")
        return []
    out = []
    for e in info.get("entries") or []:
        vid = e.get("id") or ""
        if len(vid) != 11 or not e.get("title"):
            continue
        out.append({
            "id": vid,
            "title": e.get("title") or "",
            "channel": e.get("channel") or e.get("uploader") or "",
            "views": e.get("view_count") or 0,
            "duration": e.get("duration") or 0,
        })
    return out


def classify(upload, artist):
    title = upload["title"]
    channel = upload["channel"]
    if upload["duration"] and upload["duration"] > MAX_DURATION:
        return None
    if upload["duration"] and upload["duration"] < 60:
        return None
    is_topic = channel.endswith(" - Topic")
    channel_name = channel[: -len(" - Topic")] if is_topic else channel
    flat = re.sub(r"\s+", " ", title).strip()
    parts = re.split(r"\s[-–—]\s", flat, maxsplit=1)
    if len(parts) == 2:
        credit, song = parts
    else:
        m = re.match(r"^(.+?)\s*[-–—]\s*(.+)$", flat)
        if m and names_in(m.group(1)) & artist["keys"]:
            credit, song = m.group(1), m.group(2)
        else:
            credit, song = channel_name, flat
    feats = set()
    for m in FEAT.finditer(song):
        feats |= names_in(m.group(1))
    credit_names = names_in(credit)
    primary = bool(credit_names & artist["keys"])
    featured = bool(feats & artist["keys"])
    if not primary and not featured:
        return None
    display = clean_title(song)
    if not display or loose(display) in artist["keys"]:
        return None
    if has_banned(title, display):
        return None
    channel_key = loose(channel_name)
    own_channel = (
        channel_key in artist["keys"]
        or channel_key in artist["channel_keys"]
        or any(k and k in channel_key for k in artist["keys"])
    )
    low = title.lower()
    official = "official" in low or "албан ёсны" in low
    if not (is_topic or own_channel or official):
        return None
    if is_topic:
        priority, source = 0, "audio"
    elif re.search(r"(?i)official audio|\baudio\b|visuali[sz]er|аудио", title):
        priority, source = 1, "audio"
    else:
        priority, source = 2, "music_video"
    return {
        **upload,
        "song": display,
        "key": loose(display),
        "primary": primary,
        "own_channel": own_channel or is_topic,
        "priority": priority,
        "source": source,
    }


def top_songs(artist, taken_keys):
    uploads = {}
    for template in ARTIST_QUERIES:
        for u in yt_search(template.format(name=artist["name"]), 30):
            c = classify(u, artist)
            if c and c["id"] not in uploads:
                uploads[c["id"]] = c
    extra_queries = artist["aliases"][1:] + [f"{c} {artist['name']}" for c in artist["channels"]]
    for query in extra_queries:
        for u in yt_search(query, 30):
            c = classify(u, artist)
            if c and c["id"] not in uploads:
                uploads[c["id"]] = c
    groups = {}
    for c in uploads.values():
        key = next((k for k in groups if similarity(k, c["key"]) >= 0.88), c["key"])
        groups.setdefault(key, []).append(c)
    ranked = []
    for key, items in groups.items():
        if key in taken_keys:
            continue
        primary = any(i["primary"] for i in items)
        views = max(i["views"] for i in items)
        best_name = max(items, key=lambda i: (i["priority"] == 0, i["views"]))["song"]
        ranked.append({"key": key, "title": best_name, "views": views, "primary": primary, "uploads": items})
    ranked.sort(key=lambda r: (not r["primary"], -r["views"]))
    return ranked


def oembed_ok(video_id):
    try:
        r = requests.get(
            "https://www.youtube.com/oembed",
            params={"url": f"https://www.youtube.com/watch?v={video_id}", "format": "json"},
            timeout=15,
        )
        return r.status_code == 200
    except requests.RequestException:
        return True


def check_and_download(video_id, workdir):
    import yt_dlp
    url = f"https://www.youtube.com/watch?v={video_id}"
    if not oembed_ok(video_id):
        return None, "embedding disabled"
    with yt_dlp.YoutubeDL(ydl_options({"skip_download": True})) as ydl:
        try:
            info = ydl.extract_info(url, download=False)
        except Exception as exc:
            return None, f"unavailable ({str(exc).splitlines()[0][:80]})"
    if info.get("playable_in_embed") is False:
        return None, "embedding disabled"
    if (info.get("age_limit") or 0) >= 18:
        return None, "age restricted"
    if info.get("availability") not in (None, "public", "unlisted"):
        return None, f"availability {info.get('availability')}"
    duration = info.get("duration") or 0
    if duration > MAX_DURATION:
        return None, "longer than 10 minutes"
    if info.get("is_live") or info.get("was_live"):
        return None, "live stream"
    opts = ydl_options({"format": "bestaudio/best", "outtmpl": str(Path(workdir) / "clip.%(ext)s")})
    try:
        from yt_dlp.utils import download_range_func
        ranged = dict(opts)
        ranged["download_ranges"] = download_range_func(None, [(0, ANALYZE_SECONDS + 5)])
        with yt_dlp.YoutubeDL(ranged) as ydl:
            ydl.download([url])
    except Exception:
        for f in Path(workdir).glob("clip.*"):
            f.unlink()
        try:
            with yt_dlp.YoutubeDL(opts) as ydl:
                ydl.download([url])
        except Exception as exc:
            return None, f"download failed ({str(exc).splitlines()[0][:80]})"
    files = [f for f in Path(workdir).glob("clip.*") if f.suffix != ".part"]
    if not files:
        return None, "download produced no file"
    wav = Path(workdir) / "clip.wav"
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-i", str(files[0]), "-t", str(ANALYZE_SECONDS), "-ac", "1", "-ar", "22050", str(wav)],
        check=True,
    )
    return {"wav": wav, "duration": duration, "title": info.get("title", "")}, None


def window_mean(x, w):
    c = np.concatenate([[0.0], np.cumsum(x, dtype=float)])
    idx = np.arange(len(x))
    end = np.minimum(idx + w, len(x))
    return (c[end] - c[idx]) / np.maximum(end - idx, 1)


def detect_start(wav_path, source_type):
    import librosa
    y, sr = librosa.load(str(wav_path), sr=22050, mono=True, duration=ANALYZE_SECONDS)
    if y.size < sr * 2:
        return 0.0, False, "audio too short to analyze"
    hop = 512
    fps = sr / hop
    rms = librosa.feature.rms(y=y, hop_length=hop)[0]
    env = librosa.onset.onset_strength(y=y, sr=sr, hop_length=hop)
    n = min(len(rms), len(env))
    rms, env = rms[:n], env[:n]
    ref = np.percentile(rms, 95) + 1e-9
    db = 20 * np.log10(rms / ref + 1e-9)
    onsets = librosa.onset.onset_detect(onset_envelope=env, sr=sr, hop_length=hop, backtrack=True)
    onsets = onsets[onsets < n]

    audible = np.flatnonzero(db > -40)
    first_sound = int(audible[0]) if audible.size else 0

    def snap(frame, limit_s):
        after = onsets[(onsets >= frame - int(0.15 * fps)) & (onsets <= frame + int(limit_s * fps))]
        for o in after:
            if db[o: o + 6].max() > -30:
                return int(o)
        return int(frame)

    silence_start = snap(first_sound, 1.0) / fps

    tempo, beats = librosa.beat.beat_track(onset_envelope=env, sr=sr, hop_length=hop)
    tempo = float(np.atleast_1d(tempo)[0]) if np.size(tempo) else 0.0
    pulse = librosa.beat.plp(onset_envelope=env, sr=sr, hop_length=hop)[:n]
    beat_mask = np.zeros(n)
    beat_mask[beats[beats < n]] = 1.0

    w = int(4 * fps)
    loud = window_mean((db > -20).astype(float), w)
    pulse_win = window_mean(pulse, w)
    beat_count = window_mean(beat_mask, w) * w
    pulse_ref = np.percentile(pulse, 75) + 1e-9
    expected = max(tempo, 60.0) / 60.0 * 4.0
    ok = (loud >= 0.75) & (pulse_win >= 0.6 * pulse_ref) & (beat_count >= 0.6 * expected)
    ok[n - w:] = False
    hits = np.flatnonzero(ok)

    if source_type == "audio":
        note = f"silence trimmed, beat at {hits[0] / fps:.1f}s" if hits.size else "silence trimmed"
        return round(max(0.0, silence_start - 0.02), 2), True, note
    if not hits.size:
        return round(max(0.0, silence_start - 0.02), 2), False, "no clear beat found, used first sound"
    start = snap(int(hits[0]), 3.0) / fps
    return round(max(0.0, start - 0.02), 2), True, f"beat-based start, {tempo:.0f} bpm"


def resolve_song(song, artist, used_ids):
    extra = yt_search(f"{artist['name']} {song['title']}", 12)
    extra += yt_search(f"{artist['name']} {song['title']} topic", 6)
    pool = {u["id"]: u for u in song["uploads"]}
    for u in extra:
        c = classify(u, artist)
        if c and c["id"] not in pool and similarity(c["key"], song["key"]) >= 0.85:
            pool[c["id"]] = c
    audio_lengths = [c["duration"] for c in pool.values() if c["source"] == "audio" and c["duration"]]
    ref_duration = min(audio_lengths) if audio_lengths else None
    candidates = sorted(
        (c for c in pool.values() if c["id"] not in used_ids),
        key=lambda c: (c["priority"], not c["own_channel"], -c["views"]),
    )
    tried = []
    for cand in candidates[:6]:
        with tempfile.TemporaryDirectory(prefix="duutaa_") as tmp:
            meta, err = check_and_download(cand["id"], tmp)
            if err:
                tried.append(f"{cand['id']}: {err}")
                print(f"      skip {cand['id']} ({err})")
                continue
            try:
                start, confident, note = detect_start(meta["wav"], cand["source"])
            except Exception as exc:
                start, confident, note = 0.0, False, f"analysis failed: {exc}"
        reasons = []
        if not cand["own_channel"]:
            reasons.append(f"uploaded by {cand['channel']}")
        if not song["primary"]:
            reasons.append("artist is only featured")
        if cand["source"] == "music_video":
            if start > 8:
                reasons.append(f"long intro {start:.1f}s")
            extra_len = meta["duration"] - ref_duration if ref_duration else None
            if extra_len is not None and extra_len > 15 and start < 3:
                reasons.append(f"video is {extra_len:.0f}s longer than the audio but start is near 0")
        if not confident:
            reasons.append(note)
        return {
            "youtubeId": cand["id"],
            "startSeconds": start,
            "sourceType": cand["source"],
            "needsCheck": bool(reasons),
            "checkReason": ", ".join(reasons),
            "youtubeTitle": meta["title"],
            "analysis": note,
        }, tried
    return None, tried or ["no usable upload"]


def load_existing(path):
    if Path(path).exists():
        try:
            return json.loads(Path(path).read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            print(f"Warning: {path} is not valid JSON, it will be overwritten.")
    return []


def write_songs(path, songs):
    lines = ["["]
    for i, s in enumerate(songs):
        lines.append("  " + json.dumps(s, ensure_ascii=False) + ("," if i < len(songs) - 1 else ""))
    lines.append("]")
    Path(path).write_text("\n".join(lines) + "\n", encoding="utf-8")


def cell(text, width):
    text = str(text)
    return text[: width - 1] + "…" if len(text) > width else text.ljust(width)


def print_table(songs):
    cols = [("#", 3), ("Artist", 16), ("Title", 28), ("Src", 4), ("Start", 6), ("Chk", 4), ("Link", 40)]
    header = " ".join(cell(c, w) for c, w in cols)
    print("\n" + header)
    print("-" * len(header))
    for i, s in enumerate(songs, 1):
        link = f"https://youtu.be/{s['youtubeId']}?t={int(s['startSeconds'])}"
        row = [i, s["artist"], s["title"], "aud" if s["sourceType"] == "audio" else "mv",
               f"{s['startSeconds']:.2f}", "!!" if s.get("needsCheck") else "", link]
        print(" ".join(cell(v, w) for v, (_, w) in zip(row, cols)))
        if s.get("needsCheck") and s.get("checkReason"):
            print(" " * 4 + "↳ " + s["checkReason"])
    flagged = sum(1 for s in songs if s.get("needsCheck"))
    print(f"\n{len(songs)} songs, {flagged} need a check (marked !!).")


def main():
    parser = argparse.ArgumentParser(description="Build songs.json from each artist's most viewed songs on YouTube.")
    parser.add_argument("--artists", default=str(ROOT / "artists.txt"))
    parser.add_argument("--out", default=str(ROOT / "songs.json"))
    parser.add_argument("--only", action="append", default=[], help="rebuild only this artist (repeatable)")
    parser.add_argument("--table", action="store_true", help="only print the review table for the existing songs.json")
    args = parser.parse_args()

    load_dotenv(ROOT / ".env")
    existing = load_existing(args.out)
    if args.table:
        print_table(existing)
        return
    if not shutil.which("ffmpeg"):
        sys.exit("ffmpeg is not installed. Install it with: brew install ffmpeg")

    artists = parse_artists(args.artists)
    if args.only:
        wanted = {loose(o) for o in args.only}
        artists = [a for a in artists if a["keys"] & wanted]
        if not artists:
            sys.exit("No artist in artists.txt matches --only.")
    rebuilt = {loose(a["name"]) for a in artists}

    kept = [s for s in existing if loose(s.get("artist", "")) not in rebuilt]
    locked = {s["id"]: s for s in existing if s.get("locked") and loose(s.get("artist", "")) in rebuilt}
    used_ids = {s["youtubeId"] for s in kept} | {s["youtubeId"] for s in locked.values()}
    taken_keys = {loose(s["title"]) for s in kept}
    new_songs = []
    problems = []

    for artist in artists:
        name = artist["name"]
        print(f"\n▶ {name}")
        for s in [s for s in locked.values() if loose(s["artist"]) == loose(name)]:
            print(f"   🔒 {s['title']} (locked, kept as is)")
            new_songs.append(s)
            taken_keys.add(loose(s["title"]))
        count = sum(1 for s in new_songs if loose(s["artist"]) == loose(name))
        ranked = top_songs(artist, taken_keys)
        if not ranked:
            problems.append(f"{name}: no songs found on YouTube")
            print("   no songs found")
            continue
        for song in ranked:
            if count >= SONGS_PER_ARTIST:
                break
            if song["key"] in taken_keys:
                continue
            print(f"   • {song['title']}  ({song['views']:,} views)")
            result, tried = resolve_song(song, artist, used_ids)
            if result is None:
                print("      ✗ no usable video: " + "; ".join(tried[:3]))
                continue
            taken_keys.add(song["key"])
            used_ids.add(result["youtubeId"])
            entry = {
                "id": f"{slug(name)}-{slug(song['title'])}",
                "title": song["title"],
                "artist": name,
                "youtubeId": result["youtubeId"],
                "startSeconds": result["startSeconds"],
                "sourceType": result["sourceType"],
                "needsCheck": result["needsCheck"],
                "checkReason": result["checkReason"],
                "youtubeTitle": result["youtubeTitle"],
                "locked": False,
            }
            new_songs.append(entry)
            count += 1
            flag = "  !! check" if entry["needsCheck"] else ""
            print(f"      ✓ {entry['youtubeId']} [{entry['sourceType']}] start {entry['startSeconds']:.2f}s ({result['analysis']}){flag}")
        if count < SONGS_PER_ARTIST:
            problems.append(f"{name}: only {count} songs found")

    seen = set()
    final = []
    for s in kept + new_songs:
        if s["id"] in seen:
            continue
        seen.add(s["id"])
        final.append(s)
    write_songs(args.out, final)
    print_table(final)
    if problems:
        print("\nProblems:")
        for p in problems:
            print("  - " + p)
    print(f"\nSaved {len(final)} songs to {args.out}")


if __name__ == "__main__":
    main()
