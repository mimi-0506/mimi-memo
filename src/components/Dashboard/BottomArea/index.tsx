import styled from "@emotion/styled";
import DateSection from "./DateSection";
import { useAtomValue } from "jotai";
import { memosAtom } from "../../../atoms/memoAtom";

const MemoList = styled.div`
  margin-top: 20px;
  display: grid;
  gap: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function BottomArea() {
  const memos = useAtomValue(memosAtom);
  return (
    <MemoList>
      {Array.from(memos.entries())
        .sort()
        .map((data) => (
          <DateSection data={data} key={data[0]} />
        ))}
    </MemoList>
  );
}
