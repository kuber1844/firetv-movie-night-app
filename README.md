# 🎬 Family Movie Night (Fire TV)

A Fire TV app that ends the "what should we watch?" argument. Each family
member picks an age group and a mood, and the app recommends titles that
suit everyone in the room.

Built for the Amazon Developer Hackathon, Fire TV track
(priority categories: family entertainment, AI-enhanced viewing).

## Features
- Remote-friendly UI: D-pad / arrow-key navigation with clear focus states
- 10-foot design: large text, high contrast, safe screen margins
- Family profiles (2-4 people), each with an age group and a mood
- Recommendations that are age-appropriate for the youngest viewer
  and match as many moods as possible

## Tech stack
- React + Vite
- Plain CSS, built for TV screens

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:5173 and use the arrow keys, Enter, and Esc/Backspace
(these act like the Fire TV remote).

## Controls
| Key | Fire TV remote |
|---|---|
| Arrow keys | D-pad |
| Enter | Select |
| Esc / Backspace | Back |

## Screens
1. Home
2. Who's watching?
3. Tonight's picks