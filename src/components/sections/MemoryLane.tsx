"use client";

import { useRef, useLayoutEffect, useState, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import MagneticText from "../interactive/MagneticText";

export default function MemoryLane() {
    const container = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const track = trackRef.current;
            if (!track) return;

            const scrollLength = track.scrollWidth - window.innerWidth;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top top",
                    end: `+=${scrollLength}px`,
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1
                }
            });

            tl.to(track, {
                x: -scrollLength,
                ease: "none"
            });

            gsap.to(progressBarRef.current, {
                width: "100%",
                ease: "none",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top top",
                    end: `+=${scrollLength}px`,
                    scrub: 1
                }
            });

        }, container);

        return () => ctx.revert();
    }, []);

    const memories = [
        {
            id: 1,
            year: "Year I",
            title: "The Spark",
            desc: "That very first moment. The look in your eyes that changed everything.",
            image: "/assets/memories/spark.webp"
        },
        {
            id: 2,
            year: "Year I",
            title: "First Adventure",
            desc: "The world felt bigger, brighter, and infinitely more beautiful with you.",
            image: "/assets/memories/adventure.webp"
        },
        {
            id: 3,
            year: "Year II",
            title: "Growing Closer",
            desc: "In the quiet moments, we found our loudest love.",
            image: "/assets/memories/closer.webp"
        },
        {
            id: 4,
            year: "Year II",
            title: "Challenges",
            desc: "Every storm we weathered only made our roots deeper.",
            image: "/assets/memories/challenges.webp"
        },
        {
            id: 5,
            year: "Year III",
            title: "Unbreakable",
            desc: "Three years later, and my heart still races for you. Forever.",
            image: "/assets/memories/unbreakable.webp"
        },
        {
            id: 6,
            year: "The Future",
            title: "Infinity",
            desc: "This is just the beginning of our endless story.",
            image: "/assets/stars-bg.webp" // Keeping placeholder for now
        },
    ];

    return (
        <section ref={container} className="relative h-screen bg-charcoal overflow-hidden perspective-1000">
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5 z-50">
                <div ref={progressBarRef} className="h-full bg-gold w-0" />
            </div>

            <div ref={trackRef} className="flex h-full w-max items-center px-[50vw]">
                <div className="w-[80vh] h-[60vh] flex items-center justify-center shrink-0 mr-32 opacity-10">
                    <MagneticText text="TIMELINE" className="text-6xl md:text-8xl font-serif text-ivory tracking-widest" />
                </div>

                {memories.map((memory, index) => (
                    <HoloCard key={memory.id} memory={memory} index={index} />
                ))}

                <div className="w-[80vh] h-[60vh] flex items-center justify-center shrink-0 ml-32 opacity-10">
                    <MagneticText text="INFINITY" className="text-6xl md:text-8xl font-serif text-ivory tracking-widest" />
                </div>
            </div>
        </section>
    );
}

function HoloCard({ memory, index }: { memory: any, index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transformStyle, setTransformStyle] = useState({});
    const [shineStyle, setShineStyle] = useState({});

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Subtle tilt - realistic physics
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        setTransformStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`,
            boxShadow: `${-rotateY * 2}px ${rotateX * 2}px 30px rgba(0,0,0,0.5)` // Real-time shadow
        });

        // Specular Shine
        setShineStyle({
            background: `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15) 0%, transparent 60%)`
        });
    };

    const handleMouseLeave = () => {
        setTransformStyle({
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
        });
        setShineStyle({ background: 'transparent' });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ ...transformStyle, transition: 'transform 0.2s ease-out, box-shadow 0.2s ease-out' }}
            className={`
                relative shrink-0 w-[350px] md:w-[450px] h-[65vh] mx-12 
                flex flex-col justify-end 
                rounded-sm cursor-pointer group 
                bg-black/40 backdrop-blur-md border border-white/5
                overflow-hidden
            `}
        >
            {/* Image Container with Parallax Zoom */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                    src={memory.image}
                    alt={memory.title}
                    fill
                    className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000 ease-out grayscale-[0.2] group-hover:grayscale-0"
                    sizes="(max-width: 768px) 100vw, 450px"
                />
                {/* Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            </div>

            {/* Realistic Specular Reflection Layer */}
            <div
                className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay"
                style={shineStyle}
            />

            {/* Glass Surface detail (Noise/Scratch for realism) */}
            <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/noise.png')]" />


            <div className="absolute top-6 left-6 z-20">
                <span className="font-serif italic text-gold text-lg">
                    {memory.year}
                </span>
            </div>

            <div className="relative z-30 p-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="font-serif text-4xl text-ivory mb-3 tracking-wide">{memory.title}</h3>
                <p className="font-sans text-zinc-400 text-sm leading-relaxed border-l border-gold/30 pl-4">
                    {memory.desc}
                </p>
            </div>
        </div>
    );
}
