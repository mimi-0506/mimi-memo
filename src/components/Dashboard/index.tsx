import useLoadMemos from "../../hook/useLoadMemos";
import useSaveMemos from "../../hook/useSaveMemos";
import styled from "@emotion/styled";
import { useAtomValue, useSetAtom } from "jotai";
import { deleteEmptyAtom, memosAtom } from "../../atoms/memoAtom";
import TextInput from "./TextInput";
import DaySelector from "./DaySelector";
import useLoadBounds from "../../hook/useLoadBounds";
import useSaveBounds from "../../hook/useSaveBounds";
import { useRef } from "react";
import DateSection from "./DateSection";

const TopArea = styled.div`
  position: sticky;
  width: 100%;
  top: 20px;
  left: 0;
  z-inde: 10;
  background: rgba(255, 255, 255, 0);
  backdrop-filter: blur(3px);
  border-bottom: 1px solid #eee;
  padding: 10px;
`;

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

const MemoList = styled.div`
  margin-top: 20px;
  display: grid;
  gap: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonArea = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function Dashboard() {
  const memos = useAtomValue(memosAtom);

  const deleteEmpty = useSetAtom(deleteEmptyAtom);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLoadMemos();
  useSaveMemos();
  useLoadBounds();
  useSaveBounds();

  return (
    <Wrapper ref={wrapperRef}>
      <TopArea>
        <ButtonArea>
          <DaySelector />
          <button onClick={deleteEmpty}>빈배열 삭제</button>
        </ButtonArea>
        <TextInput />
      </TopArea>
      <MemoList>
        {Array.from(memos.entries())
          .sort()
          .map((data) => (
            <DateSection data={data} key={data[0]} />
          ))}
      </MemoList>
    </Wrapper>
  );
}
