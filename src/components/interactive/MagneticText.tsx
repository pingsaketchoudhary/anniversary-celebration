"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

export default function MagneticText({ text, className = "" }: { text: string; className?: string }) {
    return (
        <div className={`flex ${className}`}>
            {text.split("").map((char, i) => (
                <MagneticChar key={i} char={char} />
            ))}
        </div>
    );
}

function MagneticChar({ char }: { char: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const distance = Math.sqrt(Math.pow(clientX - centerX, 2) + Math.pow(clientY - centerY, 2));

        // Only attract if close
        if (distance < 100) {
            const x = (clientX - centerX) * 0.5; // Magnetic strength
            const y = (clientY - centerY) * 0.5;
            setPosition({ x, y });
        } else {
            setPosition({ x: 0, y: 0 });
        }
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.span
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="inline-block cursor-default"
        >
            {char === " " ? "\u00A0" : char}
        </motion.span>
    );
}
