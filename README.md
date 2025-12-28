# 🌌 Anniversary Celebration | Interactive Experience

> "A journey through time and love, crafted with code and creativity."

[![Made with Love](https://img.shields.io/badge/Made%20with-Love-ff0000.svg)](https://github.com/pingsaketchoudhary)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38b2ac)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.0-88ce02)](https://greensock.com/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-black)](https://docs.pmnd.rs/react-three-fiber)

## 📖 Overview

**Anniversary Celebration** is an immersive, cinematic web experience designed to celebrate a special milestone. It combines advanced web technologies with artistic design to create a storytelling journey. From a "hacker-style" entrance to a 3D interactive timeline and a particle-filled finale, every section is crafted to evoke emotion and wonder.

This project demonstrates the power of **Creative Development**, blending high-performance animations, 3D graphics, and responsive design into a seamless user experience.

## ✨ Key Features

- **🔐 Matrix Entrance**: A secure, hacker-themed overlay with typing effects and "access granted" animations.
- **🌌 Cosmic Theme**: Consistent space and starlight aesthetic with deep dark modes and gold accents.
- **📜 Interactive Timeline**: A horizontal scroll 3D timeline (`MemoryLane`) featuring parallax cards and refractive glass effects.
- **🖼️ 3D Gallery**: A rotating 3D carousel of memories with light-box functionality.
- **💌 Love Letter**: A typewriter-effect personal message with a signature animation.
- **✨ Particle Effects**: Interactive cursor trails, star fields, and a "Big Bang" finale.
- **🎵 Global Audio**: Background ambient music with user controls.
- **📱 Fully Responsive**: Optimized for all devices, ensuring a premium experience on mobile and desktop.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [GSAP (GreenSock)](https://greensock.com/) & [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) & [Three.js](https://threejs.org/)
- **Fonts**: Inter, Playfair Display, Great Vibes, Cormorant Garamond (via `next/font`)

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/pingsaketchoudhary/anniversary-celebration.git
    cd anniversary-celebration
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```bash
src/
├── app/                  # Next.js App Router root
├── components/
│   ├── animations/       # GSAP & Animation logic
│   ├── interactive/      # Interactive elements (ColorGrader, Cursor)
│   ├── layout/           # CinematicContainer, Footer, etc.
│   ├── sections/         # Main page sections (Hero, MemoryLane, Gallery, etc.)
│   └── ui/               # Reusable UI components (Buttons, Overlays)
├── hooks/                # Custom React hooks
└── lib/                  # Utilities (Lenis scroll, etc.)
```

## 🎨 Customization

To make this your own:
1.  **Images**: Replace images in `public/assets/memories` and `public/memories`.
2.  **Text**: Update `src/components/sections/LoveLetter.tsx` and `YearOne.tsx` etc. with your own story.
3.  **Config**: Tweak animations in `src/components/animations`.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with <span style="color: #e25555;">&hearts;</span> by <strong>SaketKumarChoudhary</strong>
</p>
