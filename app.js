const CONFIG = {
  name: "Дуу Таа",
  launchDate: "2026-11-18",
  utcOffsetHours: 8,
  songsUrl: "songs.json"
};

const CLIPS = [0.1, 0.5, 1, 2, 4, 8];
const MAX_TRIES = CLIPS.length;
const MAX_CLIP = CLIPS[CLIPS.length - 1];
const PREFIX = "duutaa.";

const TEXT = {
  mn: {
    daily: "Өдрийн дуу",
    unlimited: "Хязгааргүй",
    artist: "Уран бүтээлч",
    chooseArtist: "Уран бүтээлч сонгох",
    placeholder: "Дууны нэр эсвэл уран бүтээлч…",
    guess: "Таах",
    skipPlus: s => `Алгасах (+${s})`,
    giveUp: "Бууж өгөх",
    skipped: "Алгассан",
    loading: "Ачаалж байна…",
    tapToPlay: "▶ дарж сонсоорой",
    buffering: "Бэлдэж байна…",
    playing: "Тоглож байна…",
    won: "Зөв таалаа!",
    lost: "Энэ удаад таасангүй",
    wonIn: n => `${n}/${MAX_TRIES} оролдлогоор`,
    lostSub: "Дуу нь:",
    share: "Хуваалцах",
    copied: "Хуулагдлаа!",
    copyFailed: "Хуулж чадсангүй",
    next: "Дараагийн дуу",
    playUnlimited: "Хязгааргүй тоглох",
    nextDaily: t => `Дараагийн өдрийн дуу: ${t}`,
    noMatch: "Олдсонгүй",
    pickFromList: "Жагсаалтаас дуу сонгоно уу",
    alreadyGuessed: "Энэ дууг аль хэдийн таасан",
    noSongs: "songs.json хоосон байна. Эхлээд build_songs.py скриптийг ажиллуулна уу.",
    loadError: "songs.json-г ачаалж чадсангүй. Сайтыг вэб сервер ашиглан нээнэ үү.",
    videoError: "Энэ дууг тоглуулах боломжгүй байна.",
    skippingBroken: "Дуу тоглогдсонгүй, өөр дуу сонгож байна…",
    playerError: "YouTube тоглуулагч ачаалагдсангүй. Интернэт холболтоо шалгана уу.",
    statsTitle: "Статистик",
    helpTitle: "Хэрхэн тоглох вэ",
    help: [
      "Дууны маш богино хэсгийг сонсоод аль дуу болохыг таа.",
      "Буруу таах эсвэл алгасах бүрд илүү урт хэсэг нээгдэнэ: 0.1с, 0.5с, 1с, 2с, 4с, 8с.",
      "Нийт 6 оролдлого. Кирилл, латин аль ч үсгээр хайж болно (жишээ нь “rokit”).",
      "Өдрийн дуу бүх хүнд ижил. Хязгааргүй горимд хүссэнээрээ тогло."
    ],
    startPlaying: "Тоглож эхлэх",
    legendCorrect: "Зөв",
    legendArtist: "Уран бүтээлч таарсан",
    legendWrong: "Буруу",
    legendSkip: "Алгассан",
    played: "Тоглосон",
    winPct: "Ялалт %",
    streak: "Цуврал",
    maxStreak: "Дээд цуврал",
    distribution: "Хэдэн оролдлогоор таасан",
    close: "Хаах",
    volume: "Дууны түвшин",
    play: "Тоглуулах",
    dayLabel: n => `Өдрийн дуу №${n}`,
    unlimitedLabel: n => `Хязгааргүй · ${n} дуу`,
    artistLabel: (a, n) => `${a} · ${n} дуу`,
    songTitle: "Дууны нэр",
    unlimitedShare: "Хязгааргүй"
  },
  en: {
    daily: "Daily",
    unlimited: "Unlimited",
    artist: "Artist",
    chooseArtist: "Choose an artist",
    placeholder: "Song title or artist…",
    guess: "Guess",
    skipPlus: s => `Skip (+${s})`,
    giveUp: "Give up",
    skipped: "Skipped",
    loading: "Loading…",
    tapToPlay: "Tap ▶ to listen",
    buffering: "Getting ready…",
    playing: "Playing…",
    won: "You got it!",
    lost: "Not this time",
    wonIn: n => `in ${n}/${MAX_TRIES} tries`,
    lostSub: "The song was:",
    share: "Share",
    copied: "Copied!",
    copyFailed: "Could not copy",
    next: "Next song",
    playUnlimited: "Play unlimited",
    nextDaily: t => `Next daily song in ${t}`,
    noMatch: "No matches",
    pickFromList: "Pick a song from the list",
    alreadyGuessed: "You already guessed that",
    noSongs: "songs.json is empty. Run build_songs.py first.",
    loadError: "Could not load songs.json. Open the site through a web server.",
    videoError: "This song can't be played.",
    skippingBroken: "Song failed to play, picking another…",
    playerError: "The YouTube player didn't load. Check your connection.",
    statsTitle: "Statistics",
    helpTitle: "How to play",
    help: [
      "Listen to a tiny clip of a song and guess which one it is.",
      "Every wrong guess or skip unlocks a longer clip: 0.1s, 0.5s, 1s, 2s, 4s, 8s.",
      "You have 6 tries. Search works in Cyrillic or Latin (try “rokit”).",
      "The daily song is the same for everyone. Unlimited lets you play as much as you like."
    ],
    startPlaying: "Start playing",
    legendCorrect: "Correct",
    legendArtist: "Right artist",
    legendWrong: "Wrong",
    legendSkip: "Skipped",
    played: "Played",
    winPct: "Win %",
    streak: "Streak",
    maxStreak: "Best streak",
    distribution: "Guess distribution",
    close: "Close",
    volume: "Volume",
    play: "Play",
    dayLabel: n => `Daily song #${n}`,
    unlimitedLabel: n => `Unlimited · ${n} songs`,
    artistLabel: (a, n) => `${a} · ${n} songs`,
    songTitle: "Song title",
    unlimitedShare: "Unlimited"
  }
};

const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const sleep = ms => new Promise(r => setTimeout(r, ms));

const store = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem(PREFIX + key);
      return v == null ? fallback : JSON.parse(v);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch {}
  }
};

const CYR = {
  "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "е": "ye", "ё": "yo", "ж": "j",
  "з": "z", "и": "i", "й": "i", "к": "k", "л": "l", "м": "m", "н": "n", "о": "o",
  "ө": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u", "ү": "u", "ф": "f",
  "х": "h", "ц": "ts", "ч": "ch", "ш": "sh", "щ": "sh", "ъ": "i", "ы": "ii", "ь": "i",
  "э": "e", "ю": "yu", "я": "ya", "ұ": "u", "і": "i"
};

function translit(text) {
  return Array.from(String(text).normalize("NFKC").toLowerCase())
    .map(ch => CYR[ch] ?? ch)
    .join("")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "");
}

function loose(text) {
  return translit(text)
    .replace(/kh/g, "h").replace(/x/g, "h").replace(/ts/g, "c").replace(/q/g, "o")
    .replace(/w/g, "u").replace(/v/g, "u").replace(/y/g, "i")
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/(.)\1+/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function lev(a, b) {
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[b.length];
}

let INDEX = [];

function buildIndex(songs) {
  INDEX = songs.map(song => {
    const title = loose(song.title).split(" ").filter(Boolean);
    const artist = loose(song.artist).split(" ").filter(Boolean);
    return {
      song,
      title,
      tokens: [...title, ...artist],
      titleC: title.join(""),
      artistC: artist.join(""),
      allC: title.join("") + artist.join("")
    };
  });
}

function tokenScore(q, t) {
  if (t.startsWith(q)) return 3;
  if (q.length >= 2 && t.includes(q)) return 2;
  if (q.length >= 3) {
    const allow = q.length >= 6 ? 2 : 1;
    if (lev(q, t.slice(0, q.length)) <= allow || lev(q, t) <= allow) return 1;
  }
  return 0;
}

function searchSongs(query) {
  const qt = loose(query).split(" ").filter(Boolean);
  if (!qt.length) return [];
  const qc = qt.join("");
  const hits = [];
  for (const e of INDEX) {
    let total = 0;
    let failed = false;
    for (const q of qt) {
      let best = 0;
      for (const t of e.tokens) {
        best = Math.max(best, tokenScore(q, t));
        if (best === 3) break;
      }
      if (!best && q.length >= 3 && e.allC.includes(q)) best = 1;
      if (!best) { failed = true; break; }
      total += best;
    }
    if (failed) {
      const allow = qc.length >= 8 ? 2 : 1;
      const close = qc.length >= 4 && (e.allC.includes(qc) || lev(qc, e.titleC) <= allow || lev(qc, e.artistC) <= allow);
      if (!close) continue;
      total = 2;
    }
    if (e.title[0] && e.title[0].startsWith(qt[0])) total += 1;
    if (qc.length >= 3 && e.allC.includes(qc)) total += 1;
    hits.push({ song: e.song, total });
  }
  hits.sort((a, b) => b.total - a.total || a.song.title.localeCompare(b.song.title));
  return hits.slice(0, 8).map(h => h.song);
}

const PS = { ENDED: 0, PLAYING: 1, PAUSED: 2, BUFFERING: 3, CUED: 5 };

const Player = {
  yt: null,
  ready: false,
  failed: false,
  readyWaiters: [],
  listeners: new Set(),
  videoId: null,
  start: 0,
  warmed: false,
  warming: null,
  loadTok: 0,
  clipTok: 0,
  clipEnd: null,
  volume: 70,
  onError: null,

  whenReady() {
    if (this.ready) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("player timeout")), 20000);
      this.readyWaiters.push(() => { clearTimeout(timer); resolve(); });
    });
  },

  waitFor(states, ms) {
    return new Promise((resolve, reject) => {
      const done = () => { clearTimeout(timer); this.listeners.delete(fn); };
      const fn = s => { if (states.includes(s)) { done(); resolve(s); } };
      const timer = setTimeout(() => { done(); reject(new Error("state timeout")); }, ms);
      this.listeners.add(fn);
    });
  },

  async load(videoId, start) {
    this.loadTok++;
    this.clipTok++;
    this.halt();
    this.videoId = videoId;
    this.start = Math.max(0, Number(start) || 0);
    this.warmed = false;
    this.warming = null;
    await this.whenReady();
    this.yt.cueVideoById({ videoId, startSeconds: this.start });
    this.warm().catch(() => {});
  },

  warm() {
    if (this.warmed) return Promise.resolve();
    if (this.warming) return this.warming;
    const tok = this.loadTok;
    const yt = this.yt;
    this.warming = (async () => {
      yt.mute();
      const playing = this.waitFor([PS.PLAYING], 20000);
      yt.playVideo();
      await playing;
      if (tok !== this.loadTok) throw new Error("stale");
      yt.pauseVideo();
      yt.seekTo(this.start, true);
      await sleep(250);
      if (tok !== this.loadTok) throw new Error("stale");
      this.warmed = true;
    })();
    this.warming.catch(() => { if (tok === this.loadTok) this.warming = null; });
    return this.warming;
  },

  async playClip(seconds, onStart) {
    const tok = ++this.clipTok;
    this.halt();
    if (this.ready && !this.warmed && this.warming) this.yt.playVideo();
    await this.whenReady();
    await this.warm();
    if (tok !== this.clipTok) return false;
    const yt = this.yt;
    yt.seekTo(this.start, true);
    yt.setVolume(this.volume);
    yt.unMute();
    const playing = this.waitFor([PS.PLAYING], 10000);
    yt.playVideo();
    await playing;
    if (tok !== this.clipTok) return false;
    return new Promise(resolve => {
      let remaining = seconds * 1000;
      let armedAt = performance.now();
      let timer = null;
      const finish = () => {
        if (this.clipEnd !== finish) return;
        this.clipEnd = null;
        clearTimeout(timer);
        this.listeners.delete(watch);
        yt.mute();
        yt.pauseVideo();
        setTimeout(() => { if (!this.clipEnd) yt.seekTo(this.start, true); }, 80);
        resolve(true);
      };
      const arm = () => {
        armedAt = performance.now();
        timer = setTimeout(finish, Math.max(0, remaining));
      };
      const watch = s => {
        if (s === PS.BUFFERING && timer) {
          clearTimeout(timer);
          timer = null;
          remaining -= performance.now() - armedAt;
        } else if (s === PS.PLAYING && !timer) {
          arm();
        } else if (s === PS.ENDED || s === PS.PAUSED) {
          finish();
        }
      };
      this.clipEnd = finish;
      this.listeners.add(watch);
      arm();
      if (onStart) onStart();
    });
  },

  halt() {
    if (this.clipEnd) this.clipEnd();
  },

  stop() {
    this.clipTok++;
    this.halt();
    if (this.ready) {
      try { this.yt.pauseVideo(); } catch {}
    }
  },

  setVolume(v) {
    this.volume = v;
    if (this.ready) this.yt.setVolume(v);
  }
};

window.onYouTubeIframeAPIReady = () => {
  Player.yt = new YT.Player("yt-hidden", {
    width: "200",
    height: "200",
    playerVars: {
      playsinline: 1,
      controls: 0,
      disablekb: 1,
      fs: 0,
      rel: 0,
      iv_load_policy: 3,
      origin: location.origin
    },
    events: {
      onReady: () => {
        Player.ready = true;
        Player.readyWaiters.splice(0).forEach(fn => fn());
      },
      onStateChange: e => Player.listeners.forEach(fn => fn(e.data)),
      onError: e => { if (Player.onError) Player.onError(e.data); }
    }
  });
};

const G = {
  lang: store.get("lang", "mn"),
  songs: [],
  mode: "daily",
  artist: store.get("artist", ""),
  song: null,
  guesses: [],
  done: false,
  won: false,
  day: 0,
  queue: [],
  played: 0,
  selected: null,
  sugg: [],
  hi: -1,
  playTok: 0,
  playing: false,
  countdown: null,
  statsKind: "daily"
};

const t = key => TEXT[G.lang][key] ?? TEXT.en[key] ?? key;

function fmtSec(s) {
  return `${s < 1 ? s.toFixed(1) : s}s`;
}

function mulberry32(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let r = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function hashStr(s) {
  let h = 2166136261;
  for (const ch of s) h = Math.imul(h ^ ch.codePointAt(0), 16777619);
  return h >>> 0;
}

function shuffle(list, rand = Math.random) {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function dayIndexNow() {
  return Math.floor((Date.now() + CONFIG.utcOffsetHours * 3600000) / 86400000);
}

function dayNumber() {
  const launch = Math.floor(Date.parse(CONFIG.launchDate + "T00:00:00Z") / 86400000);
  return Math.max(1, dayIndexNow() - launch + 1);
}

function msToNextDay() {
  const now = Date.now() + CONFIG.utcOffsetHours * 3600000;
  return 86400000 - (now % 86400000);
}

function playableSongs() {
  return G.songs.filter(s => !s.disabled).sort((a, b) => a.id.localeCompare(b.id));
}

function dailySong(day) {
  const pool = playableSongs();
  const n = pool.length;
  const cycle = Math.floor((day - 1) / n);
  const order = shuffle(pool, mulberry32(hashStr(CONFIG.name + ":" + cycle)));
  return order[(day - 1) % n];
}

function byId(id) {
  return G.songs.find(s => s.id === id) || null;
}

function sameSong(a, b) {
  return a.id === b.id || (loose(a.title) === loose(b.title) && loose(a.artist) === loose(b.artist));
}

function artists() {
  const map = new Map();
  for (const s of playableSongs()) {
    const key = loose(s.artist);
    if (!map.has(key)) map.set(key, { name: s.artist, count: 0 });
    map.get(key).count++;
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

function emptyStats() {
  return { played: 0, wins: 0, streak: 0, maxStreak: 0, dist: [0, 0, 0, 0, 0, 0], lastDay: 0, lastWinDay: 0 };
}

function loadStats() {
  const s = store.get("stats", {});
  return { daily: { ...emptyStats(), ...(s.daily || {}) }, unlimited: { ...emptyStats(), ...(s.unlimited || {}) } };
}

function recordResult(won, tries) {
  const stats = loadStats();
  const kind = G.mode === "daily" ? "daily" : "unlimited";
  const s = stats[kind];
  if (kind === "daily") {
    if (s.lastDay === G.day) return;
    s.lastDay = G.day;
    if (won) {
      s.streak = s.lastWinDay === G.day - 1 ? s.streak + 1 : 1;
      s.lastWinDay = G.day;
    } else {
      s.streak = 0;
    }
  } else {
    s.streak = won ? s.streak + 1 : 0;
  }
  s.played++;
  if (won) {
    s.wins++;
    s.dist[tries - 1]++;
  }
  s.maxStreak = Math.max(s.maxStreak, s.streak);
  store.set("stats", stats);
}

function shownStreak(kind, s) {
  if (kind === "daily" && s.lastWinDay < dayNumber() - 1) return 0;
  return s.streak;
}

function saveDaily() {
  if (G.mode !== "daily" || !G.song) return;
  store.set("daily." + G.day, { songId: G.song.id, guesses: G.guesses, done: G.done, won: G.won });
}

function setStatus(text, isError = false) {
  const el = $("#status");
  el.textContent = text || "";
  el.classList.toggle("error", isError);
}

let toastTimer = null;
function toast(text) {
  const el = $("#toast");
  el.textContent = text;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}

function scale(sec) {
  return Math.sqrt(Math.min(sec, MAX_CLIP) / MAX_CLIP) * 100;
}

function clipIndex() {
  return Math.min(G.guesses.length, MAX_TRIES - 1);
}

function applyStaticText() {
  document.documentElement.lang = G.lang;
  document.title = CONFIG.name;
  $("#brand").textContent = CONFIG.name;
  $$("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
  $$("[data-i18n-label]").forEach(el => { el.setAttribute("aria-label", t(el.dataset.i18nLabel)); el.title = t(el.dataset.i18nLabel); });
  $("#guess-input").placeholder = t("placeholder");
  $("#btn-lang").textContent = G.lang === "mn" ? "EN" : "МН";
  $("#help-list").innerHTML = "";
  for (const line of t("help")) {
    const li = document.createElement("li");
    li.textContent = line;
    $("#help-list").appendChild(li);
  }
}

function renderModes() {
  $$(".modes button").forEach(b => b.setAttribute("aria-selected", String(b.dataset.mode === G.mode)));
  $("#artist-row").hidden = G.mode !== "artist";
}

function renderArtistSelect() {
  const sel = $("#artist-select");
  sel.innerHTML = "";
  for (const a of artists()) {
    const o = document.createElement("option");
    o.value = a.name;
    o.textContent = `${a.name} (${a.count})`;
    sel.appendChild(o);
  }
  if (G.artist) sel.value = G.artist;
}

function renderSubtitle() {
  let text = "";
  if (G.mode === "daily") text = t("dayLabel")(G.day);
  else if (G.mode === "unlimited") text = t("unlimitedLabel")(playableSongs().length);
  else text = t("artistLabel")(G.artist, playableSongs().filter(s => loose(s.artist) === loose(G.artist)).length);
  $("#subtitle").textContent = text;
}

function renderAttempts() {
  const ol = $("#attempts");
  ol.innerHTML = "";
  for (let i = 0; i < MAX_TRIES; i++) {
    const li = document.createElement("li");
    const mark = document.createElement("i");
    mark.className = "mark";
    const label = document.createElement("span");
    const g = G.guesses[i];
    if (g) {
      li.classList.add(g.type);
      if (g.type === "skip") {
        label.textContent = t("skipped");
      } else {
        const s = byId(g.id);
        label.textContent = s ? `${s.title} — ${s.artist}` : g.id;
      }
    } else if (i === G.guesses.length && !G.done) {
      li.classList.add("current");
    }
    li.append(mark, label);
    ol.appendChild(li);
  }
}

function renderTimeline() {
  const tl = $("#timeline");
  tl.querySelectorAll(".tick").forEach(n => n.remove());
  for (const c of CLIPS.slice(0, -1)) {
    const tick = document.createElement("div");
    tick.className = "tick";
    tick.style.left = scale(c) + "%";
    tl.appendChild(tick);
  }
  const len = CLIPS[clipIndex()];
  $("#tl-unlocked").style.width = scale(len) + "%";
  if (!G.playing) $("#tl-fill").style.width = "0%";
  $("#clip-label").textContent = fmtSec(len);
}

function renderControls() {
  const idx = clipIndex();
  const last = G.guesses.length >= MAX_TRIES - 1;
  const step = last ? 0 : +(CLIPS[idx + 1] - CLIPS[idx]).toFixed(1);
  $("#btn-skip").textContent = last ? t("giveUp") : t("skipPlus")(fmtSec(step));
  $("#btn-play").disabled = !G.song || G.done;
  $("#icon-play").hidden = G.playing;
  $("#icon-stop").hidden = !G.playing;
}

function renderResult() {
  $("#play-area").hidden = G.done;
  $("#result").hidden = !G.done;
  if (!G.done) {
    $("#embed").innerHTML = "";
    return;
  }
  const s = G.song;
  $("#result-title").textContent = G.won ? t("won") : t("lost");
  $("#result-sub").textContent = G.won ? t("wonIn")(G.guesses.length) : t("lostSub");
  $("#result-song").textContent = s.title;
  $("#result-artist").textContent = s.artist;
  const embed = $("#embed");
  if (embed.dataset.id !== s.id) {
    embed.dataset.id = s.id;
    const src = `https://www.youtube.com/embed/${encodeURIComponent(s.youtubeId)}?start=${Math.floor(s.startSeconds || 0)}&rel=0&playsinline=1`;
    embed.innerHTML = "";
    const frame = document.createElement("iframe");
    frame.src = src;
    frame.title = `${s.title} — ${s.artist}`;
    frame.allow = "autoplay; encrypted-media; picture-in-picture";
    frame.allowFullscreen = true;
    embed.appendChild(frame);
  }
  $("#result-grid").textContent = emojiGrid();
  $("#btn-next").textContent = G.mode === "daily" ? t("playUnlimited") : t("next");
  clearInterval(G.countdown);
  const cd = $("#countdown");
  if (G.mode === "daily") {
    const tick = () => {
      const ms = msToNextDay();
      const h = String(Math.floor(ms / 3600000)).padStart(2, "0");
      const m = String(Math.floor(ms / 60000) % 60).padStart(2, "0");
      const sec = String(Math.floor(ms / 1000) % 60).padStart(2, "0");
      cd.textContent = t("nextDaily")(`${h}:${m}:${sec}`);
      if (ms < 1000 && G.day === dayNumber()) {
        clearInterval(G.countdown);
        setTimeout(() => { if (G.mode === "daily") startDaily(); }, 1500);
      }
    };
    tick();
    G.countdown = setInterval(tick, 1000);
  } else {
    cd.textContent = "";
  }
}

function render() {
  renderModes();
  renderSubtitle();
  renderAttempts();
  renderTimeline();
  renderControls();
  renderResult();
}

function emojiGrid() {
  const map = { correct: "🟩", artist: "🟨", wrong: "🟥", skip: "⬛" };
  let out = "";
  for (let i = 0; i < MAX_TRIES; i++) out += G.guesses[i] ? map[G.guesses[i].type] : "⬜";
  return out;
}

function shareText() {
  const tag = G.mode === "daily" ? `#${G.day}` : `(${t("unlimitedShare")})`;
  const url = location.origin + location.pathname;
  return `${CONFIG.name} ${tag} ${emojiGrid()}\n${url}`;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch {}
    ta.remove();
    return ok;
  }
}

function resetRound() {
  G.guesses = [];
  G.done = false;
  G.won = false;
  G.playing = false;
  G.playTok++;
  clearInput();
}

function loadSong(song) {
  G.song = song;
  $("#embed").dataset.id = "";
  render();
  if (G.done) {
    Player.stop();
    return;
  }
  setStatus(t("loading"));
  Player.load(song.youtubeId, song.startSeconds)
    .then(() => { if (G.song === song) setStatus(t("tapToPlay")); })
    .catch(() => setStatus(t("playerError"), true));
}

function startDaily() {
  G.mode = "daily";
  store.set("mode", "daily");
  G.day = dayNumber();
  resetRound();
  const saved = store.get("daily." + G.day, null);
  let song = saved && byId(saved.songId);
  if (song) {
    G.guesses = saved.guesses || [];
    G.done = !!saved.done;
    G.won = !!saved.won;
  } else {
    song = dailySong(G.day);
  }
  loadSong(song);
}

function startEndless(mode) {
  G.mode = mode;
  store.set("mode", mode);
  if (mode === "artist") {
    const list = artists();
    if (!list.some(a => a.name === G.artist)) G.artist = list[0] ? list[0].name : "";
    store.set("artist", G.artist);
    $("#artist-select").value = G.artist;
  }
  G.queue = [];
  nextEndless();
}

function nextEndless() {
  resetRound();
  if (!G.queue.length) {
    let pool = playableSongs();
    if (G.mode === "artist") pool = pool.filter(s => loose(s.artist) === loose(G.artist));
    G.queue = shuffle(pool);
    if (G.song && G.queue.length > 1 && G.queue[G.queue.length - 1].id === G.song.id) G.queue.unshift(G.queue.pop());
  }
  const song = G.queue.pop();
  if (song) loadSong(song);
}

function finish(won) {
  G.done = true;
  G.won = won;
  G.playing = false;
  G.playTok++;
  Player.stop();
  recordResult(won, G.guesses.length);
  saveDaily();
  closeSuggestions();
  setStatus("");
  render();
}

function addGuess(entry) {
  if (G.done) return;
  G.guesses.push(entry);
  Player.stop();
  G.playing = false;
  G.playTok++;
  if (entry.type === "correct") return finish(true);
  if (G.guesses.length >= MAX_TRIES) return finish(false);
  saveDaily();
  render();
  setStatus(t("tapToPlay"));
}

function submitGuess(song) {
  if (!song || G.done) return;
  if (G.guesses.some(g => g.id === song.id)) {
    toast(t("alreadyGuessed"));
    return;
  }
  let type = "wrong";
  if (sameSong(song, G.song)) type = "correct";
  else if (loose(song.artist) === loose(G.song.artist)) type = "artist";
  clearInput();
  addGuess({ type, id: song.id });
}

function clearInput() {
  const input = $("#guess-input");
  input.value = "";
  G.selected = null;
  closeSuggestions();
}

function closeSuggestions() {
  G.sugg = [];
  G.hi = -1;
  $("#suggestions").hidden = true;
  $("#guess-input").setAttribute("aria-expanded", "false");
}

function showSuggestions() {
  const input = $("#guess-input");
  const ul = $("#suggestions");
  const q = input.value.trim();
  G.selected = null;
  if (!q) return closeSuggestions();
  G.sugg = searchSongs(q);
  G.hi = G.sugg.length ? 0 : -1;
  ul.innerHTML = "";
  if (!G.sugg.length) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = t("noMatch");
    ul.appendChild(li);
  }
  G.sugg.forEach((s, i) => {
    const li = document.createElement("li");
    li.setAttribute("role", "option");
    li.id = "opt-" + i;
    const title = document.createElement("span");
    title.textContent = s.title;
    const artist = document.createElement("small");
    artist.textContent = s.artist;
    li.append(title, artist);
    li.addEventListener("pointerdown", e => e.preventDefault());
    li.addEventListener("click", () => pickSuggestion(i));
    ul.appendChild(li);
  });
  ul.hidden = false;
  input.setAttribute("aria-expanded", "true");
  highlight();
}

function highlight() {
  $$("#suggestions li[role=option]").forEach((li, i) => {
    li.setAttribute("aria-selected", String(i === G.hi));
    if (i === G.hi) li.scrollIntoView({ block: "nearest" });
  });
  $("#guess-input").setAttribute("aria-activedescendant", G.hi >= 0 ? "opt-" + G.hi : "");
}

function pickSuggestion(i) {
  const song = G.sugg[i];
  if (!song) return;
  G.selected = song;
  $("#guess-input").value = `${song.title} — ${song.artist}`;
  closeSuggestions();
}

function onSubmit() {
  if (G.done) return;
  if (G.selected) return submitGuess(G.selected);
  if (G.sugg.length) return submitGuess(G.sugg[Math.max(0, G.hi)]);
  if ($("#guess-input").value.trim()) {
    const found = searchSongs($("#guess-input").value);
    if (found.length) return submitGuess(found[0]);
  }
  toast(t("pickFromList"));
}

async function onPlay() {
  if (!G.song || G.done) return;
  if (G.playing) {
    G.playTok++;
    Player.halt();
    G.playing = false;
    renderControls();
    $("#tl-fill").style.width = "0%";
    setStatus(t("tapToPlay"));
    return;
  }
  const tok = ++G.playTok;
  const len = CLIPS[clipIndex()];
  G.playing = true;
  renderControls();
  setStatus(Player.warmed ? "" : t("buffering"));
  const fill = $("#tl-fill");
  fill.style.width = "0%";
  let raf = 0;
  try {
    await Player.playClip(len, () => {
      if (tok !== G.playTok) return;
      setStatus(t("playing"));
      const t0 = performance.now();
      const step = () => {
        const el = (performance.now() - t0) / 1000;
        fill.style.width = scale(Math.min(el, len)) + "%";
        if (el < len && tok === G.playTok) raf = requestAnimationFrame(step);
      };
      step();
    });
  } catch {
    if (tok === G.playTok) setStatus(t("playerError"), true);
  }
  cancelAnimationFrame(raf);
  if (tok !== G.playTok) return;
  G.playing = false;
  fill.style.width = scale(len) + "%";
  setTimeout(() => { if (tok === G.playTok && !G.playing) fill.style.width = "0%"; }, 700);
  renderControls();
  if (!$("#status").classList.contains("error")) setStatus(t("tapToPlay"));
}

function renderStats() {
  const kind = G.statsKind;
  const s = loadStats()[kind];
  $$("#stats-tabs button").forEach(b => b.setAttribute("aria-selected", String(b.dataset.kind === kind)));
  const pct = s.played ? Math.round((s.wins / s.played) * 100) : 0;
  const cells = [[s.played, t("played")], [pct, t("winPct")], [shownStreak(kind, s), t("streak")], [s.maxStreak, t("maxStreak")]];
  $("#stat-row").innerHTML = "";
  for (const [v, label] of cells) {
    const d = document.createElement("div");
    const b = document.createElement("b");
    b.textContent = v;
    const sp = document.createElement("span");
    sp.textContent = label;
    d.append(b, sp);
    $("#stat-row").appendChild(d);
  }
  const max = Math.max(1, ...s.dist);
  const dist = $("#dist");
  dist.innerHTML = "";
  const highlightRow = G.done && G.won && ((kind === "daily") === (G.mode === "daily")) ? G.guesses.length - 1 : -1;
  s.dist.forEach((n, i) => {
    const row = document.createElement("div");
    row.className = "dist-row";
    const label = document.createElement("span");
    label.textContent = i + 1;
    const bar = document.createElement("div");
    bar.className = "dist-bar" + (i === highlightRow ? " hi" : "");
    bar.style.width = `max(26px, ${(n / max) * 100}%)`;
    bar.textContent = n;
    row.append(label, bar);
    dist.appendChild(row);
  });
}

function openDialog(id) {
  const d = $(id);
  if (typeof d.showModal === "function") d.showModal();
  else d.setAttribute("open", "");
}

function bindEvents() {
  $("#btn-play").addEventListener("click", onPlay);
  $("#btn-skip").addEventListener("click", () => addGuess({ type: "skip" }));
  $("#btn-submit").addEventListener("click", onSubmit);

  const input = $("#guess-input");
  input.addEventListener("input", showSuggestions);
  input.addEventListener("focus", () => { if (input.value.trim() && !G.selected) showSuggestions(); });
  input.addEventListener("blur", () => setTimeout(closeSuggestions, 120));
  input.addEventListener("keydown", e => {
    const open = !$("#suggestions").hidden && G.sugg.length;
    if (e.key === "ArrowDown" && open) {
      e.preventDefault();
      G.hi = (G.hi + 1) % G.sugg.length;
      highlight();
    } else if (e.key === "ArrowUp" && open) {
      e.preventDefault();
      G.hi = (G.hi - 1 + G.sugg.length) % G.sugg.length;
      highlight();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (open && G.hi >= 0) pickSuggestion(G.hi);
      else onSubmit();
    } else if (e.key === "Escape") {
      closeSuggestions();
    }
  });

  $$(".modes button").forEach(b => b.addEventListener("click", () => {
    if (!G.songs.length) return;
    const mode = b.dataset.mode;
    if (mode === G.mode) return;
    if (mode === "daily") startDaily();
    else startEndless(mode);
  }));

  $("#artist-select").addEventListener("change", e => {
    G.artist = e.target.value;
    store.set("artist", G.artist);
    startEndless("artist");
  });

  $("#btn-next").addEventListener("click", () => {
    if (G.mode === "daily") startEndless("unlimited");
    else nextEndless();
  });

  $("#btn-share").addEventListener("click", async () => {
    toast((await copyText(shareText())) ? t("copied") : t("copyFailed"));
  });

  $("#btn-lang").addEventListener("click", () => {
    G.lang = G.lang === "mn" ? "en" : "mn";
    store.set("lang", G.lang);
    applyStaticText();
    render();
    if (!G.done && G.song && !G.playing) setStatus(t("tapToPlay"));
    if ($("#dlg-stats").open) renderStats();
  });

  $("#btn-help").addEventListener("click", () => openDialog("#dlg-help"));
  $("#btn-stats").addEventListener("click", () => {
    G.statsKind = G.mode === "daily" ? "daily" : "unlimited";
    renderStats();
    openDialog("#dlg-stats");
  });
  $$("#stats-tabs button").forEach(b => b.addEventListener("click", () => { G.statsKind = b.dataset.kind; renderStats(); }));

  $$("dialog").forEach(d => {
    d.addEventListener("click", e => { if (e.target === d) d.close(); });
    d.querySelectorAll("[data-close]").forEach(btn => btn.addEventListener("click", () => d.close()));
  });

  const vol = $("#volume");
  vol.value = store.get("volume", 70);
  Player.volume = Number(vol.value);
  vol.addEventListener("input", () => {
    Player.setVolume(Number(vol.value));
    store.set("volume", Number(vol.value));
  });

  Player.onError = code => {
    G.playTok++;
    G.playing = false;
    renderControls();
    if (G.mode !== "daily" && !G.done && G.guesses.length === 0) {
      toast(t("skippingBroken"));
      setTimeout(nextEndless, 1200);
    } else {
      setStatus(`${t("videoError")} (${code})`, true);
    }
  };

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && G.playing) onPlay();
  });
}

async function init() {
  applyStaticText();
  bindEvents();
  if (!store.get("seenHelp", false)) {
    store.set("seenHelp", true);
    openDialog("#dlg-help");
  }
  try {
    const res = await fetch(CONFIG.songsUrl, { cache: "no-cache" });
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    G.songs = (Array.isArray(data) ? data : []).filter(s => s && s.id && s.youtubeId && s.title && s.artist);
  } catch {
    renderModes();
    $("#play-area").hidden = true;
    $("#subtitle").textContent = t("loadError");
    return;
  }
  if (!playableSongs().length) {
    renderModes();
    $("#play-area").hidden = true;
    $("#subtitle").textContent = t("noSongs");
    return;
  }
  buildIndex(playableSongs());
  renderArtistSelect();
  const mode = store.get("mode", "daily");
  if (mode === "unlimited" || mode === "artist") startEndless(mode);
  else startDaily();
}

init();
