"use client";

import { useEffect, useRef } from "react";

const DROP_COUNT = 140;

// Fixed photo backdrop with two motion layers:
// - scroll: darkens + blurs the photo as the first viewport scrolls away
//   (drives the --backdrop-progress custom property, 0 → 1)
// - rain: thin falling streaks on a canvas, slanting slightly toward the cursor
export default function SiteBackdrop() {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const progress = Math.min(window.scrollY / window.innerHeight, 1);
        root.style.setProperty("--backdrop-progress", progress.toFixed(3));
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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let drops = [];
    let wind = 0;
    let targetWind = 0;
    let raf = 0;

    const makeDrop = (randomY) => ({
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -20,
      len: 3 + Math.random() * 4,
      width: 1.4 + Math.random() * 0.8,
      speed: 4 + Math.random() * 6,
      alpha: 0.12 + Math.random() * 0.25,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(DROP_COUNT * Math.min(width / 1440, 1)) + 30;
      drops = Array.from({ length: count }, () => makeDrop(true));
    };

    const onPointer = (e) => {
      // -1 (cursor far left) … 1 (far right) → gentle slant toward the cursor
      targetWind = ((e.clientX / width) * 2 - 1) * 0.35;
    };

    const tick = () => {
      wind += (targetWind - wind) * 0.03;
      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = "round";
      for (const d of drops) {
        const dx = wind * d.len;
        ctx.lineWidth = d.width;
        ctx.strokeStyle = `rgba(226, 232, 222, ${d.alpha})`;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + dx, d.y + d.len);
        ctx.stroke();
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
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
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
