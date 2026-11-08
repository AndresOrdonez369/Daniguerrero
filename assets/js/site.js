const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const saveData = Boolean(navigator.connection && navigator.connection.saveData);
const idle = (fn) => ('requestIdleCallback' in window ? requestIdleCallback(fn, { timeout: 2000 }) : setTimeout(fn, 700));

/* ---------- menu (phones) ---------- */
const top = $('.top');
const toggle = $('.menu-toggle');
const menu = $('#menu');
function setMenu(open) {
  toggle.setAttribute('aria-expanded', String(open));
  menu.classList.toggle('open', open);
  document.documentElement.classList.toggle('menu-open', open);
  $$('main, .pie, .mini-colcha, .sticky-cta').forEach((el) => { el.inert = open; });
  if (open) { top.classList.remove('is-hidden'); requestAnimationFrame(() => $('a', menu).focus({ preventScroll: true })); }
  $('use', toggle).setAttribute('href', open ? '#i-close' : '#i-menu');
  $('.sr', toggle).textContent = open ? 'Cerrar menú' : 'Abrir menú';
}
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
matchMedia('(min-width: 1024px)').addEventListener('change', (e) => { if (e.matches && toggle.getAttribute('aria-expanded') === 'true') setMenu(false); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setMenu(false); toggle.focus(); }
});

/* ---------- header behaviour ---------- */
const setTopH = () => document.documentElement.style.setProperty('--top-h', `${top.offsetHeight}px`);
setTopH();
new ResizeObserver(setTopH).observe(top);
let lastY = window.scrollY;
addEventListener('scroll', () => {
  const y = window.scrollY;
  top.classList.toggle('is-scrolled', y > 24);
  if (!menu.classList.contains('open')) top.classList.toggle('is-hidden', y > lastY && y > 480);
  lastY = y;
}, { passive: true });

/* ---------- sticky WhatsApp (phones) ---------- */
const sticky = $('.sticky-cta');
const stickyLink = $('a', sticky);
let heroCtaSeen = true;
let contactSeen = false;
function updateSticky() {
  const on = !heroCtaSeen && !contactSeen;
  sticky.classList.toggle('on', on);
  document.documentElement.classList.toggle('sticky-on', on);
  sticky.setAttribute('aria-hidden', String(!on));
  stickyLink.tabIndex = on ? 0 : -1;
}
new IntersectionObserver(([e]) => { heroCtaSeen = e.isIntersecting || e.boundingClientRect.top > 0; updateSticky(); })
  .observe($('#hero-cta'));
new IntersectionObserver(([e]) => { contactSeen = e.isIntersecting; updateSticky(); }, { rootMargin: '0px 0px -15% 0px' })
  .observe($('#contacto'));

/* ---------- mini colcha: mark the retazo in view ---------- */
const minis = $$('.mini-colcha a');
const spy = new IntersectionObserver((entries) => {
  for (const en of entries) {
    if (!en.isIntersecting) continue;
    const id = `#${en.target.id}`;
    minis.forEach((a) => a.setAttribute('aria-current', String(a.getAttribute('href') === id)));
    $$('.top-nav ul a').forEach((a) => a.setAttribute('aria-current', String(a.getAttribute('href') === id)));
  }
}, { rootMargin: '-45% 0px -54% 0px' });
minis.forEach((a) => { const s = $(a.getAttribute('href')); if (s) spy.observe(s); });

/* ---------- looks: retazos transition between Dani's looks ---------- */
const frame = $('.look-frame');
const drift = $('.look-drift');
const img = $('.look-img');
const caption = $('.look-caption');
const swatches = $$('[data-look]');
const pauseBtn = $('.look-pause');
const likeBtn = $('.look-like');
const looks = swatches.map((b) => ({
  src: b.dataset.src,
  srcset: b.dataset.srcset,
  alt: b.dataset.alt,
  caption: b.dataset.caption,
  fx: Number(b.dataset.fx),
  fy: Number(b.dataset.fy),
}));
const PERIOD = 5200;
let cur = 0;
let busy = false;
let playing = !reduceMotion && !saveData;
let inView = true;
let hovered = false;
let timer = 0;
let engine = null;

function pick(srcset, cssWidth) {
  const need = cssWidth * Math.min(window.devicePixelRatio || 1, 2);
  const list = srcset.split(',').map((s) => {
    const [url, w] = s.trim().split(/\s+/);
    return { url, w: parseInt(w, 10) };
  }).sort((x, y) => x.w - y.w);
  return (list.find((c) => c.w >= need) || list[list.length - 1]).url;
}

function paint(i) {
  const L = looks[i];
  img.srcset = L.srcset;
  img.src = L.src;
  img.alt = L.alt;
  img.style.setProperty('--fx', `${L.fx}%`);
  img.style.setProperty('--fy', `${L.fy}%`);
  caption.textContent = L.caption;
  swatches.forEach((b, k) => b.setAttribute('aria-current', String(k === i)));
  likeBtn.setAttribute('aria-pressed', 'false');
}

async function preload(i) {
  const im = new Image();
  im.sizes = img.sizes;
  im.srcset = looks[i].srcset;
  im.src = looks[i].src;
  try { await im.decode(); } catch { /* shown when it arrives */ }
}

function schedule() {
  clearTimeout(timer);
  if (playing && inView && !hovered && !document.hidden) {
    timer = setTimeout(() => go((cur + 1) % looks.length), PERIOD);
  }
}

async function go(i, byUser = false) {
  if (busy || i === cur) return;
  busy = true;
  clearTimeout(timer);
  caption.setAttribute('aria-live', byUser ? 'polite' : 'off');
  if (engine && !engine.lost) await engine.show(i);
  else await preload(i);
  paint(i);
  cur = i;
  busy = false;
  schedule();
}

swatches.forEach((b, k) => b.addEventListener('click', () => go(k, true)));

/* ---------- hero life ---------- */
const hero = $('#inicio');
let talco = null;
let heroInView = true;
function updateFx() {
  if (talco) talco.setRunning(playing && heroInView && !document.hidden);
}

// tap the portrait: next look; double tap: a like, Instagram style, made of confeti
let tapTimer = 0;
let lastTap = 0;
function like(e) {
  const r = frame.getBoundingClientRect();
  const x = e.clientX - r.left;
  const y = e.clientY - r.top;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'like-pop');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.innerHTML = '<use href="#i-heart"/>';
  svg.style.left = `${x}px`;
  svg.style.top = `${y}px`;
  frame.appendChild(svg);
  likeBtn.setAttribute('aria-pressed', 'true');
  setTimeout(() => svg.remove(), 1000);
  if (talco) {
    const h = hero.getBoundingClientRect();
    talco.heart(e.clientX - h.left, e.clientY - h.top);
  }
}
$('.look-advance').addEventListener('click', (e) => {
  const now = performance.now();
  clearTimeout(tapTimer);
  if (e.detail !== 0 && now - lastTap < 320) {
    lastTap = 0;
    like(e);
    return;
  }
  lastTap = now;
  tapTimer = setTimeout(() => go((cur + 1) % looks.length, true), e.detail === 0 ? 0 : 300);
});

// the visible, keyboard-reachable like
likeBtn.addEventListener('click', () => {
  const r = frame.getBoundingClientRect();
  like({ clientX: r.left + r.width / 2, clientY: r.top + r.height * 0.45 });
});

// a tap on the hero throws a handful of talco
hero.addEventListener('click', (e) => {
  if (!talco || e.target.closest('a, button, [data-drag]')) return;
  const h = hero.getBoundingClientRect();
  talco.burst(e.clientX - h.left, e.clientY - h.top);
});

// stickers from Dani's own collage: drag them around
$$('[data-drag]').forEach((el) => {
  let id = null;
  let sx = 0;
  let sy = 0;
  let ox = 0;
  let oy = 0;
  let box = null;
  const stage = el.closest('.look-stage');
  el.addEventListener('pointerdown', (e) => {
    id = e.pointerId;
    el.setPointerCapture(id);
    el.classList.add('dragging');
    sx = e.clientX;
    sy = e.clientY;
    ox = parseFloat(el.style.getPropertyValue('--dx')) || 0;
    oy = parseFloat(el.style.getPropertyValue('--dy')) || 0;
    // stickers stay around the portrait: they never wander over the copy or the CTA
    const r = el.getBoundingClientRect();
    const st = stage.getBoundingClientRect();
    const wide = window.innerWidth >= 1024;
    const pad = wide ? { l: 180, t: 64, r: 64, b: 28 } : { l: 12, t: 28, r: 12, b: 12 };
    box = {
      minX: st.left - pad.l - (r.left - ox), maxX: st.right + pad.r - (r.right - ox),
      minY: st.top - pad.t - (r.top - oy), maxY: st.bottom + pad.b - (r.bottom - oy),
    };
    e.preventDefault();
  });
  const clamp = (v, a, b) => Math.min(Math.max(v, Math.min(a, b)), Math.max(a, b));
  el.addEventListener('pointermove', (e) => {
    if (e.pointerId !== id) return;
    el.style.setProperty('--dx', `${clamp(ox + e.clientX - sx, box.minX, box.maxX)}px`);
    el.style.setProperty('--dy', `${clamp(oy + e.clientY - sy, box.minY, box.maxY)}px`);
  });
  const end = (e) => {
    if (e.pointerId !== id) return;
    id = null;
    el.classList.remove('dragging');
    if (talco && Math.hypot(e.clientX - sx, e.clientY - sy) > 6) {
      const h = hero.getBoundingClientRect();
      talco.burst(e.clientX - h.left, e.clientY - h.top, { n: 22 });
    }
  };
  el.addEventListener('pointerup', end);
  el.addEventListener('pointercancel', end);
});

// one pause for every moving thing in the hero
function setPlaying(on) {
  playing = on;
  pauseBtn.setAttribute('aria-pressed', String(!on));
  $('.sr', pauseBtn).textContent = on ? 'Pausar animaciones' : 'Reanudar animaciones';
  hero.classList.toggle('is-paused', !on);
  updateFx();
  schedule();
}
pauseBtn.addEventListener('click', () => setPlaying(!playing));
if (!playing) {
  pauseBtn.setAttribute('aria-pressed', 'true');
  $('.sr', pauseBtn).textContent = 'Reanudar animaciones';
  hero.classList.add('is-paused');
}
frame.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { hovered = true; clearTimeout(timer); } });
frame.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') { hovered = false; schedule(); } });
new IntersectionObserver(([e]) => { inView = e.isIntersecting; schedule(); }, { threshold: 0.25 }).observe(frame);
new IntersectionObserver(([e]) => { heroInView = e.isIntersecting; updateFx(); }).observe(hero);
document.addEventListener('visibilitychange', () => { schedule(); updateFx(); });

/* ---------- her phrases write themselves in ---------- */
if (!reduceMotion) {
  const scripts = $$('h2 .script, .hook .script, .indecisa .script');
  scripts.forEach((s) => s.classList.add('script-in'));
  const so = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      $$('.script-in', en.target).forEach((x) => x.classList.add('is-written'));
      so.unobserve(en.target);
    }
  }, { threshold: 0.6 });
  new Set(scripts.map((s) => s.parentElement)).forEach((p) => so.observe(p));
}

/* ---------- three.js effects, loaded late and only where they can run well ---------- */
function hasWebGL2() {
  try {
    const gl = document.createElement('canvas').getContext('webgl2');
    if (!gl) return false;
    const lose = gl.getExtension('WEBGL_lose_context');
    if (lose) lose.loseContext();
    return true;
  } catch { return false; }
}

if (!reduceMotion && !saveData) {
  const start = async () => {
    if (!hasWebGL2()) return;
    try {
      const fx = await import('./hero-fx.js?v=10');
      const area = hero.clientWidth * hero.clientHeight;
      talco = fx.createTalco({
        host: hero,
        count: Math.round(Math.min(420, Math.max(120, area / 2800))),
        avoid: $$('.look-frame, .name, .role, .hook, .support, .actions, .proof'),
      });
      updateFx();
      const at = cur;
      const e = await fx.createColcha({ frame: drift, img, looks, pick, current: at });
      if (cur !== at) await e.sync(cur);
      engine = e;
    } catch { engine = null; }
  };
  if (document.readyState === 'complete') idle(start);
  else addEventListener('load', () => idle(start), { once: true });
}

/* ---------- formación: a tap sets the hang tag swinging ---------- */
$$('.tag').forEach((tag) => {
  tag.addEventListener('click', () => {
    tag.classList.remove('swing');
    void tag.offsetWidth;
    tag.classList.add('swing');
  });
  tag.addEventListener('animationend', () => tag.classList.remove('swing'));
});

/* ---------- contacto: build the WhatsApp message, then send it with confeti ---------- */
const brief = $('#brief');
const briefText = $('#brief-text');
const briefSend = $('#brief-send');
const WA_NUMBER = '573014849404';
function joinEs(list) {
  if (list.length < 2) return list.join('');
  return `${list.slice(0, -1).join(', ')} y ${list[list.length - 1]}`;
}
function composeBrief() {
  const needs = $$('input[type="checkbox"]', brief).filter((i) => i.checked).map((i) => i.value);
  const tipo = $('input[name="tipo"]:checked', brief);
  let msg = 'Hola Dani, vi tu web';
  if (tipo) msg += ` y tengo ${tipo.value}`;
  if (needs.length) msg += `. Me interesa ${joinEs(needs)}. ¿Lo charlamos?`;
  else msg += tipo ? '. Quiero hablar de mi marca. ¿Lo charlamos?' : ' y quiero hablar de mi marca. ¿Lo charlamos?';
  briefText.textContent = msg;
  briefSend.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  return msg;
}

// the confeti for the send only exists once someone starts building a message, and leaves with the section
const contacto = $('#contacto');
let fiesta = null;
let fiestaLoading = false;
async function ensureFiesta() {
  if (fiesta || fiestaLoading || reduceMotion || saveData || !hasWebGL2()) return;
  fiestaLoading = true;
  try {
    const fx = await import('./hero-fx.js?v=10');
    fiesta = fx.createTalco({ host: contacto, count: 160, ambient: false });
  } catch { fiesta = null; }
  fiestaLoading = false;
}
new IntersectionObserver(([e]) => {
  if (!e.isIntersecting && fiesta) { fiesta.dispose(); fiesta = null; }
}).observe(contacto);

brief.addEventListener('change', () => {
  composeBrief();
  if (!reduceMotion) {
    briefText.classList.remove('is-new');
    void briefText.offsetWidth;
    briefText.classList.add('is-new');
  }
  ensureFiesta();
});
brief.addEventListener('submit', (e) => e.preventDefault());
const briefStatus = $('.brief-status');
briefSend.addEventListener('click', () => {
  composeBrief();
  briefStatus.textContent = 'Abriendo WhatsApp con tu mensaje para Dani…';
  setTimeout(() => { briefStatus.textContent = ''; }, 6000);
  if (!fiesta) return;
  const b = briefSend.getBoundingClientRect();
  const h = contacto.getBoundingClientRect();
  const x = b.left - h.left + b.width / 2;
  const y = b.top - h.top + b.height / 2;
  fiesta.burst(x, y, { n: 90 });
  setTimeout(() => fiesta && fiesta.burst(x - 120, y - 40, { n: 50 }), 160);
  setTimeout(() => fiesta && fiesta.burst(x + 120, y - 60, { n: 50 }), 300);
});

schedule();
