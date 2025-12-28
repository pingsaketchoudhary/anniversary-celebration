"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function LoveLetter() {
    const container = useRef<HTMLDivElement>(null);
    const isInView = useInView(container, { once: true, margin: "-20%" });

    const paragraph1 = "Three years passed in the blink of an eye, yet it feels like I have known you for lifetimes.";
    const paragraph2 = "Writing this, I realize how much we have built. Not just a relationship, but a life. A fortress of trust, laughter, and quiet moments that mean everything to me.";
    const paragraph3 = "Thank you for being my rock, my joy, and my greatest adventure.";
    const paragraph4 = "Here is to the next three, thirty, and three hundred years.";

    const TypewriterText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
        // Splitting into characters for realistic writing effect
        const characters = text.split("");
        return (
            <p className="font-handwriting text-2xl md:text-3xl leading-relaxed text-zinc-800 tracking-wide mb-6">
                {characters.map((char, index) => (
                    <motion.span
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{
                            duration: 0.05,
                            delay: delay + (index * 0.03), // Sequential writing speed
                            ease: "easeOut"
                        }}
                    >
                        {char}
                    </motion.span>
                ))}
            </p>
        );
    };

    return (
        <section ref={container} className="relative min-h-screen flex items-center justify-center bg-[#faf9f6] text-charcoal p-8 md:p-16 overflow-hidden">
            {/* Paper Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-60 pointer-events-none mix-blend-multiply" />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative max-w-4xl w-full bg-white/80 backdrop-blur-sm shadow-2xl p-12 md:p-24 rotate-1"
                style={{ borderRadius: "2px", boxShadow: "0 20px 50px rgba(0,0,0,0.15)" }}
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-zinc-100 to-transparent opacity-50 pointer-events-none" />

                <h3 className="font-serif text-xl mb-12 text-zinc-500 tracking-[0.2em] uppercase border-b border-gold/30 pb-4 inline-block">
                    My Dearest
                </h3>

                <div className="space-y-4">
                    <TypewriterText text={paragraph1} delay={0} />
                    <TypewriterText text={paragraph2} delay={3} />
                    <TypewriterText text={paragraph3} delay={9} />
                    <TypewriterText text={paragraph4} delay={12} />
                </div>

                <div className="mt-20 text-right">
                    <p className="font-serif text-sm text-zinc-500 tracking-widest uppercase mb-4">Forever Yours,</p>

                    {/* The Signature */}
                    <motion.div
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                        transition={{ delay: 15, duration: 3, ease: "easeInOut" }}
                        className="font-signature text-6xl md:text-8xl text-gold relative inline-block transform -rotate-6"
                    >
                        Saket
                        {/* Animated Underline */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: "100%" } : {}}
                            transition={{ delay: 18, duration: 1 }}
                            className="h-1 bg-gold/50 mt-2 rounded-full"
                        />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
