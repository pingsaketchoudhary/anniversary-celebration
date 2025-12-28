"use client";

import { Canvas, CanvasProps } from "@react-three/fiber";
import { useEffect, useState, Component, ErrorInfo, ReactNode } from "react";
import * as THREE from "three";

// Error Boundary to catch render crashes
class ErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
    constructor(props: { children: ReactNode; fallback: ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.warn("WebGL Canvas crashed:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }

        return this.props.children;
    }
}

interface SafeThreeCanvasProps extends CanvasProps {
    fallback?: ReactNode;
}

export default function SafeThreeCanvas({ children, fallback = null, ...props }: SafeThreeCanvasProps) {
    const [isWebGLAvailable, setIsWebGLAvailable] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        try {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("webgl2") || canvas.getContext("webgl");
            setIsWebGLAvailable(!!context);
        } catch (e) {
            console.warn("WebGL check failed:", e);
            setIsWebGLAvailable(false);
        }
    }, []);

    if (!mounted) return null;

    if (!isWebGLAvailable) {
        return <>{fallback}</>;
    }

    return (
        <ErrorBoundary fallback={fallback}>
            <Canvas
                {...props}
                onCreated={(state) => {
                    state.gl.domElement.addEventListener("webglcontextlost", (event) => {
                        event.preventDefault();
                        console.warn("WebGL Context Lost");
                    });
                    props.onCreated?.(state);
                }}
            >
                {children}
            </Canvas>
        </ErrorBoundary>
    );
}
