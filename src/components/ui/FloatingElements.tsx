"use client";

import { useEffect, useRef } from "react";

class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    alpha: number;

    constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Brownian motion - very slow, random drift
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.size = Math.random() * 1.5; // Tiny dust specks
        this.alpha = Math.random() * 0.3 + 0.1; // Very subtle transparency
    }

    update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(250, 249, 246, ${this.alpha})`; // Ivory dust
        ctx.fill();
    }
}

export default function FloatingElements() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const updateCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        updateCanvasSize();
        window.addEventListener("resize", updateCanvasSize);

        const particles: Particle[] = [];
        const particleCount = 100; // More particles but smaller

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(canvas.width, canvas.height));
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                p.update(canvas.width, canvas.height);
                p.draw(ctx);
            });

            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", updateCanvasSize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />;
}
