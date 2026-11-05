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
  ChevronDown
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// TEXTURE GENERATOR: PLAQUE ON RED DOOR
// ==========================================
function createPlaqueTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 420;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createLinearGradient(0, 0, 1024, 420);
    grad.addColorStop(0, '#101116');
    grad.addColorStop(0.5, '#181920');
    grad.addColorStop(1, '#0c0d12');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 420);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 4;
    ctx.strokeRect(12, 12, 1000, 396);

    ctx.strokeStyle = 'rgba(204, 26, 43, 0.6)';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(24, 24, 976, 372);

    const rivets = [
      [36, 36], [988, 36], [36, 384], [988, 384]
    ];
    rivets.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#f4f4f5';
      ctx.fill();
    });

    ctx.fillStyle = 'rgba(204, 26, 43, 0.25)';
    ctx.fillRect(362, 45, 300, 36);
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(362, 45, 300, 36);
    ctx.font = 'bold 16px "JetBrains Mono", monospace';
    ctx.fillStyle = '#fca5a5';
    ctx.textAlign = 'center';
    ctx.fillText('• SANCTUARY PORTAL •', 512, 69);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 60px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('AKSHAY KANTH C', 512, 160);

    ctx.fillStyle = '#6ee7b7';
    ctx.font = 'bold 28px "JetBrains Mono", monospace';
    ctx.fillText('TEST ENGINEER  •  AI-ASSISTED DEVELOPER', 512, 225);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.moveTo(120, 265);
    ctx.lineTo(904, 265);
    ctx.stroke();

    ctx.fillStyle = '#e4e4e7';
    ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('DUBAI, UAE  |  100% QUALITY RIGOR  |  STEP INSIDE', 512, 320);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 18px "JetBrains Mono", monospace';
    ctx.fillText('SCROLL OR TAP TO OPEN RED SANCTUARY DOOR', 512, 368);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

// ==========================================
// 3D STATION 1 (FRONT): IDENTITY & PHILOSOPHY
// ==========================================
function createFrontStationTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1120;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Glass panel background
    const bgGrad = ctx.createLinearGradient(0, 0, 1024, 1120);
    bgGrad.addColorStop(0, '#0c0e14');
    bgGrad.addColorStop(1, '#07080c');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 1120);

    // Outer & inner luminous borders with generous border margins
    ctx.strokeStyle = 'rgba(110, 231, 183, 0.7)';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 984, 1080);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
    ctx.lineWidth = 2;
    ctx.strokeRect(34, 34, 956, 1052);

    const leftX = 70;
    const contentW = 884;

    // Top Category Pill
    ctx.fillStyle = 'rgba(110, 231, 183, 0.12)';
    ctx.fillRect(leftX, 60, 360, 42);
    ctx.strokeStyle = '#6ee7b7';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(leftX, 60, 360, 42);
    ctx.fillStyle = '#6ee7b7';
    ctx.font = 'bold 18px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('> CHAPTER 04 • PHILOSOPHY', leftX + 18, 87);

    // Location Chip
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fillRect(leftX + contentW - 170, 60, 170, 42);
    ctx.fillStyle = '#e4e4e7';
    ctx.font = 'bold 16px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('DUBAI, UAE', leftX + contentW - 85, 87);

    // Name Headline
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 56px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('AKSHAY KANTH C', leftX, 170);

    // Role Subtitle
    ctx.fillStyle = '#6ee7b7';
    ctx.font = 'bold 24px "JetBrains Mono", monospace';
    ctx.fillText('TEST ENGINEER  •  AI-ASSISTED DEVELOPER', leftX, 216);

    // Divider
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.moveTo(leftX, 244);
    ctx.lineTo(leftX + contentW, 244);
    ctx.stroke();

    // Philosophy Quote with Red Accent Bar (matching red door)
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(leftX, 272, 6, 92);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';
    ctx.fillRect(leftX + 10, 272, contentW - 10, 92);
    ctx.fillStyle = '#f4f4f5';
    ctx.font = 'italic 21px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('"Quality is never an accident; it is always the result of', leftX + 30, 310);
    ctx.fillText('sincere effort, intelligent direction, and skillful execution."', leftX + 30, 345);

    // 3 Experience Cards
    const cards = [
      {
        tag: '🎯 FEATURE POINT OF CONTACT (POC)',
        title: 'SIDE, Bangalore • Feature QA Lead',
        desc: 'Selected as QA Point of Contact for 4 major features, managing defect triage with dev teams.',
      },
      {
        tag: '📱 MOBILE ECOSYSTEM QA',
        title: 'Android & iOS Device Lifecycle',
        desc: 'Extensive multi-device validation: touch gestures, push notifications, functional, sanity & UAT.',
      },
      {
        tag: '🎓 POST-GRADUATE & AI BUILDER',
        title: 'Master of Computer Applications (MCA)',
        desc: 'Deep software engineering foundation with modern AI-assisted test acceleration workflows.',
      },
    ];

    cards.forEach((c, idx) => {
      const y = 395 + idx * 175;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.fillRect(leftX, y, contentW, 150);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.strokeRect(leftX, y, contentW, 150);

      ctx.fillStyle = '#6ee7b7';
      ctx.font = 'bold 16px "JetBrains Mono", monospace';
      ctx.fillText(c.tag, leftX + 24, y + 36);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(c.title, leftX + 24, y + 74);

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '400 17px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(c.desc, leftX + 24, y + 112);
    });

    // Bottom Status Strip
    ctx.fillStyle = 'rgba(110, 231, 183, 0.1)';
    ctx.fillRect(leftX, 955, contentW, 64);
    ctx.strokeStyle = 'rgba(110, 231, 183, 0.3)';
    ctx.strokeRect(leftX, 955, contentW, 64);

    ctx.fillStyle = '#6ee7b7';
    ctx.font = 'bold 18px "JetBrains Mono", monospace';
    ctx.fillText('• STATION 01 : IDENTITY & QA PHILOSOPHY VERIFIED •', leftX + 24, 995);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

// ==========================================
// 3D STATION 2 (BACK): 4 CORE PILLARS
// ==========================================
function createBackStationTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1120;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const bgGrad = ctx.createLinearGradient(0, 0, 1024, 1120);
    bgGrad.addColorStop(0, '#0c0e14');
    bgGrad.addColorStop(1, '#07080c');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 1120);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 984, 1080);

    ctx.strokeStyle = 'rgba(110, 231, 183, 0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(34, 34, 956, 1052);

    const leftX = 70;
    const contentW = 884;

    // Top Category Pill
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(leftX, 60, 420, 42);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(leftX, 60, 420, 42);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('> CHAPTER 04 • CORE CAPABILITIES', leftX + 18, 87);

    // Title Headline
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 54px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('QA RIGOR & 4 PILLARS', leftX, 170);

    ctx.fillStyle = '#6ee7b7';
    ctx.font = 'bold 24px "JetBrains Mono", monospace';
    ctx.fillText('SYSTEMATIC VERIFICATION & DEV VELOCITY', leftX, 216);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.moveTo(leftX, 244);
    ctx.lineTo(leftX + contentW, 244);
    ctx.stroke();

    // 4 Pillars Matrix
    const pillars = [
      {
        num: '01',
        title: 'MOBILE ECOSYSTEM QA',
        accent: '#6ee7b7',
        desc: 'Validation on real Android & iOS hardware. Gesture, touch, lifecycle, push notifications & responsive edge-cases.',
      },
      {
        num: '02',
        title: 'DEFECT LIFECYCLE & JIRA',
        accent: '#ffffff',
        desc: 'Precision logging, root-cause diagnostics, regression suites & tight collaboration with engineering teams.',
      },
      {
        num: '03',
        title: 'AI-ASSISTED ENGINEERING',
        accent: '#6ee7b7',
        desc: 'Harnessing generative AI & Google Antigravity to accelerate test synthesis and prototype apps with high velocity.',
      },
      {
        num: '04',
        title: 'FULL-STACK ARCHITECTURE',
        accent: '#ffffff',
        desc: 'Modern web applications built with React 18, TypeScript, Node.js, and cloud patterns, combining QA rigor with code.',
      },
    ];

    const gap = 20;
    const cardW = (contentW - gap) / 2; // 432px
    const cardH = 320;

    pillars.forEach((p, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = leftX + col * (cardW + gap);
      const y = 275 + row * (cardH + 20);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.fillRect(x, y, cardW, cardH);
      ctx.strokeStyle = p.accent === '#6ee7b7' ? 'rgba(110, 231, 183, 0.4)' : 'rgba(255, 255, 255, 0.18)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x, y, cardW, cardH);

      // Pill Number Badge
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.fillRect(x + 20, y + 20, 60, 32);
      ctx.fillStyle = p.accent;
      ctx.font = 'bold 16px "JetBrains Mono", monospace';
      ctx.fillText(p.num, x + 38, y + 42);

      // Title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 21px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(p.title, x + 20, y + 95);

      // Description
      ctx.fillStyle = '#a1a1aa';
      ctx.font = '400 17px "Plus Jakarta Sans", sans-serif';
      const words = p.desc.split(' ');
      let line = '';
      let lineY = y + 140;
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        if (ctx.measureText(testLine).width > cardW - 38 && i > 0) {
          ctx.fillText(line, x + 20, lineY);
          line = words[i] + ' ';
          lineY += 28;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x + 20, lineY);
    });

    // Bottom Verification Strip
    ctx.fillStyle = 'rgba(110, 231, 183, 0.1)';
    ctx.fillRect(leftX, 955, contentW, 64);
    ctx.strokeStyle = 'rgba(110, 231, 183, 0.3)';
    ctx.strokeRect(leftX, 955, contentW, 64);

    ctx.fillStyle = '#6ee7b7';
    ctx.font = 'bold 18px "JetBrains Mono", monospace';
    ctx.fillText('• STATION 02 : 100% DEFECT RESOLUTION STANDARDS •', leftX + 24, 995);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

// ==========================================
// FLOOR GRID TEXTURE
// ==========================================
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
  const [isOpeningSequence, setIsOpeningSequence] = useState(false);
  const [isInsideSanctuary, setIsInsideSanctuary] = useState(false);
  const [activeStation, setActiveStation] = useState<1 | 2>(1);

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
    frontStationGroup: THREE.Group;
    backStationGroup: THREE.Group;
    particles: THREE.Points;
  } | null>(null);

  // Direct Station Jump Handler (Perfect Framing, No Cutoff)
  const handleGoToStation = (stationNum: 1 | 2) => {
    if (!sceneRef.current) return;
    const { camera, frontStationGroup, backStationGroup } = sceneRef.current;
    if (stationNum === 1) {
      if (frontStationGroup) {
        gsap.to(frontStationGroup.position, { x: -0.78, duration: 0.6 });
      }
      gsap.to(camera.position, {
        x: 0.0,
        y: 0.0,
        z: -1.3,
        duration: 1.2,
        ease: 'power2.out',
      });
      gsap.to(camera, {
        fov: 46,
        duration: 1.2,
        onUpdate: () => camera.updateProjectionMatrix(),
      });
    } else {
      if (backStationGroup) {
        gsap.to(backStationGroup.position, { x: 0.78, duration: 0.6 });
      }
      gsap.to(camera.position, {
        x: 0.0,
        y: 0.0,
        z: -5.0,
        duration: 1.2,
        ease: 'power2.out',
      });
      gsap.to(camera, {
        fov: 46,
        duration: 1.2,
        onUpdate: () => camera.updateProjectionMatrix(),
      });
    }
  };

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

    if (targetState) {
      setIsOpeningSequence(true);

      gsap.to(doorHandle.rotation, {
        z: -0.38,
        duration: 0.25,
      });

      gsap.to(doorPivot.rotation, {
        y: -Math.PI * 0.64,
        duration: 1.3,
        ease: 'power3.inOut',
        delay: 0.12,
      });

      gsap.to(corridorSpot, { intensity: 10, duration: 1.0, delay: 0.15 });
      gsap.to(interiorPointFront, { intensity: 5, duration: 1.0, delay: 0.15 });
      gsap.to(interiorPointMid, { intensity: 6, duration: 1.0, delay: 0.15 });
      gsap.to(portalCoreLight, { intensity: 10, duration: 1.0, delay: 0.15 });

      // Light beam flares briefly when cracking open then disappears completely inside
      gsap.to((lightBeam.material as THREE.MeshBasicMaterial), { opacity: 0.22, duration: 0.5, delay: 0.15 });
      gsap.to((lightBeam.material as THREE.MeshBasicMaterial), { opacity: 0, duration: 0.4, delay: 0.8 });
      gsap.to((floorSpillMesh.material as THREE.MeshBasicMaterial), { opacity: 0.22, duration: 0.5, delay: 0.15 });
      gsap.to((floorSpillMesh.material as THREE.MeshBasicMaterial), { opacity: 0, duration: 0.4, delay: 0.8 });

      // Camera steps into corridor and frames Station 1 (Front) perfectly (no cutoff!)
      gsap.to(camera.position, {
        x: 0.0,
        y: 0.0,
        z: -1.3,
        duration: 1.5,
        ease: 'power2.inOut',
        delay: 0.08,
        onComplete: () => {
          setIsOpeningSequence(false);
        },
      });

      gsap.to(camera, {
        fov: 46,
        duration: 1.5,
        onUpdate: () => camera.updateProjectionMatrix(),
      });
    } else {
      setIsOpeningSequence(false);

      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: 5.5,
        duration: 1.3,
        ease: 'power2.inOut',
      });

      gsap.to(camera, {
        fov: 45,
        duration: 1.3,
        onUpdate: () => camera.updateProjectionMatrix(),
      });

      gsap.to(doorPivot.rotation, {
        y: 0,
        duration: 1.15,
        delay: 0.15,
        ease: 'power3.inOut',
      });

      gsap.to(doorHandle.rotation, {
        z: 0,
        duration: 0.25,
        delay: 1.1,
      });

      gsap.to(corridorSpot, { intensity: 0, duration: 0.9 });
      gsap.to(interiorPointFront, { intensity: 0, duration: 0.9 });
      gsap.to(interiorPointMid, { intensity: 0, duration: 0.9 });
      gsap.to(portalCoreLight, { intensity: 0, duration: 0.9 });
      gsap.to((lightBeam.material as THREE.MeshBasicMaterial), { opacity: 0, duration: 0.9 });
      gsap.to((floorSpillMesh.material as THREE.MeshBasicMaterial), { opacity: 0, duration: 0.9 });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060709);
    scene.fog = new THREE.Fog(0x060709, 8, 28);

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
      color: 0xcc1a2b,
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

    // Inset Decorative Door Panels
    const insetMaterial = new THREE.MeshStandardMaterial({
      color: 0x8a101c,
      roughness: 0.42,
      metalness: 0.2,
    });

    for (let i = 0; i < 2; i++) {
      const panelY = i === 0 ? 0.72 : -0.72;
      const insetPanel = new THREE.Mesh(
        new THREE.BoxGeometry(doorWidth * 0.76, doorHeight * 0.4, 0.018),
        insetMaterial
      );
      insetPanel.position.set(0, panelY, doorDepth / 2 + 0.009);
      doorGroup.add(insetPanel);
    }

    // Nameplate Plaque (ZERO Z-FIGHTING FLICKERING)
    const plaqueTexture = createPlaqueTexture();
    const plaqueBack = new THREE.Mesh(
      new THREE.BoxGeometry(0.84, 0.38, 0.02),
      new THREE.MeshStandardMaterial({
        color: 0x181920,
        roughness: 0.2,
        metalness: 0.85,
      })
    );
    plaqueBack.position.set(0, 0.72, doorDepth / 2 + 0.015);
    doorGroup.add(plaqueBack);

    const plaqueMaterial = new THREE.MeshBasicMaterial({
      map: plaqueTexture,
      transparent: false,
      depthTest: true,
      depthWrite: true,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -4,
    });
    const plaqueMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.80, 0.34),
      plaqueMaterial
    );
    plaqueMesh.position.set(0, 0.72, doorDepth / 2 + 0.030);
    doorGroup.add(plaqueMesh);

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
    // 3D SANCTUARY CORRIDOR (BEHIND THE RED DOOR)
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

    // ===============================================================
    // 3D ABOUT STATIONS: ONE ON THE FRONT (LEFT), ONE ON THE BACK (RIGHT)
    // ===============================================================

    // 1. FRONT 3D STATION: IDENTITY & PHILOSOPHY (z = -3.8)
    const frontStationGroup = new THREE.Group();
    frontStationGroup.position.set(-0.78, -0.14, -3.8);
    frontStationGroup.rotation.y = 0.20; // Angled inward to corridor aisle
    scene.add(frontStationGroup);

    const frontTex = createFrontStationTexture();
    const frontBackingMat = new THREE.MeshStandardMaterial({
      color: 0x10121a,
      roughness: 0.25,
      metalness: 0.85,
      transparent: true,
      opacity: 1,
    });
    const frontStationBacking = new THREE.Mesh(
      new THREE.BoxGeometry(1.34, 1.46, 0.03),
      frontBackingMat
    );
    frontStationGroup.add(frontStationBacking);

    const frontStationPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(1.30, 1.42),
      new THREE.MeshBasicMaterial({
        map: frontTex,
        transparent: true,
        opacity: 0.98,
        depthWrite: true,
      })
    );
    frontStationPlane.position.set(0, 0, 0.02);
    frontStationGroup.add(frontStationPlane);

    // 2. BACK 3D STATION: CORE CAPABILITIES & 4 PILLARS (z = -7.5)
    const backStationGroup = new THREE.Group();
    backStationGroup.position.set(0.78, -0.14, -7.5);
    backStationGroup.rotation.y = -0.20; // Angled inward to corridor aisle
    scene.add(backStationGroup);

    const backTex = createBackStationTexture();
    const backBackingMat = new THREE.MeshStandardMaterial({
      color: 0x10121a,
      roughness: 0.25,
      metalness: 0.85,
      transparent: true,
      opacity: 1,
    });
    const backStationBacking = new THREE.Mesh(
      new THREE.BoxGeometry(1.34, 1.46, 0.03),
      backBackingMat
    );
    backStationGroup.add(backStationBacking);

    const backStationPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(1.30, 1.42),
      new THREE.MeshBasicMaterial({
        map: backTex,
        transparent: true,
        opacity: 0.98,
        depthWrite: true,
      })
    );
    backStationPlane.position.set(0, 0, 0.02);
    backStationGroup.add(backStationPlane);

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
      frontStationGroup,
      backStationGroup,
      particles,
    };

    // Render loop
    let reqId: number;
    const clock = new THREE.Clock();
    let wasInside = false;

    const render = () => {
      const elapsed = clock.getElapsedTime();
      if (portalCore) {
        portalCore.rotation.x = elapsed * 0.4;
        portalCore.rotation.y = elapsed * 0.6;
      }
      if (frontStationGroup) {
        frontStationGroup.position.y = -0.14 + Math.sin(elapsed * 1.4) * 0.015;
      }
      if (backStationGroup) {
        backStationGroup.position.y = -0.14 + Math.cos(elapsed * 1.4) * 0.015;
      }
      if (particles) {
        particles.rotation.y = elapsed * 0.02;
      }

      // Check real-time physical camera position in 3D WebGL space:
      // Interior controls appear once threshold is crossed
      const isActuallyInside = camera.position.z <= -0.5;
      if (isActuallyInside !== wasInside) {
        wasInside = isActuallyInside;
        setIsInsideSanctuary(isActuallyInside);
      }

      // Task 1: Complete elimination of pale white shade/glare once inside the room (z <= 0.2)
      const isEnteredRoom = camera.position.z <= 0.2;
      if (isEnteredRoom) {
        if (lightBeam.visible) lightBeam.visible = false;
        (lightBeam.material as THREE.MeshBasicMaterial).opacity = 0;
        if (floorSpillMesh.visible) floorSpillMesh.visible = false;
        (floorSpillMesh.material as THREE.MeshBasicMaterial).opacity = 0;
        corridorSpot.target.position.set(0, 0, -16.0);
      } else {
        if (!lightBeam.visible) lightBeam.visible = true;
        if (!floorSpillMesh.visible) floorSpillMesh.visible = true;
        corridorSpot.target.position.set(0, 0, 2.0);
      }

      // Track active station based on camera Z depth (midpoint at z = -3.5)
      const currentStation = camera.position.z > -3.5 ? 1 : 2;
      setActiveStation((prev) => (prev !== currentStation ? currentStation : prev));

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

    // ==============================================================
    // GSAP ScrollTrigger Choreography: Slow, Smooth & Staged Reading
    // ==============================================================
    const ctxTimeline = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=500%', // Generous 500% scroll distance to slow down the journey
          pin: true,
          scrub: 0.8, // Snappy yet smooth tracking without overshoot
          onUpdate: (self) => {
            const p = self.progress;
            setDoorProgress(p);

            if (headerRef.current) {
              const headerOpacity = p < 0.05 ? 1 : Math.max(0, 1 - (p - 0.05) * 12);
              const headerY = -(p * 50);
              headerRef.current.style.opacity = headerOpacity.toString();
              headerRef.current.style.transform = `translateY(${headerY}px)`;
            }
          },
        },
      });

      // Total timeline normalized duration: 10.0 seconds
      // Stage 1: Camera approaches closed red door (0.00 -> 1.30)
      tl.to(camera.position, {
        x: 0,
        y: 0.0,
        z: 3.6,
        ease: 'power1.inOut',
        duration: 1.3,
      }, 0);

      // Stage 2: Door handle unlatches & red door opens (1.20 -> 2.20)
      tl.to(doorHandle.rotation, {
        z: -0.38,
        ease: 'power1.out',
        duration: 0.35,
      }, 1.2);

      tl.to(doorPivot.rotation, {
        y: -Math.PI * 0.64,
        ease: 'power2.inOut',
        duration: 1.0,
      }, 1.4);

      // Interior lights ignite (1.40 -> 2.20)
      tl.to(corridorSpot, { intensity: 10, ease: 'power2.in', duration: 0.8 }, 1.4);
      tl.to(interiorPointFront, { intensity: 5, ease: 'power2.in', duration: 0.8 }, 1.4);
      tl.to(interiorPointMid, { intensity: 6, ease: 'power2.in', duration: 0.8 }, 1.4);
      tl.to(portalCoreLight, { intensity: 10, ease: 'power2.in', duration: 0.8 }, 1.4);
      tl.to(beamMaterial, { opacity: 0.25, ease: 'power2.in', duration: 0.6 }, 1.4);
      tl.to(floorSpillMat, { opacity: 0.22, ease: 'power2.in', duration: 0.6 }, 1.4);

      // Stage 3: Camera crosses threshold into corridor to Station 1 (2.20 -> 4.20)
      tl.to(camera.position, {
        x: 0.0,
        y: 0.0,
        z: -1.3,
        ease: 'power1.inOut',
        duration: 2.0,
      }, 2.2);

      // Pale white light beam and floor spill fade to 0 as camera enters room
      tl.to(beamMaterial, { opacity: 0, duration: 0.4 }, 2.3);
      tl.to(floorSpillMat, { opacity: 0, duration: 0.4 }, 2.3);

      tl.to(camera, {
        fov: 46,
        onUpdate: () => camera.updateProjectionMatrix(),
        duration: 2.0,
      }, 2.2);

      // Stage 4: Station 1 Reading Plateau (4.20 -> 5.60)
      tl.to(camera.position, {
        x: 0.0,
        y: 0.0,
        z: -2.0,
        ease: 'linear',
        duration: 1.4,
      }, 4.2);

      // Stage 5: Camera glides to Station 2 & Station 1 exits LEFT (5.60 -> 7.60)
      // Station 1 glides off to the left side and disappears
      tl.to(frontStationGroup.position, {
        x: -3.8,
        ease: 'power2.in',
        duration: 1.8,
      }, 5.6);
      tl.to(frontStationPlane.material, {
        opacity: 0,
        ease: 'power1.in',
        duration: 1.4,
      }, 5.8);
      tl.to(frontBackingMat, {
        opacity: 0,
        ease: 'power1.in',
        duration: 1.4,
      }, 5.8);

      // Camera arrives at Station 2 (distance = 2.5m, zero cutoff!)
      tl.to(camera.position, {
        x: 0.0,
        y: 0.0,
        z: -5.0,
        ease: 'power1.inOut',
        duration: 2.0,
      }, 5.6);

      // Stage 6: Station 2 Reading Plateau (7.60 -> 8.80)
      // Generous reading room with zero cutoff
      tl.to(camera.position, {
        x: 0.0,
        y: 0.0,
        z: -5.4,
        ease: 'linear',
        duration: 1.2,
      }, 7.6);

      // Stage 7: Scrolling through to the end -> Station 2 DISAPPEARS TOWARD THE RIGHT SIDE! (8.80 -> 10.00)
      tl.to(backStationGroup.position, {
        x: 3.8, // Glides off to the right side
        ease: 'power2.inOut',
        duration: 1.2,
      }, 8.8);
      tl.to(backStationPlane.material, {
        opacity: 0,
        ease: 'power1.in',
        duration: 1.0,
      }, 8.9);
      tl.to(backBackingMat, {
        opacity: 0,
        ease: 'power1.in',
        duration: 1.0,
      }, 8.9);

      // Camera dollies to open corridor vista
      tl.to(camera.position, {
        x: 0.0,
        y: 0.0,
        z: -7.8,
        ease: 'power1.out',
        duration: 1.2,
      }, 8.8);
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
      frontTex.dispose();
      backTex.dispose();
      floorTexture.dispose();
    };
  }, []);

  // Both header and exterior controls fully disappear as soon as door starts opening or scroll starts
  const isHeaderHidden = isInsideSanctuary || isOpeningSequence || doorProgress > 0.05;
  const isExteriorControlsHidden = isInsideSanctuary || isOpeningSequence || doorProgress > 0.05;

  return (
    <section
      id="doors"
      ref={containerRef}
      className="relative w-full h-screen bg-[#060709] overflow-hidden flex flex-col items-center justify-between select-none"
    >
      <div id="about" className="absolute top-0 pointer-events-none" />

      {/* 3D WebGL Canvas Layer (Holds Red Door + Front 3D Station + Back 3D Station + Corridor!) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block z-0"
      />

      {/* Exterior Cinematic Header (Fades out dynamically when red door begins opening) */}
      <div
        ref={headerRef}
        className={`relative z-10 w-full max-w-7xl mx-auto px-6 pt-16 flex flex-col items-center text-center pointer-events-none transition-all duration-300 ease-out ${
          isHeaderHidden ? 'opacity-0 pointer-events-none -translate-y-8' : 'opacity-100'
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
      {/* MINIMAL INTERIOR HUD CONTROLS (Active only inside corridor) */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isInsideSanctuary && (
          <motion.div
            key="interior-hud"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-20 flex flex-col justify-between p-4 sm:p-6 lg:p-8 pointer-events-none"
          >
            {/* Top Minimal HUD Bar with Interactive Station Jumper */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="w-full max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 pointer-events-auto"
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleGoToStation(1)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-mono transition-all backdrop-blur-xl border ${
                    activeStation === 1
                      ? 'bg-[#6ee7b7]/20 border-[#6ee7b7] text-[#6ee7b7] shadow-[0_0_14px_rgba(110,231,183,0.35)]'
                      : 'bg-black/60 border-white/10 text-zinc-400 hover:text-white hover:border-white/30'
                  }`}
                  title="Jump to Station 01 (Front)"
                >
                  <span className={`w-2 h-2 rounded-full ${activeStation === 1 ? 'bg-[#6ee7b7] animate-pulse' : 'bg-zinc-500'}`} />
                  <span>01 FRONT &bull; IDENTITY</span>
                </button>

                <button
                  onClick={() => handleGoToStation(2)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-mono transition-all backdrop-blur-xl border ${
                    activeStation === 2
                      ? 'bg-[#6ee7b7]/20 border-[#6ee7b7] text-[#6ee7b7] shadow-[0_0_14px_rgba(110,231,183,0.35)]'
                      : 'bg-black/60 border-white/10 text-zinc-400 hover:text-white hover:border-white/30'
                  }`}
                  title="Jump to Station 02 (Back)"
                >
                  <span className={`w-2 h-2 rounded-full ${activeStation === 2 ? 'bg-[#6ee7b7] animate-pulse' : 'bg-zinc-500'}`} />
                  <span>02 BACK &bull; CAPABILITIES</span>
                </button>
              </div>

              <button
                onClick={() => handleToggleDoor(false)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-red-500/30 hover:border-red-500/60 text-xs font-mono text-zinc-200 hover:text-white transition-all shadow-lg group backdrop-blur-xl"
              >
                <RotateCcw className="w-3.5 h-3.5 text-red-400 group-hover:-rotate-90 transition-transform" />
                <span className="hidden sm:inline">RETURN TO RED DOOR</span>
              </button>
            </motion.div>

            {/* Bottom Minimal Navigation Guidance */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
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

      {/* Exterior Controls (Fades out completely as soon as red door starts moving or scroll begins) */}
      {!isExteriorControlsHidden && (
        <div
          className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-12 flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-auto transition-all duration-300 ease-out"
          style={{ opacity: Math.max(0, 1 - doorProgress * 15) }}
        >
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
        </div>
      )}
    </section>
  );
};
