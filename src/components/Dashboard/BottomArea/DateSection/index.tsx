import styled from "@emotion/styled";
import { useAtomValue, useSetAtom } from "jotai";
import Memo from "./Memo";
import { MemoType } from "../../../../../types/types";
import {
  dateAtom,
  scrollCoordAtom,
  scrollDateAtom,
} from "../../../../atoms/memoAtom";
import { useEffect, useRef } from "react";

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

const DateButton = styled.button`
  height: 100%;
  margin-bottom: 5px;
`;

export default function DateSection({
  data,
}: {
  data: [date: string, memos: MemoType[]];
}) {
  const setDate = useSetAtom(dateAtom);
  const [date, memos] = data;
  const ref = useRef<HTMLDivElement>(null);

  const scrollDate = useAtomValue(scrollDateAtom);
  const setScroolCoord = useSetAtom(scrollCoordAtom);

  useEffect(() => {
    if (date === scrollDate && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setScroolCoord(rect);
    }
  }, [scrollDate]);

  const handleDateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const date = e.currentTarget.dataset.date;
    if (date) setDate(date);
  };

  return (
    <MemoGroup key={date} ref={ref}>
      <DateButton
        data-date={date}
        onClick={handleDateClick}
        title="해당 날짜 선택"
      >
        {date}
      </DateButton>
      {memos.map((memo) => (
        <Memo key={memo.id} memo={memo} />
      ))}
    </MemoGroup>
  );
}
