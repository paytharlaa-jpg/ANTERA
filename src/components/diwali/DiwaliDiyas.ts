import * as THREE from "three";
import { createGlowTexture } from "./textures";

export interface DiyaInstance {
  group: THREE.Group;
  light: THREE.PointLight;
  flameMesh: THREE.Mesh;
  glowSprite: THREE.Sprite;
  baseMesh: THREE.Mesh;
  oilMesh: THREE.Mesh;
  initialPos: THREE.Vector3;
  baseLightIntensity: number;
  flickerSpeed: number;
  flickerOffset: number;
  isHovered: boolean;
  sparkParticles: THREE.Points | null;
  sparkVelocities: Float32Array | null;
  sparkLife: number;
}

export class DiyaManager {
  diyas: DiyaInstance[] = [];
  scene: THREE.Scene;
  glowTexture: THREE.CanvasTexture;
  raycastTargets: THREE.Object3D[] = [];

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.glowTexture = createGlowTexture("#FFA028", 128);
  }

  createDiya(position: THREE.Vector3, scale = 1): DiyaInstance {
    const group = new THREE.Group();
    group.position.copy(position);
    group.scale.set(scale, scale, scale);

    // 1. Traditional Diya Bowl (Lathe Geometry for authentic curved silhouette)
    const points: THREE.Vector2[] = [];
    points.push(new THREE.Vector2(0, 0));
    points.push(new THREE.Vector2(0.35, 0.02));
    points.push(new THREE.Vector2(0.55, 0.1));
    points.push(new THREE.Vector2(0.65, 0.22));
    points.push(new THREE.Vector2(0.68, 0.32));
    points.push(new THREE.Vector2(0.6, 0.35));
    points.push(new THREE.Vector2(0.48, 0.3));
    points.push(new THREE.Vector2(0.2, 0.15));
    points.push(new THREE.Vector2(0, 0.12));

    const latheGeom = new THREE.LatheGeometry(points, 24);
    const diyaMaterial = new THREE.MeshStandardMaterial({
      color: 0x8a4b22, // Terracotta with rich warm undertone
      roughness: 0.45,
      metalness: 0.35,
    });
    const baseMesh = new THREE.Mesh(latheGeom, diyaMaterial);
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    group.add(baseMesh);

    // Golden decorative rim
    const rimGeom = new THREE.TorusGeometry(0.62, 0.035, 12, 32);
    rimGeom.rotateX(Math.PI / 2);
    rimGeom.translate(0, 0.32, 0);
    const goldRimMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.85,
      roughness: 0.25,
      emissive: 0x4a3a10,
    });
    const rimMesh = new THREE.Mesh(rimGeom, goldRimMat);
    group.add(rimMesh);

    // Diya oil pool
    const oilGeom = new THREE.CylinderGeometry(0.46, 0.32, 0.05, 24);
    const oilMat = new THREE.MeshStandardMaterial({
      color: 0x3d260f,
      roughness: 0.1,
      metalness: 0.1,
    });
    const oilMesh = new THREE.Mesh(oilGeom, oilMat);
    oilMesh.position.y = 0.22;
    group.add(oilMesh);

    // Cotton wick
    const wickGeom = new THREE.CylinderGeometry(0.025, 0.03, 0.18, 8);
    const wickMat = new THREE.MeshBasicMaterial({ color: 0x1f160e });
    const wickMesh = new THREE.Mesh(wickGeom, wickMat);
    wickMesh.position.set(0.22, 0.28, 0);
    wickMesh.rotation.z = -Math.PI / 6;
    group.add(wickMesh);

    // 2. Procedural Diya Flame (Inner core + Outer warm aura)
    const flameGeom = new THREE.ConeGeometry(0.09, 0.38, 16);
    flameGeom.translate(0, 0.19, 0);
    const flameMat = new THREE.MeshBasicMaterial({
      color: 0xfff6c2,
    });
    const flameMesh = new THREE.Mesh(flameGeom, flameMat);
    flameMesh.position.set(0.28, 0.34, 0);
    group.add(flameMesh);

    // Flame outer glow sprite
    const spriteMat = new THREE.SpriteMaterial({
      map: this.glowTexture,
      color: 0xff9922,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.88,
    });
    const glowSprite = new THREE.Sprite(spriteMat);
    glowSprite.scale.set(0.9, 1.2, 1);
    glowSprite.position.set(0.28, 0.44, 0);
    group.add(glowSprite);

    // 3. Dynamic Amber Point Light
    const light = new THREE.PointLight(0xffa234, 2.2, 7, 1.8);
    light.position.set(0.28, 0.48, 0);
    group.add(light);

    // Hit-testing invisible shell for easy clicking/hovering
    const hitGeom = new THREE.SphereGeometry(0.9, 12, 12);
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });
    const hitMesh = new THREE.Mesh(hitGeom, hitMat);
    hitMesh.position.y = 0.3;
    hitMesh.userData = { diyaIndex: this.diyas.length };
    group.add(hitMesh);
    this.raycastTargets.push(hitMesh);

    this.scene.add(group);

    const instance: DiyaInstance = {
      group,
      light,
      flameMesh,
      glowSprite,
      baseMesh,
      oilMesh,
      initialPos: position.clone(),
      baseLightIntensity: 2.2,
      flickerSpeed: 7 + Math.random() * 5,
      flickerOffset: Math.random() * Math.PI * 2,
      isHovered: false,
      sparkParticles: null,
      sparkVelocities: null,
      sparkLife: 0,
    };

    this.diyas.push(instance);
    return instance;
  }

  triggerSparkCelebration(index: number) {
    const diya = this.diyas[index];
    if (!diya) return;

    // Remove old sparks if active
    if (diya.sparkParticles) {
      this.scene.remove(diya.sparkParticles);
      diya.sparkParticles.geometry.dispose();
      (diya.sparkParticles.material as THREE.Material).dispose();
      diya.sparkParticles = null;
    }

    // Generate celebratory golden flowerpot/spark shower
    const sparkCount = 90;
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(sparkCount * 3);
    const colors = new Float32Array(sparkCount * 3);
    const velocities = new Float32Array(sparkCount * 3);

    const diyaWorldPos = new THREE.Vector3();
    diya.light.getWorldPosition(diyaWorldPos);

    const goldColors = [
      new THREE.Color("#FFF8DC"),
      new THREE.Color("#FFD700"),
      new THREE.Color("#FFA500"),
      new THREE.Color("#FF4500"),
    ];

    for (let i = 0; i < sparkCount; i++) {
      positions[i * 3] = diyaWorldPos.x;
      positions[i * 3 + 1] = diyaWorldPos.y;
      positions[i * 3 + 2] = diyaWorldPos.z;

      // Cone-shaped upward celebration sparks
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.8 + Math.random() * 2.5;
      const spread = 0.6 + Math.random() * 0.7;

      velocities[i * 3] = Math.cos(angle) * spread;
      velocities[i * 3 + 1] = speed;
      velocities[i * 3 + 2] = Math.sin(angle) * spread;

      const c = goldColors[Math.floor(Math.random() * goldColors.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 1,
    });

    const sparks = new THREE.Points(geom, mat);
    this.scene.add(sparks);

    diya.sparkParticles = sparks;
    diya.sparkVelocities = velocities;
    diya.sparkLife = 1.0;

    // Temporary light burst
    diya.light.intensity = 5.0;
  }

  setHoveredDiya(index: number | null) {
    this.diyas.forEach((d, idx) => {
      d.isHovered = idx === index;
    });
  }

  update(time: number, delta: number) {
    this.diyas.forEach((diya) => {
      // Natural flame flickers
      const flicker =
        Math.sin(time * diya.flickerSpeed + diya.flickerOffset) * 0.15 +
        Math.cos(time * (diya.flickerSpeed * 1.7) + diya.flickerOffset) * 0.08;

      const targetIntensity = diya.isHovered ? 4.2 : diya.baseLightIntensity;
      diya.light.intensity += (targetIntensity + flicker * 0.8 - diya.light.intensity) * 0.1;

      // Flame scale oscillation
      const scaleMultiplier = diya.isHovered ? 1.4 : 1.0;
      diya.flameMesh.scale.set(
        (1 + flicker * 0.4) * scaleMultiplier,
        (1 + flicker * 0.8) * scaleMultiplier,
        (1 + flicker * 0.4) * scaleMultiplier,
      );

      diya.glowSprite.scale.set(
        (0.9 + flicker * 0.3) * scaleMultiplier,
        (1.2 + flicker * 0.4) * scaleMultiplier,
        1,
      );

      // Update spark celebration if active
      if (diya.sparkParticles && diya.sparkVelocities && diya.sparkLife > 0) {
        diya.sparkLife -= delta * 0.85;
        const geom = diya.sparkParticles.geometry;
        const posAttr = geom.getAttribute("position") as THREE.BufferAttribute;
        const posArr = posAttr.array as Float32Array;

        for (let i = 0; i < posArr.length / 3; i++) {
          posArr[i * 3] += diya.sparkVelocities[i * 3] * delta;
          posArr[i * 3 + 1] += diya.sparkVelocities[i * 3 + 1] * delta;
          posArr[i * 3 + 2] += diya.sparkVelocities[i * 3 + 2] * delta;

          // Gravity pull down
          diya.sparkVelocities[i * 3 + 1] -= 4.5 * delta;
        }

        posAttr.needsUpdate = true;
        const mat = diya.sparkParticles.material as THREE.PointsMaterial;
        mat.opacity = Math.max(0, diya.sparkLife);

        if (diya.sparkLife <= 0) {
          this.scene.remove(diya.sparkParticles);
          geom.dispose();
          mat.dispose();
          diya.sparkParticles = null;
        }
      }
    });
  }

  dispose() {
    this.diyas.forEach((diya) => {
      this.scene.remove(diya.group);
      if (diya.sparkParticles) {
        this.scene.remove(diya.sparkParticles);
        diya.sparkParticles.geometry.dispose();
        (diya.sparkParticles.material as THREE.Material).dispose();
      }
      diya.baseMesh.geometry.dispose();
      (diya.baseMesh.material as THREE.Material).dispose();
      diya.flameMesh.geometry.dispose();
      (diya.flameMesh.material as THREE.Material).dispose();
      diya.glowSprite.material.dispose();
    });
    this.glowTexture.dispose();
    this.diyas = [];
    this.raycastTargets = [];
  }
}
