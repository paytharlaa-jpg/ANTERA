import * as THREE from "three";

interface FireworkParticle {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  color: THREE.Color;
  alpha: number;
  decay: number;
  size: number;
}

interface FireworkBurst {
  points: THREE.Points;
  particles: FireworkParticle[];
  geometry: THREE.BufferGeometry;
  material: THREE.PointsMaterial;
  flashLight: THREE.PointLight | null;
  age: number;
  maxAge: number;
}

export class FireworkManager {
  scene: THREE.Scene;
  bursts: FireworkBurst[] = [];
  lastLaunchTime = 0;
  frequencyMs = 3200;
  maxActive = 4;
  enabled = true;

  palette = [
    [new THREE.Color("#FFD700"), new THREE.Color("#FFA500"), new THREE.Color("#FFF8DC")], // Royal Gold
    [new THREE.Color("#FF8C00"), new THREE.Color("#FF4500"), new THREE.Color("#FFD700")], // Festive Amber
    [new THREE.Color("#E6C280"), new THREE.Color("#D4AF37"), new THREE.Color("#FFF5E6")], // Ivory Gold
    [new THREE.Color("#FF69B4"), new THREE.Color("#D4AF37"), new THREE.Color("#FFB547")], // Rose Gold
  ];

  constructor(scene: THREE.Scene, frequencyMs = 3200, maxActive = 4) {
    this.scene = scene;
    this.frequencyMs = frequencyMs;
    this.maxActive = maxActive;
  }

  launch(targetPos?: THREE.Vector3) {
    if (this.bursts.length >= this.maxActive) return;

    // Pick a burst location in the sky
    const x = targetPos ? targetPos.x : (Math.random() - 0.5) * 44;
    const y = targetPos ? Math.max(14, targetPos.y) : 16 + Math.random() * 14;
    const z = targetPos ? Math.min(-20, targetPos.z) : -30 - Math.random() * 25;

    const burstColorSet = this.palette[Math.floor(Math.random() * this.palette.length)];
    const particleCount = 110;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const particles: FireworkParticle[] = [];

    // Spherical and willow pattern
    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const speed = 2.2 + Math.random() * 4.2;

      const vx = speed * Math.sin(phi) * Math.cos(theta);
      const vy = speed * Math.sin(phi) * Math.sin(theta);
      const vz = speed * Math.cos(phi);

      const color = burstColorSet[Math.floor(Math.random() * burstColorSet.length)].clone();

      particles.push({
        pos: new THREE.Vector3(x, y, z),
        vel: new THREE.Vector3(vx, vy, vz),
        color,
        alpha: 1.0,
        decay: 0.45 + Math.random() * 0.35,
        size: 0.14 + Math.random() * 0.12,
      });

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 1.0,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    this.scene.add(points);

    // Dynamic sky flash light
    const flashLight = new THREE.PointLight(burstColorSet[0], 4.5, 35, 1.6);
    flashLight.position.set(x, y, z);
    this.scene.add(flashLight);

    this.bursts.push({
      points,
      particles,
      geometry,
      material,
      flashLight,
      age: 0,
      maxAge: 2.2,
    });
  }

  update(now: number, delta: number) {
    if (!this.enabled) return;

    // Automated periodic launch
    if (now - this.lastLaunchTime > this.frequencyMs) {
      this.lastLaunchTime = now;
      this.launch();
    }

    // Update active bursts
    for (let b = this.bursts.length - 1; b >= 0; b--) {
      const burst = this.bursts[b];
      burst.age += delta;

      // Fade out flash light quickly
      if (burst.flashLight) {
        burst.flashLight.intensity = Math.max(0, 4.5 * (1 - burst.age / 0.5));
        if (burst.age >= 0.5) {
          this.scene.remove(burst.flashLight);
          burst.flashLight = null;
        }
      }

      const posArr = burst.geometry.getAttribute("position").array as Float32Array;
      const colArr = burst.geometry.getAttribute("color").array as Float32Array;

      let allDead = true;

      for (let i = 0; i < burst.particles.length; i++) {
        const p = burst.particles[i];
        if (p.alpha > 0) {
          allDead = false;

          // Drag / friction
          p.vel.multiplyScalar(0.96);
          // Gravity
          p.vel.y -= 3.2 * delta;

          p.pos.addScaledVector(p.vel, delta);
          p.alpha -= p.decay * delta;

          posArr[i * 3] = p.pos.x;
          posArr[i * 3 + 1] = p.pos.y;
          posArr[i * 3 + 2] = p.pos.z;

          // Twinkle color
          const twinkle = 0.8 + Math.sin(burst.age * 18 + i) * 0.2;
          colArr[i * 3] = p.color.r * Math.max(0, p.alpha) * twinkle;
          colArr[i * 3 + 1] = p.color.g * Math.max(0, p.alpha) * twinkle;
          colArr[i * 3 + 2] = p.color.b * Math.max(0, p.alpha) * twinkle;
        }
      }

      burst.geometry.getAttribute("position").needsUpdate = true;
      burst.geometry.getAttribute("color").needsUpdate = true;
      burst.material.opacity = Math.max(0, 1 - burst.age / burst.maxAge);

      if (burst.age >= burst.maxAge || allDead) {
        this.scene.remove(burst.points);
        if (burst.flashLight) this.scene.remove(burst.flashLight);
        burst.geometry.dispose();
        burst.material.dispose();
        this.bursts.splice(b, 1);
      }
    }
  }

  dispose() {
    this.bursts.forEach((burst) => {
      this.scene.remove(burst.points);
      if (burst.flashLight) this.scene.remove(burst.flashLight);
      burst.geometry.dispose();
      burst.material.dispose();
    });
    this.bursts = [];
  }
}
