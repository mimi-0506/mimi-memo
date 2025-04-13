import Memo from "./Memo";

import { fillMissingDates } from "../../utils/dateUtils";
import useLoadMemos from "../../hook/useLoadMemos";
import useSaveMemos from "../../hook/useSaveMemos";
import styled from "@emotion/styled";
import { useAtomValue } from "jotai";
import { memosAtom } from "../../atoms/memoAtom";
import TextInput from "./TextInput";
import DaySelector from "./DaySelector";
import useLoadBounds from "../../hook/useLoadBounds";
import useSaveBounds from "../../hook/useSaveBounds";

export const Wrapper = styled.div`
  padding: 20px;
  height: 90%;

  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  overflow: hidden;
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

export default function Dashboard() {
  const memos = useAtomValue(memosAtom);

  useLoadMemos();
  useSaveMemos();
  useLoadBounds();
  useSaveBounds();

  return (
    <Wrapper>
      <DaySelector />
      <TextInput />
      <MemoList>
        {fillMissingDates(memos).map(([date, memos]) => (
          <MemoGroup key={date}>
            {date}
            {memos.map((memo) => (
              <Memo key={memo.id} memo={memo} />
            ))}
          </MemoGroup>
        ))}
      </MemoList>
    </Wrapper>
  );
}
