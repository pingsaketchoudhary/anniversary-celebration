"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import SafeThreeCanvas from "@/components/ui/SafeThreeCanvas";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

function Stars(props: any) {
    const ref = useRef<any>(null);
    // Optimized particle count: 9000 for Desktop, 3000 for Mobile
    const [sphere, setSphere] = useState(() => random.inSphere(new Float32Array(9000), { radius: 1.2 }));

    useEffect(() => {
        // Reduce load on mobile devices
        if (typeof window !== "undefined" && window.innerWidth < 768) {
            setSphere(random.inSphere(new Float32Array(3000), { radius: 1.2 }));
        }
    }, []);

    // Hydration fix
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            // Constant subtle flow
            ref.current.rotation.x -= delta / 15;
            ref.current.rotation.y -= delta / 20;

            // Interactive Sway based on mouse (normalized pointer: -1 to 1)
            const { x, y } = state.pointer;
            ref.current.rotation.x += y * 0.0005;
            ref.current.rotation.y += x * 0.0005;
        }
    });

    if (!mounted) return null;

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#ffdead" // NavajoWhite/Gold tint
                    size={0.0015} // Finer, more elegant stars
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.8}
                />
            </Points>
        </group>
    );
}

export default function StarField() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-80 mix-blend-screen">
            <SafeThreeCanvas camera={{ position: [0, 0, 1] }}>
                <Stars />
            </SafeThreeCanvas>
        </div>
    );
}
