"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [w, setW] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setW(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-evergreen-deep">
      {/* rope: dashed rose line that grows */}
      <div
        className="rope-progress h-full bg-[repeating-linear-gradient(90deg,#ce7b91_0_10px,#1a281f_10px_16px)]"
        style={{ width: `${w}%` }}
      />
    </div>
  );
}
