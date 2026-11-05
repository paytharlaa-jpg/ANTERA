import * as THREE from "three";

export class GoldenParticleSystem {
  scene: THREE.Scene;
  points: THREE.Points;
  geometry: THREE.BufferGeometry;
  material: THREE.PointsMaterial;
  count: number;

  positions: Float32Array;
  colors: Float32Array;
  velocities: Float32Array;
  phases: Float32Array;

  constructor(scene: THREE.Scene, count = 350) {
    this.scene = scene;
    this.count = count;

    this.geometry = new THREE.BufferGeometry();
    this.positions = new Float32Array(count * 3);
    this.colors = new Float32Array(count * 3);
    this.velocities = new Float32Array(count * 3);
    this.phases = new Float32Array(count);

    const goldTones = [
      new THREE.Color("#FFF8DC"), // Warm ivory
      new THREE.Color("#FFD700"), // Pure gold
      new THREE.Color("#FFB547"), // Amber gold
      new THREE.Color("#D4AF37"), // Deep rich gold
    ];

    for (let i = 0; i < count; i++) {
      // 3 depth tiers: foreground (z: 2 to 8), midground (z: -10 to 2), background (z: -30 to -10)
      const depthTier = i % 3;
      let z = 0;
      let spreadX = 25;
      let spreadY = 20;

      if (depthTier === 0) {
        // Foreground
        z = 2 + Math.random() * 6;
        spreadX = 16;
        spreadY = 14;
      } else if (depthTier === 1) {
        // Midground around architecture
        z = -10 + Math.random() * 12;
        spreadX = 30;
        spreadY = 22;
      } else {
        // Background sky
        z = -35 + Math.random() * 20;
        spreadX = 45;
        spreadY = 30;
      }

      this.positions[i * 3] = (Math.random() - 0.5) * spreadX;
      this.positions[i * 3 + 1] = (Math.random() - 0.5) * spreadY + 3;
      this.positions[i * 3 + 2] = z;

      // Upward drift velocity with slight horizontal drift
      this.velocities[i * 3] = (Math.random() - 0.5) * 0.15;
      this.velocities[i * 3 + 1] = 0.25 + Math.random() * 0.45;
      this.velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1;

      this.phases[i] = Math.random() * Math.PI * 2;

      const tone = goldTones[Math.floor(Math.random() * goldTones.length)];
      this.colors[i * 3] = tone.r;
      this.colors[i * 3 + 1] = tone.g;
      this.colors[i * 3 + 2] = tone.b;
    }

    this.geometry.setAttribute("position", new THREE.BufferAttribute(this.positions, 3));
    this.geometry.setAttribute("color", new THREE.BufferAttribute(this.colors, 3));

    this.material = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.points);
  }

  update(time: number, delta: number, mouseOffset: { x: number; y: number }) {
    const posArr = this.geometry.getAttribute("position").array as Float32Array;
    const colArr = this.geometry.getAttribute("color").array as Float32Array;

    for (let i = 0; i < this.count; i++) {
      const idx = i * 3;
      const phase = this.phases[i];

      // Gentle upward movement with sine wave sway
      posArr[idx] += (this.velocities[idx] + Math.sin(time * 0.8 + phase) * 0.1) * delta;
      posArr[idx + 1] += this.velocities[idx + 1] * delta;
      posArr[idx + 2] += this.velocities[idx + 2] * delta;

      // Mouse parallax shift
      posArr[idx] += mouseOffset.x * 0.02 * delta;

      // Wrap around when rising too high
      if (posArr[idx + 1] > 18) {
        posArr[idx + 1] = -5;
      }
      if (posArr[idx] > 26) posArr[idx] = -26;
      if (posArr[idx] < -26) posArr[idx] = 26;

      // Twinkle luminance
      const twinkle = 0.55 + Math.sin(time * 3.5 + phase) * 0.45;
      colArr[idx] *= twinkle;
      colArr[idx + 1] *= twinkle;
      colArr[idx + 2] *= twinkle;
    }

    this.geometry.getAttribute("position").needsUpdate = true;
    this.geometry.getAttribute("color").needsUpdate = true;
  }

  dispose() {
    this.scene.remove(this.points);
    this.geometry.dispose();
    this.material.dispose();
  }
}
