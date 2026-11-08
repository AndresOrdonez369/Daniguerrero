// "Retazos": the hero portrait breaks into a stitched patchwork of fabric
// (the colcha of Nariño and the comparsa vest) and resolves into the next look.
// Built with three.js; bundle with: npm run build
import {
  WebGLRenderer,
  Scene,
  OrthographicCamera,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  Texture,
  LinearFilter,
  LinearSRGBColorSpace,
  NoColorSpace,
  Vector2,
  Vector3,
} from 'three';

const FABRICS = ['#BBA7E6', '#CFDD4C', '#E3A93A', '#1F4A30', '#6B321E', '#2D4BD8', '#F36B21', '#F3F4F6'];
const GROUND = '#0D0C0E';
const DURATION = 1900;

const VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uA;
uniform sampler2D uB;
uniform vec2 uRes;
uniform vec2 uSizeA;
uniform vec2 uSizeB;
uniform vec2 uFocA;
uniform vec2 uFocB;
uniform float uP;
uniform float uSeed;
uniform vec3 uFab[8];
uniform vec3 uGround;

const float PI = 3.14159265;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

vec2 cover(vec2 uv, vec2 size, vec2 foc) {
  float rs = uRes.x / uRes.y;
  float ri = size.x / size.y;
  vec2 s = rs > ri ? vec2(1.0, ri / rs) : vec2(rs / ri, 1.0);
  return uv * s + foc * (1.0 - s);
}

float expoOut(float t) { return t >= 1.0 ? 1.0 : 1.0 - pow(2.0, -10.0 * t); }

vec3 fabricColor(float h) {
  int idx = int(floor(h * 8.0));
  vec3 c = uFab[0];
  for (int k = 1; k < 8; k++) { if (k == idx) c = uFab[k]; }
  return c;
}

// one retazo of cloth: plain weave, stripes, polka dots or gingham, tone on tone
vec3 fabric(vec2 pid, vec2 px, float unit) {
  vec3 c = fabricColor(hash(pid + uSeed + 7.7));
  float kind = floor(hash(pid + uSeed + 2.2) * 4.0);
  float lum = dot(c, vec3(0.299, 0.587, 0.114));
  vec3 tone = lum > 0.5 ? c * 0.84 : mix(c, vec3(1.0), 0.18);
  if (kind < 1.0) {
    float w = 0.5 + 0.5 * sin(px.x * 1.9 / unit) * sin(px.y * 1.9 / unit);
    return mix(c, tone, w * 0.3);
  } else if (kind < 2.0) {
    float s = step(0.5, fract((px.x + px.y) / (11.0 * unit)));
    return mix(c, tone, s);
  } else if (kind < 3.0) {
    vec2 q = fract(px / (12.0 * unit)) - 0.5;
    return mix(c, tone, smoothstep(0.25, 0.19, length(q)));
  }
  float a = step(0.5, fract(px.x / (15.0 * unit)));
  float b = step(0.5, fract(px.y / (15.0 * unit)));
  return mix(c, tone, (a + b) * 0.5);
}

void main() {
  vec2 uv = vUv;
  vec3 a = texture2D(uA, cover(uv, uSizeA, uFocA)).rgb;
  if (uP <= 0.0) { gl_FragColor = vec4(a, 1.0); return; }
  vec3 b = texture2D(uB, cover(uv, uSizeB, uFocB)).rgb;
  if (uP >= 1.0) { gl_FragColor = vec4(b, 1.0); return; }

  float unit = max(uRes.y / 720.0, 0.6);

  // irregular patchwork: a grid of near-square cells, some split in two like field plots
  float cellPx = max(uRes.x, uRes.y) / 5.5;
  vec2 grid = max(vec2(2.0), floor(uRes / cellPx + 0.5));
  vec2 g = uv * grid;
  vec2 cell = floor(g);
  vec2 f = fract(g);
  vec2 org = cell;
  vec2 sz = vec2(1.0);
  float hs = hash(cell + uSeed);
  if (hs > 0.62) {
    float s = 0.38 + 0.24 * hash(cell + uSeed + 3.7);
    if (f.y < s) { sz.y = s; } else { org.y += s; sz.y = 1.0 - s; }
  } else if (hs > 0.28) {
    float s = 0.38 + 0.24 * hash(cell + uSeed + 9.1);
    if (f.x < s) { sz.x = s; } else { org.x += s; sz.x = 1.0 - s; }
  }
  vec2 local = (g - org) / sz;
  vec2 pc = (org + sz * 0.5) / grid;
  vec2 patchPx = sz * (uRes / grid);

  // diagonal sweep, top-left to bottom-right, with a little jitter per retazo
  float sweep = (pc.x + (1.0 - pc.y)) * 0.5;
  float delay = 0.5 * sweep + 0.16 * hash(org + uSeed + 1.3);
  float t = clamp((uP - delay) / 0.34, 0.0, 1.0);

  vec3 col;
  if (t <= 0.0) {
    col = a;
  } else if (t >= 1.0) {
    col = b;
  } else {
    // stage 1: the retazo flips over (exponential ease-out) to show its cloth
    float t1 = clamp(t / 0.42, 0.0, 1.0);
    float ang = PI * expoOut(t1);
    float sc = abs(cos(ang));
    bool vert = hash(org + uSeed + 5.5) > 0.5;
    float lc = vert ? local.y : local.x;
    float lcs = (lc - 0.5) / max(sc, 0.001) + 0.5;
    vec2 l2 = vert ? vec2(local.x, lcs) : vec2(lcs, local.y);
    bool inside = abs(lc - 0.5) <= sc * 0.5;
    if (t1 < 1.0) {
      if (!inside) {
        col = uGround;
      } else if (ang < PI * 0.5) {
        col = texture2D(uA, cover((org + l2 * sz) / grid, uSizeA, uFocA)).rgb;
        col *= 0.7 + 0.3 * sc;
      } else {
        col = fabric(org, l2 * patchPx, unit) * (0.7 + 0.3 * sc);
      }
    } else {
      // stage 2: the cloth rests, then dissolves into the next look
      float t2 = smoothstep(0.58, 1.0, t);
      col = mix(fabric(org, local * patchPx, unit), b, t2);
    }

    // seams and running stitches along every retazo while it is in play
    float vis = sin(PI * t);
    vec2 dpx = min(local, 1.0 - local) * patchPx;
    float dmin = min(dpx.x, dpx.y);
    float along = dpx.x < dpx.y ? local.y * patchPx.y : local.x * patchPx.x;
    col = mix(col, uGround, (1.0 - smoothstep(0.0, 1.3 * unit, dmin)) * vis * 0.9);
    float line = 1.0 - smoothstep(0.55 * unit, 1.35 * unit, abs(dmin - 6.0 * unit));
    float dash = step(0.42, fract(along / (9.0 * unit)));
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    vec3 thread = lum > 0.6 ? uGround : vec3(0.953, 0.957, 0.965);
    col = mix(col, thread, line * dash * vis * 0.85);
  }
  gl_FragColor = vec4(col, 1.0);
}
`;

function rgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return new Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

export async function createColcha({ frame, img, looks, pick, current }) {
  const canvas = document.createElement('canvas');
  canvas.className = 'look-canvas';
  canvas.setAttribute('aria-hidden', 'true');

  const renderer = new WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'low-power' });
  renderer.outputColorSpace = LinearSRGBColorSpace; // work in display values so frame 0 equals the <img>
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);

  const uniforms = {
    uA: { value: null },
    uB: { value: null },
    uRes: { value: new Vector2(1, 1) },
    uSizeA: { value: new Vector2(1, 1) },
    uSizeB: { value: new Vector2(1, 1) },
    uFocA: { value: new Vector2(0.5, 0.5) },
    uFocB: { value: new Vector2(0.5, 0.5) },
    uP: { value: 0 },
    uSeed: { value: 0 },
    uFab: { value: FABRICS.map(rgb) },
    uGround: { value: rgb(GROUND) },
  };
  const material = new ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms, depthTest: false, depthWrite: false });
  const scene = new Scene();
  scene.add(new Mesh(new PlaneGeometry(2, 2), material));
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const cache = new Map();
  function load(url) {
    if (!cache.has(url)) {
      cache.set(url, new Promise((resolve, reject) => {
        const im = new Image();
        im.decoding = 'async';
        im.onload = () => {
          const tex = new Texture(im);
          tex.colorSpace = NoColorSpace;
          tex.minFilter = LinearFilter;
          tex.magFilter = LinearFilter;
          tex.generateMipmaps = false;
          tex.needsUpdate = true;
          renderer.initTexture(tex);
          resolve({ tex, w: im.naturalWidth, h: im.naturalHeight });
        };
        im.onerror = reject;
        im.src = url;
      }));
    }
    return cache.get(url);
  }
  const urlFor = (i) => pick(looks[i].srcset, frame.clientWidth);
  const focus = (i, v) => v.set(looks[i].fx / 100, 1 - looks[i].fy / 100);

  const render = () => renderer.render(scene, camera);
  function size() {
    const w = Math.max(1, frame.clientWidth);
    const h = Math.max(1, frame.clientHeight);
    renderer.setSize(w, h, false);
    uniforms.uRes.value.set(w * dpr, h * dpr);
    render();
  }

  let lost = false;
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    lost = true;
    canvas.remove();
  });

  async function setA(i, url) {
    const a = await load(url || urlFor(i));
    uniforms.uA.value = a.tex;
    uniforms.uB.value = a.tex;
    uniforms.uSizeA.value.set(a.w, a.h);
    uniforms.uSizeB.value.set(a.w, a.h);
    focus(i, uniforms.uFocA.value);
    focus(i, uniforms.uFocB.value);
    uniforms.uP.value = 0;
  }

  await setA(current, img.currentSrc || undefined);
  frame.appendChild(canvas);
  size();
  new ResizeObserver(size).observe(frame);
  requestAnimationFrame(() => canvas.classList.add('on'));
  const prefetch = (i) => load(urlFor(i)).catch(() => {});
  prefetch((current + 1) % looks.length);

  async function show(i) {
    if (lost) return;
    const b = await load(urlFor(i));
    uniforms.uB.value = b.tex;
    uniforms.uSizeB.value.set(b.w, b.h);
    focus(i, uniforms.uFocB.value);
    uniforms.uSeed.value = Math.floor(Math.random() * 97) + 1;
    const t0 = performance.now();
    await new Promise((resolve) => {
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / DURATION);
        uniforms.uP.value = p;
        render();
        if (p < 1 && !lost) requestAnimationFrame(tick);
        else resolve();
      };
      requestAnimationFrame(tick);
    });
    uniforms.uA.value = b.tex;
    uniforms.uSizeA.value.copy(uniforms.uSizeB.value);
    uniforms.uFocA.value.copy(uniforms.uFocB.value);
    uniforms.uP.value = 0;
    render();
    prefetch((i + 1) % looks.length);
  }

  async function sync(i) {
    if (lost) return;
    await setA(i);
    render();
  }

  return { show, sync, get lost() { return lost; } };
}
