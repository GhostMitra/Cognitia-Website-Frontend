# COGNITIA 2026 — MASTER PROMPT SPECIFICATION

This master prompt specifies the complete design, architecture, feature set, tech stack, and implementation details for **Cognitia 2026: Spidey Tracker & Multiverse Hackathon Web App**.

---

## 1. Overview & Conceptual Vision
Cognitia 2026 is an immersive, Marvel Comic-styled, 8-Universe Multiverse Hackathon web application built inside a virtual hardware device called **"Spidey Tracker"**.

Users navigate through 8 Multiverse dimensions (Cyberpunk 2077, COD Warzone, GTA VI Vice City, Miles Morales, Classic Spidey, Spider-Gwen, Spider-Man 2099, Spider-Noir) with dynamic color themes, retro CRT scanline filters, Web-Shooter audio soundFX, theme-customized reticle cursors, an interactive 7-dot anomaly catch mini-game, and PWA (Progressive Web App) home screen installation.

---

## 2. Technology Stack & Architecture
- **Core Framework**: React 18 + Vite
- **Styling**: Tailwind CSS v4 + Custom HSL Theme Variables (`src/index.css`)
- **Icons**: Lucide React
- **Audio Synthesizer**: Web Audio API Sound Generator (`src/audio/soundFX.js`)
- **PWA Integration**: Web App Manifest (`public/manifest.json`) + Service Worker (`public/sw.js`)
- **Persistence**: LocalStorage theme state (`cognitia_spidey_theme`)
- **Visual FX**: HTML5 Canvas Web Shooter Line (`WebCanvas.jsx`), Canvas Confetti, CRT Scanlines, Halftone overlays

---

## 3. 8 Multiverse Themes & CSS Tokens

All themes are defined as CSS root variables in `src/index.css` and managed via `ThemeContext.jsx`:

1. 🌆 **Earth-2077**: Cyberpunk 2077 x Spider-Man (`#FCEE09` Cyberpunk Yellow & `#00F0FF` Neon Cyan)
2. 🪖 **Earth-141**: Call of Duty Modern Warfare x Spider-Man (`#FF9900` Warzone Tactical Orange & `#00FFCC` Cyber Green)
3. 🌴 **Earth-69**: GTA VI Vice City Miami x Spider-Man (`#FF007F` Vice City Neon Magenta & `#FF5E36` Sunset Coral)
4. ⚡ **Earth-1610**: Miles Morales Brooklyn Bio-Electric (`#FF003C` Bio-Red & `#FFE600` Lightning Yellow)
5. 🔴 **Earth-616**: Classic Peter Parker (`#E62429` Bronze Age Red & `#00F0FF` Web Blue)
6. 🌸 **Earth-65**: Spider-Gwen Neon Magenta (`#FF007A` Neon Magenta & `#00F0FF` Turquoise)
7. 🏙️ **Earth-928**: Spider-Man 2099 Cybernetic (`#FF0055` Holographic Red & `#00E5FF` Cyber Blue)
8. 🕵️ **Earth-90214**: Spider-Noir 1930 Detective (`#D4AF37` Vintage Gold & `#F5E6CA` Sepia Monochromatic)

---

## 4. Hardware Device Frame & Interface Components

### A. Spidey Tracker Frame (`SpideyTrackerFrame.jsx`)
- Outer hardware device bezel with double-goggle mask badge, center `[ SPIDEY 🔴 TRACKER ]` hardware logo, and top-right spider badge.
- Header Bar: Live status LEDs (`🟢 ONLINE` + Active Universe), `[ ☰ SPIDEY RADAR ]` menu trigger button.
- Footer Bar: Real-time countdown marquee ticker, `[ 🎬 TRAILER ]` promo video button, audio mute toggle, CRT scanline toggle, and `[ 🎟️ TICKETS ]` CTA button.
- Bottom Hardware Footer: Official **COGNITIA 2026** glowing logo footer.

### B. 3-Step PWA Boot Sequence (`SpideyLoadingScreen.jsx`)
- **Step 1 (OS Boot)**: Dangling pixel Spidey on web string, real-time diagnostic terminal boot logs, pixel loading bar (`0%` -> `100%`).
- **Step 2 (Universe Theme Selector)**: 8 Multiverse theme cards grid with active selection, audio synthesizer toggle, and `NEXT: PWA INSTALL SETUP ➔` button.
- **Step 3 (PWA App Installation Setup)**: Dedicated PWA installation modal prompting `📱 INSTALL APP TO HOME SCREEN` or `🚀 ENTER MULTIVERSE HACKATHON NOW`.

### C. Theme-Customized Reticle Cursor (`SpideyCursor.jsx`)
- Reticle cursor automatically recolors to active theme's primary (`var(--color-primary)`) and secondary colors.
- Displays target crosshairs on hover over interactive elements (`button`, `a`, `input`).
- 8-directional click web splatters and auto-fading web trail line that disappears when mouse stops moving.
- Automatically disabled on mobile touch viewports (`< 768px`).

### D. Integrated Embedded Alert Pop-Up (`SpideyAlert.jsx`)
- Replaces standard browser alert dialogs with an embedded in-screen comic pop-up window featuring comic soundFX (`soundFX.spiderSense()`).

---

## 5. Web Shooter 7-Dot Anomaly Catch Game (`MiniGamePage.jsx`)
- **Objective**: Catch 7 fast-moving glitched anomaly dots bouncing around the arena within 30 seconds using your Web-Shooter!
- **Mechanics**: Tap/click moving dots to fire web shooter strands (`THWIP!`). Caught dots turn green `✓` and update live score `[ X / 7 CAUGHT ]`.
- **Victory Condition**: Catching all 7 dots before 30 seconds triggers victory sound FX and confetti explosions!

---

## 6. Complete 13 Page Views
1. `LandingPage.jsx`: Dynamic universe lore, 3D slanted headers, dialogue quote panels, 4-column countdown timer grid, 8-theme ERA TONE bar.
2. `RegistrationPage.jsx`: Free Multiverse Spider-Pass multi-step registration & live digital access pass generator.
3. `TrackPage.jsx`: 4 Bounty Tracks ($15K AI Agents, $12K Cybersecurity, $12K Vice Web3, $11K Open Innovation).
4. `TimelinePage.jsx`: 6-Phase Hackathon Roadmap from registration to grand finale.
5. `PrizesPage.jsx`: $50,000+ podium cash prize pool & trophy breakdown.
6. `SponsorPage.jsx`: Industry partners (Stark Industries, Oscorp Corp, Daily Bugle, Web3 Ventures).
7. `MembersPage.jsx`: Hacker directory & matchmaking with real-time search & team invite triggers.
8. `FaqPage.jsx`: Accordion FAQs & real-time Ask Spidey Bot AI chat assistant.
9. `RulesPage.jsx`: Code of conduct & hackathon rules.
10. `SubmissionPage.jsx`: Project submission portal for repository & video demo links.
11. `PaymentPage.jsx`: Free $0.00 Spider-Pass digital ticket receipt claim.
12. `SettingsPage.jsx`: Soundboard audio test buttons & system preferences.
13. `MiniGamePage.jsx`: Web-Shooter 7-Dot Anomaly Catch Game (30s Timer).

---

## 7. Directory Structure

```
Cognitia-Website-Frontend/
├── public/
│   ├── manifest.json         # PWA Web App Manifest
│   └── sw.js                 # PWA Offline Service Worker
├── src/
│   ├── audio/
│   │   └── soundFX.js        # Web Audio API Sound Generator
│   ├── components/
│   │   ├── RadarMenu.jsx            # Left Navigation Sidebar
│   │   ├── SpideyAlert.jsx          # Embedded In-Screen Alert
│   │   ├── SpideyCursor.jsx         # Custom Reticle Cursor & Web Splatter
│   │   ├── SpideyLoadingScreen.jsx  # 3-Step Boot & PWA Install Setup
│   │   ├── SpideyTrackerFrame.jsx   # Virtual Hardware Device Frame
│   │   ├── TrailerModal.jsx         # Video Trailer Modal
│   │   └── WebCanvas.jsx            # Interactive Web Background Layer
│   ├── context/
│   │   └── ThemeContext.jsx         # 8 Theme State, LocalStorage, PWA Prompts
│   ├── pages/
│   │   ├── FaqPage.jsx
│   │   ├── LandingPage.jsx
│   │   ├── MembersPage.jsx
│   │   ├── MiniGamePage.jsx
│   │   ├── PaymentPage.jsx
│   │   ├── PrizesPage.jsx
│   │   ├── RegistrationPage.jsx
│   │   ├── RulesPage.jsx
│   │   ├── SettingsPage.jsx
│   │   ├── SponsorPage.jsx
│   │   ├── SubmissionPage.jsx
│   │   ├── TimelinePage.jsx
│   │   └── TrackPage.jsx
│   ├── App.jsx               # Router & Page Manager
│   ├── index.css             # Tailwind v4 & HSL Theme Variables
│   └── main.jsx
├── index.html                # PWA Meta Tags & Font Imports
├── master_prompt.md          # Master Specification Specification
├── package.json
└── vite.config.js
```

---

## 8. Deployment & Build Commands
- **Dev Server**: `npx vite --port 3000`
- **Production Build**: `npx vite build`
- **Git Branch**: `debarghaya`
- **Repository**: `https://github.com/GhostMitra/Cognitia-Website-Frontend`
