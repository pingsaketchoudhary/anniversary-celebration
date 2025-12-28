"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
    children: string;
    className?: string;
    delay?: number;
    duration?: number;
    stagger?: number;
}

export default function TextReveal({
    children,
    className,
    delay = 0,
    duration = 1,
    stagger = 0.05,
}: TextRevealProps) {
    const el = useRef<HTMLSpanElement>(null);

    useLayoutEffect(() => {
        if (!el.current) return;

        // Simple word splitter
        const words = el.current.querySelectorAll(".word");

        const ctx = gsap.context(() => {
            gsap.fromTo(
                words,
                {
                    opacity: 0,
                    y: 20,
                    filter: "blur(8px)",
                },
                {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: duration,
                    stagger: stagger,
                    delay: delay,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });

        return () => ctx.revert();
    }, [delay, duration, stagger]);

    // Split text into words manually for hydration stability
    const wordsArray = children.split(" ");

    return (
        <span ref={el} className={clsx("inline-block leading-tight overflow-hidden", className)}>
            {wordsArray.map((word, i) => (
                <span key={i} className="word inline-block mr-[0.25em] will-change-transform">
                    {word}
                </span>
            ))}
        </span>
    );
}
