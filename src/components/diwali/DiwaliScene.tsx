"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { detectQualitySettings, QualitySettings } from "./AdaptiveQualityManager";
import { DiyaManager } from "./DiwaliDiyas";
import { FireworkManager } from "./DiwaliFireworks";
import { GoldenParticleSystem } from "./GoldenParticles";
import { createRangoliTexture } from "./textures";
import { ASSETS } from "@/lib/assets";

interface DiwaliSceneProps {
  onSceneReady?: () => void;
  className?: string;
}

export function DiwaliScene({ onSceneReady, className = "" }: DiwaliSceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [interactiveHint, setInteractiveHint] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const quality: QualitySettings = detectQualitySettings();
    if (!quality.hasWebGL) {
      setWebGLSupported(false);
      onSceneReady?.();
      return;
    }

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0714); // Deep night sky
    scene.fog = new THREE.FogExp2(0x0e091a, 0.016);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 150);
    camera.position.set(0, 3.2, 14.8);
    camera.lookAt(0, 2.8, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: quality.tier !== "low",
        alpha: false,
        powerPreference: "high-performance",
      });
    } catch {
      setWebGLSupported(false);
      onSceneReady?.();
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(quality.pixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    if (quality.enableShadows) {
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }

    // 2. Ambient & Architectural Lighting
    const ambientLight = new THREE.AmbientLight(0x221638, 1.2);
    scene.add(ambientLight);

    // Warm moon & atmospheric sky light
    const moonLight = new THREE.DirectionalLight(0xd9c5f8, 0.7);
    moonLight.position.set(12, 28, 15);
    scene.add(moonLight);

    // Architectural Uplighting (Spotlights illuminating facade columns in warm gold)
    const spotLeft = new THREE.SpotLight(0xffd57e, 3.2, 25, Math.PI / 4, 0.4);
    spotLeft.position.set(-6, 0.2, 4);
    spotLeft.target.position.set(-2, 6, -2);
    scene.add(spotLeft);
    scene.add(spotLeft.target);

    const spotRight = new THREE.SpotLight(0xffd57e, 3.2, 25, Math.PI / 4, 0.4);
    spotRight.position.set(6, 0.2, 4);
    spotRight.target.position.set(2, 6, -2);
    scene.add(spotRight);
    scene.add(spotRight.target);

    // Warm facade golden wash
    const warmFacadeLight = new THREE.PointLight(0xff9e3b, 2.4, 20, 1.5);
    warmFacadeLight.position.set(0, 4.5, 1.5);
    scene.add(warmFacadeLight);

    // 3. Reflective Grand Entrance Courtyard
    const groundGeom = new THREE.PlaneGeometry(60, 50, 16, 16);
    groundGeom.rotateX(-Math.PI / 2);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x120c1c,
      roughness: 0.2,
      metalness: 0.5,
    });
    const groundMesh = new THREE.Mesh(groundGeom, groundMat);
    groundMesh.receiveShadow = true;
    groundMesh.position.y = -0.05;
    scene.add(groundMesh);

    // Traditional Sacred Rangoli on Courtyard Plaza
    const rangoliTexture = createRangoliTexture(1024);
    const rangoliGeom = new THREE.PlaneGeometry(9.5, 9.5);
    rangoliGeom.rotateX(-Math.PI / 2);
    const rangoliMat = new THREE.MeshBasicMaterial({
      map: rangoliTexture,
      transparent: true,
      opacity: 0.88,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });
    const rangoliMesh = new THREE.Mesh(rangoliGeom, rangoliMat);
    rangoliMesh.position.set(0, 0.01, 1.8);
    scene.add(rangoliMesh);

    // 4. Grand Contemporary Luxury Residential Architecture
    const buildingGroup = new THREE.Group();

    // Central stepped luxury residence structure
    const marbleMat = new THREE.MeshStandardMaterial({
      color: 0x221a2e,
      roughness: 0.35,
      metalness: 0.3,
    });

    const warmGlassMat = new THREE.MeshStandardMaterial({
      color: 0xffd995,
      emissive: 0xff9922,
      emissiveIntensity: 0.65,
      roughness: 0.15,
      metalness: 0.1,
      transparent: true,
      opacity: 0.85,
    });

    const goldTrimMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.85,
      roughness: 0.25,
      emissive: 0x3d2b05,
    });

    // Base architectural podium
    const podiumGeom = new THREE.BoxGeometry(16, 0.8, 10);
    const podiumMesh = new THREE.Mesh(podiumGeom, marbleMat);
    podiumMesh.position.set(0, 0.4, -4);
    buildingGroup.add(podiumMesh);

    // Main villa pavilion floor 1
    const floor1Geom = new THREE.BoxGeometry(14, 3.2, 8);
    const floor1Mesh = new THREE.Mesh(floor1Geom, marbleMat);
    floor1Mesh.position.set(0, 2.4, -4);
    buildingGroup.add(floor1Mesh);

    // Floor 1 Panoramic Illuminated Glass Facade
    const glass1Geom = new THREE.PlaneGeometry(12, 2.4);
    const glass1Mesh = new THREE.Mesh(glass1Geom, warmGlassMat);
    glass1Mesh.position.set(0, 2.4, 0.05 - 4 + 4);
    buildingGroup.add(glass1Mesh);

    // Cantilevered Terrace & Balcony
    const terraceGeom = new THREE.BoxGeometry(15, 0.3, 4.5);
    const terraceMesh = new THREE.Mesh(terraceGeom, goldTrimMat);
    terraceMesh.position.set(0, 4.15, -1.8);
    buildingGroup.add(terraceMesh);

    // Floor 2 Penthouse Pavilion
    const floor2Geom = new THREE.BoxGeometry(10, 2.8, 6);
    const floor2Mesh = new THREE.Mesh(floor2Geom, marbleMat);
    floor2Mesh.position.set(-0.5, 5.7, -3.5);
    buildingGroup.add(floor2Mesh);

    // Floor 2 Glowing Glass
    const glass2Geom = new THREE.PlaneGeometry(8.5, 2.2);
    const glass2Mesh = new THREE.Mesh(glass2Geom, warmGlassMat);
    glass2Mesh.position.set(-0.5, 5.7, -0.45);
    buildingGroup.add(glass2Mesh);

    // Modern Rooftop Pergola
    for (let p = -4; p <= 4; p += 1.6) {
      const beamGeom = new THREE.BoxGeometry(0.2, 0.25, 5);
      const beamMesh = new THREE.Mesh(beamGeom, goldTrimMat);
      beamMesh.position.set(p, 7.3, -3.5);
      buildingGroup.add(beamMesh);
    }

    // Architectural Columns with warm uplighting
    [-6.5, -2.5, 2.5, 6.5].forEach((colX) => {
      const colGeom = new THREE.CylinderGeometry(0.25, 0.25, 3.8, 16);
      const colMesh = new THREE.Mesh(colGeom, goldTrimMat);
      colMesh.position.set(colX, 2.3, -0.5);
      buildingGroup.add(colMesh);
    });

    // Integrated Signature Antera Residence Centerpiece Plane
    // Loads the genuine Antera hero house render cleanly into the 3D space with warm lighting
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      ASSETS.heroHouse,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        const aspect = 4086 / 2642;
        const planeHeight = 7.8;
        const planeWidth = planeHeight * aspect;

        const housePlaneGeom = new THREE.PlaneGeometry(planeWidth, planeHeight);
        const housePlaneMat = new THREE.MeshStandardMaterial({
          map: tex,
          transparent: true,
          roughness: 0.35,
          metalness: 0.1,
          depthWrite: false,
        });

        const housePlane = new THREE.Mesh(housePlaneGeom, housePlaneMat);
        housePlane.position.set(0, 4.0, -0.2);
        buildingGroup.add(housePlane);
      },
      undefined,
      () => {
        // Fallback: procedural 3D building geometry remains stunning
      },
    );

    scene.add(buildingGroup);

    // 5. Traditional 3D Diyas System
    const diyaManager = new DiyaManager(scene);

    // Diya positions framing the grand entrance and courtyard
    diyaManager.createDiya(new THREE.Vector3(-3.8, 0, 3.6), 1.1);
    diyaManager.createDiya(new THREE.Vector3(3.8, 0, 3.6), 1.1);
    diyaManager.createDiya(new THREE.Vector3(-1.8, 0, 4.8), 0.95);
    diyaManager.createDiya(new THREE.Vector3(1.8, 0, 4.8), 0.95);
    diyaManager.createDiya(new THREE.Vector3(0, 0, 5.8), 1.25); // Center royal diya
    diyaManager.createDiya(new THREE.Vector3(-5.8, 0.35, 0.8), 0.9);
    diyaManager.createDiya(new THREE.Vector3(5.8, 0.35, 0.8), 0.9);

    // Terrace Balcony Diyas
    diyaManager.createDiya(new THREE.Vector3(-4.5, 4.3, -1.2), 0.8);
    diyaManager.createDiya(new THREE.Vector3(4.5, 4.3, -1.2), 0.8);

    // 6. 3D Cinematic Fireworks
    const fireworkManager = new FireworkManager(
      scene,
      quality.fireworkFrequencyMs,
      quality.maxActiveFireworks,
    );

    // 7. 3-Layer Golden Particle System
    const particleSystem = new GoldenParticleSystem(scene, quality.particleCount);

    // 8. Interaction & Parallax
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      mouse.targetX = normX;
      mouse.targetY = normY;

      pointer.x = normX;
      pointer.y = normY;

      // Raycast for diya hovering
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(diyaManager.raycastTargets, true);
      if (hits.length > 0) {
        const hitIdx = hits[0].object.userData.diyaIndex;
        diyaManager.setHoveredDiya(hitIdx);
        canvas.style.cursor = "pointer";
      } else {
        diyaManager.setHoveredDiya(null);
        canvas.style.cursor = "default";
      }
    };

    const onClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(diyaManager.raycastTargets, true);

      if (hits.length > 0) {
        const hitIdx = hits[0].object.userData.diyaIndex;
        diyaManager.triggerSparkCelebration(hitIdx);
        setInteractiveHint("Diya lit with golden sparks! ✨");
        setTimeout(() => setInteractiveHint(null), 2500);
      } else {
        // Click on sky launches an interactive firework!
        const ray = raycaster.ray;
        const targetDistance = 35;
        const burstTarget = ray.origin
          .clone()
          .add(ray.direction.clone().multiplyScalar(targetDistance));
        burstTarget.y = Math.max(14, burstTarget.y);
        fireworkManager.launch(burstTarget);
        setInteractiveHint("Festive celebration launched! 🎆");
        setTimeout(() => setInteractiveHint(null), 2500);
      }
    };

    // Touch handling for mobile
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        mouse.targetX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.targetY = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
      }
    };

    window.addEventListener("mousemove", onPointerMove);
    canvas.addEventListener("click", onClick);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    // Resize handler
    const onResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    // Initial first fireworks burst to kick off celebration
    setTimeout(() => {
      fireworkManager.launch();
    }, 1800);

    onSceneReady?.();

    // 9. Animation Loop
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (now: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const timeSec = now * 0.001;

      // Parallax camera damping
      if (!quality.prefersReducedMotion) {
        mouse.x += (mouse.targetX - mouse.x) * 0.04;
        mouse.y += (mouse.targetY - mouse.y) * 0.04;

        camera.position.x = mouse.x * 1.5;
        camera.position.y = 3.2 + mouse.y * 0.7;
        camera.lookAt(0, 2.7, 0);
      }

      // Update systems
      diyaManager.update(timeSec, delta);
      fireworkManager.update(now, delta);
      particleSystem.update(timeSec, delta, { x: mouse.x, y: mouse.y });

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 10. Clean Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", onPointerMove);
      canvas.removeEventListener("click", onClick);
      window.removeEventListener("touchmove", onTouchMove);

      diyaManager.dispose();
      fireworkManager.dispose();
      particleSystem.dispose();
      rangoliTexture.dispose();
      groundGeom.dispose();
      groundMat.dispose();
      podiumGeom.dispose();
      floor1Geom.dispose();
      floor2Geom.dispose();
      marbleMat.dispose();
      warmGlassMat.dispose();
      goldTrimMat.dispose();
      renderer.dispose();
    };
  }, [onSceneReady]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 h-full w-full overflow-hidden ${className}`}
    >
      {webGLSupported ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full select-none outline-none"
        />
      ) : (
        /* Graceful Non-WebGL Fallback */
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#0A0714] via-[#1A1128] to-[#0A0714]">
          <img
            src={ASSETS.heroHouse}
            alt="Antera Realty Luxury Estate"
            className="max-h-[75vh] w-auto object-contain filter drop-shadow-[0_0_50px_rgba(255,181,71,0.4)]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0714] via-transparent to-transparent" />
        </div>
      )}

      {/* Interactive celebratory toast */}
      {interactiveHint && (
        <div className="pointer-events-none absolute bottom-24 left-1/2 -translate-x-1/2 rounded-full border border-[#D4AF37]/40 bg-[#100C18]/90 px-4 py-1.5 text-xs font-semibold text-[#F6D88B] shadow-2xl backdrop-blur-md transition-all animate-bounce">
          {interactiveHint}
        </div>
      )}
    </div>
  );
}
