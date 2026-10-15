"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const DROP_COUNT = 140;
const DEG = Math.PI / 180;

// Warm light: the paper tone nudged toward the gold accent
const LIGHT = [241, 232, 207];

// Canopy shafts (home page only). In the mirrored photo the brightest canopy
// gap sits top right, so the shafts fall from just above it toward the copy.
// origin/target: viewport fractions. w0: width at the source, as a fraction
// of the shaft's length. half: spread half-angle. Each shaft brightens and
// dims on its own period (seconds), so the pattern rarely lines up twice.
const SHAFTS = [
  { origin: [0.8, -0.2], target: [0.5, 1], w0: 0.007, half: 3.2 * DEG, base: 0.85, period: 11, phase: 0.4, peak: 0.18, seed: 0.9 },
  { origin: [0.77, -0.2], target: [0.33, 0.95], w0: 0.0045, half: 1.8 * DEG, base: 1, period: 17, phase: 2.1, peak: 0.24, seed: 2.6 },
  { origin: [0.83, -0.22], target: [0.18, 0.8], w0: 0.009, half: 3.8 * DEG, base: 0.7, period: 23, phase: 4, peak: 0.16, seed: 4.1 },
  { origin: [0.75, -0.18], target: [0.04, 0.55], w0: 0.0034, half: 1.4 * DEG, base: 0.75, period: 13, phase: 5.3, peak: 0.2, seed: 5.5 },
];

// Each shaft is pre-rendered once, pointing down, at a reference length and
// quarter resolution (soft gradients survive it), then drawn rotated and
// scaled to the viewport, so resizing never re-renders it.
const SPRITE_LEN = 2400;
const SPRITE_RES = 0.25;

const clamp01 = (v) => Math.min(1, Math.max(0, v));

// Brightness along a shaft (f = distance / length): eases in below the
// source, which sits above the viewport, then fades out
function falloff(f) {
  const t = clamp01(f / 0.12);
  return t * t * (3 - 2 * t) * Math.pow(Math.max(0, 1 - f), 1.5);
}

function buildShaftSprite({ w0, half, seed }) {
  const len = SPRITE_LEN * SPRITE_RES;
  const halfWidth = (s) => (w0 * len) / 2 + s * Math.tan(half);
  const sw = Math.ceil(halfWidth(len) * 4.4);
  const sh = Math.ceil(len);
  const sprite = document.createElement("canvas");
  sprite.width = sw;
  sprite.height = sh;
  const ctx = sprite.getContext("2d");
  const img = ctx.createImageData(sw, sh);
  for (let y = 0; y < sh; y++) {
    const hw = halfWidth(y + 0.5);
    const along = falloff((y + 0.5) / len);
    if (along < 0.002) continue;
    for (let x = 0; x < sw; x++) {
      const u = (x + 0.5 - sw / 2) / hw;
      if (Math.abs(u) > 2.2) continue;
      // Gaussian across the shaft, with faint lengthwise streaks
      const p = Math.exp(-u * u * 1.6) * (0.8 + 0.2 * Math.sin(u * 6.5 + seed));
      const i = (y * sw + x) * 4;
      img.data[i] = LIGHT[0];
      img.data[i + 1] = LIGHT[1];
      img.data[i + 2] = LIGHT[2];
      img.data[i + 3] = Math.round(255 * p * along);
    }
  }
  ctx.putImageData(img, 0, 0);
  return sprite;
}

// Rain colour, warming toward the light as a drop is lit (0 … 1)
const dropColor = (lit) =>
  `${Math.round(226 + 29 * lit)}, ${Math.round(232 + 9 * lit)}, ${Math.round(222 - 16 * lit)}`;

// Fixed photo backdrop with three motion layers:
// - scroll: darkens + blurs the photo as the first viewport scrolls away
//   (drives the --backdrop-progress custom property, 0 → 1)
// - rain: thin falling streaks on a canvas, slanting slightly toward the cursor
// - shafts (home page only): soft beams from the canopy gap that slowly
//   brighten and dim; drops falling through them catch the light. They fade
//   out with scroll progress and when leaving the home page.
export default function SiteBackdrop() {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const isHome = usePathname() === "/";
  // Shared with the canvas loop; redraw is set only for reduced motion,
  // where the shafts are a still frame repainted on change
  const lightRef = useRef({ home: isHome, progress: 0, redraw: null });

  useEffect(() => {
    lightRef.current.home = isHome;
    lightRef.current.redraw?.();
  }, [isHome]);

  useEffect(() => {
    const root = rootRef.current;
    const light = lightRef.current;
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const progress = Math.min(window.scrollY / window.innerHeight, 1);
        root.style.setProperty("--backdrop-progress", progress.toFixed(3));
        light.progress = progress;
        light.redraw?.();
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const light = lightRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const shafts = SHAFTS.map((s) => ({ ...s, tanHalf: Math.tan(s.half) }));
    let sprites = null;
    let width = 0;
    let height = 0;
    let drops = [];
    let wind = 0;
    let targetWind = 0;
    let homeLevel = light.home ? 1 : 0;
    let raf = 0;

    const makeDrop = (randomY) => ({
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -20,
      len: 3 + Math.random() * 4,
      width: 1.4 + Math.random() * 0.8,
      speed: 4 + Math.random() * 6,
      alpha: 0.12 + Math.random() * 0.25,
    });

    const layoutShafts = () => {
      const len = Math.hypot(width, height) * 1.5;
      for (const s of shafts) {
        s.ox = s.origin[0] * width;
        s.oy = s.origin[1] * height;
        s.theta0 = Math.atan2(s.target[1] * height - s.oy, s.target[0] * width - s.ox);
        s.len = len;
      }
    };

    // Brightness and a slight sway for each shaft at time t (seconds)
    const updateShafts = (t, level) => {
      for (const s of shafts) {
        const w = (2 * Math.PI * t) / s.period;
        const wave = 0.5 + 0.32 * Math.sin(w + s.phase) + 0.18 * Math.sin(w / 0.41 + s.phase * 2.3);
        s.intensity = s.base * clamp01(wave) * level;
        s.theta = s.theta0 + 1.1 * DEG * Math.sin(w / 1.9 + s.phase);
        s.cos = Math.cos(s.theta);
        s.sin = Math.sin(s.theta);
      }
    };

    const drawShafts = () => {
      if (!sprites) sprites = shafts.map(buildShaftSprite);
      ctx.globalCompositeOperation = "lighter";
      shafts.forEach((s, i) => {
        if (s.intensity < 0.003) return;
        const w = (sprites[i].width / SPRITE_RES) * (s.len / SPRITE_LEN);
        ctx.save();
        ctx.translate(s.ox, s.oy);
        ctx.rotate(s.theta - Math.PI / 2);
        ctx.globalAlpha = Math.min(1, s.intensity * s.peak);
        ctx.drawImage(sprites[i], -w / 2, 0, w, s.len);
        ctx.restore();
      });
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
    };

    // How brightly the shafts light a point, 0 … 1
    const lightAt = (x, y) => {
      let sum = 0;
      for (const s of shafts) {
        if (s.intensity < 0.003) continue;
        const vx = x - s.ox;
        const vy = y - s.oy;
        const along = vx * s.cos + vy * s.sin;
        if (along <= 0 || along >= s.len) continue;
        const u = (vx * s.sin - vy * s.cos) / ((s.w0 * s.len) / 2 + along * s.tanHalf);
        if (Math.abs(u) > 2.2) continue;
        sum += s.intensity * Math.exp(-u * u * 1.6) * falloff(along / s.len);
      }
      return Math.min(1, sum * 1.8);
    };

    // Reduced motion: no rain, and the shafts hold still as a single frame
    const drawStill = () => {
      ctx.clearRect(0, 0, width, height);
      const level = (light.home ? 1 : 0) * (1 - light.progress);
      if (level > 0.003) {
        updateShafts(0, level);
        drawShafts();
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(DROP_COUNT * Math.min(width / 1440, 1)) + 30;
      drops = Array.from({ length: count }, () => makeDrop(true));
      layoutShafts();
      if (reduceMotion) drawStill();
    };

    const onPointer = (e) => {
      // -1 (cursor far left) … 1 (far right) → gentle slant toward the cursor
      targetWind = ((e.clientX / width) * 2 - 1) * 0.35;
    };

    const streak = (x, y, dx, len) => {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + dx, y + len);
      ctx.stroke();
    };

    const tick = (now) => {
      wind += (targetWind - wind) * 0.03;
      // Ease the shafts in or out when arriving at or leaving the home page
      homeLevel += ((light.home ? 1 : 0) - homeLevel) * 0.04;
      const level = homeLevel * (1 - light.progress);
      const shaftsOn = level > 0.003;
      ctx.clearRect(0, 0, width, height);
      if (shaftsOn) {
        updateShafts(now / 1000, level);
        drawShafts();
      }
      ctx.lineCap = "round";
      for (const d of drops) {
        // Drops inside a shaft catch the light: brighter, warmer, a bit longer
        const lit = shaftsOn ? lightAt(d.x, d.y) : 0;
        const len = d.len * (1 + lit * 0.6);
        const dx = wind * len;
        const alpha = d.alpha + (0.95 - d.alpha) * lit;
        const color = dropColor(lit);
        if (lit > 0.3) {
          ctx.lineWidth = d.width * 3.2;
          ctx.strokeStyle = `rgba(${color}, ${alpha * 0.18 * lit})`;
          streak(d.x, d.y, dx, len);
        }
        ctx.lineWidth = d.width;
        ctx.strokeStyle = `rgba(${color}, ${alpha})`;
        streak(d.x, d.y, dx, len);
        d.y += d.speed;
        d.x += wind * d.speed;
        if (d.y > height || d.x < -20 || d.x > width + 20) {
          Object.assign(d, makeDrop(false));
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduceMotion) {
      light.redraw = drawStill;
      return () => {
        light.redraw = null;
        window.removeEventListener("resize", resize);
      };
    }

    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={rootRef} className="site-backdrop" aria-hidden="true">
      <canvas ref={canvasRef} className="site-rain" />
    </div>
  );
}
