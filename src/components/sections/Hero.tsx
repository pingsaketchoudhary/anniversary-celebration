"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/animations/TextReveal";

export default function Hero() {
    const container = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Cinematic Intro Sequence
            const tl = gsap.timeline({
                defaults: { ease: "power3.out" }
            });

            tl.to(bgRef.current, {
                scale: 1,
                opacity: 0.8,
                duration: 2.5,
                ease: "expo.out"
            })
                .from(titleRef.current!.children, {
                    y: 100,
                    opacity: 0,
                    stagger: 0.2,
                    duration: 1.5,
                    filter: "blur(10px)",
                    transformOrigin: "center center",
                    scale: 1.1
                }, "-=1.5");

            // Parallax on Scroll
            gsap.to(bgRef.current, {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Fade out title on scroll
            gsap.to(titleRef.current, {
                opacity: 0,
                y: -100,
                filter: "blur(20px)",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top top",
                    end: "50% top",
                    scrub: true
                }
            });

        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="relative h-screen flex flex-col items-center justify-center overflow-hidden perspective-1000 z-10">
            {/* Background is now handled by the global StarField component opacity-100 */}

            <div ref={titleRef} className="relative z-20 text-center flex flex-col items-center justify-center gap-2 mix-blend-exclusion pointer-events-none">
                <div className="overflow-hidden">
                    <h1 className="font-serif text-[12vw] md:text-[10vw] leading-[0.85] text-ivory tracking-tight uppercase opacity-90">
                        Three <span className="text-gold italic font-light">Years</span>
                    </h1>
                </div>
                <div className="overflow-hidden">
                    <h2 className="font-sans text-[4vw] md:text-[2vw] tracking-[0.5em] uppercase text-zinc-400 font-light mt-4">
                        One Journey
                    </h2>
                </div>
                <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-gold to-transparent mt-12 opacity-50" />
            </div>

            <div className="absolute bottom-12 z-20 flex flex-col items-center gap-3 opacity-60 mix-blend-difference">
                <span className="text-[10px] uppercase tracking-[0.3em] text-ivory/60 font-medium">Scroll to Discover</span>
            </div>
        </section>
    );
}
