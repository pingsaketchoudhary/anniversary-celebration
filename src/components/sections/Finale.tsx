"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Center, Text, Float } from "@react-three/drei";
import SafeThreeCanvas from "@/components/ui/SafeThreeCanvas";
import * as THREE from "three";
import { motion } from "framer-motion";
import Image from "next/image";

function Core({ charging, exploded, onExplode }: { charging: boolean, exploded: boolean, onExplode: () => void }) {
    // The core of the star that builds up energy
    const meshRef = useRef<THREE.Mesh>(null);
    const [scale, setScale] = useState(1);

    useFrame((state, delta) => {
        if (!meshRef.current || exploded) return;

        if (charging) {
            // Shake and grow
            const shake = Math.random() * 0.1;
            meshRef.current.position.x = shake;
            meshRef.current.position.y = shake;
            setScale(s => Math.min(s + delta * 2, 4)); // Grow
        } else {
            // Reset if not charging and not exploded
            meshRef.current.position.set(0, 0, 0);
            setScale(s => Math.max(s - delta * 4, 1)); // Shrink back fast
        }

        meshRef.current.rotation.z += delta * (charging ? 5 : 1);
        meshRef.current.rotation.x += delta * (charging ? 5 : 1);
    });

    return (
        <mesh
            ref={meshRef}
            scale={scale}
            visible={!exploded}
        >
            <sphereGeometry args={[0.5, 64, 64]} />
            <meshStandardMaterial
                color={charging ? "#fff" : "#ffD700"}
                emissive="#ffae00"
                emissiveIntensity={charging ? 5 : 2}
                toneMapped={false}
            />
        </mesh>
    );
}

function Shockwave({ exploded }: { exploded: boolean }) {
    const pointsRef = useRef<THREE.Points>(null);
    const count = 4000;

    // Initial random positions for debris
    const { positions, velocities } = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const vel = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // Sphere distribution
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 0.5 + Math.random() * 2; // Start around core

            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);

            // Explosion velocity
            const speed = 2 + Math.random() * 5;
            vel[i * 3] = Math.sin(phi) * Math.cos(theta) * speed;
            vel[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
            vel[i * 3 + 2] = Math.cos(phi) * speed;
        }
        return { positions: pos, velocities: vel };
    }, []);

    useFrame((state, delta) => {
        if (!pointsRef.current || !exploded) return;

        const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            pos[i * 3] += velocities[i * 3] * delta;
            pos[i * 3 + 1] += velocities[i * 3 + 1] * delta;
            pos[i * 3 + 2] += velocities[i * 3 + 2] * delta;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    if (!exploded) return null;

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial size={0.05} color="#ffd700" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
        </points>
    );
}

export default function Finale() {
    const [charging, setCharging] = useState(false);
    const [exploded, setExploded] = useState(false);

    // Logic: Hold for 2 seconds to explode
    const chargeTimeRef = useRef(0);

    // Trigger explosion
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (charging && !exploded) {
            interval = setInterval(() => {
                chargeTimeRef.current += 100;
                if (chargeTimeRef.current > 2000) {
                    setExploded(true);
                    setCharging(false);
                }
            }, 100);
        } else {
            chargeTimeRef.current = 0;
        }
        return () => clearInterval(interval);
    }, [charging, exploded]);

    return (
        <section
            className="h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden relative cursor-crosshair select-none"
            onMouseDown={() => !exploded && setCharging(true)}
            onMouseUp={() => setCharging(false)}
            onTouchStart={() => !exploded && setCharging(true)}
            onTouchEnd={() => setCharging(false)}
        >
            {!exploded && (
                <div className="absolute bottom-20 z-10 text-center pointer-events-none animate-pulse">
                    <p className="text-zinc-500 tracking-[0.4em] uppercase text-xs">
                        {charging ? "CHARGING..." : "HOLD TO RELEASE ENERGY"}
                    </p>
                </div>
            )}

            <SafeThreeCanvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <Core charging={charging} exploded={exploded} onExplode={() => setExploded(true)} />
                <Shockwave exploded={exploded} />
            </SafeThreeCanvas>

            {/* The Reveal */}
            {exploded && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="absolute inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-sm"
                >
                    <div className="absolute inset-0">
                        <Image
                            src="/memories/extra2.webp"
                            alt="Ending Background"
                            fill
                            className="object-cover opacity-40 mix-blend-overlay"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
                    </div>

                    <div className="text-center relative z-10 space-y-6 p-8">
                        <motion.h1
                            initial={{ scale: 2, filter: "blur(20px)" }}
                            animate={{ scale: 1, filter: "blur(0px)" }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="text-5xl md:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-600 drop-shadow-[0_0_30px_rgba(255,215,0,0.6)]"
                        >
                            Happy Anniversary
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5, duration: 1 }}
                            className="text-xl md:text-2xl text-ivory font-light font-sans tracking-[0.5em]"
                        >
                            ANOTHER YEAR OF US
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 3, duration: 2 }}
                            className="pt-12"
                        >
                            <p className="text-zinc-500 text-xs uppercase tracking-widest">
                                Forever & Always
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </section>
    );
}
