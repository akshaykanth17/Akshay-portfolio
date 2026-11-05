import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, DoorOpen, ArrowRight, Shield, Zap, CheckCircle2, RotateCcw } from 'lucide-react';

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

// Helper: Holographic Display Tablet Canvas Texture
function createHoloCardTexture(
  title: string,
  badge: string,
  bullets: string[],
  accentColor: string
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 760;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Glass panel background
    ctx.fillStyle = 'rgba(10, 12, 16, 0.92)';
    ctx.fillRect(0, 0, 640, 760);

    // Glowing border
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, 620, 740);

    // Inner subtle border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    ctx.strokeRect(22, 22, 596, 716);

    // Top Category Badge
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fillRect(40, 45, 220, 40);
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(40, 45, 220, 40);

    ctx.fillStyle = accentColor;
    ctx.font = 'bold 18px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(badge, 60, 71);

    // Card Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 38px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(title, 40, 150);

    // Divider
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.moveTo(40, 185);
    ctx.lineTo(600, 185);
    ctx.stroke();

    // Bullets
    ctx.font = '500 24px "Plus Jakarta Sans", sans-serif';
    bullets.forEach((bullet, idx) => {
      const y = 245 + idx * 75;

      // Glow check icon
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.arc(55, y - 8, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#f4f4f5';
      ctx.fillText(bullet, 80, y);
    });

    // Bottom Status Box
    ctx.fillStyle = 'rgba(110, 231, 183, 0.08)';
    ctx.fillRect(40, 630, 560, 60);
    ctx.strokeStyle = 'rgba(110, 231, 183, 0.3)';
    ctx.strokeRect(40, 630, 560, 60);

    ctx.fillStyle = '#6ee7b7';
    ctx.font = 'bold 20px "JetBrains Mono", monospace';
    ctx.fillText('STATUS: ONLINE & VERIFIED', 60, 668);
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
    holoCardLeft: THREE.Group;
    holoCardRight: THREE.Group;
    particles: THREE.Points;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060709);
    // Linear fog: starts at 6 units, reaches full density at 26 units (corridor is brightly visible!)
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

    // Powerful spotlight pointing from inside the room OUT through the door frame
    const corridorSpot = new THREE.SpotLight(0xffffff, 0, 32, Math.PI / 3.5, 0.45, 1.2);
    corridorSpot.position.set(0, 3.0, -4.0);
    corridorSpot.target.position.set(0, 0, 2.0);
    scene.add(corridorSpot);
    scene.add(corridorSpot.target);

    // Bright front-corridor point light (illuminates immediate doorway)
    const interiorPointFront = new THREE.PointLight(0xffffff, 0, 14);
    interiorPointFront.position.set(0, 1.2, -2.5);
    scene.add(interiorPointFront);

    // Mid-corridor light mint green point light
    const interiorPointMid = new THREE.PointLight(0x6ee7b7, 0, 16);
    interiorPointMid.position.set(0, 1.4, -8.0);
    scene.add(interiorPointMid);

    // Deep Portal Core Point Light (brilliant light mint & emerald glow)
    const portalCoreLight = new THREE.PointLight(0x6ee7b7, 0, 25);
    portalCoreLight.position.set(0, 0.4, -15.5);
    scene.add(portalCoreLight);

    // ==========================================
    // FRONT WALL ARCHITECTURE (WITH REAL OPENING!)
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

    // 4 Facade Panels forming the door cutout
    const facadeTotalW = 18;
    const facadeTotalH = 12;
    const sideWallW = (facadeTotalW - doorWidth) / 2;
    const vertWallH = (facadeTotalH - doorHeight) / 2;

    // Left outer wall
    const wallLeft = new THREE.Mesh(
      new THREE.BoxGeometry(sideWallW, facadeTotalH, 0.1),
      wallMaterial
    );
    wallLeft.position.set(-(doorWidth / 2 + sideWallW / 2), 0, 0);
    wallLeft.receiveShadow = true;
    scene.add(wallLeft);

    // Right outer wall
    const wallRight = new THREE.Mesh(
      new THREE.BoxGeometry(sideWallW, facadeTotalH, 0.1),
      wallMaterial
    );
    wallRight.position.set(doorWidth / 2 + sideWallW / 2, 0, 0);
    wallRight.receiveShadow = true;
    scene.add(wallRight);

    // Top outer wall (above door)
    const wallTop = new THREE.Mesh(
      new THREE.BoxGeometry(doorWidth, vertWallH, 0.1),
      wallMaterial
    );
    wallTop.position.set(0, doorHeight / 2 + vertWallH / 2, 0);
    wallTop.receiveShadow = true;
    scene.add(wallTop);

    // Bottom outer wall sill
    const wallBottom = new THREE.Mesh(
      new THREE.BoxGeometry(doorWidth, vertWallH, 0.1),
      wallMaterial
    );
    wallBottom.position.set(0, -(doorHeight / 2 + vertWallH / 2), 0);
    wallBottom.receiveShadow = true;
    scene.add(wallBottom);

    // Door Frame Surround
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

    // Glowing Neon Inner Rim Trim (frames the opening)
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
    // THE DOOR & HINGE PIVOT SYSTEM
    // ==========================================
    const doorPivot = new THREE.Group();
    doorPivot.position.set(-doorWidth / 2, 0, 0); // Position pivot right at the left hinge
    scene.add(doorPivot);

    const doorGroup = new THREE.Group();
    doorGroup.position.set(doorWidth / 2, 0, 0);
    doorPivot.add(doorGroup);

    // Luxury Door Panel
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

    // Inset Decorative Door Panels (Beveled Luxury Aesthetic)
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

    // Brushed Metal Nameplate Plaque
    const plaqueTexture = createPlaqueTexture();
    const plaqueMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.78, 0.32),
      new THREE.MeshBasicMaterial({ map: plaqueTexture })
    );
    plaqueMesh.position.set(0, 0.72, doorDepth / 2 + 0.022);
    doorGroup.add(plaqueMesh);

    // Plaque Chamfer Backing
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

    // Brushed Silver Lever Handle
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
    // THE 3D SANCTUARY INTERIOR (BEHIND THE DOOR)
    // ==========================================
    const corridorW = 4.6;
    const corridorH = 4.2;
    const corridorDepth = 18;
    const corridorZ = -corridorDepth / 2; // centered at z = -9

    // 1. Reflective Architectural Floor
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

    // Floor Runway Neon Edge Strips (Light Mint Green)
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

    // 2. High Architectural Ceiling with Recessed Light Cove
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

    // 3. Side Architectural Walls with Vertical LED Fins
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

    // Rhythmic Vertical LED Light Fins along corridor
    const finZPositions = [-2.5, -5.5, -8.5, -11.5, -14.5];
    finZPositions.forEach((zPos, index) => {
      const isMint = index % 2 === 0;
      const finMat = new THREE.MeshBasicMaterial({
        color: isMint ? 0x6ee7b7 : 0xffffff,
      });

      // Left fin
      const finL = new THREE.Mesh(new THREE.BoxGeometry(0.05, 3.4, 0.12), finMat);
      finL.position.set(-corridorW / 2 + 0.04, 0.2, zPos);
      scene.add(finL);

      // Right fin
      const finR = new THREE.Mesh(new THREE.BoxGeometry(0.05, 3.4, 0.12), finMat);
      finR.position.set(corridorW / 2 - 0.04, 0.2, zPos);
      scene.add(finR);
    });

    // 4. Back Wall & The Radiant Portal Arch (at z = -17)
    const backWall = new THREE.Mesh(
      new THREE.PlaneGeometry(corridorW, corridorH),
      new THREE.MeshStandardMaterial({ color: 0x06070a, roughness: 0.9 })
    );
    backWall.position.set(0, 0.5, -17.2);
    scene.add(backWall);

    // Outer Neon Ring (Light Mint Green)
    const portalRingOuter = new THREE.Mesh(
      new THREE.TorusGeometry(1.6, 0.04, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0x6ee7b7 })
    );
    portalRingOuter.position.set(0, 0.4, -16.5);
    scene.add(portalRingOuter);

    // Inner Neon Ring (Bright White)
    const portalRingInner = new THREE.Mesh(
      new THREE.TorusGeometry(1.2, 0.025, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    portalRingInner.position.set(0, 0.4, -16.5);
    scene.add(portalRingInner);

    // Central Floating 3D Geometric Energy Core
    const portalCore = new THREE.Group();
    portalCore.position.set(0, 0.4, -16.5);
    scene.add(portalCore);

    const crystalMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.55, 0),
      new THREE.MeshStandardMaterial({
        color: 0x141824,
        roughness: 0.1,
        metalness: 0.9,
        wireframe: false,
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

    // 5. Holographic Display Tablets Inside Corridor
    // Left Holographic Card: Test Engineering Rigor
    const holoCardLeft = new THREE.Group();
    holoCardLeft.position.set(-1.25, 0.15, -4.5);
    holoCardLeft.rotation.y = 0.35; // Angled toward viewer
    scene.add(holoCardLeft);

    const cardTexLeft = createHoloCardTexture(
      'QA RIGOR & AUTOMATION',
      'CORE DISCIPLINE',
      [
        'Playwright & Appium Frameworks',
        'Defect Lifecycle Management',
        'Android & iOS Test Automation',
        '100% Verified Quality Standards',
      ],
      '#6ee7b7'
    );
    const cardMeshLeft = new THREE.Mesh(
      new THREE.PlaneGeometry(1.3, 1.55),
      new THREE.MeshBasicMaterial({
        map: cardTexLeft,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide,
      })
    );
    holoCardLeft.add(cardMeshLeft);

    // Right Holographic Card: AI-Assisted Architecture
    const holoCardRight = new THREE.Group();
    holoCardRight.position.set(1.25, 0.15, -8.5);
    holoCardRight.rotation.y = -0.35; // Angled toward viewer
    scene.add(holoCardRight);

    const cardTexRight = createHoloCardTexture(
      'AI-ASSISTED ARCHITECTURE',
      'ACCELERATED DEV',
      [
        'Full-Stack Vibe Coder & Prototyper',
        'Modern React, TypeScript, Vite',
        'Agentic AI Integration Workflows',
        'MCA Post-Graduate Foundation',
      ],
      '#ffffff'
    );
    const cardMeshRight = new THREE.Mesh(
      new THREE.PlaneGeometry(1.3, 1.55),
      new THREE.MeshBasicMaterial({
        map: cardTexRight,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide,
      })
    );
    holoCardRight.add(cardMeshRight);

    // ==========================================
    // VOLUMETRIC LIGHT BEAM & FLOOR SPILL
    // ==========================================
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

    // Floor light puddle spilling outside the door
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

    // Floating Atmospheric Particles
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
      holoCardLeft,
      holoCardRight,
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
      if (holoCardLeft) {
        holoCardLeft.position.y = 0.15 + Math.sin(elapsed * 1.5) * 0.05;
      }
      if (holoCardRight) {
        holoCardRight.position.y = 0.15 + Math.cos(elapsed * 1.5) * 0.05;
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

    // ==========================================
    // GSAP SCROLLTRIGGER CHOREOGRAPHY
    // ==========================================
    const ctxTimeline = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1.2,
          onUpdate: (self) => {
            const p = self.progress;
            setDoorProgress(p);

            // Dynamically fade out header as door opens to prevent obscuring doorway!
            if (headerRef.current) {
              const headerOpacity = p < 0.2 ? 1 : Math.max(0, 1 - (p - 0.2) * 2.8);
              const headerY = -(p * 40);
              headerRef.current.style.opacity = headerOpacity.toString();
              headerRef.current.style.transform = `translateY(${headerY}px)`;
            }
          },
        },
      });

      // 1. Camera smoothly approaches the door (progress 0 -> 0.3)
      tl.to(camera.position, {
        z: 3.4,
        y: 0.05,
        ease: 'power2.inOut',
        duration: 0.3,
      }, 0);

      // 2. Door handle unlatches smoothly (progress 0.2 -> 0.35)
      tl.to(doorHandle.rotation, {
        z: -0.38,
        ease: 'power1.out',
        duration: 0.15,
      }, 0.2);

      // 3. Door swings wide open to -115 degrees (progress 0.35 -> 0.72)
      tl.to(doorPivot.rotation, {
        y: -Math.PI * 0.64, // -115 deg, clearing the frame completely!
        ease: 'power2.inOut',
        duration: 0.37,
      }, 0.35);

      // 4. Lights ignite with brilliant illumination as door opens!
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

      // Volumetric light beam and floor spill
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

      // 5. Camera glides directly THROUGH the doorway into the sanctuary! (progress 0.7 -> 1.0)
      tl.to(camera.position, {
        z: -2.8, // Flies deep into the illuminated corridor!
        y: 0.1,
        ease: 'power1.inOut',
        duration: 0.3,
      }, 0.7);

      // Camera FOV widens for cinematic interior grandness
      tl.to(camera, {
        fov: 54,
        onUpdate: () => camera.updateProjectionMatrix(),
        duration: 0.3,
      }, 0.7);
    }, container);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      ctxTimeline.revert();
      renderer.dispose();
      wallMaterial.dispose();
      frameMaterial.dispose();
      mintTrimMaterial.dispose();
      doorMaterial.dispose();
      brassMaterial.dispose();
      plaqueTexture.dispose();
      floorTexture.dispose();
      cardTexLeft.dispose();
      cardTexRight.dispose();
    };
  }, []);

  // Manual Trigger: Step inside or return to entrance
  const handleToggleDoor = () => {
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

    const targetState = !isOpenManually;
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

      {/* Floating Cinematic Overlay Header (Fades out dynamically when door opens to unveil interior!) */}
      <div
        ref={headerRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-16 flex flex-col items-center text-center pointer-events-none transition-transform duration-300 ease-out"
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
          Scroll down to push through the portal into the QA & AI-Assisted Dev Sanctuary, or tap the button below.
        </p>
      </div>

      {/* Interior Discovery HUD (Appears when camera has entered the room!) */}
      <div
        className={`absolute top-20 z-10 max-w-lg mx-auto px-6 py-3 rounded-2xl bg-zinc-950/90 border border-[#6ee7b7]/30 backdrop-blur-xl shadow-2xl transition-all duration-500 pointer-events-none ${
          doorProgress > 0.65 || isOpenManually
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#6ee7b7] animate-ping" />
          <span className="font-mono text-xs tracking-wider uppercase text-[#6ee7b7] font-semibold">
            SANCTUARY ACTIVE &bull; QA & AI ARCHITECTURE ONLINE
          </span>
        </div>
      </div>

      {/* Interactive Controls & Status HUD */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-12 flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-auto">
        
        {/* Left Side: Door State Indicator */}
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-zinc-950/90 border border-white/10 backdrop-blur-md shadow-xl text-xs font-mono text-zinc-300">
          <div
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
              doorProgress > 0.35 || isOpenManually ? 'bg-[#6ee7b7] animate-pulse shadow-[0_0_10px_#6ee7b7]' : 'bg-neutral-500'
            }`}
          />
          <span>
            {doorProgress > 0.65 || isOpenManually
              ? 'SANCTUARY UNLOCKED'
              : doorProgress > 0.35
              ? 'DOOR OPENING (LIGHT RADIATING)'
              : 'PORTAL READY'}
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-white font-bold">{Math.round(doorProgress * 100)}% THROUGH</span>
        </div>

        {/* Center: Tap to Open / Step Inside Button */}
        <button
          onClick={handleToggleDoor}
          className="group flex items-center gap-3 px-7 py-3.5 rounded-full bg-white hover:bg-neutral-100 text-black font-semibold text-xs tracking-wider shadow-[0_0_35px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-105 active:scale-95 border border-white/30"
        >
          {isOpenManually ? (
            <>
              <RotateCcw className="w-4 h-4 text-black" />
              <span>RETURN TO ENTRANCE</span>
            </>
          ) : (
            <>
              <DoorOpen className="w-4 h-4 text-black" />
              <span>STEP THROUGH DOOR</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
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
    </section>
  );
};