"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";

/* ============================================================
   AURORA — domain-warped fbm noise field
   ============================================================ */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    // Bypass the camera: a 2x2 plane in clip space always fills the screen.
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uAspect;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                            + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                            dot(x12.zw, x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x  = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.80, 0.60, -0.60, 0.80);
    for (int i = 0; i < 5; i++) {
      v += a * snoise(p);
      p = rot * p * 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(uAspect, 1.0);

    float t = uTime * 0.04;
    vec2  m = uMouse * vec2(uAspect, 1.0) * 0.5;

    // Two rounds of domain warping, kept at low frequency so the field reads
    // as broad drifting light rather than marbled texture.
    vec2 q = vec2(
      fbm(p * 0.50 + vec2(0.0, t)),
      fbm(p * 0.50 + vec2(5.2, 1.3 - t))
    );

    vec2 r = vec2(
      fbm(p * 0.62 + 1.1 * q + vec2(1.7, 9.2) + t * 0.5),
      fbm(p * 0.62 + 1.1 * q + vec2(8.3, 2.8) - t * 0.4)
    );

    float f = fbm(p * 0.58 + r);
    float n = f * 0.5 + 0.5;

    vec3 cInk    = vec3(0.031, 0.035, 0.047);
    vec3 cViolet = vec3(0.486, 0.361, 1.000);
    vec3 cGold   = vec3(0.914, 0.725, 0.286);
    vec3 cCyan   = vec3(0.337, 0.800, 0.949);
    vec3 cRose   = vec3(1.000, 0.478, 0.612);

    // Restrained mixes — this is ambience behind type, not the subject.
    vec3 col = cInk;
    col = mix(col, cViolet, smoothstep(0.40, 1.05, n) * 0.30);
    col = mix(col, cCyan,   smoothstep(0.65, 1.25, length(q)) * 0.10);
    col = mix(col, cGold,   smoothstep(0.62, 1.25, length(r)) * 0.16);
    col = mix(col, cRose,   smoothstep(0.88, 1.15, n) * 0.05);

    // Warm bloom that follows the pointer.
    col += cGold * smoothstep(0.50, 0.0, length(p - m)) * 0.07;

    // Hold the middle dark so headline type always has contrast.
    float centerFade = smoothstep(0.05, 1.15, length(p * vec2(0.60, 1.0)));
    col *= mix(0.10, 0.80, centerFade);

    // Edge vignette.
    col *= smoothstep(1.55, 0.30, length(p));

    // Dither to kill banding across the wide gradients.
    float g = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
    col += (g - 0.5) * 0.022;

    gl_FragColor = vec4(col, 1.0);

    #include <colorspace_fragment>
  }
`;

function Aurora({ reduced }: { reduced: boolean }) {
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { size } = useThree();

    const target = useRef(new THREE.Vector2(0, 0));

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0, 0) },
            uAspect: { value: 1 },
        }),
        []
    );

    useEffect(() => {
        const onMove = (e: PointerEvent) => {
            target.current.set(
                (e.clientX / window.innerWidth) * 2 - 1,
                -((e.clientY / window.innerHeight) * 2 - 1)
            );
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, []);

    useFrame((_, delta) => {
        const mat = materialRef.current;
        if (!mat) return;

        if (!reduced) mat.uniforms.uTime.value += delta;
        mat.uniforms.uAspect.value = size.width / size.height;

        // Ease the pointer so the bloom trails rather than snaps.
        mat.uniforms.uMouse.value.lerp(target.current, 0.045);
    });

    return (
        <mesh frustumCulled={false} renderOrder={-1}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                depthTest={false}
                depthWrite={false}
            />
        </mesh>
    );
}

/* ============================================================
   DUST — slow additive particle drift for parallax depth
   ============================================================ */

/** Deterministic PRNG — keeps the field identical across renders and stays
 *  pure, unlike Math.random(), which cannot live inside a memo. */
function mulberry32(seed: number) {
    return function random() {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function Dust({ reduced }: { reduced: boolean }) {
    const groupRef = useRef<THREE.Group>(null);
    const pointsRef = useRef<THREE.Points>(null);

    const COUNT = 900;

    const { positions, speeds } = useMemo(() => {
        const random = mulberry32(0x5eed);
        const positions = new Float32Array(COUNT * 3);
        const speeds = new Float32Array(COUNT);

        for (let i = 0; i < COUNT; i++) {
            positions[i * 3] = (random() - 0.5) * 16;
            positions[i * 3 + 1] = (random() - 0.5) * 12;
            positions[i * 3 + 2] = (random() - 0.5) * 8 - 2;
            speeds[i] = 0.04 + random() * 0.14;
        }

        return { positions, speeds };
    }, []);

    useFrame((state, delta) => {
        const pts = pointsRef.current;
        const group = groupRef.current;
        if (!pts || !group) return;

        if (!reduced) {
            const attr = pts.geometry.attributes.position as THREE.BufferAttribute;
            const arr = attr.array as Float32Array;

            for (let i = 0; i < COUNT; i++) {
                arr[i * 3 + 1] += speeds[i] * delta;
                // Recycle particles that drift past the top edge.
                if (arr[i * 3 + 1] > 6) arr[i * 3 + 1] = -6;
            }
            attr.needsUpdate = true;
        }

        // Counter-parallax against the pointer for a sense of volume.
        const { x, y } = state.pointer;
        group.rotation.y += (x * 0.12 - group.rotation.y) * 0.03;
        group.rotation.x += (-y * 0.08 - group.rotation.x) * 0.03;
    });

    return (
        <group ref={groupRef}>
            <points ref={pointsRef} frustumCulled={false}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[positions, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.02}
                    sizeAttenuation
                    color="#f7d488"
                    transparent
                    opacity={0.32}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    );
}

/* ============================================================
   SCENE
   ============================================================ */

export default function HeroScene() {
    const [ready, setReady] = useState(false);
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        // Mount the canvas after first paint so the hero text lands instantly.
        const id = requestAnimationFrame(() => {
            setReduced(
                window.matchMedia("(prefers-reduced-motion: reduce)").matches
            );
            setReady(true);
        });
        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            {/* CSS aurora sits underneath: instant paint, and a graceful
          fallback if WebGL is unavailable. */}
            <div className="aurora opacity-70" />
            <div className="absolute inset-0 bg-radial-gradient" />

            {ready && (
                <div className="canvas-fade-in absolute inset-0">
                    <Canvas
                        camera={{ position: [0, 0, 6], fov: 55 }}
                        dpr={[1, 1.6]}
                        gl={{
                            antialias: false,
                            powerPreference: "high-performance",
                            alpha: false,
                        }}
                        style={{ background: "#08090c" }}
                    >
                        <Aurora reduced={reduced} />
                        <Dust reduced={reduced} />
                    </Canvas>
                </div>
            )}
        </div>
    );
}
