import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  DoorOpen,
  ArrowRight,
  Shield,
  Zap,
  RotateCcw,
  Terminal,
  Smartphone,
  Bug,
  BrainCircuit,
  Layers,
  ChevronDown
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Helper: High-DPI Plaque Texture for Door Face
function createPlaqueTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 420;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Brushed titanium / obsidian plate
    const grad = ctx.createLinearGradient(0, 0, 1024, 420);
    grad.addColorStop(0, '#101116');
    grad.addColorStop(0.5, '#181920');
    grad.addColorStop(1, '#0c0d12');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 420);

    // Outer and Inner Chamfer Borders
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 4;
    ctx.strokeRect(12, 12, 1000, 396);

    ctx.strokeStyle = 'rgba(110, 231, 183, 0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(24, 24, 976, 372);

    // Corner decorative rivets
    const rivets = [
      [36, 36], [988, 36], [36, 384], [988, 384]
    ];
    rivets.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#6ee7b7';
      ctx.fill();
    });

    // Top Micro Badge
    ctx.fillStyle = 'rgba(110, 231, 183, 0.15)';
    ctx.fillRect(362, 45, 300, 36);
    ctx.strokeStyle = '#6ee7b7';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(362, 45, 300, 36);
    ctx.font = 'bold 16px "JetBrains Mono", monospace';
    ctx.fillStyle = '#6ee7b7';
    ctx.textAlign = 'center';
    ctx.fillText('• VERIFIED ARCHITECTURE •', 512, 69);

    // Name Headline
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 62px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('AKSHAY KANTH C', 512, 160);

    // Role Subtitle
    ctx.fillStyle = '#6ee7b7';
    ctx.font = 'bold 28px "JetBrains Mono", monospace';
    ctx.fillText('TEST ENGINEER  •  AI-ASSISTED DEVELOPER', 512, 225);

    // Divider line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.beginPath();
    ctx.moveTo(120, 265);
    ctx.lineTo(904, 265);
    ctx.stroke();

    // Bottom Specs
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('DUBAI, UAE  |  100% DEFECT RESOLUTION  |  STEP INSIDE', 512, 320);

    // Small prompt
    ctx.fillStyle = '#71717a';
    ctx.font = '600 18px "JetBrains Mono", monospace';
    ctx.fillText('SCROLL OR TAP BUTTON TO ENTER SANCTUARY', 512, 368);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

// Helper: Floor Perspective Grid Texture
function createFloorGridTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#08090d';
    ctx.fillRect(0, 0, 512, 512);

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    const step = 64;
    for (let x = 0; x <= 512; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 512);
      ctx.stroke();
    }
    for (let y = 0; y <= 512; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }

    // Glowing intersections
    ctx.fillStyle = 'rgba(110, 231, 183, 0.35)';
    for (let x = 0; x <= 512; x += step) {
      for (let y = 0; y <= 512; y += step) {
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 16);
  return texture;
}

export const DoorSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [doorProgress, setDoorProgress] = useState(0);
  const [isOpenManually, setIsOpenManually] = useState(false);

  // References for Three.js animation controls
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    doorPivot: THREE.Group;
    doorHandle: THREE.Group;
    lightBeam: THREE.Mesh;
    floorSpillMesh: THREE.Mesh;
    corridorSpot: THREE.SpotLight;
    interiorPointFront: THREE.PointLight;
    interiorPointMid: THREE.PointLight;
    portalCoreLight: THREE.PointLight;
    portalCore: THREE.Group;
    particles: THREE.Points;
  } | null>(null);

  // About highlights data
  const aboutHighlights = [
    {
      icon: Smartphone,
      title: 'Mobile Ecosystem QA',
      desc: 'Extensive hands-on testing on Android & iOS platforms, verifying touch gestures, push notifications, and device compatibilities.'
    },
    {
      icon: Bug,
      title: 'Defect Lifecycle & JIRA',
      desc: 'Precision logging, root-cause diagnostics, regression suites, and continuous coordination with engineering teams.'
    },
    {
      icon: BrainCircuit,
      title: 'AI-Assisted Engineering',
      desc: 'Leveraging Generative AI & Google Antigravity to automate test scripts, diagnose anomalies, and accelerate full-stack delivery.'
    },
    {
      icon: Layers,
      title: 'Full-Stack Architecture',
      desc: 'Building modern web applications with React 18, TypeScript, Node.js, PostgreSQL, Docker, and real-time Socket.IO.'
    }
  ];

  const aboutBadges = [
    'Dubai, UAE',
    'Test Engineer',
    'AI-Assisted Developer',
    'MCA Degree',
    'Mobile QA (Android/iOS)',
    'JIRA & Scrum',
    'Playwright Automation',
    'Open to Relocation'
  ];

  // Manual Trigger: Step inside or return to entrance
  const handleToggleDoor = (forceOpen?: boolean) => {
    if (!sceneRef.current) return;
    const {
      doorPivot,
      doorHandle,
      lightBeam,
      floorSpillMesh,
      corridorSpot,
      interiorPointFront,
      interiorPointMid,
      portalCoreLight,
      camera,
    } = sceneRef.current;

    const targetState = typeof forceOpen === 'boolean' ? forceOpen : !isOpenManually;
    setIsOpenManually(targetState);

    gsap.to(doorHandle.rotation, {
      z: targetState ? -0.38 : 0,
      duration: 0.3,
    });

    gsap.to(doorPivot.rotation, {
      y: targetState ? -Math.PI * 0.64 : 0,
      duration: 1.2,
      ease: 'power3.inOut',
    });

    // Animate all interior lights brightly
    gsap.to(corridorSpot, {
      intensity: targetState ? 14 : 0,
      duration: 1.2,
    });

    gsap.to(interiorPointFront, {
      intensity: targetState ? 7 : 0,
      duration: 1.2,
    });

    gsap.to(interiorPointMid, {
      intensity: targetState ? 8 : 0,
      duration: 1.2,
    });

    gsap.to(portalCoreLight, {
      intensity: targetState ? 12 : 0,
      duration: 1.2,
    });

    gsap.to((lightBeam.material as THREE.MeshBasicMaterial), {
      opacity: targetState ? 0.32 : 0,
      duration: 1.2,
    });

    gsap.to((floorSpillMesh.material as THREE.MeshBasicMaterial), {
      opacity: targetState ? 0.28 : 0,
      duration: 1.2,
    });

    // Fly camera inside or return
    gsap.to(camera.position, {
      z: targetState ? -2.8 : 5.5,
      y: targetState ? 0.1 : 0,
      duration: 1.6,
      ease: 'power2.inOut',
    });

    // Header fade
    if (headerRef.current) {
      gsap.to(headerRef.current, {
        opacity: targetState ? 0 : 1,
        y: targetState ? -30 : 0,
        duration: 0.8,
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060709);
    // Linear fog: starts at 6 units, reaches full density at 26 units (bright corridor visibility)
    scene.fog = new THREE.Fog(0x060709, 6, 26);

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
    renderer.toneMappingExposure = 1.35;

    // Base Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const hallwayLight = new THREE.DirectionalLight(0xffffff, 1.4);
    hallwayLight.position.set(2, 4, 4);
    hallwayLight.castShadow = true;
    hallwayLight.shadow.mapSize.width = 1024;
    hallwayLight.shadow.mapSize.height = 1024;
    scene.add(hallwayLight);

    // ==========================================
    // DRAMATIC INTERIOR CORRIDOR LIGHTING
    // ==========================================
    const corridorSpot = new THREE.SpotLight(0xffffff, 0, 32, Math.PI / 3.5, 0.45, 1.2);
    corridorSpot.position.set(0, 3.0, -4.0);
    corridorSpot.target.position.set(0, 0, 2.0);
    scene.add(corridorSpot);
    scene.add(corridorSpot.target);

    const interiorPointFront = new THREE.PointLight(0xffffff, 0, 14);
    interiorPointFront.position.set(0, 1.2, -2.5);
    scene.add(interiorPointFront);

    const interiorPointMid = new THREE.PointLight(0x6ee7b7, 0, 16);
    interiorPointMid.position.set(0, 1.4, -8.0);
    scene.add(interiorPointMid);

    const portalCoreLight = new THREE.PointLight(0x6ee7b7, 0, 25);
    portalCoreLight.position.set(0, 0.4, -15.5);
    scene.add(portalCoreLight);

    // ==========================================
    // FRONT WALL ARCHITECTURE (WITH REAL OPENING)
    // ==========================================
    const doorWidth = 1.6;
    const doorHeight = 3.2;
    const doorDepth = 0.08;
    const frameThickness = 0.12;
    const frameDepth = 0.22;

    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0x090a0e,
      roughness: 0.85,
      metalness: 0.15,
    });

    const frameMaterial = new THREE.MeshStandardMaterial({
      color: 0x14151a,
      roughness: 0.35,
      metalness: 0.7,
    });

    const mintTrimMaterial = new THREE.MeshBasicMaterial({
      color: 0x6ee7b7,
    });

    const facadeTotalW = 18;
    const facadeTotalH = 12;
    const sideWallW = (facadeTotalW - doorWidth) / 2;
    const vertWallH = (facadeTotalH - doorHeight) / 2;

    const wallLeft = new THREE.Mesh(
      new THREE.BoxGeometry(sideWallW, facadeTotalH, 0.1),
      wallMaterial
    );
    wallLeft.position.set(-(doorWidth / 2 + sideWallW / 2), 0, 0);
    wallLeft.receiveShadow = true;
    scene.add(wallLeft);

    const wallRight = new THREE.Mesh(
      new THREE.BoxGeometry(sideWallW, facadeTotalH, 0.1),
      wallMaterial
    );
    wallRight.position.set(doorWidth / 2 + sideWallW / 2, 0, 0);
    wallRight.receiveShadow = true;
    scene.add(wallRight);

    const wallTop = new THREE.Mesh(
      new THREE.BoxGeometry(doorWidth, vertWallH, 0.1),
      wallMaterial
    );
    wallTop.position.set(0, doorHeight / 2 + vertWallH / 2, 0);
    wallTop.receiveShadow = true;
    scene.add(wallTop);

    const wallBottom = new THREE.Mesh(
      new THREE.BoxGeometry(doorWidth, vertWallH, 0.1),
      wallMaterial
    );
    wallBottom.position.set(0, -(doorHeight / 2 + vertWallH / 2), 0);
    wallBottom.receiveShadow = true;
    scene.add(wallBottom);

    // Frame
    const frameLeft = new THREE.Mesh(
      new THREE.BoxGeometry(frameThickness, doorHeight + frameThickness, frameDepth),
      frameMaterial
    );
    frameLeft.position.set(-(doorWidth / 2 + frameThickness / 2), 0, 0.05);
    scene.add(frameLeft);

    const frameRight = new THREE.Mesh(
      new THREE.BoxGeometry(frameThickness, doorHeight + frameThickness, frameDepth),
      frameMaterial
    );
    frameRight.position.set(doorWidth / 2 + frameThickness / 2, 0, 0.05);
    scene.add(frameRight);

    const frameTop = new THREE.Mesh(
      new THREE.BoxGeometry(doorWidth + frameThickness * 2, frameThickness, frameDepth),
      frameMaterial
    );
    frameTop.position.set(0, doorHeight / 2 + frameThickness / 2, 0.05);
    scene.add(frameTop);

    // Neon Rim Trim
    const rimLeft = new THREE.Mesh(new THREE.BoxGeometry(0.015, doorHeight, 0.015), mintTrimMaterial);
    rimLeft.position.set(-doorWidth / 2, 0, 0.12);
    scene.add(rimLeft);

    const rimRight = new THREE.Mesh(new THREE.BoxGeometry(0.015, doorHeight, 0.015), mintTrimMaterial);
    rimRight.position.set(doorWidth / 2, 0, 0.12);
    scene.add(rimRight);

    const rimTop = new THREE.Mesh(new THREE.BoxGeometry(doorWidth, 0.015, 0.015), mintTrimMaterial);
    rimTop.position.set(0, doorHeight / 2, 0.12);
    scene.add(rimTop);

    // Door Panel and Pivot
    const doorPivot = new THREE.Group();
    doorPivot.position.set(-doorWidth / 2, 0, 0);
    scene.add(doorPivot);

    const doorGroup = new THREE.Group();
    doorGroup.position.set(doorWidth / 2, 0, 0);
    doorPivot.add(doorGroup);

    const doorMaterial = new THREE.MeshStandardMaterial({
      color: 0x101116,
      roughness: 0.45,
      metalness: 0.35,
    });

    const doorMesh = new THREE.Mesh(
      new THREE.BoxGeometry(doorWidth, doorHeight, doorDepth),
      doorMaterial
    );
    doorMesh.castShadow = true;
    doorMesh.receiveShadow = true;
    doorGroup.add(doorMesh);

    // Inset Decorative Door Panels
    for (let i = 0; i < 2; i++) {
      const panelY = i === 0 ? 0.72 : -0.72;
      const insetPanel = new THREE.Mesh(
        new THREE.BoxGeometry(doorWidth * 0.76, doorHeight * 0.4, 0.02),
        new THREE.MeshStandardMaterial({
          color: 0x0c0d12,
          roughness: 0.6,
          metalness: 0.25,
        })
      );
      insetPanel.position.set(0, panelY, doorDepth / 2 + 0.01);
      doorGroup.add(insetPanel);
    }

    // Nameplate Plaque
    const plaqueTexture = createPlaqueTexture();
    const plaqueMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.78, 0.32),
      new THREE.MeshBasicMaterial({ map: plaqueTexture })
    );
    plaqueMesh.position.set(0, 0.72, doorDepth / 2 + 0.022);
    doorGroup.add(plaqueMesh);

    const plaqueBack = new THREE.Mesh(
      new THREE.BoxGeometry(0.82, 0.36, 0.02),
      new THREE.MeshStandardMaterial({
        color: 0x1f2028,
        roughness: 0.3,
        metalness: 0.8,
      })
    );
    plaqueBack.position.set(0, 0.72, doorDepth / 2 + 0.012);
    doorGroup.add(plaqueBack);

    // Door Handle
    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      roughness: 0.2,
      metalness: 0.9,
    });

    const doorHandle = new THREE.Group();
    doorHandle.position.set(doorWidth / 2 - 0.2, -0.05, doorDepth / 2 + 0.04);
    doorGroup.add(doorHandle);

    const handleBackplate = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.26, 0.015),
      brassMaterial
    );
    doorHandle.add(handleBackplate);

    const handleStem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.016, 0.016, 0.06),
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

    // ==========================================
    // 3D SANCTUARY INTERIOR (BEHIND THE DOOR)
    // ==========================================
    const corridorW = 4.6;
    const corridorH = 4.2;
    const corridorDepth = 18;
    const corridorZ = -corridorDepth / 2;

    const floorTexture = createFloorGridTexture();
    const floorMaterial = new THREE.MeshStandardMaterial({
      map: floorTexture,
      roughness: 0.2,
      metalness: 0.8,
    });
    const corridorFloor = new THREE.Mesh(
      new THREE.PlaneGeometry(corridorW, corridorDepth),
      floorMaterial
    );
    corridorFloor.rotation.x = -Math.PI / 2;
    corridorFloor.position.set(0, -doorHeight / 2, corridorZ);
    corridorFloor.receiveShadow = true;
    scene.add(corridorFloor);

    // Floor Runway Strips
    const runwayL = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.02, corridorDepth),
      new THREE.MeshBasicMaterial({ color: 0x6ee7b7 })
    );
    runwayL.position.set(-corridorW / 2 + 0.2, -doorHeight / 2 + 0.01, corridorZ);
    scene.add(runwayL);

    const runwayR = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.02, corridorDepth),
      new THREE.MeshBasicMaterial({ color: 0x6ee7b7 })
    );
    runwayR.position.set(corridorW / 2 - 0.2, -doorHeight / 2 + 0.01, corridorZ);
    scene.add(runwayR);

    // Ceiling with recessed light strip
    const ceilingMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(corridorW, corridorDepth),
      new THREE.MeshStandardMaterial({ color: 0x0a0c10, roughness: 0.8 })
    );
    ceilingMesh.rotation.x = Math.PI / 2;
    ceilingMesh.position.set(0, doorHeight / 2 + 1.0, corridorZ);
    scene.add(ceilingMesh);

    const ceilingLightStrip = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.02, corridorDepth),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    ceilingLightStrip.position.set(0, doorHeight / 2 + 0.98, corridorZ);
    scene.add(ceilingLightStrip);

    // Side Walls & LED Fins
    const sideWallMaterial = new THREE.MeshStandardMaterial({
      color: 0x0c0e14,
      roughness: 0.6,
      metalness: 0.4,
    });

    const leftCorridorWall = new THREE.Mesh(
      new THREE.PlaneGeometry(corridorDepth, corridorH),
      sideWallMaterial
    );
    leftCorridorWall.rotation.y = Math.PI / 2;
    leftCorridorWall.position.set(-corridorW / 2, 0.5, corridorZ);
    scene.add(leftCorridorWall);

    const rightCorridorWall = new THREE.Mesh(
      new THREE.PlaneGeometry(corridorDepth, corridorH),
      sideWallMaterial
    );
    rightCorridorWall.rotation.y = -Math.PI / 2;
    rightCorridorWall.position.set(corridorW / 2, 0.5, corridorZ);
    scene.add(rightCorridorWall);

    const finZPositions = [-2.5, -5.5, -8.5, -11.5, -14.5];
    finZPositions.forEach((zPos, index) => {
      const isMint = index % 2 === 0;
      const finMat = new THREE.MeshBasicMaterial({
        color: isMint ? 0x6ee7b7 : 0xffffff,
      });

      const finL = new THREE.Mesh(new THREE.BoxGeometry(0.05, 3.4, 0.12), finMat);
      finL.position.set(-corridorW / 2 + 0.04, 0.2, zPos);
      scene.add(finL);

      const finR = new THREE.Mesh(new THREE.BoxGeometry(0.05, 3.4, 0.12), finMat);
      finR.position.set(corridorW / 2 - 0.04, 0.2, zPos);
      scene.add(finR);
    });

    // Back Wall & Glowing Portal Arch
    const backWall = new THREE.Mesh(
      new THREE.PlaneGeometry(corridorW, corridorH),
      new THREE.MeshStandardMaterial({ color: 0x06070a, roughness: 0.9 })
    );
    backWall.position.set(0, 0.5, -17.2);
    scene.add(backWall);

    const portalRingOuter = new THREE.Mesh(
      new THREE.TorusGeometry(1.6, 0.04, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0x6ee7b7 })
    );
    portalRingOuter.position.set(0, 0.4, -16.5);
    scene.add(portalRingOuter);

    const portalRingInner = new THREE.Mesh(
      new THREE.TorusGeometry(1.2, 0.025, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    portalRingInner.position.set(0, 0.4, -16.5);
    scene.add(portalRingInner);

    // Floating Geometric Crystal Core
    const portalCore = new THREE.Group();
    portalCore.position.set(0, 0.4, -16.5);
    scene.add(portalCore);

    const crystalMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.55, 0),
      new THREE.MeshStandardMaterial({
        color: 0x141824,
        roughness: 0.1,
        metalness: 0.9,
      })
    );
    portalCore.add(crystalMesh);

    const crystalWire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.72, 1),
      new THREE.MeshBasicMaterial({
        color: 0x6ee7b7,
        wireframe: true,
        transparent: true,
        opacity: 0.85,
      })
    );
    portalCore.add(crystalWire);

    // Volumetric Light Beam
    const beamGeometry = new THREE.ConeGeometry(3.2, 7.0, 32, 1, true);
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
    lightBeam.position.set(0, 0, 1.2);
    scene.add(lightBeam);

    // Floor light puddle spilling outside
    const floorSpillGeo = new THREE.PlaneGeometry(2.8, 3.6);
    const floorSpillMat = new THREE.MeshBasicMaterial({
      color: 0x6ee7b7,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const floorSpillMesh = new THREE.Mesh(floorSpillGeo, floorSpillMat);
    floorSpillMesh.rotation.x = -Math.PI / 2;
    floorSpillMesh.position.set(0, -doorHeight / 2 + 0.02, 1.6);
    scene.add(floorSpillMesh);

    // Floating Particles
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 5;
      particlePositions[i + 1] = (Math.random() - 0.5) * 4;
      particlePositions[i + 2] = -Math.random() * 16 + 2;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x6ee7b7,
      size: 0.035,
      transparent: true,
      opacity: 0.6,
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
      floorSpillMesh,
      corridorSpot,
      interiorPointFront,
      interiorPointMid,
      portalCoreLight,
      portalCore,
      particles,
    };

    // Render loop
    let reqId: number;
    const clock = new THREE.Clock();

    const render = () => {
      const elapsed = clock.getElapsedTime();
      if (portalCore) {
        portalCore.rotation.x = elapsed * 0.4;
        portalCore.rotation.y = elapsed * 0.6;
      }
      if (particles) {
        particles.rotation.y = elapsed * 0.02;
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

    // Listen to navbar "About" click to trigger door opening
    const handleOpenFromNav = () => {
      handleToggleDoor(true);
    };
    window.addEventListener('open-door-sanctuary', handleOpenFromNav);

    // GSAP ScrollTrigger Choreography
    const ctxTimeline = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=220%',
          pin: true,
          scrub: 1.2,
          onUpdate: (self) => {
            const p = self.progress;
            setDoorProgress(p);

            // Dynamically fade out header as door opens
            if (headerRef.current) {
              const headerOpacity = p < 0.2 ? 1 : Math.max(0, 1 - (p - 0.2) * 2.8);
              const headerY = -(p * 40);
              headerRef.current.style.opacity = headerOpacity.toString();
              headerRef.current.style.transform = `translateY(${headerY}px)`;
            }
          },
        },
      });

      // 1. Camera approaches closed door (progress 0 -> 0.3)
      tl.to(camera.position, {
        z: 3.4,
        y: 0.05,
        ease: 'power2.inOut',
        duration: 0.3,
      }, 0);

      // 2. Door handle unlatches (progress 0.2 -> 0.35)
      tl.to(doorHandle.rotation, {
        z: -0.38,
        ease: 'power1.out',
        duration: 0.15,
      }, 0.2);

      // 3. Door swings wide open to -115 degrees (progress 0.35 -> 0.72)
      tl.to(doorPivot.rotation, {
        y: -Math.PI * 0.64,
        ease: 'power2.inOut',
        duration: 0.37,
      }, 0.35);

      // 4. Lights ignite with brilliant illumination
      tl.to(corridorSpot, {
        intensity: 14,
        ease: 'power2.in',
        duration: 0.37,
      }, 0.35);

      tl.to(interiorPointFront, {
        intensity: 7,
        ease: 'power2.in',
        duration: 0.37,
      }, 0.35);

      tl.to(interiorPointMid, {
        intensity: 8,
        ease: 'power2.in',
        duration: 0.37,
      }, 0.35);

      tl.to(portalCoreLight, {
        intensity: 12,
        ease: 'power2.in',
        duration: 0.37,
      }, 0.35);

      tl.to(beamMaterial, {
        opacity: 0.32,
        ease: 'power2.in',
        duration: 0.37,
      }, 0.35);

      tl.to(floorSpillMat, {
        opacity: 0.28,
        ease: 'power2.in',
        duration: 0.37,
      }, 0.35);

      // 5. Camera glides directly through the doorway (progress 0.7 -> 1.0)
      tl.to(camera.position, {
        z: -2.8,
        y: 0.1,
        ease: 'power1.inOut',
        duration: 0.3,
      }, 0.7);

      tl.to(camera, {
        fov: 54,
        onUpdate: () => camera.updateProjectionMatrix(),
        duration: 0.3,
      }, 0.7);
    }, container);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('open-door-sanctuary', handleOpenFromNav);
      ctxTimeline.revert();
      renderer.dispose();
      wallMaterial.dispose();
      frameMaterial.dispose();
      mintTrimMaterial.dispose();
      doorMaterial.dispose();
      brassMaterial.dispose();
      plaqueTexture.dispose();
      floorTexture.dispose();
    };
  }, []);

  const isAboutVisible = doorProgress > 0.45 || isOpenManually;

  return (
    <section
      id="doors"
      ref={containerRef}
      className="relative w-full h-screen bg-[#060709] overflow-hidden flex flex-col items-center justify-between select-none"
    >
      {/* Anchor target for navbar #about navigation */}
      <div id="about" className="absolute top-0 pointer-events-none" />

      {/* 3D WebGL Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block z-0"
      />

      {/* Exterior Cinematic Header (Fades out dynamically when door opens to reveal About) */}
      <div
        ref={headerRef}
        className={`relative z-10 w-full max-w-7xl mx-auto px-6 pt-16 flex flex-col items-center text-center pointer-events-none transition-all duration-300 ease-out ${
          isAboutVisible ? 'opacity-0 pointer-events-none -translate-y-8' : 'opacity-100'
        }`}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/85 border border-white/10 backdrop-blur-md mb-4 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#6ee7b7]" />
          <span className="font-mono text-xs tracking-widest uppercase text-zinc-300">
            CHAPTER 03 &bull; THE PORTAL
          </span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-2xl drop-shadow-2xl">
          Magic happens <br className="hidden sm:inline" />
          <span className="text-[#6ee7b7] drop-shadow-[0_2px_12px_rgba(110,231,183,0.35)]">
            behind the doors.
          </span>
        </h2>
        <p className="font-sans text-xs sm:text-sm text-zinc-400 mt-3 max-w-md">
          Step into the sanctuary: Test Engineer rigor, AI-assisted development, and verified architectures.
        </p>
      </div>

      {/* ========================================================= */}
      {/* ABOUT EXPERIENCE REVEALED INSIDE THE DOOR WITH ANIMATION */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isAboutVisible && (
          <motion.div
            key="about-inside-door"
            initial={{ opacity: 0, scale: 0.94, y: 35 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-20 flex items-center justify-center p-3 sm:p-6 md:p-8 pointer-events-auto"
          >
            <div className="relative w-full max-w-6xl max-h-[86vh] overflow-y-auto p-5 sm:p-8 lg:p-10 rounded-3xl bg-[#090b10]/90 border border-white/15 backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.9)] text-zinc-100 flex flex-col justify-between">
              
              {/* Top Navigation & Close Row */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-white/10 backdrop-blur-md">
                  <Terminal className="w-3.5 h-3.5 text-[#6ee7b7]" />
                  <span className="font-mono text-[11px] sm:text-xs tracking-widest uppercase text-zinc-300">
                    CHAPTER 04 &bull; PHILOSOPHY &amp; BACKGROUND
                  </span>
                </div>

                <button
                  onClick={() => handleToggleDoor(false)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-white/30 text-xs font-mono text-zinc-300 hover:text-white transition-all group shadow-md"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#6ee7b7] group-hover:-rotate-90 transition-transform" />
                  <span className="hidden sm:inline">RETURN TO ENTRANCE</span>
                </button>
              </div>

              {/* Editorial Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] mb-8"
              >
                THE PERSON <br />
                <span className="text-[#6ee7b7] drop-shadow-[0_2px_12px_rgba(110,231,183,0.35)]">
                  BEHIND THE CODE.
                </span>
              </motion.h2>

              {/* Two-Column Storytelling Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-6">
                
                {/* Left Column: Narrative Prose & Badges */}
                <div className="lg:col-span-7 space-y-4 text-zinc-300 font-light text-sm sm:text-base leading-relaxed">
                  <motion.p
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="border-l-2 border-[#6ee7b7] pl-4 py-1 text-white font-medium text-base sm:text-lg italic"
                  >
                    "Quality is never an accident; it is always the result of high intention, sincere effort, intelligent direction, and skillful execution."
                  </motion.p>
                  
                  <p>
                    I am an <strong className="text-white font-semibold">MCA graduate, Test Engineer, and AI-Assisted Developer</strong> based in Dubai with dedicated QA experience. Having served as the Point of Contact at SIDE, Bangalore, I specialize in bridging the gap between bulletproof quality assurance and forward-looking software development.
                  </p>
                  
                  <p>
                    My background spans complete testing lifecycles across <span className="text-[#6ee7b7] font-medium">Android and iOS mobile applications</span>, executing functional, regression, smoke, sanity, exploratory, and User Acceptance Testing (UAT). Every edge case matters. Every defect documented in JIRA is an opportunity to fortify software stability and elevate end-user satisfaction.
                  </p>
                  
                  <p>
                    Beyond traditional testing, I actively engineer <span className="text-[#6ee7b7] font-medium">AI-assisted test agents</span> and full-stack applications. Utilizing modern LLM orchestration, Playwright browser automation, and Google Antigravity workflows, I design automated solutions that accelerate test coverage without sacrificing empirical precision.
                  </p>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-2 pt-3">
                    {aboutBadges.map((badge, idx) => (
                      <motion.span
                        key={badge}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 + idx * 0.04 }}
                        className="px-2.5 py-1 rounded-full bg-zinc-900/90 border border-white/10 text-xs font-mono text-zinc-300 hover:border-[#6ee7b7]/40 hover:text-white transition-colors"
                      >
                        {badge}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Right Column: 4 Pillar Feature Cards */}
                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
                  {aboutHighlights.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.25 + idx * 0.09 }}
                        whileHover={{ y: -3, borderColor: 'rgba(110, 231, 183, 0.45)' }}
                        className="p-4 sm:p-4.5 rounded-2xl bg-zinc-900/70 border border-white/10 hover:border-[#6ee7b7]/40 backdrop-blur-md transition-all duration-300 group shadow-lg"
                      >
                        <div className="flex items-center gap-3 mb-1.5">
                          <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#6ee7b7] group-hover:bg-[#6ee7b7] group-hover:text-black transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <h3 className="font-display font-bold text-sm sm:text-base text-white">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-xs text-zinc-400 font-light leading-relaxed">
                          {item.desc}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>

              </div>

              {/* Card Footer Status & Continue Link */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs font-mono">
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-[#6ee7b7] animate-pulse" />
                  <span>SANCTUARY ONLINE &bull; DUBAI, UAE &bull; 100% QUALITY STANDARDS</span>
                </div>

                <a
                  href="#timeline"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#timeline')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6ee7b7]/15 hover:bg-[#6ee7b7]/25 text-[#6ee7b7] border border-[#6ee7b7]/30 transition-all font-semibold"
                >
                  <span>SCROLL TO CAREER TIMELINE</span>
                  <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
                </a>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exterior Controls & Status HUD (Visible only when door is closed) */}
      {!isAboutVisible && (
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-12 flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-auto">
          
          {/* Left Side: Door State Indicator */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-zinc-950/90 border border-white/10 backdrop-blur-md shadow-xl text-xs font-mono text-zinc-300">
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-500" />
            <span>PORTAL READY</span>
            <span className="text-zinc-600">|</span>
            <span className="text-white font-bold">{Math.round(doorProgress * 100)}% THROUGH</span>
          </div>

          {/* Center: Tap to Step Inside Button */}
          <button
            onClick={() => handleToggleDoor(true)}
            className="group flex items-center gap-3 px-7 py-3.5 rounded-full bg-white hover:bg-neutral-100 text-black font-semibold text-xs tracking-wider shadow-[0_0_35px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-105 active:scale-95 border border-white/30"
          >
            <DoorOpen className="w-4 h-4 text-black" />
            <span>STEP THROUGH DOOR</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Right Side: Quick Features Behind Door */}
          <div className="hidden lg:flex items-center gap-3 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <Shield className="w-3.5 h-3.5 text-[#6ee7b7]" />
              Test Engineering Rigor
            </span>
            <span className="text-zinc-600">&bull;</span>
            <span className="flex items-center gap-1.5 text-zinc-300">
              <Zap className="w-3.5 h-3.5 text-[#6ee7b7]" />
              AI-Assisted Architecture
            </span>
          </div>
        </div>
      )}
    </section>
  );
};
