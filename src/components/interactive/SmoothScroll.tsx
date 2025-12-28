"use client";

import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import { useRef } from 'react'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const contentRef = useRef<HTMLDivElement>(null)

    useLenis((lenis: any) => {
        const { velocity } = lenis;
        if (contentRef.current) {
            // "Liquid Reality" Effect
            // Apply skew based on scroll velocity
            // Clamp the skew to prevent extreme distortion (-5deg to 5deg)
            const skew = Math.min(Math.max(velocity * 0.05, -3), 3)

            // Use hardware accelerated transform
            contentRef.current.style.transform = `skewY(${skew}deg)`
            contentRef.current.style.transformOrigin = "center center"
        }
    })

    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
            <div ref={contentRef} className="liquid-container will-change-transform">
                {children}
            </div>
        </ReactLenis>
    )
}
