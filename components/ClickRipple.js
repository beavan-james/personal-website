"use client";

import { useEffect } from "react";

// Raindrop-on-water ring wherever the visitor clicks
export default function ClickRipple() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const onClick = (e) => {
      const ring = document.createElement("span");
      ring.className = "click-ripple";
      ring.style.left = `${e.clientX}px`;
      ring.style.top = `${e.clientY}px`;
      ring.addEventListener("animationend", () => ring.remove());
      document.body.appendChild(ring);
    };

    window.addEventListener("pointerdown", onClick);
    return () => window.removeEventListener("pointerdown", onClick);
  }, []);

  return null;
}
