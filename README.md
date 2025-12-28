# 🌌 Anniversary Celebration | Interactive Cinematic Experience

> *"Love is not just an emotion; it is an experience that transcends time and space."*

<div align="center">

[![Made with Love](https://img.shields.io/badge/Made%20with-Love-ff0000.svg?style=for-the-badge)](https://github.com/pingsaketchoudhary)
[![Deployment Status](https://img.shields.io/badge/Deployment-Live-success?style=for-the-badge&logo=vercel)](https://anniversary-celebration.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38b2ac?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-black?style=for-the-badge&logo=three.js)](https://docs.pmnd.rs/react-three-fiber)
[![GSAP](https://img.shields.io/badge/GSAP-3.0-88ce02?style=for-the-badge&logo=greensock)](https://greensock.com/)

</div>

---

## 📖 Introduction

**Anniversary Celebration** is more than just a website; it is a **digital love letter** crafted with the precision of modern engineering and the art of storytelling. Designed to celebrate a significant romantic milestone, this project pushes the boundaries of web interactivity to create an emotional journey for the user.

Moving beyond static images and text, this application creates a living, breathing universe where memories drift like stars and emotions are visualized through light and motion.

## 🎨 Design Philosophy: "Cosmic Luxury"

The visual identity of this project is built on the concept of **Eternal Connection**.

### 🌌 The Aesthetic
- **Deep Space Palette**: We utilize `Useable Black` (#0a0a0a) and `Charcoal` instead of pure black to reduce eye strain while maintaining infinite depth.
- **Golden Accents**: Typography and key interactive elements use a gradient Gold texture, symbolizing the preciousness of the memories.
- **Glassmorphism**: UI elements feature high-quality frosted glass effects (`backdrop-filter: blur`), adding a layer of sophisticated modernism.

### 🎭 Cinematic Storytelling
- **The "Hacker" Entrance**: The journey begins with a terminal-style CLI overlay. This "Encrypted" entry represents the privacy and exclusivity of the bond—only those with the key can enter.
- **Parallax Timeline**: `MemoryLane` isn't just a scroll; it's a walk through time. Images tilt and shift in 3D space based on mouse movement, giving them physical weight.
- **The Big Bang**: The finale isn't a simple footer. It is an interactive particle explosion, representing the expanding universe of the future.

## 🛠️ Technical Architecture

This project is built on a **High-Performance Creative Stack** designed for 60fps animations on all devices.

### Why Next.js 14 (App Router)?
- **Server Components**: We leverage React Server Components (RSC) to keep the initial bundle size low, hydrating only the interactive islands (like the 3D canvas).
- **Optimization**: Automatic image optimization (`next/image`) ensures that high-fidelity memories load instantly without layout shift (CLS).

### Why React Three Fiber (R3F)?
- **Declarative 3D**: R3F allows us to build complex 3D scenes (like the Starfield and Galaxy Gallery) as manageable React components.
- **Performance**: It efficiently manages the WebGL loop, ensuring that our `Canvas` renders seamlessly alongside DOM elements.

### Why GSAP?
- **Timeline Control**: Complex sequences (like the entrance animation or the timeline scrub) require precise timing that CSS cannot provide. GSAP's `ScrollTrigger` powers the `MemoryLane` pinning and scrub effects.

## ✨ Core Features

| Feature | Technology | Description |
|:---|:---|:---|
| **🔐 Secure Entrance** | `React State` + `Typewriter` | A matrix-style entry that sets the mood and "authenticates" the user. |
| **📜 3D Memory Lane** | `GSAP ScrollTrigger` | A horizontal scroll experience where cards react to mouse tilt and scroll velocity. |
| **🌌 Galaxy Gallery** | `Three.js` + `Framer Motion` | A rotating 3D carousel of memories that feels like floating in space. |
| **💌 Dynamic Letter** | `Framer Motion` | A text-reveal effect that mimics the natural flow of handwriting. |
| **🎵 Spatial Audio** | `Web Audio API` | Ambient background music that persists across the experience with fade controls. |

## 🚀 Installation & Setup

Want to create your own digital tribute? Follow these steps to get this running locally.

### Prerequisites
- Node.js 18.17+ 
- npm or yarn

### Steps
1.  **Clone the Repository**
    ```bash
    git clone https://github.com/pingsaketchoudhary/anniversary-celebration.git
    cd anniversary-celebration
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```

4.  **Build for Production**
    ```bash
    npm run build
    ```

## 📂 Project Structure

```bash
src/
├── app/                  # Next.js App Router (Routes & Layouts)
├── components/
│   ├── 3d/               # R3F Canvas components (Stars, Galaxy)
│   ├── animations/       # GSAP & Framer Motion controllers
│   ├── interactive/      # Specialized UI (Magnetic text, Cursor)
│   ├── sections/         # Major scroll sections (Hero, Timeline)
│   └── ui/               # Reusable atoms (Buttons, Cards)
├── lib/                  # Utilities (Smooth Scroll, Math helpers)
└── styles/               # Tailwind & Global CSS
```

## 🤝 Customization Guide

- **Memories**: Drop your images into `public/assets/memories`. Ensure they are optimized (WebP recommended).
- **Story**: Edit `src/components/sections/LoveLetter.tsx` to rewrite the narrative.
- **Audio**: Replace `public/audio/bgm.mp3` with your track.

---

<div align="center">

**Developed with precision and passion.**

[🌐 Portfolio](https://github.com/pingsaketchoudhary) &nbsp;•&nbsp; [🐦 Twitter](https://twitter.com) &nbsp;•&nbsp; [💼 LinkedIn](https://linkedin.com)

&copy; 2024 Saket Kumar Choudhary. All Rights Reserved.

</div>
