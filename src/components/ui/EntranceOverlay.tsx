"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export default function EntranceOverlay() {
    const [isVisible, setIsVisible] = useState(true);
    const [lines, setLines] = useState<string[]>([]);
    const [showButton, setShowButton] = useState(false);

    // Hacker text sequence
    const sequence = [
        "INITIALIZING CONNECTION...",
        "BYPASSING SECURITY PROTOCOL...",
        "ACCESSING CORE MEMORIES...",
        "ENCRYPTION KEY: PINGSAKETCHOUDHARY",
        "ACCESS GRANTED.",
        "WELCOME, USER."
    ];

    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let currentLine = 0;
        let charIndex = 0;
        let timeout: NodeJS.Timeout;

        const typeLine = () => {
            if (currentLine >= sequence.length) {
                setShowButton(true);
                return;
            }

            const line = sequence[currentLine];

            // Add entire line at once for "Super Fast" feel or char by char? 
            // User asked for "Super Fast" generally, but loader needs to be readable.
            // Let's do fast typing.

            // Logic: updating the last line in the array or adding new one
            setLines(prev => {
                const newLines = [...prev];
                if (newLines.length <= currentLine) newLines.push("");
                newLines[currentLine] = line.substring(0, charIndex + 1);
                return newLines;
            });

            charIndex++;

            if (charIndex < line.length) {
                timeout = setTimeout(typeLine, 30); // Fast typing speed
            } else {
                currentLine++;
                charIndex = 0;
                timeout = setTimeout(typeLine, 400); // Pause between lines
            }
        };

        timeout = setTimeout(typeLine, 1000); // Initial delay

        return () => clearTimeout(timeout);
    }, []);

    const handleEnter = () => {
        // Unlock Audio
        window.dispatchEvent(new CustomEvent("user-interaction-start"));

        const tl = gsap.timeline({
            onComplete: () => setIsVisible(false)
        });

        tl.to(containerRef.current, {
            clipPath: "inset(0 0 100% 0)", // Wipe up effect
            duration: 1.5,
            ease: "power4.inOut"
        });
    };

    if (!isVisible) return null;

    return (
        <div ref={containerRef} className="fixed inset-0 z-[9999] bg-black text-green-500 font-mono flex flex-col items-center justify-center p-8 select-none overflow-hidden">
            {/* Matrix Rain Effect Background (simplified with CSS for performance) */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(0deg,transparent_24%,rgba(0,255,0,.3)_25%,rgba(0,255,0,.3)_26%,transparent_27%,transparent_74%,rgba(0,255,0,.3)_75%,rgba(0,255,0,.3)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(0,255,0,.3)_25%,rgba(0,255,0,.3)_26%,transparent_27%,transparent_74%,rgba(0,255,0,.3)_75%,rgba(0,255,0,.3)_76%,transparent_77%,transparent)] bg-[length:50px_50px]" />

            <div ref={textRef} className="z-10 w-full max-w-2xl space-y-2">
                {lines.map((line, i) => (
                    <p key={i} className={`
                        text-lg md:text-xl tracking-wider
                        ${i === sequence.length - 1 ? "text-gold font-serif italic text-3xl md:text-5xl mt-8 animate-pulse shadow-gold" : "opacity-80"}
                    `}>
                        {i === sequence.length - 1 ? "✨ " + line + " ✨" : "> " + line}
                    </p>
                ))}
            </div>

            {showButton && (
                <button
                    onClick={handleEnter}
                    className="mt-16 px-8 py-3 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all duration-300 font-bold tracking-[0.2em] animate-bounce"
                >
                    [ ENTER_SYSTEM ]
                </button>
            )}

            {/* Scanline */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)50%,rgba(0,0,0,0.2)50%,rgba(0,0,0,0.2))] bg-[length:100%_4px] opacity-20" />
        </div>
    );
}
