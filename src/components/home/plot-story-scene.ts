/**
 * Procedural "open plot → community" scene. Pure three.js, loaded lazily.
 * Everything is driven by a single progress value (0..1) from scroll.
 * Stylised white-model aesthetic — deliberately not a depiction of any real project.
 */
import * as THREE from "three";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const range = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

type Plot = {
  x: number;
  z: number;
  w: number;
  d: number;
  house: boolean;
  delay: number;
  floors: number;
  rot: number;
};

export function createPlotScene(canvas: HTMLCanvasElement, opts: { mobile: boolean }) {
  const { mobile } = opts;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !mobile,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = !mobile;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const bg = new THREE.Color("#0d1322");
  scene.background = bg;
  scene.fog = new THREE.Fog(bg, 70, 170);

  const camera = new THREE.PerspectiveCamera(mobile ? 50 : 38, 1, 0.5, 400);

  /* ---------- lights ---------- */
  const hemi = new THREE.HemisphereLight("#dfe7ff", "#2a2216", 0.55);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight("#ffe3bd", 2.2);
  sun.position.set(-40, 60, 30);
  sun.castShadow = !mobile;
  sun.shadow.mapSize.set(2048, 2048);
  const sc = sun.shadow.camera;
  sc.left = -55;
  sc.right = 55;
  sc.top = 45;
  sc.bottom = -45;
  sc.near = 10;
  sc.far = 160;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.03;
  scene.add(sun);
  const rim = new THREE.DirectionalLight("#7fb2ff", 0.5);
  rim.position.set(40, 20, -40);
  scene.add(rim);

  /* ---------- materials ---------- */
  const groundMat = new THREE.MeshStandardMaterial({ color: "#151c2c", roughness: 1 });
  const parcelMat = new THREE.MeshStandardMaterial({
    color: "#3a3426",
    roughness: 0.95,
    transparent: true,
    opacity: 0,
  });
  const plotMat = new THREE.MeshStandardMaterial({
    color: "#5a5240",
    roughness: 0.9,
    transparent: true,
    opacity: 0,
  });
  const roadMat = new THREE.MeshStandardMaterial({ color: "#1c2130", roughness: 0.75 });
  const kerbMat = new THREE.MeshStandardMaterial({ color: "#c9b78f", roughness: 0.6 });
  const clayMat = new THREE.MeshStandardMaterial({ color: "#efebe3", roughness: 0.55 });
  const clay2Mat = new THREE.MeshStandardMaterial({ color: "#d9d2c4", roughness: 0.6 });
  const roofMat = new THREE.MeshStandardMaterial({
    color: "#b39a6a",
    roughness: 0.45,
    metalness: 0.25,
  });
  const glassMat = new THREE.MeshStandardMaterial({
    color: "#1b2a3d",
    roughness: 0.15,
    metalness: 0.6,
    emissive: "#ffb766",
    emissiveIntensity: 0,
  });
  const leafMat = new THREE.MeshStandardMaterial({
    color: "#5f7d55",
    roughness: 0.85,
    flatShading: true,
  });
  const trunkMat = new THREE.MeshStandardMaterial({ color: "#6b5a44", roughness: 0.9 });
  const parkMat = new THREE.MeshStandardMaterial({
    color: "#3d5a3b",
    roughness: 1,
    transparent: true,
    opacity: 0,
  });
  const poolMat = new THREE.MeshStandardMaterial({
    color: "#3fb6c9",
    emissive: "#2a8fa3",
    emissiveIntensity: 0.4,
    roughness: 0.1,
    metalness: 0.2,
  });
  const lineMat = new THREE.LineBasicMaterial({
    color: "#e2c58a",
    transparent: true,
    opacity: 0.9,
  });

  /* ---------- ground ---------- */
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(600, 600), groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const PW = 76;
  const PD = 46;
  const parcel = new THREE.Mesh(new THREE.BoxGeometry(PW, 0.2, PD), parcelMat);
  parcel.position.y = 0.1;
  parcel.receiveShadow = true;
  scene.add(parcel);

  /* ---------- layout ---------- */
  const spineW = 3.2;
  const crossW = 2.2;
  const crossXs = [-24, -8, 8];
  const parkX0 = 16; // east end: park + clubhouse
  const plots: Plot[] = [];
  const plotW = 3.8;
  const plotD = 6.4;
  const rowsZ = [
    -(spineW / 2 + plotD / 2 + 0.6),
    -(spineW / 2 + plotD * 1.5 + 0.9),
    spineW / 2 + plotD / 2 + 0.6,
    spineW / 2 + plotD * 1.5 + 0.9,
  ];
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (let x = -PW / 2 + 2.6; x < parkX0 - 1; x += plotW + 0.35) {
    if (crossXs.some((c) => Math.abs(x - c) < crossW / 2 + plotW / 2)) continue;
    for (const z of rowsZ) {
      const dist = Math.hypot(x + 10, z) / 50;
      plots.push({
        x,
        z,
        w: plotW,
        d: plotD,
        house: rand() > (mobile ? 0.45 : 0.32),
        delay: clamp(dist * 0.55 + rand() * 0.25),
        floors: rand() > 0.55 ? 2 : 1,
        rot: z > 0 ? Math.PI : 0,
      });
    }
  }

  // plot fills (instanced thin slabs)
  const plotFill = new THREE.InstancedMesh(
    new THREE.BoxGeometry(1, 0.06, 1),
    plotMat,
    plots.length,
  );
  plotFill.receiveShadow = true;
  const m4 = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const v = new THREE.Vector3();
  const s = new THREE.Vector3();
  plots.forEach((p, i) => {
    m4.compose(v.set(p.x, 0.23, p.z), q.identity(), s.set(p.w - 0.25, 1, p.d - 0.25));
    plotFill.setMatrixAt(i, m4);
  });
  scene.add(plotFill);

  // plot outlines (progressively drawn)
  const pts: number[] = [];
  const pushRect = (x: number, z: number, w: number, d: number, y = 0.27) => {
    const a = [x - w / 2, z - d / 2];
    const b = [x + w / 2, z - d / 2];
    const c = [x + w / 2, z + d / 2];
    const e = [x - w / 2, z + d / 2];
    for (const [p1, p2] of [
      [a, b],
      [b, c],
      [c, e],
      [e, a],
    ] as const)
      pts.push(p1[0]!, y, p1[1]!, p2[0]!, y, p2[1]!);
  };
  pushRect(0, 0, PW - 0.4, PD - 0.4);
  [...plots].sort((a, b) => a.x - b.x).forEach((p) => pushRect(p.x, p.z, p.w - 0.2, p.d - 0.2));
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(lines);
  const totalVerts = pts.length / 3;

  // roads
  const roads: { mesh: THREE.Mesh; axis: "x" | "z"; delay: number }[] = [];
  const addRoad = (x: number, z: number, w: number, d: number, axis: "x" | "z", delay: number) => {
    const g = new THREE.Group();
    const road = new THREE.Mesh(new THREE.BoxGeometry(w, 0.12, d), roadMat);
    road.receiveShadow = true;
    g.add(road);
    const kerbA = new THREE.Mesh(
      new THREE.BoxGeometry(axis === "x" ? w : 0.18, 0.2, axis === "x" ? 0.18 : d),
      kerbMat,
    );
    const kerbB = kerbA.clone();
    if (axis === "x") {
      kerbA.position.z = d / 2;
      kerbB.position.z = -d / 2;
    } else {
      kerbA.position.x = w / 2;
      kerbB.position.x = -w / 2;
    }
    g.add(kerbA, kerbB);
    g.position.set(x, 0.26, z);
    scene.add(g);
    roads.push({ mesh: g as unknown as THREE.Mesh, axis, delay });
  };
  addRoad(0, 0, PW, spineW, "x", 0);
  crossXs.forEach((cx, i) => addRoad(cx, 0, crossW, PD, "z", 0.25 + i * 0.15));
  addRoad(parkX0 - 0.5, 0, crossW, PD, "z", 0.7);
  // approach road beyond the parcel
  addRoad(-PW / 2 - 25, 0, 50, spineW, "x", 0);

  // dashed centre line
  const dashGeo = new THREE.BoxGeometry(1.4, 0.02, 0.12);
  const dashes = new THREE.InstancedMesh(
    dashGeo,
    new THREE.MeshBasicMaterial({ color: "#e9d7a8" }),
    40,
  );
  for (let i = 0; i < 40; i++) {
    m4.compose(v.set(-PW / 2 + 1 + i * 2.4, 0.34, 0), q.identity(), s.set(1, 1, 1));
    dashes.setMatrixAt(i, m4);
  }
  dashes.count = 0;
  scene.add(dashes);

  // park + clubhouse zone
  const park = new THREE.Mesh(new THREE.BoxGeometry(PW / 2 - parkX0 - 1.5, 0.1, PD - 4), parkMat);
  park.position.set((parkX0 + PW / 2) / 2 + 0.5, 0.25, 0);
  park.receiveShadow = true;
  scene.add(park);

  const club = new THREE.Group();
  const c1 = new THREE.Mesh(new THREE.BoxGeometry(9, 3.2, 6), clayMat);
  c1.position.set(0, 1.6, 0);
  const c2 = new THREE.Mesh(new THREE.BoxGeometry(6, 2.8, 5), clay2Mat);
  c2.position.set(1.5, 4.6, -0.5);
  const slab = new THREE.Mesh(new THREE.BoxGeometry(11, 0.3, 7.4), roofMat);
  slab.position.set(0.5, 6.15, -0.2);
  const glass1 = new THREE.Mesh(new THREE.BoxGeometry(8.6, 2, 0.1), glassMat);
  glass1.position.set(0, 1.6, 3.02);
  const glass2 = new THREE.Mesh(new THREE.BoxGeometry(5.6, 1.8, 0.1), glassMat);
  glass2.position.set(1.5, 4.6, 2.02);
  const pool = new THREE.Mesh(new THREE.BoxGeometry(7, 0.12, 3), poolMat);
  pool.position.set(-0.5, 0.08, 6);
  const deck = new THREE.Mesh(new THREE.BoxGeometry(9, 0.1, 4.6), clay2Mat);
  deck.position.set(-0.5, 0.03, 6);
  [c1, c2, slab, glass1, glass2].forEach((m) => {
    m.castShadow = true;
    m.receiveShadow = true;
  });
  club.add(c1, c2, slab, glass1, glass2, deck, pool);
  club.position.set(parkX0 + 9, 0.3, -6);
  club.scale.set(1, 0.001, 1);
  scene.add(club);

  // entrance arch at west end
  const arch = new THREE.Group();
  const pillarGeo = new THREE.BoxGeometry(1.2, 6, 1.6);
  const pA = new THREE.Mesh(pillarGeo, clayMat);
  pA.position.set(0, 3, -3.4);
  const pB = pA.clone();
  pB.position.z = 3.4;
  const beam = new THREE.Mesh(new THREE.BoxGeometry(2, 0.9, 9.4), roofMat);
  beam.position.set(0, 6.2, 0);
  [pA, pB, beam].forEach((m) => (m.castShadow = true));
  arch.add(pA, pB, beam);
  arch.position.set(-PW / 2 + 0.5, 0.2, 0);
  arch.scale.set(1, 0.001, 1);
  scene.add(arch);

  /* ---------- houses (instanced) ---------- */
  const homes = plots.filter((p) => p.house);
  const bodyGeo = new THREE.BoxGeometry(1, 1, 1);
  bodyGeo.translate(0, 0.5, 0);
  const bodies = new THREE.InstancedMesh(bodyGeo, clayMat, homes.length);
  const uppers = new THREE.InstancedMesh(bodyGeo, clay2Mat, homes.length);
  const roofs = new THREE.InstancedMesh(bodyGeo, roofMat, homes.length);
  const windows = new THREE.InstancedMesh(bodyGeo, glassMat, homes.length);
  for (const im of [bodies, uppers, roofs, windows]) {
    im.castShadow = !mobile;
    im.receiveShadow = true;
    scene.add(im);
  }

  /* ---------- trees (instanced) ---------- */
  type Tree = { x: number; z: number; s: number; delay: number };
  const trees: Tree[] = [];
  const edgeZ = spineW / 2 + 0.55;
  for (let x = -PW / 2 + 2; x < parkX0 - 1; x += mobile ? 4.2 : 3) {
    if (crossXs.some((c) => Math.abs(x - c) < crossW)) continue;
    trees.push({ x, z: edgeZ, s: 0.8 + rand() * 0.4, delay: (x + PW / 2) / PW });
    trees.push({ x, z: -edgeZ, s: 0.8 + rand() * 0.4, delay: (x + PW / 2) / PW });
  }
  for (let i = 0; i < (mobile ? 18 : 34); i++) {
    trees.push({
      x: parkX0 + 2 + rand() * (PW / 2 - parkX0 - 4),
      z: (rand() - 0.5) * (PD - 6),
      s: 0.9 + rand() * 0.8,
      delay: 0.5 + rand() * 0.5,
    });
  }
  for (let i = 0; i < (mobile ? 30 : 70); i++) {
    // perimeter green belt
    const t = rand();
    const side = Math.floor(rand() * 4);
    const x = side < 2 ? -PW / 2 + t * PW : side === 2 ? -PW / 2 - 1.5 : PW / 2 + 1.5;
    const z = side === 0 ? -PD / 2 - 1.5 : side === 1 ? PD / 2 + 1.5 : -PD / 2 + t * PD;
    trees.push({ x, z, s: 1 + rand() * 0.9, delay: rand() });
  }
  const leafGeo = new THREE.IcosahedronGeometry(1, 0);
  leafGeo.translate(0, 1.9, 0);
  const trunkGeo = new THREE.CylinderGeometry(0.12, 0.16, 1.2, 5);
  trunkGeo.translate(0, 0.6, 0);
  const leaves = new THREE.InstancedMesh(leafGeo, leafMat, trees.length);
  const trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, trees.length);
  leaves.castShadow = !mobile;
  scene.add(leaves, trunks);

  /* ---------- street lights ---------- */
  const lampPos: number[] = [];
  for (let x = -PW / 2 + 3; x < PW / 2 - 2; x += 5) {
    lampPos.push(x, 2.2, edgeZ + 0.4, x + 2.5, 2.2, -edgeZ - 0.4);
  }
  const lampGeo = new THREE.BufferGeometry();
  lampGeo.setAttribute("position", new THREE.Float32BufferAttribute(lampPos, 3));
  const lampMat = new THREE.PointsMaterial({
    color: "#ffcf86",
    size: mobile ? 0.9 : 0.7,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  scene.add(new THREE.Points(lampGeo, lampMat));

  /* ---------- camera path ---------- */
  // Subjects are framed right of centre — the captions sit on the left.
  const camPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-14, 92, 22),
    new THREE.Vector3(-34, 64, 58),
    new THREE.Vector3(-62, 34, 50),
    new THREE.Vector3(-44, 22, 40),
    new THREE.Vector3(-6, 20, 44),
    new THREE.Vector3(30, 22, 40),
  ]);
  const lookPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-16, 0, 0),
    new THREE.Vector3(-18, 0, 0),
    new THREE.Vector3(-24, 0, 6),
    new THREE.Vector3(-30, 1, 4),
    new THREE.Vector3(-10, 2, -4),
    new THREE.Vector3(6, 2, -8),
  ]);

  const dusk = new THREE.Color("#2a1f2a");
  const pointer = { x: 0, y: 0, sx: 0, sy: 0 };

  /* ---------- update ---------- */
  function update(p: number) {
    // 01 land
    const pLand = ease(range(p, 0, 0.08));
    parcelMat.opacity = pLand;
    // outlines draw 0.02 → 0.24
    const pLines = range(p, 0.02, 0.24);
    lineGeo.setDrawRange(0, Math.floor((totalVerts * pLines) / 2) * 2);
    lineMat.opacity = 0.9 - range(p, 0.55, 0.8) * 0.55;
    plotMat.opacity = ease(range(p, 0.14, 0.28)) * 0.9;

    // 02 roads 0.2 → 0.42
    for (const r of roads) {
      const t = ease(range(p, 0.2 + r.delay * 0.12, 0.32 + r.delay * 0.12));
      const g = r.mesh as unknown as THREE.Group;
      g.visible = t > 0.001;
      if (r.axis === "x") g.scale.set(Math.max(t, 0.001), 1, 1);
      else g.scale.set(1, 1, Math.max(t, 0.001));
    }
    dashes.count = Math.floor(40 * range(p, 0.3, 0.42));
    dashes.instanceMatrix.needsUpdate = true;

    // 03 trees + park 0.4 → 0.6
    parkMat.opacity = ease(range(p, 0.4, 0.5));
    trees.forEach((t, i) => {
      const k = ease(range(p, 0.4 + t.delay * 0.12, 0.48 + t.delay * 0.12));
      const sc = k * t.s;
      m4.compose(v.set(t.x, 0.25, t.z), q.identity(), s.set(sc, sc, sc));
      leaves.setMatrixAt(i, m4);
      trunks.setMatrixAt(i, m4);
    });
    leaves.instanceMatrix.needsUpdate = true;
    trunks.instanceMatrix.needsUpdate = true;

    // 04 homes 0.58 → 0.84
    const ZERO = new THREE.Matrix4().makeScale(0, 0, 0);
    homes.forEach((h, i) => {
      const k = ease(range(p, 0.58 + h.delay * 0.16, 0.66 + h.delay * 0.16));
      if (k < 0.002) {
        bodies.setMatrixAt(i, ZERO);
        uppers.setMatrixAt(i, ZERO);
        roofs.setMatrixAt(i, ZERO);
        windows.setMatrixAt(i, ZERO);
        return;
      }
      const bw = h.w * 0.72;
      const bd = h.d * 0.55;
      const H1 = 2.6;
      const y0 = 0.27;
      const zf = h.rot ? -1 : 1; // front faces the spine road
      const cz = h.z - zf * 0.2;
      m4.compose(v.set(h.x, y0, cz), q.identity(), s.set(bw, H1 * k, bd));
      bodies.setMatrixAt(i, m4);
      const k2 = h.floors === 2 ? ease(range(p, 0.64 + h.delay * 0.16, 0.72 + h.delay * 0.16)) : 0;
      if (k2 > 0.002) {
        m4.compose(
          v.set(h.x - 0.25, y0 + H1 * k, cz - zf * 0.35),
          q.identity(),
          s.set(bw * 0.78, 2.2 * k2, bd * 0.8),
        );
        uppers.setMatrixAt(i, m4);
      } else uppers.setMatrixAt(i, ZERO);
      const roofY = y0 + H1 * k + (h.floors === 2 ? 2.2 * k2 : 0);
      if (k > 0.97) {
        m4.compose(v.set(h.x, roofY, cz), q.identity(), s.set(bw + 0.5, 0.18, bd + 0.6));
        roofs.setMatrixAt(i, m4);
      } else roofs.setMatrixAt(i, ZERO);
      m4.compose(
        v.set(h.x, y0 + 0.5, cz + zf * (bd / 2 + 0.02)),
        q.identity(),
        s.set(bw * 0.7, 1.4 * k, 0.06),
      );
      windows.setMatrixAt(i, m4);
    });
    for (const im of [bodies, uppers, roofs, windows]) im.instanceMatrix.needsUpdate = true;

    // 05 community 0.8 → 1
    const kc = easeInOut(range(p, 0.78, 0.9));
    club.scale.y = Math.max(kc, 0.001);
    club.visible = kc > 0.002;
    const ka = easeInOut(range(p, 0.24, 0.34));
    arch.scale.y = Math.max(ka, 0.001);
    arch.visible = ka > 0.002;
    const night = ease(range(p, 0.86, 1));
    glassMat.emissiveIntensity = night * 1.4;
    lampMat.opacity = night;
    sun.intensity = 2.2 - night * 1.3;
    sun.color.set("#ffe3bd").lerp(new THREE.Color("#ff9f6b"), night);
    hemi.intensity = 0.55 - night * 0.2;
    (scene.background as THREE.Color).copy(bg).lerp(dusk, night * 0.6);
    scene.fog!.color.copy(scene.background as THREE.Color);

    // camera
    const cp = easeInOut(clamp(p));
    camPath.getPoint(cp, camera.position);
    pointer.sx += (pointer.x - pointer.sx) * 0.05;
    pointer.sy += (pointer.y - pointer.sy) * 0.05;
    camera.position.x += pointer.sx * 3;
    camera.position.y += pointer.sy * 1.5;
    camera.lookAt(lookPath.getPoint(cp));
  }

  function resize(w: number, h: number) {
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = w / h < 0.8 ? 58 : mobile ? 50 : 38;
    camera.updateProjectionMatrix();
  }

  function render(p: number) {
    update(p);
    renderer.render(scene, camera);
  }

  function setPointer(x: number, y: number) {
    pointer.x = x;
    pointer.y = y;
  }

  function dispose() {
    renderer.dispose();
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      mesh.geometry?.dispose?.();
      const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
      else mat?.dispose?.();
    });
  }

  return { render, resize, setPointer, dispose };
}
