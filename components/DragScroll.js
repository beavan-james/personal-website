"use client";

import { useEffect, useRef } from "react";

// A horizontal scroller you can also click-and-drag with a mouse. Touch and
// trackpads keep native scrolling. A drag doesn't count as a click, so it
// won't open the album under the cursor when you let go.
export default function DragScroll({ className, children, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    let start = null;
    let dragged = false;

    const onDown = (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      start = { x: e.clientX, left: el.scrollLeft };
      dragged = false;
    };
    const onMove = (e) => {
      if (!start) return;
      const dx = e.clientX - start.x;
      if (!dragged && Math.abs(dx) < 5) return;
      if (!dragged) {
        dragged = true;
        el.setPointerCapture(e.pointerId);
        el.classList.add("is-dragging");
      }
      el.scrollLeft = start.left - dx;
    };
    const onUp = () => {
      start = null;
      // Snap back on after the drag; the shelf settles onto the nearest album
      el.classList.remove("is-dragging");
    };
    const onClick = (e) => {
      if (!dragged) return;
      e.preventDefault();
      e.stopPropagation();
      dragged = false;
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("click", onClick, true);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("click", onClick, true);
    };
  }, []);

  return (
    <ul ref={ref} className={className} {...props}>
      {children}
    </ul>
  );
}
