"use client";

import { ReactNode, useEffect } from "react";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CinematicContainer({ children }: { children: ReactNode }) {
    useEffect(() => {
        // Optional: Add global scroll-triggered effects here
        const update = (time: number) => {
            // lenis.raf(time * 1000) // handled by ReactLenis automatically
        };

        // requestAnimationFrame(update);

        return () => {
            // cleanup
        };
    }, []);

    return (
        <ReactLenis root options={{ lerp: 0.12, duration: 1.0, wheelMultiplier: 1.5, smoothWheel: true }}>
            <div className="relative w-full min-h-screen overflow-x-hidden">
                {/* Cinematic Vignette - Deeper OLED black edges */}
                <div className="fixed inset-0 pointer-events-none z-[5] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_70%,#000000_100%)]" />

                {/* Grain overlay - Ultra Fine 4K Texture */}
                <div className="fixed inset-0 pointer-events-none z-[4] opacity-[0.03] mix-blend-overlay"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                />

                {/* Subtle Chromatic Aberration (RGB Shift) at edges via dual shadows */}
                <div className="fixed inset-0 pointer-events-none z-[6] opacity-30 shadow-[inset_0_0_100px_rgba(255,0,0,0.05),inset_0_0_100px_rgba(0,255,255,0.05)] mix-blend-screen" />


                {children}
            </div>
        </ReactLenis>
    );
}
