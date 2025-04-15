import useLoadMemos from "../../hook/useLoadMemos";
import useSaveMemos from "../../hook/useSaveMemos";
import styled from "@emotion/styled";
import useLoadBounds from "../../hook/useLoadBounds";
import useSaveBounds from "../../hook/useSaveBounds";
import { useRef } from "react";

import TopArea from "./TopArea";
import BottomArea from "./BottomArea";

export const Wrapper = styled.div`
  padding: 10px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: relative;

  scrollbar-width: thin; /* Firefox */
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 100%;
  }

  &::-webkit-scrollbar-button {
    display: none;
    height: 0;
    width: 0;
  }

  scrollbar-gutter: stable both-edges;
`;

export default function Dashboard() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLoadMemos();
  useSaveMemos();
  useLoadBounds();
  useSaveBounds();

  return (
    <Wrapper ref={wrapperRef}>
      <TopArea />
      <BottomArea />
    </Wrapper>
  );
}
