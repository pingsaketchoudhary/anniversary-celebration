"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Cloud, Float } from "@react-three/drei";
import SafeThreeCanvas from "@/components/ui/SafeThreeCanvas";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const PROMISES = [
    { title: "Dream Home", desc: "A sanctuary built on love.", x: 3, y: 0.5, z: 0 },
    { title: "World Tour", desc: "Exploring every corner together.", x: -2, y: 1.5, z: 2 },
    { title: "Growing Old", desc: "Walking hand in hand, forever.", x: 0, y: -1, z: 3 },
    { title: "Family", desc: "Our beautiful legacy.", x: 2.5, y: -2, z: -1 },
    { title: "Eternal Love", desc: "A bound across time.", x: -3, y: 0, z: -2 },
];

function SpiralGalaxy() {
    const pointsRef = useRef<THREE.Points>(null);
    const count = 8000; // Dense galaxy

    // Generate Spiral
    const { positions, colors } = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);

        const branches = 3;
        const radius = 10;
        const spin = 1;
        const randomness = 0.5;
        const randomPower = 3;

        const insideColor = new THREE.Color("#ff6030"); // Core warm color
        const outsideColor = new THREE.Color("#1b3984"); // Outer cool color

        for (let i = 0; i < count; i++) {
            const r = Math.random() * radius;
            const spinAngle = r * spin;
            const branchAngle = (i % branches) / branches * Math.PI * 2;

            const randomX = Math.pow(Math.random(), randomPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;
            const randomY = Math.pow(Math.random(), randomPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;
            const randomZ = Math.pow(Math.random(), randomPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;

            pos[i * 3] = Math.cos(spinAngle + branchAngle) * r + randomX;
            pos[i * 3 + 1] = randomY * 0.5; // Flatten galaxy
            pos[i * 3 + 2] = Math.sin(spinAngle + branchAngle) * r + randomZ;

            // Mix colors
            const mixedColor = insideColor.clone().lerp(outsideColor, r / radius);

            col[i * 3] = mixedColor.r;
            col[i * 3 + 1] = mixedColor.g;
            col[i * 3 + 2] = mixedColor.b;
        }

        return { positions: pos, colors: col };
    }, []);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += 0.0005; // Majestic slow rotation
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                {/* @ts-ignore */}
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                {/* @ts-ignore */}
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                vertexColors
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                transparent
                opacity={0.8}
            />
        </points>
    );
}

function CrystalNode({ promise, onSelect }: { promise: any, onSelect: (p: any) => void }) {
    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <group position={[promise.x, promise.y, promise.z]}>
                {/* Core Crystal */}
                <mesh
                    onClick={(e) => { e.stopPropagation(); onSelect(promise); }}
                    onPointerOver={() => document.body.style.cursor = "pointer"}
                    onPointerOut={() => document.body.style.cursor = "auto"}
                >
                    <sphereGeometry args={[0.3, 32, 32]} />
                    <meshPhysicalMaterial
                        color="#ffffff"
                        emissive="#d4af37"
                        emissiveIntensity={0.5}
                        transmission={0.9} // Glass
                        opacity={1}
                        metalness={0.2}
                        roughness={0}
                        ior={1.5}
                        thickness={1}
                    />
                </mesh>

                {/* Glow Ring */}
                <mesh scale={[1.2, 1.2, 1.2]}>
                    <ringGeometry args={[0.35, 0.4, 32]} />
                    <meshBasicMaterial color="#d4af37" side={THREE.DoubleSide} transparent opacity={0.5} />
                </mesh>

                {/* Floating Label */}
                <Html distanceFactor={10} position={[0, 0.5, 0]} center>
                    <div className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded border border-gold/30 text-[10px] text-gold font-serif whitespace-nowrap pointer-events-none">
                        {promise.title}
                    </div>
                </Html>
            </group>
        </Float>
    );
}

export default function TheFuture() {
    const [selectedPromise, setSelectedPromise] = useState<any>(null);

    return (
        <section className="h-screen w-full bg-black relative overflow-hidden">
            {/* Rich Nebula Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a0b2e_0%,_#000000_100%)] -z-10" />

            <div className="absolute top-10 left-0 right-0 text-center z-10 pointer-events-none">
                <h2 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-gold tracking-widest drop-shadow-2xl">
                    Galaxy of Dreams
                </h2>
            </div>

            <SafeThreeCanvas camera={{ position: [0, 5, 8], fov: 50 }}>
                {/* Lighting for Crystal */}
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#ff6030" />
                <pointLight position={[-10, -10, -10]} intensity={2} color="#1b3984" />

                <SpiralGalaxy />

                {/* The Crystal Nodes */}
                {PROMISES.map((p, i) => (
                    <CrystalNode key={i} promise={p} onSelect={setSelectedPromise} />
                ))}

                {/* Volumetric Fog Effect using semi-transparent clouds */}
                <Cloud opacity={0.3} speed={0.4} segments={10} position={[0, -2, 0]} color="#1b3984" />

                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
            </SafeThreeCanvas>

            {/* Promise Card Overlay */}
            <AnimatePresence>
                {selectedPromise && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                        onClick={() => setSelectedPromise(null)}
                    >
                        <div className="relative w-full max-w-md bg-zinc-900/80 border border-gold/30 p-8 rounded-xl shadow-[0_0_100px_rgba(138,43,226,0.3)] text-center overflow-hidden backdrop-blur-xl"
                            onClick={(e) => e.stopPropagation()}>

                            {/* Decorative Background Image */}
                            <div className="absolute inset-0 opacity-30 pointer-events-none">
                                <Image
                                    src="/memories/extra1.webp"
                                    alt="Future Background"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-zinc-900/60" />
                            </div>

                            <h3 className="relative text-4xl font-serif text-gold mb-6 drop-shadow-lg">{selectedPromise.title}</h3>
                            <p className="relative text-purple-100 font-sans leading-relaxed text-lg tracking-wide">
                                {selectedPromise.desc}
                            </p>

                            <div className="relative mt-8">
                                <span className="text-zinc-500 text-xs tracking-widest uppercase border-b border-zinc-500 pb-1">Our Destiny</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
