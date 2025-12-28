"use client";

import { useState, useEffect, useRef } from "react";

export default function GlobalAudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Cache bust to ensure new file plays
        const audio = new Audio(`/assets/audio/romantic_bg.mp3?v=${Date.now()}`);
        audio.loop = true;
        audio.volume = 0.5; // Slightly louder for the song
        audioRef.current = audio;

        // Custom event triggered by EntranceOverlay
        const handleEntrance = () => {
            if (audioRef.current) {
                audioRef.current.play().catch(e => console.log("Play failed:", e));
                setIsPlaying(true);
            }
        };

        const handleInteraction = () => {
            if (audioRef.current && audioRef.current.paused) {
                audioRef.current.play().catch(e => console.log("Interaction play failed:", e));
                setIsPlaying(true);
            }
        };

        window.addEventListener("user-interaction-start", handleEntrance);
        window.addEventListener("click", handleInteraction, { once: true });

        // Attempt immediate play (will likely fail, but good to try)
        audio.play().catch(() => { });

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            window.removeEventListener("user-interaction-start", handleEntrance);
            window.removeEventListener("click", handleInteraction);
        };
    }, []);

    const toggleMute = () => {
        if (!audioRef.current) return;
        if (isMuted) {
            audioRef.current.muted = false;
            setIsMuted(false);
        } else {
            audioRef.current.muted = true;
            setIsMuted(true);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <button
                onClick={toggleMute}
                className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20 hover:bg-white/20 transition-all group"
            >
                {isMuted ? (
                    // Volume X (Muted) SVG
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60 group-hover:text-white w-6 h-6">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <line x1="23" x2="17" y1="9" y2="15" />
                        <line x1="17" x2="23" y1="9" y2="15" />
                    </svg>
                ) : (
                    // Volume 2 (Playing) SVG
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold group-hover:text-white w-6 h-6 animate-pulse">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                )}
            </button>
            <audio ref={audioRef} className="hidden" />
        </div>
    );
}
