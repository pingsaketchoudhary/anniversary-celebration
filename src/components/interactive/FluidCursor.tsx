"use client";

import { useEffect, useRef } from "react";

export default function FluidCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const particles: Particle[] = [];
        const cursor = { x: -100, y: -100 };

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            life: number;
            color: string;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 2 + 1; // 1-3px gold dust
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
                this.life = 1; // 100% opacity
                this.color = `rgba(212, 175, 55, ${this.life})`; // Gold #d4af37
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.life -= 0.02; // Fade out speed
                if (this.size > 0.1) this.size -= 0.05;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = `rgba(212, 175, 55, ${this.life})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const onResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        const onMouseMove = (e: MouseEvent) => {
            cursor.x = e.clientX;
            cursor.y = e.clientY;
            // Create particles on move
            for (let i = 0; i < 3; i++) {
                particles.push(new Particle(cursor.x, cursor.y));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                if (particles[i].life <= 0) {
                    particles.splice(i, 1);
                    i--;
                }
            }
            requestAnimationFrame(animate);
        };

        window.addEventListener("resize", onResize);
        window.addEventListener("mousemove", onMouseMove);
        animate();

        return () => {
            window.removeEventListener("resize", onResize);
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[9999]" />;
}
