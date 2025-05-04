import styled from "@emotion/styled";
import { useAtomValue } from "jotai";
import { memosAtom } from "../../../atoms/memoAtom";
import MemoGroup from "./MemoGroup";
import {
  indexedMemosAtom,
  indexedStateAtom,
} from "../../../atoms/indexedMemoAtom";
import IndexedMemoGroup from "./IndexedMemoGroup";

const MemoList = styled.div`
  margin-top: 35px;
  display: grid;
  gap: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function BottomArea() {
  const indexedState = useAtomValue(indexedStateAtom);
  const indexedMemos = useAtomValue(indexedMemosAtom);
  const memos = useAtomValue(memosAtom);

  return (
    <MemoList>
      {indexedState ? (
        <IndexedMemoGroup
          data={Array.from(indexedMemos.get(indexedState) || []).sort()}
        />
      ) : (
        Array.from(memos.entries())
          .sort()
          .map((data) => <MemoGroup data={data} key={data[0]} />)
      )}
    </MemoList>
  );
}
