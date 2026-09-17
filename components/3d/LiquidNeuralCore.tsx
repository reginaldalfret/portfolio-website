"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function LiquidNeuralCore() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // WebGL support check
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

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    container.appendChild(renderer.domElement);

    // Group for mouse rotation
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Outer Liquid Glass Sphere (Physical Glass Material)
    const sphereGeo = new THREE.IcosahedronGeometry(1.65, 32);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xffffff),
      metalness: 0.05,
      roughness: 0.08,
      transmission: 0.94, // Real physical glass translucency
      ior: 1.52,          // Glass refraction index
      reflectivity: 0.8,
      thickness: 1.8,
      transparent: true,
      opacity: 0.88,
      specularColor: new THREE.Color(0x00f2fe),
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      wireframe: false,
    });
    const glassSphere = new THREE.Mesh(sphereGeo, glassMaterial);
    mainGroup.add(glassSphere);

    // 2. Inner Neural Nucleus (Glowing geometric polyhedral core)
    const innerGeo = new THREE.IcosahedronGeometry(0.78, 2);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x8a2be2,
      emissive: 0x00f2fe,
      emissiveIntensity: 0.65,
      roughness: 0.3,
      metalness: 0.8,
      wireframe: true,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerCore);

    // 3. Floating Synaptic Neural Particles
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyan = new THREE.Color(0x00f2fe);
    const purple = new THREE.Color(0xa855f7);
    const white = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      // Position particles clustered within the orb shell
      const radius = 0.5 + Math.random() * 1.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Interpolate particle color
      const mixColor = Math.random() > 0.5 ? cyan : Math.random() > 0.3 ? purple : white;
      colors[i * 3] = mixColor.r;
      colors[i * 3 + 1] = mixColor.g;
      colors[i * 3 + 2] = mixColor.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particleSystem);

    // 4. Subtle Orbital Ring (Holographic Gyro)
    const ringGeo = new THREE.TorusGeometry(2.1, 0.012, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const orbitalRing = new THREE.Mesh(ringGeo, ringMat);
    orbitalRing.rotation.x = Math.PI / 3;
    mainGroup.add(orbitalRing);

    const ringGeo2 = new THREE.TorusGeometry(2.3, 0.008, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x8a2be2,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });
    const orbitalRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    orbitalRing2.rotation.y = Math.PI / 4;
    mainGroup.add(orbitalRing2);

    // 5. Atmospheric Lights within 3D Space
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f2fe, 4.0, 15);
    cyanLight.position.set(3, 2, 4);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 3.5, 15);
    purpleLight.position.set(-3, -2, 3);
    scene.add(purpleLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.2);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    // Interaction & Mouse tracking
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / height) * 2 - 1);
      targetRotationY = mouseX * 0.45;
      targetRotationX = -mouseY * 0.45;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

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

      // Smooth camera / group rotation damping
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.05;

      // Organic autonomous drift
      glassSphere.rotation.y = elapsedTime * 0.12;
      glassSphere.rotation.z = Math.sin(elapsedTime * 0.3) * 0.08;

      innerCore.rotation.x = -elapsedTime * 0.25;
      innerCore.rotation.y = elapsedTime * 0.3;

      particleSystem.rotation.y = elapsedTime * 0.06;
      particleSystem.rotation.x = -elapsedTime * 0.04;

      orbitalRing.rotation.z = elapsedTime * 0.15;
      orbitalRing2.rotation.z = -elapsedTime * 0.1;

      // Subtle breathing scale
      const breath = 1 + Math.sin(elapsedTime * 1.5) * 0.025;
      glassSphere.scale.set(breath, breath, breath);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
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
      ringGeo2.dispose();
      ringMat2.dispose();
      renderer.dispose();
    };
  }, []);

  if (!isSupported) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-transparent blur-2xl border border-white/10" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[380px] sm:h-[460px] md:h-[540px] lg:h-[620px] select-none pointer-events-auto"
      aria-label="Liquid Glass AI Neural Core 3D Experience"
    />
  );
}
