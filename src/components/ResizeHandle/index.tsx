import { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import throttle from "lodash/throttle";

const Edge = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 8px;
  height: 100%;
  cursor: ew-resize;
  z-index: 9999;
  pointer-events: auto;
  background: red;
`;

export default function ResizeHandle() {
  const isDragging = useRef(false);
  const startX = useRef(0);
  const baseWidth = useRef(0);

  //쓰로틀링 리렌더링 방지용으로 ref
  const throttledResize = useRef(
    throttle((dx: number) => {
      window.electron?.ipcRenderer?.send("resize-window", {
        direction: "right",
        dx,
        baseWidth: baseWidth.current,
      });
    }, 50)
  ).current;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.screenX - startX.current;
      throttledResize(dx);
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
  }, [throttledResize]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.screenX;
    baseWidth.current = window.innerWidth;
  };

  return <Edge onMouseDown={handleMouseDown} />;
}
