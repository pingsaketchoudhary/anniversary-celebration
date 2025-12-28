"use client";

import { useEffect, useRef } from "react";

export default function SpatialAudio() {
    const audioContextRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        // Initialize Audio Context on user interaction
        const initAudio = () => {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
        };

        window.addEventListener('click', initAudio, { once: true });
        return () => window.removeEventListener('click', initAudio);
    }, []);

    useEffect(() => {
        const handleHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Play sound if hovering over interactive elements
            if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('.memory-card')) {
                playSound('hover');
            }
        };

        // Throttled scroll sound could go here, but let's keep it subtle for now.

        window.addEventListener('mouseover', handleHover);
        return () => window.removeEventListener('mouseover', handleHover);
    }, []);

    const playSound = (type: 'hover' | 'click') => {
        if (!audioContextRef.current) return;
        const ctx = audioContextRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        const now = ctx.currentTime;

        if (type === 'hover') {
            // High frequency, short "glass" ping
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);

            gain.gain.setValueAtTime(0.02, now); // Very quiet
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

            osc.start(now);
            osc.stop(now + 0.05);
        }
    };

    return null; // Logic only component
}
