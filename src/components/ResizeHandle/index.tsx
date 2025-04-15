import { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import throttle from "lodash/throttle";

type Direction = "bottom" | "right";

const RightEdge = styled.div`
  position: absolute;
  z-index: 9999;
  pointer-events: auto;
  top: 60px;
  left: calc(5vw + 90vw);
  width: 8px;
  height: 85%;
  cursor: ew-resize;
`;

const BottomEdge = styled.div`
  position: absolute;
  z-index: 9999;
  pointer-events: auto;
  top: calc(5vh + 90vh);
  left: 5vw;
  height: 8px;
  width: 90%;
  cursor: ns-resize;
`;

export default function ResizeHandle({ direction }: { direction: Direction }) {
  const isDragging = useRef(false);
  const startRef = useRef(0);
  const baseRef = useRef(0);

  const throttledResize = useRef(
    throttle((delta: number) => {
      window.electron?.ipcRenderer?.send("resize-window", {
        direction,
        next: baseRef.current + delta,
      });
    }, 100)
  ).current;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const move = direction === "bottom" ? e.screenY : e.screenX;
      const delta = move - startRef.current;
      throttledResize(delta);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [throttledResize, direction]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startRef.current = direction === "bottom" ? e.screenY : e.screenX;
    baseRef.current =
      direction === "bottom" ? window.innerHeight : window.innerWidth;
  };

  return direction === "right" ? (
    <RightEdge onMouseDown={handleMouseDown} />
  ) : (
    <BottomEdge onMouseDown={handleMouseDown} />
  );
}
