"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import SafeThreeCanvas from '@/components/ui/SafeThreeCanvas';
import * as THREE from 'three';

function Wave() {
    const ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (ref.current) {
            // Simple ambient wave animation matches "Heartbeat" idea
            const time = state.clock.getElapsedTime();
            const geometry = ref.current.geometry;
            const position = geometry.attributes.position;

            for (let i = 0; i < position.count; i++) {
                const x = position.getX(i);
                // Sine wave calculation
                const y = Math.sin(x * 0.2 + time * 1.5) * 0.5 + Math.sin(x * 0.5 + time * 0.5) * 0.2;
                position.setY(i, y);
            }
            position.needsUpdate = true;
        }
    });

    return (
        <mesh ref={ref} position={[0, -4, 0]} rotation={[0.2, 0, 0]}>
            <planeGeometry args={[20, 4, 100, 20]} />
            <meshBasicMaterial color="#d4af37" wireframe transparent opacity={0.2} />
        </mesh>
    );
}

export default function AudioReactiveWave() {
    return (
        <div className="fixed bottom-0 left-0 w-full h-[200px] pointer-events-none z-10 mix-blend-screen">
            <SafeThreeCanvas camera={{ position: [0, 0, 5] }}>
                <Wave />
            </SafeThreeCanvas>
        </div>
    );
}
