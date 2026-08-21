import { useEffect } from "react";

const CursorGlow = () => {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      return undefined;
    }

    const root = document.documentElement;
    let frameId;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const updateGlow = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const followCursor = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      root.style.setProperty("--cursor-x", `${currentX}px`);
      root.style.setProperty("--cursor-y", `${currentY}px`);
      frameId = window.requestAnimationFrame(followCursor);
    };

    window.addEventListener("pointermove", updateGlow, { passive: true });
    frameId = window.requestAnimationFrame(followCursor);

    return () => {
      window.removeEventListener("pointermove", updateGlow);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      root.style.removeProperty("--cursor-x");
      root.style.removeProperty("--cursor-y");
    };
  }, []);

  return <div className="cursorGlow" aria-hidden="true" />;
};

export default CursorGlow;
