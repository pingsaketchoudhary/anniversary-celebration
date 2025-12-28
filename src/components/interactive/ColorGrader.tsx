"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ColorGrader() {
    useEffect(() => {
        // Define Sections and their Atmosphere
        // Hero -> Midnight Mystery (#0a0a0a) - Default
        // Memory Lane -> Vintage Warmth (#1a1205) - Sepia Tone
        // Future -> Cosmic Magic (#090415) - Deep Indigo

        ScrollTrigger.create({
            trigger: "body",
            start: "10% top",
            end: "40% top",
            onEnter: () => gsap.to("body", { backgroundColor: "#1c1408", duration: 1.5 }), // Warm Sepia
            onLeaveBack: () => gsap.to("body", { backgroundColor: "#0a0a0a", duration: 1.5 })  // Back to Black
        });

        ScrollTrigger.create({
            trigger: "body",
            start: "70% top",
            end: "bottom bottom",
            onEnter: () => gsap.to("body", { backgroundColor: "#090415", duration: 1.5 }), // Deep Indigo
            onLeaveBack: () => gsap.to("body", { backgroundColor: "#1c1408", duration: 1.5 })   // Back to Sepia
        });

    }, []);

    return null; // Logic only
}
