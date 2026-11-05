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
  ChevronDown,
  CheckCircle2,
  MapPin,
  Award
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Helper: High-DPI Plaque Texture for Door Face (Polished Titanium on Red Door)
function createPlaqueTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 420;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Dark brushed obsidian-titanium plate
    const grad = ctx.createLinearGradient(0, 0, 1024, 420);
    grad.addColorStop(0, '#101116');
    grad.addColorStop(0.5, '#181920');
    grad.addColorStop(1, '#0c0d12');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 420);

    // Double Borders
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 4;
    ctx.strokeRect(12, 12, 1000, 396);

    ctx.strokeStyle = 'rgba(204, 26, 43, 0.55)'; // Subtle red inner frame
    ctx.lineWidth = 2.5;
    ctx.strokeRect(24, 24, 976, 372);

    // Corner rivets
    const rivets = [
      [36, 36], [988, 36], [36, 384], [988, 384]
    ];
    rivets.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#f4f4f5';
      ctx.fill();
    });

    // Top Micro Badge
    ctx.fillStyle = 'rgba(204, 26, 43, 0.2)';
    ctx.fillRect(362, 45, 300, 36);
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(362, 45, 300, 36);
    ctx.font = 'bold 16px "JetBrains Mono", monospace';
    ctx.fillStyle = '#fca5a5';
    ctx.textAlign = 'center';
    ctx.fillText('• SANCTUARY PORTAL •', 512, 69);

    // Name Headline
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 62px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('AKSHAY KANTH C', 512, 160);

    // Role Subtitle
    ctx.fillStyle = '#6ee7b7';
    ctx.font = 'bold 28px "JetBrains Mono", monospace';
    ctx.fillText('TEST ENGINEER  •  AI-ASSISTED DEVELOPER', 512, 225);

    // Divider line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.moveTo(120, 265);
    ctx.lineTo(904, 265);
    ctx.stroke();

    // Bottom Specs
    ctx.fillStyle = '#e4e4e7';
    ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('DUBAI, UAE  |  100% QUALITY RIGOR  |  STEP INSIDE', 512, 320);

    // Small prompt
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 18px "JetBrains Mono", monospace';
    ctx.fillText('SCROLL OR TAP TO OPEN RED SANCTUARY DOOR', 512, 368);
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
  const [activeTab, setActiveTab] = useState<'all' | 'qa' | 'ai'>('all');

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

  // 4 Core Capability Pillars
  const pillars = [
    {
      id: 'mobile-qa',
      icon: Smartphone,
      category: 'TESTING RIGOR',
      title: 'Mobile Ecosystem QA',
      metric: '100% MANUAL & DEVICE COVERAGE',
      desc: 'Extensive validation on native Android & iOS smartphones. Deep testing of touch interactions, push notifications, and hardware constraints.',
      accent: '#6ee7b7',
    },
    {
      id: 'defect-lifecycle',
      icon: Bug,
      category: 'QUALITY PROCESS',
      title: 'Defect Lifecycle & JIRA',
      metric: 'POINT OF CONTACT EXCELLENCE',
      desc: 'End-to-end defect tracking, regression suites, severity triage, and continuous alignment with developers until complete verified resolution.',
      accent: '#ffffff',
    },
    {
      id: 'ai-engineering',
      icon: BrainCircuit,
      category: 'INTELLIGENT WORKFLOWS',
      title: 'AI-Assisted Engineering',
      metric: 'VIBE CODING & AGENTIC TECH',
      desc: 'Harnessing generative AI models & agentic frameworks to accelerate test synthesis, optimize coverage, and prototype at high velocity.',
      accent: '#6ee7b7',
    },
    {
      id: 'fullstack-arch',
      icon: Layers,
      category: 'DEVELOPMENT FOUNDATION',
      title: 'Full-Stack Architecture',
      metric: 'MCA POST-GRADUATE RIGOR',
      desc: 'Modern web engineering with React 18, TypeScript, Node.js, and scalable cloud patterns, bridging test discipline with development velocity.',
      accent: '#ffffff',
    },
  ];

  const quickBadges = [
    'Dubai, UAE',
    'Test Engineer',
    'AI-Assisted Developer',
    'MCA Graduate',
    'Point of Contact (POC)',
    'Mobile QA (Android/iOS)',
    'JIRA & Agile Scrum',
    'Open to Relocation',
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

    // Camera deep zoom into corridor
    gsap.to(camera.position, {
      z: targetState ? -3.4 : 5.5,
      y: targetState ? 0.1 : 0,
      duration: 1.6,
      ease: 'power2.inOut',
    });

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

    // Neon Rim Trim framing the doorway
    const rimLeft = new THREE.Mesh(new THREE.BoxGeometry(0.015, doorHeight, 0.015), mintTrimMaterial);
    rimLeft.position.set(-doorWidth / 2, 0, 0.12);
    scene.add(rimLeft);

    const rimRight = new THREE.Mesh(new THREE.BoxGeometry(0.015, doorHeight, 0.015), mintTrimMaterial);
    rimRight.position.set(doorWidth / 2, 0, 0.12);
    scene.add(rimRight);

    const rimTop = new THREE.Mesh(new THREE.BoxGeometry(doorWidth, 0.015, 0.015), mintTrimMaterial);
    rimTop.position.set(0, doorHeight / 2, 0.12);
    scene.add(rimTop);

    // ==========================================
    // THE RED DOOR & HINGE PIVOT SYSTEM
    // ==========================================
    const doorPivot = new THREE.Group();
    doorPivot.position.set(-doorWidth / 2, 0, 0);
    scene.add(doorPivot);

    const doorGroup = new THREE.Group();
    doorGroup.position.set(doorWidth / 2, 0, 0);
    doorPivot.add(doorGroup);

    // Striking Luxury Crimson Red Door Panel
    const doorMaterial = new THREE.MeshStandardMaterial({
      color: 0xcc1a2b, // Luxury crimson red lacquer
      roughness: 0.32,
      metalness: 0.25,
    });

    const doorMesh = new THREE.Mesh(
      new THREE.BoxGeometry(doorWidth, doorHeight, doorDepth),
      doorMaterial
    );
    doorMesh.castShadow = true;
    doorMesh.receiveShadow = true;
    doorGroup.add(doorMesh);

    // Deep Velvet Crimson Inset Panels
    const insetMaterial = new THREE.MeshStandardMaterial({
      color: 0x8a101c, // Deep rich scarlet / burgundy inset
      roughness: 0.42,
      metalness: 0.2,
    });

    for (let i = 0; i < 2; i++) {
      const panelY = i === 0 ? 0.72 : -0.72;
      const insetPanel = new THREE.Mesh(
        new THREE.BoxGeometry(doorWidth * 0.76, doorHeight * 0.4, 0.02),
        insetMaterial
      );
      insetPanel.position.set(0, panelY, doorDepth / 2 + 0.01);
      doorGroup.add(insetPanel);
    }

    // Nameplate Plaque (Polished Titanium & Crisp White Text on Red Door)
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
        color: 0x181920,
        roughness: 0.2,
        metalness: 0.85,
      })
    );
    plaqueBack.position.set(0, 0.72, doorDepth / 2 + 0.012);
    doorGroup.add(plaqueBack);

    // Polished Silver Lever Handle
    const handleMaterial = new THREE.MeshStandardMaterial({
      color: 0xf4f4f5,
      roughness: 0.15,
      metalness: 0.95,
    });

    const doorHandle = new THREE.Group();
    doorHandle.position.set(doorWidth / 2 - 0.2, -0.05, doorDepth / 2 + 0.04);
    doorGroup.add(doorHandle);

    const handleBackplate = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.26, 0.015),
      handleMaterial
    );
    doorHandle.add(handleBackplate);

    const handleStem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.016, 0.016, 0.06),
      handleMaterial
    );
    handleStem.rotation.x = Math.PI / 2;
    handleStem.position.set(0, 0.04, 0.03);
    doorHandle.add(handleStem);

    const handleLever = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.03, 0.03),
      handleMaterial
    );
    handleLever.position.set(-0.08, 0.04, 0.06);
    doorHandle.add(handleLever);

    // ==========================================
    // 3D SANCTUARY INTERIOR (BEHIND THE RED DOOR)
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

    // Ceiling
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

            if (headerRef.current) {
              const headerOpacity = p < 0.2 ? 1 : Math.max(0, 1 - (p - 0.2) * 2.8);
              const headerY = -(p * 40);
              headerRef.current.style.opacity = headerOpacity.toString();
              headerRef.current.style.transform = `translateY(${headerY}px)`;
            }
          },
        },
      });

      // 1. Camera approaches closed red door
      tl.to(camera.position, {
        z: 3.4,
        y: 0.05,
        ease: 'power2.inOut',
        duration: 0.3,
      }, 0);

      // 2. Door handle unlatches
      tl.to(doorHandle.rotation, {
        z: -0.38,
        ease: 'power1.out',
        duration: 0.15,
      }, 0.2);

      // 3. Red door swings wide open to -115 degrees
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

      // 5. Camera dollies deep into the corridor
      tl.to(camera.position, {
        z: -3.4,
        y: 0.1,
        ease: 'power1.inOut',
        duration: 0.3,
      }, 0.7);

      tl.to(camera, {
        fov: 46,
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
      insetMaterial.dispose();
      handleMaterial.dispose();
      plaqueTexture.dispose();
      floorTexture.dispose();
    };
  }, []);

  const isInsideDoor = doorProgress > 0.42 || isOpenManually;

  return (
    <section
      id="doors"
      ref={containerRef}
      className="relative w-full h-screen bg-[#060709] overflow-hidden flex flex-col items-center justify-between select-none"
    >
      <div id="about" className="absolute top-0 pointer-events-none" />

      {/* 3D WebGL Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block z-0"
      />

      {/* Exterior Cinematic Header (Fades out dynamically when red door opens) */}
      <div
        ref={headerRef}
        className={`relative z-10 w-full max-w-7xl mx-auto px-6 pt-16 flex flex-col items-center text-center pointer-events-none transition-all duration-300 ease-out ${
          isInsideDoor ? 'opacity-0 pointer-events-none -translate-y-8' : 'opacity-100'
        }`}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-red-500/30 backdrop-blur-md mb-4 shadow-lg shadow-red-950/20">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="font-mono text-xs tracking-widest uppercase text-red-200">
            CHAPTER 03 &bull; THE RED PORTAL
          </span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-2xl drop-shadow-2xl">
          Magic happens <br className="hidden sm:inline" />
          <span className="text-red-500 drop-shadow-[0_2px_14px_rgba(239,68,68,0.4)]">
            behind the red door.
          </span>
        </h2>
        <p className="font-sans text-xs sm:text-sm text-zinc-400 mt-3 max-w-md">
          Step into Akshay's sanctuary: Test Engineer rigor, AI-assisted development, and verified architectures.
        </p>
      </div>

      {/* ========================================================= */}
      {/* SPATIAL HOLOGRAPHIC SANCTUARY INSIDE THE DOOR (NEW DESIGN) */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isInsideDoor && (
          <motion.div
            key="spatial-sanctuary-hud"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-20 flex flex-col justify-between p-4 sm:p-6 lg:p-8 pointer-events-none"
          >
            {/* Top Minimal HUD Bar */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="w-full max-w-7xl mx-auto flex items-center justify-between gap-4 pointer-events-auto"
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-xl shadow-xl">
                <span className="w-2 h-2 rounded-full bg-[#6ee7b7] animate-ping" />
                <span className="font-mono text-[11px] sm:text-xs tracking-wider uppercase text-zinc-200 font-medium">
                  SANCTUARY CHAMBER &bull; CHAPTER 04: PHILOSOPHY &amp; CAPABILITIES
                </span>
              </div>

              <button
                onClick={() => handleToggleDoor(false)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-red-500/30 hover:border-red-500/60 text-xs font-mono text-zinc-200 hover:text-white transition-all shadow-lg group"
              >
                <RotateCcw className="w-3.5 h-3.5 text-red-400 group-hover:-rotate-90 transition-transform" />
                <span className="hidden sm:inline">RETURN TO RED DOOR</span>
              </button>
            </motion.div>

            {/* Spatial Split Flanking Consoles (Leaves Center Corridor Clear & Visible!) */}
            <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col lg:flex-row items-center justify-between gap-6 my-auto py-2 pointer-events-none overflow-y-auto custom-scrollbar">
              
              {/* LEFT SPATIAL POD: Identity & Philosophical Rigor */}
              <motion.div
                initial={{ x: -40, opacity: 0, scale: 0.96 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: -40, opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full lg:w-[460px] p-6 sm:p-7 rounded-3xl bg-black/55 border border-white/15 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] pointer-events-auto flex flex-col justify-between"
              >
                <div>
                  {/* Identity Header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[11px] tracking-widest uppercase text-[#6ee7b7] flex items-center gap-1.5">
                      <Terminal className="w-3 h-3 text-[#6ee7b7]" />
                      THE PERSON BEHIND THE CODE
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
                      DUBAI, UAE
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-1">
                    AKSHAY KANTH C
                  </h3>
                  <div className="font-mono text-xs text-[#6ee7b7] font-semibold tracking-wider mb-4">
                    TEST ENGINEER &bull; AI-ASSISTED DEVELOPER
                  </div>

                  {/* Philosophy Quote */}
                  <blockquote className="border-l-2 border-red-500/80 pl-3.5 py-1 text-zinc-300 font-light text-xs sm:text-sm italic mb-4 leading-relaxed bg-white/[0.02] rounded-r-lg">
                    "Quality is never an accident; it is always the result of sincere effort, intelligent direction, and skillful execution."
                  </blockquote>

                  {/* 3 Scannable Experience Metrics */}
                  <div className="space-y-2 mb-4">
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 flex items-start gap-2.5">
                      <Award className="w-4 h-4 text-[#6ee7b7] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-semibold text-white">Feature Point of Contact (POC)</div>
                        <div className="text-[11px] text-zinc-400 font-light">SIDE, Bangalore &bull; Coordinated defect resolution with dev teams</div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 flex items-start gap-2.5">
                      <Smartphone className="w-4 h-4 text-[#6ee7b7] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-semibold text-white">Mobile QA &amp; Defect Lifecycle</div>
                        <div className="text-[11px] text-zinc-400 font-light">Android &amp; iOS hardware &bull; Functional, regression, sanity &amp; UAT</div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 flex items-start gap-2.5">
                      <Layers className="w-4 h-4 text-[#6ee7b7] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-semibold text-white">MCA Graduate &amp; AI Builder</div>
                        <div className="text-[11px] text-zinc-400 font-light">Master of Computer Applications &bull; Accelerated AI test workflows</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                  {quickBadges.slice(0, 6).map((b) => (
                    <span
                      key={b}
                      className="px-2 py-0.5 rounded-full bg-zinc-900/90 border border-white/10 text-[10px] font-mono text-zinc-300"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* RIGHT SPATIAL POD: Interactive 4 Capabilities Deck */}
              <motion.div
                initial={{ x: 40, opacity: 0, scale: 0.96 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: 40, opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.55, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="w-full lg:w-[490px] p-6 sm:p-7 rounded-3xl bg-black/55 border border-white/15 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] pointer-events-auto flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[11px] tracking-widest uppercase text-zinc-300 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-[#6ee7b7]" />
                      CORE CAPABILITIES &bull; 4 PILLARS
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      INTERACTIVE TILES
                    </span>
                  </div>

                  {/* 2x2 Grid of High-Impact Compact Capability Tiles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {pillars.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + idx * 0.08, duration: 0.4 }}
                          whileHover={{ y: -3, scale: 1.02 }}
                          className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#6ee7b7]/40 transition-all duration-300 group shadow-md cursor-default"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="w-7 h-7 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-[#6ee7b7] group-hover:bg-[#6ee7b7] group-hover:text-black transition-colors">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-[9px] font-mono text-zinc-400 group-hover:text-zinc-200 uppercase tracking-wider">
                              0{idx + 1}
                            </span>
                          </div>

                          <h4 className="font-display font-bold text-xs sm:text-sm text-white mb-1 group-hover:text-[#6ee7b7] transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                            {item.desc}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Verification Banner */}
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-[11px]">100% DEFECT LIFECYCLE PRECISION</span>
                  </div>
                  <span className="text-[10px] text-zinc-400">READY TO DEPLOY</span>
                </div>
              </motion.div>

            </div>

            {/* Bottom Minimal Navigation Guidance */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="w-full max-w-7xl mx-auto flex items-center justify-center pointer-events-auto pt-2"
            >
              <a
                href="#timeline"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#timeline')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/70 hover:bg-black/90 text-xs font-mono text-[#6ee7b7] hover:text-white border border-white/15 hover:border-[#6ee7b7]/50 backdrop-blur-xl shadow-xl transition-all"
              >
                <span>EXPLORE CAREER TIMELINE</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exterior Controls & Status HUD (Visible when red door is closed) */}
      {!isInsideDoor && (
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-12 flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-auto">
          
          {/* Left Side: Door State Indicator */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-zinc-950/90 border border-white/10 backdrop-blur-md shadow-xl text-xs font-mono text-zinc-300">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
            <span>RED PORTAL READY</span>
            <span className="text-zinc-600">|</span>
            <span className="text-white font-bold">{Math.round(doorProgress * 100)}% THROUGH</span>
          </div>

          {/* Center: Tap to Step Inside Button */}
          <button
            onClick={() => handleToggleDoor(true)}
            className="group flex items-center gap-3 px-7 py-3.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-semibold text-xs tracking-wider shadow-[0_0_35px_rgba(239,68,68,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 border border-red-400/40"
          >
            <DoorOpen className="w-4 h-4 text-white" />
            <span>STEP THROUGH RED DOOR</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Right Side: Quick Features Behind Door */}
          <div className="hidden lg:flex items-center gap-3 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <Shield className="w-3.5 h-3.5 text-red-400" />
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
