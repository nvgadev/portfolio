import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * 3D "cloud network" globe: a dotted sphere with arcs between region nodes
 * and packets travelling along them. Follows the mouse; `progress` (0..1)
 * from the hero scrub speeds it up and pulls it closer.
 */
const REGIONS = [
  [38.9, -77.0], // us-east-1
  [45.5, -122.7], // us-west-2
  [53.3, -6.3], // eu-west-1
  [50.1, 8.7], // eu-central-1
  [1.35, 103.8], // ap-southeast-1
  [35.7, 139.7], // ap-northeast-1
  [-23.5, -46.6], // sa-east-1
  [19.1, 72.9], // ap-south-1
  [-33.9, 151.2], // ap-southeast-2
];
const LINKS = [[0, 1], [0, 2], [2, 3], [3, 7], [7, 4], [4, 5], [4, 8], [0, 6], [1, 5], [3, 4]];

const toVec = (lat, lon, r) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
};

function applyTheme({ dotMat, coreMat }, theme) {
  const dark = theme === 'dark';
  dotMat.color.set(dark ? 0x7aa2ff : 0x3b6cf6);
  dotMat.opacity = dark ? 0.7 : 0.55;
  coreMat.color.set(dark ? 0x0b1530 : 0xffffff);
  coreMat.opacity = dark ? 0.55 : 0.35;
}

export default function Globe({ progressRef, theme = 'light' }) {
  const mount = useRef(null);
  const mats = useRef(null);

  useEffect(() => {
    const el = mount.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return undefined; // no WebGL: the hero still works without the globe
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    const world = new THREE.Group();
    world.rotation.x = 0.35;
    scene.add(world);
    const R = 2.6;

    // Dotted sphere (fibonacci distribution)
    const N = 1500;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = Math.PI * (3 - Math.sqrt(5)) * i;
      pos.set([Math.cos(t) * r * R, y * R, Math.sin(t) * r * R], i * 3);
    }
    const dotsGeo = new THREE.BufferGeometry();
    dotsGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const dotMat = new THREE.PointsMaterial({ color: 0x3b6cf6, size: 0.035, transparent: true, opacity: 0.55 });
    world.add(new THREE.Points(dotsGeo, dotMat));

    // Soft inner sphere + rim
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35 });
    world.add(new THREE.Mesh(new THREE.SphereGeometry(R * 0.985, 48, 48), coreMat));
    mats.current = { dotMat, coreMat };
    applyTheme(mats.current, document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(R * 1.32, 0.008, 8, 200),
      new THREE.MeshBasicMaterial({ color: 0xff9900, transparent: true, opacity: 0.3 })
    );
    rim.rotation.x = Math.PI / 2.3;
    scene.add(rim);
    const rim2 = new THREE.Mesh(
      new THREE.TorusGeometry(R * 1.5, 0.006, 8, 200),
      new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.35 })
    );
    rim2.rotation.set(Math.PI / 1.8, 0.4, 0);
    scene.add(rim2);

    // Region nodes
    const nodes = REGIONS.map(([la, lo]) => toVec(la, lo, R));
    nodes.forEach((v) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16), new THREE.MeshBasicMaterial({ color: 0xff9900 }));
      m.position.copy(v);
      world.add(m);
      const halo = new THREE.Mesh(new THREE.RingGeometry(0.09, 0.13, 32), new THREE.MeshBasicMaterial({ color: 0xff9900, transparent: true, opacity: 0.5, side: THREE.DoubleSide }));
      halo.position.copy(v);
      halo.lookAt(v.clone().multiplyScalar(2));
      world.add(halo);
    });

    // Arcs + travelling packets
    const packets = [];
    LINKS.forEach(([a, b], i) => {
      const s = nodes[a], e = nodes[b];
      const mid = s.clone().add(e).multiplyScalar(0.5);
      mid.setLength(R + s.distanceTo(e) * 0.45);
      const curve = new THREE.QuadraticBezierCurve3(s, mid, e);
      const g = new THREE.BufferGeometry().setFromPoints(curve.getPoints(60));
      world.add(new THREE.Line(g, new THREE.LineBasicMaterial({ color: i % 2 ? 0x7c3aed : 0x2563eb, transparent: true, opacity: 0.6 })));
      const p = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), new THREE.MeshBasicMaterial({ color: 0xff9900 }));
      world.add(p);
      packets.push({ curve, mesh: p, t: Math.random(), speed: 0.12 + Math.random() * 0.12 });
    });

    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const mouse = { x: 0, y: 0 };
    const onMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    const clock = new THREE.Clock();
    let raf;
    const tick = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const p = progressRef?.current ?? 0;
      world.rotation.y += dt * (reduce ? 0 : 0.12 + p * 0.5);
      world.rotation.x += (0.35 + mouse.y * 0.15 - world.rotation.x) * 0.04;
      world.position.x += (mouse.x * 0.25 - world.position.x) * 0.04;
      rim.rotation.z += dt * 0.15;
      rim2.rotation.z -= dt * 0.1;
      camera.position.z = 9 - p * 2.2;
      packets.forEach((k) => {
        k.t = (k.t + dt * k.speed) % 1;
        k.mesh.position.copy(k.curve.getPoint(k.t));
      });
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    // Only render while the globe is on screen and the tab is visible
    let onScreen = true;
    const run = () => {
      cancelAnimationFrame(raf);
      if (onScreen && !document.hidden) {
        clock.getDelta();
        raf = requestAnimationFrame(tick);
      }
    };
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      run();
    });
    io.observe(el);
    document.addEventListener('visibilitychange', run);
    tick();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener('visibilitychange', run);
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, [progressRef]);

  useEffect(() => {
    if (mats.current) applyTheme(mats.current, theme);
  }, [theme]);

  return <div ref={mount} className="absolute inset-0" aria-hidden="true" />;
}
