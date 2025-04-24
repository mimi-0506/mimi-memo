import styled from "@emotion/styled";
import { useAtomValue, useSetAtom } from "jotai";
import Memo from "./Memo";
import { MemoType } from "../../../../../types/types";
import { dateAtom } from "../../../../atoms/memoAtom";
import { useRef } from "react";
import useGetMemoGroupCoord from "../../../../hook/useGetMemoGroupCoord";
import { colorAtom } from "../../../../atoms/uiAtom";
import { Overlay } from "../../../common";

const MemoGroupLayout = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  padding: 10px;
  overflow: hidden;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 100%;
  position: relative;
  box-sizing: border-box;
`;

const DateButton = styled.button`
  height: 100%;
  margin-bottom: 5px;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
`;

export default function MemoGroup({
  data,
}: {
  data: [date: string, memos: MemoType[]];
}) {
  const { mainColor } = useAtomValue(colorAtom);
  const setDate = useSetAtom(dateAtom);
  const [date, memos] = data;
  const ref = useRef<HTMLDivElement>(null);
  useGetMemoGroupCoord(date, ref);

  const handleDateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const date = e.currentTarget.dataset.date;
    if (date) setDate(date);
  };

  return (
    <MemoGroupLayout key={date} ref={ref} color={mainColor}>
      <Overlay />
      <Content>
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
      </Content>
    </MemoGroupLayout>
  );
}
