import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, DoorOpen, ArrowRight, Shield, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const DoorSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [doorProgress, setDoorProgress] = useState(0);
  const [isOpenManually, setIsOpenManually] = useState(false);

  // References for Three.js objects
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    doorPivot: THREE.Group;
    doorHandle: THREE.Group;
    lightBeam: THREE.Mesh;
    interiorGlow: THREE.PointLight;
    particles: THREE.Points;
  } | null>(null);



  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Three.js Scene Setup in Black & Grey Mix
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060709);
    scene.fog = new THREE.FogExp2(0x060709, 0.08);

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Lighting (Atmospheric Monochrome Silver & White)
    const ambientLight = new THREE.AmbientLight(0x27272a, 1.2);
    scene.add(ambientLight);

    const hallwayLight = new THREE.DirectionalLight(0xf4f4f5, 1.4);
    hallwayLight.position.set(2, 4, 4);
    hallwayLight.castShadow = true;
    hallwayLight.shadow.mapSize.width = 1024;
    hallwayLight.shadow.mapSize.height = 1024;
    hallwayLight.shadow.camera.near = 0.5;
    hallwayLight.shadow.camera.far = 15;
    hallwayLight.shadow.bias = -0.001;
    scene.add(hallwayLight);

    // Pure White/Silver Light Spilling From Behind Door
    const interiorGlow = new THREE.PointLight(0xffffff, 0, 10);
    interiorGlow.position.set(0, 0, -0.6);
    scene.add(interiorGlow);

    const interiorGoldLight = new THREE.PointLight(0xd4d4d8, 0, 8);
    interiorGoldLight.position.set(0.2, 0.2, -0.8);
    scene.add(interiorGoldLight);

    // Architectural Wall & Doorway Frame (Black and Grey)
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0x090a0d,
      roughness: 0.9,
      metalness: 0.05,
    });

    const frameMaterial = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.4,
      metalness: 0.5,
    });

    const doorMaterial = new THREE.MeshStandardMaterial({
      color: 0x111114,
      roughness: 0.5,
      metalness: 0.3,
    });

    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8, // Brushed titanium silver
      roughness: 0.2,
      metalness: 0.9,
    });

    // Outer architectural wall
    const wallGeometry = new THREE.PlaneGeometry(16, 12);
    const wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
    wallMesh.position.set(0, 0, -0.1);
    wallMesh.receiveShadow = true;
    scene.add(wallMesh);

    // Doorway Dimensions
    const doorWidth = 1.6;
    const doorHeight = 3.0;
    const doorDepth = 0.08;

    // Door Frame Surround
    const frameThickness = 0.12;
    const frameDepth = 0.2;

    const frameLeft = new THREE.Mesh(
      new THREE.BoxGeometry(frameThickness, doorHeight + frameThickness, frameDepth),
      frameMaterial
    );
    frameLeft.position.set(-(doorWidth / 2 + frameThickness / 2), 0, 0);
    scene.add(frameLeft);

    const frameRight = new THREE.Mesh(
      new THREE.BoxGeometry(frameThickness, doorHeight + frameThickness, frameDepth),
      frameMaterial
    );
    frameRight.position.set(doorWidth / 2 + frameThickness / 2, 0, 0);
    scene.add(frameRight);

    const frameTop = new THREE.Mesh(
      new THREE.BoxGeometry(doorWidth + frameThickness * 2, frameThickness, frameDepth),
      frameMaterial
    );
    frameTop.position.set(0, doorHeight / 2 + frameThickness / 2, 0);
    scene.add(frameTop);

    // Floor Baseboard
    const baseboard = new THREE.Mesh(
      new THREE.BoxGeometry(16, 0.15, 0.3),
      frameMaterial
    );
    baseboard.position.set(0, -(doorHeight / 2 + frameThickness / 2), 0.1);
    scene.add(baseboard);

    // DOOR HINGE PIVOT SYSTEM
    // Left edge of door is at x = -doorWidth / 2
    const doorPivot = new THREE.Group();
    doorPivot.position.set(-doorWidth / 2, 0, 0); // Position pivot right at the hinge!
    scene.add(doorPivot);

    // Door Panel Mesh (offset so left edge matches hinge pivot)
    const doorGroup = new THREE.Group();
    doorGroup.position.set(doorWidth / 2, 0, 0);
    doorPivot.add(doorGroup);

    const doorMesh = new THREE.Mesh(
      new THREE.BoxGeometry(doorWidth, doorHeight, doorDepth),
      doorMaterial
    );
    doorMesh.castShadow = true;
    doorMesh.receiveShadow = true;
    doorGroup.add(doorMesh);

    // Inset Decorative Door Panels (Luxury Bevel Look)
    for (let i = 0; i < 2; i++) {
      const panelY = i === 0 ? 0.65 : -0.65;
      const insetPanel = new THREE.Mesh(
        new THREE.BoxGeometry(doorWidth * 0.72, doorHeight * 0.38, 0.015),
        new THREE.MeshStandardMaterial({
          color: 0x0c0e14,
          roughness: 0.6,
          metalness: 0.3,
        })
      );
      insetPanel.position.set(0, panelY, doorDepth / 2 + 0.008);
      doorGroup.add(insetPanel);
    }

    // Brass Plaque / Nameplate on Door (Like reference video)
    const plaqueGeometry = new THREE.BoxGeometry(0.7, 0.28, 0.02);
    const plaqueMesh = new THREE.Mesh(plaqueGeometry, brassMaterial);
    plaqueMesh.position.set(0, 0.65, doorDepth / 2 + 0.02);
    doorGroup.add(plaqueMesh);

    // Plaque canvas texture for crisp high-end lettering
    const plaqueCanvas = document.createElement('canvas');
    plaqueCanvas.width = 512;
    plaqueCanvas.height = 205;
    const ctx = plaqueCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#18181b';
      ctx.fillRect(0, 0, 512, 205);
      ctx.fillStyle = '#27272a';
      ctx.fillRect(8, 8, 496, 189);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('AKSHAY KANTH C', 256, 75);
      ctx.font = '500 24px "JetBrains Mono", monospace';
      ctx.fillStyle = '#d4d4d8';
      ctx.fillText('TEST ENGINEER & AI DEVELOPER', 256, 120);
      ctx.font = 'italic 18px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#a1a1aa';
      ctx.fillText('TAP OR SCROLL TO ENTER', 256, 160);

      const plaqueTex = new THREE.CanvasTexture(plaqueCanvas);
      const plaqueFace = new THREE.Mesh(
        new THREE.PlaneGeometry(0.66, 0.24),
        new THREE.MeshBasicMaterial({ map: plaqueTex })
      );
      plaqueFace.position.set(0, 0.65, doorDepth / 2 + 0.032);
      doorGroup.add(plaqueFace);
    }

    // Brass Door Handle & Lock Mechanism
    const doorHandle = new THREE.Group();
    doorHandle.position.set(doorWidth / 2 - 0.18, -0.05, doorDepth / 2 + 0.03);
    doorGroup.add(doorHandle);

    const handleBackplate = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.26, 0.015),
      brassMaterial
    );
    doorHandle.add(handleBackplate);

    const handleStem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.015, 0.06),
      brassMaterial
    );
    handleStem.rotation.x = Math.PI / 2;
    handleStem.position.set(0, 0.04, 0.03);
    doorHandle.add(handleStem);

    const handleLever = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.03, 0.03),
      brassMaterial
    );
    handleLever.position.set(-0.08, 0.04, 0.06);
    doorHandle.add(handleLever);

    // Behind Door: Volumetric Light Spilling Mesh
    const beamGeometry = new THREE.ConeGeometry(3.5, 7, 32, 1, true);
    const beamMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lightBeam = new THREE.Mesh(beamGeometry, beamMaterial);
    lightBeam.rotation.x = -Math.PI / 2;
    lightBeam.position.set(0, 0, 1);
    scene.add(lightBeam);

    // Floating Atmospheric Particles
    const particleCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 6;
      particlePositions[i + 2] = (Math.random() - 0.5) * 5 + 1;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xd4d4d8,
      size: 0.03,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    sceneRef.current = {
      renderer,
      scene,
      camera,
      doorPivot,
      doorHandle,
      lightBeam,
      interiorGlow,
      particles,
    };

    // Render loop
    let reqId: number;
    let clock = new THREE.Clock();

    const render = () => {
      const elapsed = clock.getElapsedTime();
      if (particles) {
        particles.rotation.y = elapsed * 0.03;
      }
      renderer.render(scene, camera);
      reqId = requestAnimationFrame(render);
    };
    render();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // GSAP ScrollTrigger Choreography (The Signature Door Opening!)
    const ctxTimeline = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: 1.2,
          onUpdate: (self) => {
            setDoorProgress(self.progress);
          },
        },
      });

      // 1. Camera approaches door (progress 0 -> 0.35)
      tl.to(camera.position, {
        z: 3.2,
        y: 0.1,
        ease: 'power2.inOut',
        duration: 0.35,
      }, 0);

      // 2. Door handle subtly jiggles / depresses (progress 0.2 -> 0.35)
      tl.to(doorHandle.rotation, {
        z: -0.3,
        ease: 'power1.out',
        duration: 0.15,
      }, 0.2);

      // 3. Door swings open on hinge pivot (progress 0.35 -> 0.75)
      // Rotates outwards (-1.4 radians ~= -80 degrees)
      tl.to(doorPivot.rotation, {
        y: -Math.PI * 0.48,
        ease: 'power2.inOut',
        duration: 0.4,
      }, 0.35);

      // 4. Volumetric light shafts and interior lights blast open
      tl.to(interiorGlow, {
        intensity: 8,
        ease: 'power2.in',
        duration: 0.4,
      }, 0.35);

      tl.to(interiorGoldLight, {
        intensity: 6,
        ease: 'power2.in',
        duration: 0.4,
      }, 0.35);

      tl.to(beamMaterial, {
        opacity: 0.35,
        ease: 'power2.in',
        duration: 0.4,
      }, 0.35);

      // 5. Camera glides directly through the open doorway (progress 0.75 -> 1.0)
      tl.to(camera.position, {
        z: 0.2,
        y: 0,
        ease: 'power1.inOut',
        duration: 0.25,
      }, 0.75);

      // Camera focal adjustment
      tl.to(camera, {
        fov: 52,
        onUpdate: () => camera.updateProjectionMatrix(),
        duration: 0.25,
      }, 0.75);
    }, container);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      ctxTimeline.revert();
      renderer.dispose();
      wallGeometry.dispose();
      wallMaterial.dispose();
      doorMaterial.dispose();
      brassMaterial.dispose();
      frameMaterial.dispose();
    };
  }, []);

  // Manual Trigger for Mobile or Click to Step Inside
  const handleToggleDoor = () => {
    if (!sceneRef.current) return;
    const { doorPivot, doorHandle, lightBeam, interiorGlow, camera } = sceneRef.current;
    const targetState = !isOpenManually;
    setIsOpenManually(targetState);

    gsap.to(doorHandle.rotation, {
      z: targetState ? -0.3 : 0,
      duration: 0.3,
    });

    gsap.to(doorPivot.rotation, {
      y: targetState ? -Math.PI * 0.48 : 0,
      duration: 1.2,
      ease: 'power3.inOut',
    });

    gsap.to(interiorGlow, {
      intensity: targetState ? 7 : 0,
      duration: 1.2,
    });

    gsap.to((lightBeam.material as THREE.MeshBasicMaterial), {
      opacity: targetState ? 0.35 : 0,
      duration: 1.2,
    });

    gsap.to(camera.position, {
      z: targetState ? 2.2 : 5.5,
      duration: 1.5,
      ease: 'power2.inOut',
    });
  };

  return (
    <section
      id="doors"
      ref={containerRef}
      className="relative w-full h-screen bg-[#060709] overflow-hidden flex flex-col items-center justify-between select-none"
    >
      {/* 3D WebGL Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block z-0"
      />

      {/* Floating Cinematic Overlay Header */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-16 flex flex-col items-center text-center pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 backdrop-blur-md mb-4">
          <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
          <span className="font-mono text-xs tracking-widest uppercase text-zinc-300">
            CHAPTER 03 &bull; THE PORTAL
          </span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-2xl drop-shadow-2xl">
          Magic happens <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            behind the doors.
          </span>
        </h2>
        <p className="font-sans text-xs sm:text-sm text-zinc-400 mt-3 max-w-md">
          {doorProgress > 0.4
            ? "Step into the craftsmanship: Test Engineer rigor, AI-assisted development, and verified architectures."
            : "Scroll to push the camera through the portal, or tap the interactive door switch below."}
        </p>
      </div>

      {/* Interactive Controls & Status HUD */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-12 flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-auto">
        
        {/* Left Side: Door State Indicator */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-zinc-950/85 border border-white/10 backdrop-blur-md shadow-xl text-xs font-mono text-zinc-300">
          <div className={`w-2.5 h-2.5 rounded-full ${doorProgress > 0.35 || isOpenManually ? 'bg-white animate-pulse' : 'bg-neutral-500'}`} />
          <span>
            DOOR STATUS: {doorProgress > 0.35 || isOpenManually ? 'PORTAL OPEN (WHITE LIGHT SPILL)' : 'PORTAL ENGAGED'}
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-white font-bold">{Math.round(doorProgress * 100)}% THROUGH</span>
        </div>

        {/* Center: Tap to Open / Step Through Button in Black and Grey */}
        <button
          onClick={handleToggleDoor}
          className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs tracking-wider shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20"
        >
          <DoorOpen className="w-4 h-4 text-black" />
          <span>{isOpenManually ? 'CLOSE SANCTUARY DOOR' : 'STEP THROUGH DOOR'}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        {/* Right Side: Quick Features Behind Door */}
        <div className="hidden lg:flex items-center gap-3 text-xs font-mono text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-neutral-300" />
            Test Engineering
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-neutral-300" />
            AI-Assisted Dev
          </span>
        </div>
      </div>
    </section>
  );
};
