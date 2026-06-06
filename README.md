# 🔔 Dvarabell — The Door

**Someone is standing behind the door. The question is: will you ring the bell?**

Dvarabell is a small horror-themed web experience built with nothing but HTML, CSS, and JavaScript. What starts as a simple doorbell quickly turns into something much less welcoming. Ring the bell, watch the door slowly open, and discover what's waiting on the other side.

## What Happens?

* Ring the doorbell and hear it chime using the Web Audio API.
* Watch the door swing open with a smooth 3D animation.
* Experience atmospheric horror effects including fog, floating particles, screen shake, and unsettling sounds.
* Face a sudden jumpscare hidden behind the door.
* Hit **Try Again** if you're brave enough for another round.

## Features

* 🚪 Animated 3D door with realistic opening effects
* 🔔 Functional doorbell with synthesized audio
* 😱 Full-screen jumpscare with flash and zoom effects
* 📳 Screen shake for extra tension
* 🎵 Custom-generated horror sounds — no audio files required
* 🌫️ Fog, particles, and glowing visual effects
* 🔁 Easy reset and replay
* ♿ Keyboard and accessibility support

## Project Structure

```text
dvarabell-the-door/
├── index.html
├── style.css
├── script.js
├── jumpscare.png
└── README.md
```

## Running the Project

No installation or build tools are required.

### Open Directly

Simply open `index.html` in your browser.

### Run a Local Server (Recommended)

```bash
npx serve .
```

Then visit:

```text
http://localhost:3000
```

Some browsers handle Web Audio more reliably when served through a local server.

## Built With

| Technology    | Purpose                             |
| ------------- | ----------------------------------- |
| HTML5         | Structure and accessibility         |
| CSS3          | Styling, animations, and 3D effects |
| JavaScript    | Interaction and game logic          |
| Web Audio API | Generated sound effects             |
| Google Fonts  | Horror-themed typography            |

## Design Notes

Dvarabell uses a dark, horror-inspired visual style built around deep grays, blood-red accents, and eerie lighting effects. The goal was to create a complete horror experience without relying on external libraries, frameworks, or audio files.

## License

This project was created for fun and experimentation.

Feel free to use it, modify it, or build something even creepier with it. 👻
