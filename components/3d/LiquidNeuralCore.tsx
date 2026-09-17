"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function LiquidNeuralCore() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // WebGL support & performance tier detection
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setIsSupported(false);
        return;
      }
    } catch {
      setIsSupported(false);
      return;
    }

    const container = containerRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Responsive Device Quality Tiers
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    // Check hardware capabilities if available
    const nav = navigator as any;
    const isLowPower = (nav.deviceMemory && nav.deviceMemory < 3) || (nav.hardwareConcurrency && nav.hardwareConcurrency <= 2);

    let particleCount = 280;
    let sphereDetail = 32;
    let maxPixelRatio = 1.8;

    if (prefersReducedMotion || isLowPower) {
      particleCount = 45;
      sphereDetail = 12;
      maxPixelRatio = 1.0;
    } else if (isMobile) {
      particleCount = 80;
      sphereDetail = 16;
      maxPixelRatio = 1.25;
    } else if (isTablet) {
      particleCount = 150;
      sphereDetail = 24;
      maxPixelRatio = 1.5;
    }

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = isMobile ? 5.6 : 5.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile, // Disable expensive antialiasing on mobile for smooth 60-120fps
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxPixelRatio));
    container.appendChild(renderer.domElement);

    // Main interaction group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Outer Liquid Glass Sphere
    const sphereRadius = isMobile ? 1.45 : 1.65;
    const sphereGeo = new THREE.IcosahedronGeometry(sphereRadius, sphereDetail);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xffffff),
      metalness: 0.05,
      roughness: isMobile ? 0.12 : 0.08,
      transmission: isMobile ? 0.88 : 0.94,
      ior: 1.5,
      reflectivity: 0.75,
      thickness: isMobile ? 1.2 : 1.8,
      transparent: true,
      opacity: 0.85,
      specularColor: new THREE.Color(0x00f2fe),
      clearcoat: isMobile ? 0.5 : 1.0,
      clearcoatRoughness: 0.1,
    });
    const glassSphere = new THREE.Mesh(sphereGeo, glassMaterial);
    mainGroup.add(glassSphere);

    // 2. Inner Neural Nucleus
    const innerGeo = new THREE.IcosahedronGeometry(isMobile ? 0.65 : 0.78, isMobile ? 1 : 2);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x8a2be2,
      emissive: 0x00f2fe,
      emissiveIntensity: 0.6,
      roughness: 0.35,
      metalness: 0.75,
      wireframe: true,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerCore);

    // 3. Floating Synaptic Neural Particles (Adaptive density)
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyan = new THREE.Color(0x00f2fe);
    const purple = new THREE.Color(0xa855f7);
    const white = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      const radius = (isMobile ? 0.4 : 0.5) + Math.random() * (isMobile ? 0.8 : 1.0);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixColor = Math.random() > 0.5 ? cyan : Math.random() > 0.3 ? purple : white;
      colors[i * 3] = mixColor.r;
      colors[i * 3 + 1] = mixColor.g;
      colors[i * 3 + 2] = mixColor.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.045 : 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particleSystem);

    // 4. Subtle Orbital Ring (Holographic Gyro)
    const ringGeo = new THREE.TorusGeometry(isMobile ? 1.85 : 2.1, 0.012, 12, isMobile ? 48 : 96);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const orbitalRing = new THREE.Mesh(ringGeo, ringMat);
    orbitalRing.rotation.x = Math.PI / 3;
    mainGroup.add(orbitalRing);

    // 5. Atmospheric Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f2fe, 3.5, 12);
    cyanLight.position.set(3, 2, 4);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 3.0, 12);
    purpleLight.position.set(-3, -2, 3);
    scene.add(purpleLight);

    // Mouse / Touch tracking
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      if (isMobile) return; // Save CPU/battery on mobile
      const rect = container.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / width) * 2 - 1;
      const mouseY = -(((e.clientY - rect.top) / height) * 2 - 1);
      targetRotationY = mouseX * 0.4;
      targetRotationX = -mouseY * 0.4;
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handlePointerMove, { passive: true });
    }

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Render loop
    let clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      if (!isMobile) {
        mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.05;
        mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.05;
      } else {
        // Continuous smooth autonomous rotation on mobile without touch tracking overhead
        mainGroup.rotation.y = elapsedTime * 0.15;
      }

      glassSphere.rotation.y = elapsedTime * 0.12;
      innerCore.rotation.x = -elapsedTime * 0.22;
      innerCore.rotation.y = elapsedTime * 0.28;
      particleSystem.rotation.y = elapsedTime * 0.05;
      orbitalRing.rotation.z = elapsedTime * 0.12;

      const breath = 1 + Math.sin(elapsedTime * 1.4) * (isMobile ? 0.018 : 0.025);
      glassSphere.scale.set(breath, breath, breath);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (!isMobile) {
        window.removeEventListener("mousemove", handlePointerMove);
      }
      window.removeEventListener("resize", handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      sphereGeo.dispose();
      glassMaterial.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  // Premium CSS fallback if WebGL is unavailable or failed
  if (!isSupported) {
    return (
      <div className="w-full h-[260px] sm:h-[340px] md:h-[460px] lg:h-[540px] flex items-center justify-center pointer-events-none">
        <div className="relative w-44 h-44 sm:w-60 sm:h-60 rounded-full glass-1 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_50px_rgba(0,242,254,0.25)] animate-pulse-subtle">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-cyan-400/40 via-purple-500/30 to-transparent blur-xl" />
          <div className="absolute inset-0 rounded-full border border-white/20 animate-spin" style={{ animationDuration: "25s" }} />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[260px] sm:h-[340px] md:h-[460px] lg:h-[540px] select-none pointer-events-auto flex items-center justify-center overflow-hidden"
      aria-label="Liquid Glass AI Neural Core 3D Experience"
    />
  );
}
