"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/animations/TextReveal";

export default function YearTwo() {
    const container = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: container.current,
                start: "top top",
                end: "+=100%",
                pin: true,
                scrub: 1,
            });

            gsap.from(contentRef.current, {
                opacity: 0,
                scale: 0.9,
                scrollTrigger: {
                    trigger: container.current,
                    start: "top center",
                    end: "center center",
                    scrub: 1,
                },
            });

        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="relative min-h-screen flex items-center justify-center bg-zinc-900 p-8">
            <div ref={contentRef} className="max-w-3xl text-center space-y-8">
                <span className="block text-gold text-lg tracking-[0.3em] font-sans">CHAPTER II</span>
                <h2 className="text-4xl md:text-6xl font-serif text-ivory">Growth</h2>
                <p className="text-xl md:text-2xl text-zinc-300 font-serif leading-relaxed">
                    <TextReveal>We learned. We fought. We forgave. We became stronger.</TextReveal>
                </p>
                <p className="text-base text-zinc-500 font-sans max-w-xl mx-auto">
                    It wasn&apos;t always easy, but every challenge was a stepping stone to where we are now.
                </p>
            </div>
        </section>
    );
}
