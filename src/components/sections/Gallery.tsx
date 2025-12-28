"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const memories = [
    { id: 1, src: "/memories/1.webp", caption: "Our Spark" },
    { id: 2, src: "/memories/2.webp", caption: "Dinner Dates" },
    { id: 3, src: "/memories/3.webp", caption: "Blessings" },
    { id: 4, src: "/memories/4.webp", caption: "Just You" },
    { id: 5, src: "/memories/5.webp", caption: "For You" },
    { id: 6, src: "/memories/6.webp", caption: "Timeless" },
    { id: 7, src: "/memories/7.webp", caption: "Joy" },
    { id: 8, src: "/memories/8.webp", caption: "Together" },
    { id: 9, src: "/memories/9.webp", caption: "Adventures" },
    { id: 10, src: "/memories/10.webp", caption: "Forever" },
];

export default function Gallery() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const towerRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    // Handle Mouse Move for Parallax Tilt
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current || activeIndex !== null) return;
        const { width, height, left, top } = containerRef.current.getBoundingClientRect();
        const x = e.clientX - left - width / 2;
        const y = e.clientY - top - height / 2;

        // Slight tilt effect
        setRotation({ x: -(y / height) * 15, y: (x / width) * 15 });
    };

    const handleMouseLeave = () => {
        if (activeIndex === null) setRotation({ x: 0, y: 0 });
    };

    return (
        <section
            className="relative h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden perspective-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={containerRef}
        >
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000000_100%)] -z-10" />

            <h2 className="absolute top-12 text-4xl md:text-5xl font-serif text-ivory tracking-widest z-10 mix-blend-difference pointer-events-none">
                Memories
            </h2>

            {/* 3D Tower Container */}
            <div
                className="relative w-full h-[60vh] preserve-3d transition-transform duration-100 ease-out mt-10 md:mt-0 flex items-center justify-center"
                ref={towerRef}
                style={{
                    transform: activeIndex === null
                        ? `perspective(2000px) rotateX(${rotation.x - 10}deg) rotateY(${rotation.y}deg)`
                        : 'none'
                }}
            >
                {/* Rotating Ring */}
                <motion.div
                    className="absolute inset-0 preserve-3d w-full h-full"
                    animate={activeIndex === null ? { rotateY: 360 } : { rotateY: 0 }}
                    transition={activeIndex === null
                        ? { duration: 80, repeat: Infinity, ease: "linear" } // Super Slow
                        : { duration: 0.5 }
                    }
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {memories.map((memory, index) => {
                        const theta = (index / memories.length) * 360;
                        // Responsive Radius Logic would be ideal, but for now let's use a CSS variable or safe large value that scales with transform.
                        // Actually, let's use a fixed larger radius for elegance. "md" check in JS is needed for perfect responsive radius.
                        // Let's assume desktop radius by default and scale down via CSS transform on parent if needed? 
                        // No, let's just pick a value that works. 600px is good for desktop. Mobile might need 350.
                        // We will set radius based on a simple effective technique: variable radius.
                        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                        const radius = isMobile ? 220 : 450;

                        return (
                            <div
                                key={memory.id}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                                onClick={() => setActiveIndex(index)}
                                style={{
                                    transform: `rotateY(${theta}deg) translateZ(${radius}px)`,
                                    backfaceVisibility: "hidden",
                                    width: isMobile ? "100px" : "180px", // Fixed small dimensions
                                    height: isMobile ? "140px" : "260px",
                                }}
                            >
                                {/* Card Frame */}
                                <div className="relative w-full h-full bg-black/80 border-[1px] border-white/20 backdrop-blur-md rounded-sm shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden transform transition-all duration-300 group-hover:scale-105 group-hover:border-gold group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                                    <Image
                                        src={memory.src}
                                        alt={memory.caption}
                                        fill
                                        className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                                        sizes="(max-width: 768px) 200px, 300px"
                                    />
                                    {/* Glossy Reflection Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <p className="text-ivory font-serif text-sm tracking-widest text-center uppercase">{memory.caption}</p>
                                    </div>
                                </div>

                                {/* Reflection on Floor */}
                                <div className="absolute -bottom-full left-0 w-full h-full transform scale-y-[-1] opacity-20 mask-image-linear-to-t">
                                    <Image
                                        src={memory.src}
                                        alt=""
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent" />
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
            </div>

            {/* Lightbox / Zoom View */}
            <AnimatePresence>
                {activeIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-12 cursor-zoom-out"
                        onClick={() => setActiveIndex(null)}
                    >
                        <motion.div
                            layoutId={`memory-${memories[activeIndex].id}`}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="relative relative w-full h-full max-w-5xl max-h-[90vh] rounded-lg overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.2)] border border-white/10"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                        >
                            <Image
                                src={memories[activeIndex].src}
                                alt={memories[activeIndex].caption}
                                fill
                                className="object-contain" // Contain to show full image without crop
                                quality={100}
                            />
                            {/* Close Button */}
                            <button
                                onClick={() => setActiveIndex(null)}
                                className="absolute top-4 right-4 w-12 h-12 bg-black/50 hover:bg-gold/80 rounded-full flex items-center justify-center text-white transition-colors border border-white/20 backdrop-blur-md"
                            >
                                ✕
                            </button>
                            <div className="absolute bottom-6 left-0 right-0 text-center">
                                <h3 className="text-3xl font-serif text-ivory tracking-widest drop-shadow-xl">{memories[activeIndex].caption}</h3>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="absolute bottom-12 text-zinc-500 text-xs tracking-[0.3em] pointer-events-none">
                CLICK TO EXPLORE MEMORIES
            </div>

            <style jsx global>{`
                .preserve-3d {
                    transform-style: preserve-3d;
                }
                .perspective-container {
                    perspective: 2000px; /* Enhanced depth */
                }
            `}</style>
        </section>
    );
}
