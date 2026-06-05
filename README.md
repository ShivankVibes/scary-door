# 🔔 Dvarabell — The Door

> *Someone is waiting behind the door... do you dare ring the bell?*

A horror-themed interactive web experience built with pure HTML, CSS, and JavaScript. Click the bell button, watch the door swing open, and face whatever lurks inside.

---

## 👁️ Features

- 🚪 **3D animated door** — swings open using CSS perspective transforms
- 🔔 **Working doorbell** — synthesized bell tones via the Web Audio API
- 😱 **Jumpscare** — full-screen horror face with zoom-in animation and red flash
- 📳 **Screen shake** — triggers just before the scare hits
- 🎵 **Horror soundscape** — creaking door, dissonant chord, and low rumble, all synthesized (no audio files)
- 🌫️ **Atmospheric effects** — animated fog, floating blood particles, glowing title
- 🔁 **Reset flow** — "Try Again" button to repeat the experience
- ♿ **Accessible** — ARIA labels, keyboard support (`Space`/`Enter` to ring, `Esc` to dismiss)

---

## 🗂️ Project Structure

```
dvarabell-the DOOR/
├── index.html       # Page structure & layout
├── style.css        # All styling — horror theme, 3D door, animations
├── script.js        # Interaction logic & Web Audio sound synthesis
├── jumpscare.png    # The face behind the door 👁️
└── README.md        # You are here
```

---

## 🚀 Running Locally

No build step needed — it's plain HTML/CSS/JS.

**Option 1 — Open directly:**
```
Just double-click index.html in Finder
```

**Option 2 — Serve locally (recommended for audio to work properly):**
```bash
npx serve .
```
Then open `http://localhost:3000` in your browser.

> ⚠️ **Audio Note:** Browsers block audio until the user interacts with the page. Clicking the bell button counts as the first interaction, so sound works automatically.

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Semantic structure, ARIA accessibility |
| CSS3 | 3D transforms, keyframe animations, glassmorphism effects |
| Vanilla JavaScript | Interaction logic, animation sequencing |
| Web Audio API | Bell, creak, and horror scream — no audio files needed |
| Google Fonts | *Creepster* (title) + *Inter* (body) |

---

## 🎨 Design

- **Color palette:** Deep stone grays, blood reds, and warm gold accents
- **Typography:** Creepster for the horror title, Inter for UI text
- **Animations:** CSS `perspective` + `rotateY` for the door, `@keyframes` for shake/flash/zoom
- **Particles:** 35 floating ember particles generated dynamically in JS

---

## 📄 License

Made for fun. Do whatever you want with it. 👻
