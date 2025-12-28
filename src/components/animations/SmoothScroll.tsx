"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css"; // Optional: if lenis ships css, but often manual CSS is needed. 
// Checked lenis docs: "lenis/dist/lenis.css" is recommended for auto setup.
// But if it fails importing, we can add global CSS manually.
// Trying verify lenis version: ^1.3.16. 
// Standard usage: import Lenis from 'lenis' and requestAnimationFrame loop or use standard react wrapper if available.
// I will use Manual setup for full control or use the react hook if available?
// The prompt said I installed 'lenis'.
// I'll use the manual RAF loop in a useEffect for maximum compatibility.

export default function SmoothScroll({ children }: { children: ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            // smoothTouch: false, // Default
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
