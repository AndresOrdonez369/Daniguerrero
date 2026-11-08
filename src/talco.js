// Talco y confeti: the Carnaval in the air of the hero.
// Talco drifts and confeti (retazo colors) tumbles; the pointer is wind,
// a tap throws a handful of talco, and a double tap on the portrait pops a heart of confeti.
import {
  WebGLRenderer,
  Scene,
  OrthographicCamera,
  BufferGeometry,
  BufferAttribute,
  Points,
  ShaderMaterial,
  NormalBlending,
  LinearSRGBColorSpace,
} from 'three';

const CONFETTI = ['#BBA7E6', '#CFDD4C', '#E3A93A', '#2D4BD8', '#F36B21', '#E5242F', '#F3F4F6'];
const TALCO = [0.953, 0.957, 0.965];

const VERT = /* glsl */ `
attribute float aSize;
attribute vec3 aColor;
attribute float aRot;
attribute float aAlpha;
attribute float aKind;
uniform vec2 uRes;
uniform float uDpr;
varying vec3 vColor;
varying float vRot;
varying float vAlpha;
varying float vKind;
void main() {
  vColor = aColor; vRot = aRot; vAlpha = aAlpha; vKind = aKind;
  gl_Position = vec4(position.x / uRes.x * 2.0 - 1.0, 1.0 - position.y / uRes.y * 2.0, 0.0, 1.0);
  gl_PointSize = aSize * uDpr;
}
`;

const FRAG = /* glsl */ `
precision mediump float;
varying vec3 vColor;
varying float vRot;
varying float vAlpha;
varying float vKind;
void main() {
  vec2 p = gl_PointCoord - 0.5;
  float a;
  vec3 col = vColor;
  if (vKind < 0.5) {
    a = smoothstep(0.5, 0.0, length(p));
    a *= a;
  } else {
    float c = cos(vRot), s = sin(vRot);
    p = mat2(c, -s, s, c) * p;
    float tumble = abs(cos(vRot * 1.7));
    float hw = 0.46, hh = 0.07 + 0.17 * tumble;
    a = (1.0 - smoothstep(hw - 0.04, hw, abs(p.x))) * (1.0 - smoothstep(hh - 0.04, hh, abs(p.y)));
    col *= 0.72 + 0.28 * tumble;
  }
  a *= vAlpha;
  if (a < 0.01) discard;
  gl_FragColor = vec4(col * a, a);
}
`;

function rgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}
const rand = (a, b) => a + Math.random() * (b - a);

export function createTalco({ host, count = 400, avoid = [], ambient = true }) {
  const canvas = document.createElement('canvas');
  canvas.className = 'hero-fx';
  canvas.setAttribute('aria-hidden', 'true');
  host.prepend(canvas);

  const renderer = new WebGLRenderer({ canvas, alpha: true, premultipliedAlpha: true, antialias: false, powerPreference: 'low-power' });
  renderer.outputColorSpace = LinearSRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
  renderer.setPixelRatio(dpr);

  const N = count;
  const pos = new Float32Array(N * 3);
  const vel = new Float32Array(N * 2);
  const size = new Float32Array(N);
  const color = new Float32Array(N * 3);
  const rot = new Float32Array(N);
  const spin = new Float32Array(N);
  const alpha = new Float32Array(N);
  const base = new Float32Array(N);
  const kind = new Float32Array(N);
  const fall = new Float32Array(N);
  const phase = new Float32Array(N);
  const shown = new Float32Array(N);
  const born = new Float64Array(N);

  let W = 1;
  let H = 1;

  function seed(i, anywhere) {
    const confetti = Math.random() < 0.2;
    kind[i] = confetti ? 1 : 0;
    pos[i * 3] = rand(0, W);
    pos[i * 3 + 1] = anywhere ? rand(0, H) : rand(-40, -8);
    vel[i * 2] = 0;
    vel[i * 2 + 1] = 0;
    if (confetti) {
      size[i] = rand(7, 12);
      const c = rgb(CONFETTI[(Math.random() * CONFETTI.length) | 0]);
      color.set(c, i * 3);
      base[i] = rand(0.55, 0.9);
      fall[i] = rand(16, 34);
      spin[i] = rand(-2.6, 2.6);
    } else {
      size[i] = rand(2, 5.5);
      color.set(TALCO, i * 3);
      base[i] = rand(0.18, 0.55);
      fall[i] = rand(5, 15);
      spin[i] = 0;
    }
    alpha[i] = base[i];
    if (!ambient) { base[i] = 0; alpha[i] = 0; }
    rot[i] = rand(0, Math.PI * 2);
    phase[i] = rand(0, Math.PI * 2);
  }

  const geo = new BufferGeometry();
  const aPos = new BufferAttribute(pos, 3);
  const aRot = new BufferAttribute(rot, 1);
  const aAlpha = new BufferAttribute(shown, 1);
  const aSize = new BufferAttribute(size, 1);
  const aColor = new BufferAttribute(color, 3);
  geo.setAttribute('position', aPos);
  geo.setAttribute('aRot', aRot);
  geo.setAttribute('aAlpha', aAlpha);
  geo.setAttribute('aSize', aSize);
  geo.setAttribute('aColor', aColor);
  geo.setAttribute('aKind', new BufferAttribute(kind, 1));
  const uniforms = { uRes: { value: [1, 1] }, uDpr: { value: dpr } };
  const mat = new ShaderMaterial({
    vertexShader: VERT, fragmentShader: FRAG, uniforms,
    transparent: true, depthTest: false, depthWrite: false, blending: NormalBlending, premultipliedAlpha: true,
  });
  const points = new Points(geo, mat);
  points.frustumCulled = false;
  const scene = new Scene();
  scene.add(points);
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

  // keep ambient talco and confeti faint over her face and over the copy
  let quiet = [];
  function refreshQuiet() {
    const h = host.getBoundingClientRect();
    quiet = avoid.map((el) => el.getBoundingClientRect())
      .filter((r) => r.width && r.height)
      .map((r) => [r.left - h.left - 6, r.top - h.top - 6, r.right - h.left + 6, r.bottom - h.top + 6]);
  }
  function resize() {
    W = Math.max(1, host.clientWidth);
    H = Math.max(1, host.clientHeight);
    renderer.setSize(W, H, false);
    uniforms.uRes.value = [W, H];
    refreshQuiet();
  }
  setTimeout(refreshQuiet, 1500);
  resize();
  for (let i = 0; i < N; i++) seed(i, true);
  new ResizeObserver(resize).observe(host);

  // pointer as wind
  const wind = { x: 0, y: 0, vx: 0, vy: 0, t: 0, on: false };
  host.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const now = performance.now();
    const dt = Math.max(8, now - wind.t) / 1000;
    if (wind.on) {
      wind.vx = wind.vx * 0.5 + ((x - wind.x) / dt) * 0.5;
      wind.vy = wind.vy * 0.5 + ((y - wind.y) / dt) * 0.5;
    }
    wind.x = x; wind.y = y; wind.t = now; wind.on = true;
  }, { passive: true });
  host.addEventListener('pointerleave', () => { wind.on = false; }, { passive: true });

  let cursor = 0;
  function take() { cursor = (cursor + 1) % N; return cursor; }

  function burst(x, y, { n = 70, heart = false } = {}) {
    for (let k = 0; k < n; k++) {
      const i = take();
      const confetti = heart ? Math.random() < 0.75 : Math.random() < 0.45;
      kind[i] = confetti ? 1 : 0;
      let px = x;
      let py = y;
      let ang;
      let sp;
      if (heart) {
        const t = rand(0, Math.PI * 2);
        const hx = 16 * Math.sin(t) ** 3;
        const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        px += hx * 3.2; py += hy * 3.2;
        ang = Math.atan2(hy, hx);
        sp = rand(120, 320);
      } else {
        ang = rand(0, Math.PI * 2);
        sp = confetti ? rand(160, 520) : rand(60, 380);
      }
      pos[i * 3] = px;
      pos[i * 3 + 1] = py;
      vel[i * 2] = Math.cos(ang) * sp;
      vel[i * 2 + 1] = Math.sin(ang) * sp - (heart ? 60 : 140);
      if (confetti) {
        size[i] = rand(8, 13);
        color.set(rgb(heart && Math.random() < 0.6 ? '#E5242F' : CONFETTI[(Math.random() * CONFETTI.length) | 0]), i * 3);
        base[i] = rand(0.7, 0.95);
        fall[i] = rand(18, 36);
        spin[i] = rand(-4, 4);
      } else {
        size[i] = rand(3, 8);
        color.set(TALCO, i * 3);
        base[i] = rand(0.35, 0.75);
        fall[i] = rand(6, 16);
        spin[i] = 0;
      }
      alpha[i] = 1;
      if (!ambient) base[i] = 0;
      born[i] = performance.now();
    }
    geo.attributes.aKind.needsUpdate = true;
    aSize.needsUpdate = true;
    aColor.needsUpdate = true;
    settleUntil = performance.now() + (ambient ? 1800 : 3800);
    kick();
  }

  let running = false;
  let wanted = false;
  let settleUntil = 0;
  let raf = 0;
  let last = 0;
  let time = 0;
  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
    last = now;
    time += dt;
    const relax = 1 - Math.exp(-1.4 * dt);
    const fade = 1 - Math.exp(-1.2 * dt);
    const windOn = wind.on && now - wind.t < 140;
    for (let i = 0; i < N; i++) {
      const ix = i * 3;
      const iv = i * 2;
      const sway = Math.sin(time * (kind[i] ? 1.3 : 0.7) + phase[i]) * (kind[i] ? 22 : 9);
      vel[iv] += (sway - vel[iv]) * relax;
      vel[iv + 1] += (fall[i] - vel[iv + 1]) * relax;
      if (windOn) {
        const dx = pos[ix] - wind.x;
        const dy = pos[ix + 1] - wind.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 22000) {
          const f = (1 - d2 / 22000) * 0.09;
          vel[iv] += wind.vx * f;
          vel[iv + 1] += wind.vy * f;
        }
      }
      pos[ix] += vel[iv] * dt;
      pos[ix + 1] += vel[iv + 1] * dt;
      rot[i] += spin[i] * dt;
      alpha[i] += (base[i] - alpha[i]) * fade;
      let a = alpha[i];
      if (now - born[i] > 1400) {
        const x = pos[ix];
        const y = pos[ix + 1];
        for (let q = 0; q < quiet.length; q++) {
          const r = quiet[q];
          if (x > r[0] && x < r[2] && y > r[1] && y < r[3]) { a *= 0.1; break; }
        }
      }
      shown[i] = a;
      if (pos[ix + 1] > H + 24) seed(i, false);
      else if (pos[ix] < -40) pos[ix] += W + 80;
      else if (pos[ix] > W + 40) pos[ix] -= W + 80;
    }
    aPos.needsUpdate = true;
    aRot.needsUpdate = true;
    aAlpha.needsUpdate = true;
    renderer.render(scene, camera);
    if (running && (wanted || now < settleUntil)) raf = requestAnimationFrame(frame);
    else { running = false; if (!ambient) renderer.clear(); }
  }
  function kick() {
    if (!running) { running = true; last = performance.now(); raf = requestAnimationFrame(frame); }
  }
  function setRunning(on) {
    wanted = on;
    if (on) kick();
  }

  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); setRunning(false); canvas.remove(); });
  requestAnimationFrame(() => canvas.classList.add('on'));

  function dispose() {
    setRunning(false);
    cancelAnimationFrame(raf);
    running = false;
    geo.dispose();
    mat.dispose();
    renderer.dispose();
    canvas.remove();
  }

  return { burst, heart: (x, y) => burst(x, y, { n: 90, heart: true }), setRunning, dispose, canvas };
}
