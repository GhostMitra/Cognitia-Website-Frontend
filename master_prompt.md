# 🕸️ MASTER PROMPT: Cognitia — Spidey Tracker Device & Multiverse Hackathon Platform

## 🎯 Task Objective
Build a state-of-the-art, high-energy **Spider-Man / Spider-Verse themed Hackathon Web Application** named **Cognitia**. 
The entire web application is visually encased inside an interactive **"Spidey Tracker" Device Frame** (featuring retro 8-bit/sci-fi hardware bezels, glowing LED indicators, corner pixel spiders, tactile buttons, and a bottom ticker bar). 

Inside the Spidey Tracker screen, the app features a rich, responsive interface with 12 distinct pages accessible via a custom **Spidey Radar Hamburger Menu**, connected to a **Supabase** backend for authentication, database storage, and real-time updates.

---

## 📱 Hardware Enclosure: The "Spidey Tracker" Device Frame

The entire viewport or main app viewport is wrapped inside a **Spidey Tracker Hardware Bezel**:

1. **Top Bezel & Branding**:
   - Central **"SPIDEY TRACKER"** pixel-art / metallic header badge with glowing spider eyes.
   - Corner pixel Spidey icons and bio-electric status LEDs (power, sync, alert).
2. **Side Controls**:
   - Interactive physical-style tactile buttons (Theme Toggle, Audio Mute, Spider-Sense Panic Trigger).
3. **Screen Viewport Container**:
   - Inner screen area where the 12 dynamic app pages render with CRT scanline option, ambient screen glow, and inner shadow.
4. **Bottom Control Bar**:
   - Retro scrolling news ticker displaying live hackathon announcements (*"SPIDEY SIGHTINGS: 63 UNEXPLORED HACKER TEAMS..."*).
   - Pixel speaker toggle for ambient Web Audio sound effects.
   - Outer frame action buttons: `[ 🎬 WATCH TRAILER ]` (opens promo video modal) and `[ 🎟️ GET TICKETS / REGISTER ]` (quick route to Registration).

---

## 🎨 Visual Aesthetics & Multiverse Design System

### 1. Multiverse Color Themes (5 Presets)
- 🔴 **Earth-616 (Classic Spidey)**: Crimson (`#E62429`), Deep Web Blue (`#091526`), Web Gold (`#FFD700`).
- ⚡ **Earth-1610 (Miles Morales)**: Dark Stealth (`#0D0D11`), Bio-Electric Neon Red (`#FF003C`), Glitch Yellow (`#FFE600`).
- 🌸 **Earth-65 (Spider-Gwen)**: Web White (`#F8F9FA`), Neon Magenta (`#FF007A`), Hooded Cyan (`#00F0FF`).
- 🏙️ **Earth-928 (Spider-Man 2099)**: Cyberpunk Indigo (`#0B0E28`), Holographic Crimson (`#FF0055`), Cyber Cyan (`#00E5FF`).
- 🕵️ **Earth-90214 (Spider-Noir)**: Sepia Monochrome (`#121212`), Vintage Film Grain, Sepia Cream (`#F5E6CA`).

### 2. Styling Tokens
- **Borders & Skews**: Slanted comic badges (`transform: skewX(-6deg)`), heavy comic outlines (`border-4 border-black`), halftone dot overlay gradients.
- **Typography**: Display headlines (Bungee / Bebas Neue), Monospace code tags (Fira Code), Comic action tags ("THWIP!", "BANG!", "SPIDER-SENSE TINGLING").

---

## 🗄️ Backend Infrastructure: Supabase Integration

### 1. Supabase Services Setup
- **Supabase Auth**: Email/Password login, GitHub OAuth, and session persistence.
- **Supabase Database (PostgreSQL)**:
  - `profiles`: User IDs, handles, avatar URLs, role (Developer, Designer, AI Specialist, Cyber Security), bio, universe preference.
  - `registrations`: User ID, team ID, track selected, t-shirt size, dietary/accessibility info, registration status (`pending`, `confirmed`, `checked_in`).
  - `teams`: Team name, team code, leader ID, member IDs, track ID, status.
  - `submissions`: Team ID, project title, elevator pitch, repository URL, live demo link, video URL, track ID, screenshot URLs, submission timestamp.
  - `payments`: User ID, transaction reference ID, payment tier (`Free Hacker`, `VIP Swag Pass`), amount, status (`success`, `pending`, `failed`), receipt JSON.
  - `sponsors`: Sponsor name, tier (`Stark Tech`, `Oscorp`, `Parker Tech`), logo URL, challenge description, API docs link.
- **Supabase Storage Buckets**:
  - `avatars`: User profile picture uploads.
  - `project-media`: Screenshots, demo videos, and badges.
- **Supabase Realtime**: Live ticker updates, registration counter, submission leaderboard.

---

## 🍔 Navigation: Spidey Hamburger Menu & Radar Router

A fixed **Spider-Web Hamburger Icon** opens a full-screen **Spider-Radar Overlay Menu** displaying radar sweep animations and direct links to all 12 pages:

```text
[🕸️ SPIDEY RADAR MENU]
├── 🏠 1. Landing Page
├── 📝 2. Registration Page
├── 📤 3. Submission Page
├── 💳 4. Payment Page (Result)
├── 📜 5. Rules & Regulations Page
├── 🎯 6. Track Page
├── ⏳ 7. Timeline Page
├── 🤝 8. Sponsor Page
├── 👥 9. Members Page (Team Finder)
├── 🏆 10. Prizes Page
├── ❓ 11. FAQ Page
└── ⚙️ 12. Interface (Settings & Customization) Page
```

---

## 📑 Detailed Page Blueprint (12 Pages)

### 1. 🏠 Landing Page
- **Hero Unit**: Cognitia Official Logo, comic tagline *"GREAT POWER. GREAT CODE."*, live participant counter synced with Supabase Realtime.
- **Live Countdown**: Web-ring timers counting down to kick-off.
- **Interactive Web Shooter Canvas**: Dynamic cursor web-threads & "THWIP!" web splash on click.
- **Quick Action CTAs**: Direct buttons to Register, Untangle Mini-Game, and View Tracks.

### 2. 📝 Registration Page
- **Supabase Auth & Multi-Step Form**:
  - Step 1: Account Creation (Email/Password or GitHub OAuth).
  - Step 2: Hacker Profile (Handle, Skills, Spider Role, Multiverse Universe).
  - Step 3: Track Selection & Logistics (T-Shirt Size, Team creation/join code).
- **Instant Digital Pass Preview**: Real-time rendering of personalized Spider-Verse Access Pass as form data is filled.

### 3. 📤 Submission Page
- **Project Portal for Hackathon Teams**:
  - Form fields: Project Title, Elevator Pitch, Track Category, GitHub Repository URL, Live Web App URL, Video Demo URL.
  - Media Upload: Drag-and-drop screenshot uploads to Supabase Storage bucket.
  - Tech Stack Tag Selector (React, Supabase, Python, AI/ML, Web3, etc.).
  - Submission Status Badge (`Draft`, `Submitted`, `Under Review`).

### 4. 💳 Payment Page (Result & Verification)
- **Payment & VIP Swag Deposit Confirmation**:
  - Options: Free Hacker Registration vs. VIP Oscorp Swag Box ($15 / Deposit).
  - Simulated payment gateway integration (Stripe / Razorpay mock interface) with instant result processing.
  - **Transaction Receipt Card**: Displays Transaction ID, Payment Status (`SUCCESS`), Amount, Timestamp, and downloadable PDF/PNG Payment Receipt Badge.

### 5. 📜 Rules & Regulations Page
- **Hacker Code of Conduct & Guidelines**:
  - Sections: Fair Play & Original Code Policy, Team Size Rules (1-4 members), Submission Deadlines, IP Ownership (Hackers retain 100%), Judging Rubric (Innovation, Technical Execution, Design, Theme Relevance).
  - Interactive Search Bar & Rule Category Filter.

### 6. 🎯 Track Page
- **4 Spider-Verse Bounties & Tracks**:
  - **AI Web-Slingers**: Autonomous Agents, LLMs, Computer Vision.
  - **Decentralized Spider-Net**: Peer-to-Peer, Web3, Smart Contracts.
  - **Cyber-Defense**: Zero-Trust, Encryption, Threat Detection.
  - **Multiverse Web Apps**: High-Aesthetics UI/UX, Web Canvas, Interactive Games.
- Detailed card modals with track problem statements, judging criteria, and sponsor bounties.

### 7. ⏳ Timeline Page
- **Interactive Event Roadmap**:
  - Timeline milestones: Pre-Registration -> Opening Ceremony & Thwip-Off -> Mentorship Hours -> Project Submission Cutoff -> Multiverse Demo Day -> Winner Announcement.
  - Status Indicator: Highlights current active milestone based on system time with live countdown timers per phase.

### 8. 🤝 Sponsor Page
- **Multiverse Industry Partners Grid**:
  - **Tier 1 (Stark Industries)**: Main Event Partner.
  - **Tier 2 (Oscorp Technologies)**: Cyber Security & Swag Sponsor.
  - **Tier 3 (Parker Tech & Horizon Labs)**: Developer Tools & API Credits.
- **Sponsor API Resource Center**: Download links for sponsor APIs, documentation, and specific sponsor challenge bounties.

### 9. 👥 Members Page (Team Finder & Hacker Directory)
- **Team Matchmaking & Hacker Directory**:
  - Filter hackers by role (Frontend, Backend, AI, Designer) and skills.
  - **"Recruit Web-Slinger" CTA**: Send team invitation via Supabase Realtime notifications.
  - Team creation drawer to manage current team members, assign roles, and share secret join codes.

### 10. 🏆 Prizes Page
- **Prize Showcase ($50,000+ Pool)**:
  - 🥇 1st Place (Grand Multiverse Champion): $20,000 + Oscorp Mentorship.
  - 🥈 2nd Place (Web-Slinger Runner-Up): $10,000 + Stark Tech Gear.
  - 🥉 3rd Place: $5,000.
  - Category Bounties: $2,500 each for AI, Security, Web3, and UI/UX.
  - Swag Kits: T-Shirts, Stickers, Customized Spider-Passes for top 100 teams.

### 11. ❓ FAQ Page
- **Interactive Comic Accordion**:
  - Searchable answers to FAQs (Who can participate? Are teams mandatory? Can I build before the event? What if I am a beginner?).
  - Direct "Ask Spidey Bot" button for instant help.

### 12. ⚙️ Interface (Settings & Customization) Page
- **App & Spidey Tracker Control Center**:
  - Multiverse Theme Switcher (Earth-616, 1610, 65, 928, 90214).
  - Audio FX Controls: Synthesizer volume slider, Mute/Unmute toggle, Sound test buttons (`Thwip`, `Spider-Sense`, `Victory`).
  - Screen Visual FX Controls: Toggle CRT Scanlines, Halftone Overlay, Motion Blur, Canvas Web Physics sensitivity.
  - Supabase Connection Status indicator.

---

## 🔊 Web Audio Synthesizer Engine (`src/audio/soundFX.js`)
Zero external MP3 dependency, procedural Web Audio synthesizer triggering sounds for:
- `thwip()`: Web shoot frequency sweep.
- `spiderSense()`: High vibrato panic chime.
- `glitchZap()`: Theme shift square-wave audio zap.
- `victoryChime()`: Major triad success arpeggio for payments, submissions, and mini-game completion.

---

## 🛠️ Implementation Checklist for AI Code Generator

1. **Setup Project**: Vite + React + Tailwind CSS + Lucide Icons + Supabase Client (`@supabase/supabase-js`).
2. **Spidey Tracker Shell (`SpideyTrackerLayout.jsx`)**: Build retro device bezel container around app router.
3. **Supabase Client Setup (`src/lib/supabase.js`)**: Initialize client with environment keys (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
4. **Router & Hamburger Menu (`Navbar.jsx` / `RadarMenu.jsx`)**: Implement single-page state or React Router switching between all 12 specified pages.
5. **Page Component Implementation**: Build all 12 page views with full responsive, high-aesthetic Spider-Verse styling.
6. **Real-time Engine**: Wire Supabase Realtime subscriptions to live submission feeds, registration counts, and member updates.
