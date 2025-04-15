import Memo from "./Memo";

import useLoadMemos from "../../hook/useLoadMemos";
import useSaveMemos from "../../hook/useSaveMemos";
import styled from "@emotion/styled";
import { useAtomValue, useSetAtom } from "jotai";
import { dateAtom, deleteEmptyAtom, memosAtom } from "../../atoms/memoAtom";
import TextInput from "./TextInput";
import DaySelector from "./DaySelector";
import useLoadBounds from "../../hook/useLoadBounds";
import useSaveBounds from "../../hook/useSaveBounds";
import { useRef } from "react";

export const Wrapper = styled.div`
  padding: 20px;
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

const MemoGroup = styled.div`
  background-color: #ffe4e1;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 100%;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DateButton = styled.button``;

export default function Dashboard() {
  const memos = useAtomValue(memosAtom);
  const setDate = useSetAtom(dateAtom);
  const deleteEmpty = useSetAtom(deleteEmptyAtom);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLoadMemos();
  useSaveMemos();
  useLoadBounds();
  useSaveBounds();

  const handleDateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const date = e.currentTarget.dataset.date;

    if (date && wrapperRef.current) {
      setDate(date);
      console.log(date);
      wrapperRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Wrapper ref={wrapperRef}>
      <ButtonArea>
        <DaySelector />
        <button onClick={deleteEmpty}>빈배열 삭제</button>
      </ButtonArea>
      <TextInput />
      <MemoList>
        {Array.from(memos.entries())
          .sort()
          .map(([date, memos]) => (
            <MemoGroup key={date}>
              <DateButton data-date={date} onClick={handleDateClick}>
                {date}
              </DateButton>
              {memos.map((memo) => (
                <Memo key={memo.id} memo={memo} />
              ))}
            </MemoGroup>
          ))}
      </MemoList>
    </Wrapper>
  );
}
