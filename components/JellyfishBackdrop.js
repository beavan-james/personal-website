"use client";

import { useEffect, useRef } from "react";

/* Site palette (mirrors @theme in app/globals.css + jellyfish/style.css) */
const INK = "#0b0b0d";
const BELL = ["#c9c9cf", "#f4f4f5", "#8f8f98", "#d0fe1d"];
const BELL_HL = "#f4f4f5";
const ARMS = ["#f4f4f5", "#c9c9cf", "#8f8f98", "#e8e8ea"];
const TENTS = ["#d0fe1d", "#9db814", "#c9c9cf"];

/* Base geometry — compact backdrop scale */
const S = 0.6;
/* Bell display size (static — no pulse) */
const BELL_SCALE = 1.2;
const BELL_W = 220 * S;
const BELL_H = 150 * S;
const LOBE_POINTS = 60;
const ARM_COUNT = 12;
const ARM_SEGMENTS = 36;
const ARM_LEN = 125 * S;
const TENT_COUNT = 15;
const TENT_LEN = 240 * S;
const TENT_SEGMENTS = 30;

function pointInPolygon(px, py, points) {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const xi = points[i].x;
    const yi = points[i].y;
    const xj = points[j].x;
    const yj = points[j].y;
    const intersect =
      yi > py !== yj > py &&
      px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function bellPts(cx, cy, w, h, phase, segments) {
  const pts = [];
  const rx = w / 2;
  const ry = h / 2;
  /* side-view dome: left rim → over the crown → right rim, flat underside */
  for (let i = 0; i <= segments; i++) {
    const theta = -Math.PI / 2 + (i / segments) * Math.PI;
    const perturb = Math.sin(theta * 3 + phase * 0.3) * 2;
    const x = cx + rx * Math.sin(theta) + perturb * Math.cos(theta);
    const y = cy - ry * Math.cos(theta) + perturb * Math.sin(theta);
    pts.push({ x, y });
  }
  return pts;
}

function ribbonContour(pts, thicknessFn) {
  const leftPts = [];
  const rightPts = [];
  for (let s = 0; s < pts.length; s++) {
    const pt = pts[s];
    const next = pts[Math.min(s + 1, pts.length - 1)];
    const prev = pts[Math.max(s - 1, 0)];
    const tx = next.x - prev.x;
    const ty = next.y - prev.y;
    const len = Math.sqrt(tx * tx + ty * ty) || 1;
    const nx = -ty / len;
    const ny = tx / len;
    const thickness = thicknessFn(s / (pts.length - 1), pt, s);
    leftPts.push({ x: pt.x + nx * thickness, y: pt.y + ny * thickness });
    rightPts.push({ x: pt.x - nx * thickness, y: pt.y - ny * thickness });
  }
  return leftPts.concat(rightPts.slice().reverse());
}

export default function JellyfishBackdrop() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let W = 0;
    let H = 0;
    let raf = 0;
    let running = true;
    /* start mid-journey so the jelly is on-screen immediately on load */
    let t = 20;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = canvas.getBoundingClientRect();
      W = Math.max(1, Math.floor(rect.width));
      H = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function fillWithHalftone(pathPoints, color, density, maxDot) {
      if (pathPoints.length === 0) return;
      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;
      for (const p of pathPoints) {
        if (p.x < minX) minX = p.x;
        if (p.x > maxX) maxX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.y > maxY) maxY = p.y;
      }
      const step = Math.max(2, 100 / density);
      ctx.fillStyle = color;
      for (let x = minX; x <= maxX; x += step) {
        for (let y = minY; y <= maxY; y += step) {
          if (pointInPolygon(x, y, pathPoints)) {
            const r = Math.random() * maxDot + 0.5;
            ctx.fillRect(x, y, r, r);
          }
        }
      }
    }

    function drawBell(cx, cy, w, h, scale, phase) {
      ctx.globalAlpha = 1;
      const sw = w * scale;
      const sh = h * scale;
      const bands = 18;
      for (let b = 0; b < bands; b++) {
        const ratio = b / bands;
        const bw = sw * (0.9 - ratio * 0.5);
        const bh = sh * (0.9 - ratio * 0.5);
        const pts = bellPts(cx, cy, bw, bh, phase * 0.7 + b, LOBE_POINTS);
        const color =
          BELL[Math.min(Math.floor(ratio * BELL.length), BELL.length - 1)];
        fillWithHalftone(pts, color, 14, 1.8);
      }
      const hlPts = bellPts(
        cx - sw * 0.3,
        cy - sh * 0.3,
        sw * 0.35,
        sh * 0.22,
        phase,
        LOBE_POINTS
      );
      ctx.globalAlpha = 0.35;
      fillWithHalftone(hlPts, BELL_HL, 28, 1.2);
      ctx.globalAlpha = 1;
    }

    function drawOralArms(cx, cy, phase) {
      for (let i = 0; i < ARM_COUNT; i++) {
        /* southwest diagonal */
        const angle = Math.PI * 1.5;
        const armLen = ARM_LEN * (0.7 + Math.sin(phase * 0.5 + i) * 0.1);
        const baseW = 30 * S * (0.6 + Math.sin(i * 0.5) * 0.4);
        const pts = [];
        for (let s = 0; s <= ARM_SEGMENTS; s++) {
          const u = s / ARM_SEGMENTS;
          const prog = u * armLen;
          const dx = Math.cos(angle) * prog * 0.5;
          const dy = Math.abs(Math.sin(angle)) * prog * 0.5 + prog * 0.3;
          const frillFreq = 8 + i * 0.5;
          const frillAmp = 8 + i * 1.5;
          const sway =
            Math.sin(u * Math.PI * frillFreq + phase * 2 + i) *
            frillAmp *
            u *
            0.7;
          pts.push({ x: cx + dx + sway, y: cy + dy });
        }
        const contour = ribbonContour(
          pts,
          (u) => baseW * (1 - u * 0.7) * (0.7 + Math.sin(phase + i) * 0.3)
        );
        const color =
          ARMS[Math.min(Math.floor((i / ARM_COUNT) * ARMS.length), ARMS.length - 1)];
        fillWithHalftone(contour, color, 12, 2);
      }
    }

    function drawTentacles(cx, cy, bellW, bellH, phase) {
      /* starts spread across the bell underside — parallel curtain, not a cone */
      const spread = bellW * 0.8;
      const topY = cy + bellH * 0.05;
      for (let i = 0; i < TENT_COUNT; i++) {
        const f = i / (TENT_COUNT - 1) - 0.5;
        const sx = cx + f * spread;
        const len = TENT_LEN * (0.85 + 0.15 * Math.sin(i * 1.3));
        const pts = [];
        for (let s = 0; s <= TENT_SEGMENTS; s++) {
          const u = s / TENT_SEGMENTS;
          const prog = u * len;
          const lateralFreq = 1.8 + i * 0.12;
          const lateralAmp = (25 + i * 2) * S;
          const sway =
            Math.sin(u * Math.PI * lateralFreq + phase * 1.5 + i) *
            lateralAmp *
            u;
          const drift = f * 0.35 * prog;
          const bob = Math.sin(prog * 0.02 + phase * 2 + i * 2) * 6 * S * u;
          pts.push({ x: sx + drift + sway, y: topY + prog + bob });
        }
        const baseTh = (3 + Math.sin(i * 0.5) * 1.2) * S;
        const contour = ribbonContour(pts, (u) => baseTh * (1 - u * 0.4));
        const color =
          TENTS[
            Math.min(Math.floor((i / TENT_COUNT) * TENTS.length), TENTS.length - 1)
          ];
        const density = 20 - i * 0.4;
        const dotSize = 2.2 - (i / TENT_COUNT) * 1;
        fillWithHalftone(contour, color, density, dotSize);
      }
    }

    /* Five traversals spanning the full background; one picked per load.
       Coords are fractions of W/H — values outside [0,1] start/end offscreen. */
    const PATHS = [
      { sx: -0.08, sy: 1.12, ex: 1.08, ey: -0.12 }, // bottom-left → top-right
      { sx: -0.08, sy: -0.12, ex: 1.08, ey: 1.12 }, // top-left → bottom-right
      { sx: -0.08, sy: 0.6, ex: 1.08, ey: 0.4 }, // left → right, upper-mid
      { sx: 0.75, sy: 1.12, ex: 0.25, ey: -0.12 }, // bottom → top
      { sx: 0.2, sy: -0.12, ex: 0.8, ey: 1.12 }, // top → bottom
    ];
    const path = PATHS[Math.floor(Math.random() * PATHS.length)];

    /* Diagonal drift across the full background */
    function motionPath(time) {
      const journey = time * 0.02;
      const progress = journey - Math.floor(journey);
      const eased = (1 - Math.cos(progress * Math.PI)) / 2;
      const baseX = (path.sx + (path.ex - path.sx) * eased) * W;
      const baseY = (path.sy + (path.ey - path.sy) * eased) * H;
      const waveOffset = Math.sin(eased * Math.PI * 2.5) * 60;
      const bobOffset = Math.sin(time * 0.5) * 20 + Math.cos(time * 0.3) * 15;
      return { x: baseX + waveOffset, y: baseY + bobOffset };
    }

    function drawFrame(time) {
      ctx.globalAlpha = 1;
      ctx.fillStyle = INK;
      ctx.fillRect(0, 0, W, H);
      const pos = motionPath(time);
      const bellW = BELL_W * BELL_SCALE;
      const bellH = BELL_H * BELL_SCALE;
      drawTentacles(pos.x, pos.y, bellW, bellH, time);
      drawOralArms(pos.x, pos.y + bellH * 0.05, time);
      drawBell(pos.x, pos.y, bellW, bellH, 1, time);
      ctx.globalAlpha = 1;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function loop() {
      if (!running) return;
      t += 0.014;
      drawFrame(t);
      raf = requestAnimationFrame(loop);
    }

    if (reduceMotion) {
      drawFrame(t);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? true;
        if (visible && !running && !reduceMotion) {
          running = true;
          raf = requestAnimationFrame(loop);
        } else if (!visible && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden h-full w-full opacity-100 md:block"
      style={{ opacity: 1 }}
    />
  );
}
