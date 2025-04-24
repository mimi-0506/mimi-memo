import styled from "@emotion/styled";
import { IndexedMemoType } from "../../../../../types/types";
import IndexedMemo from "./indexedMemo";

const MemoGroupLayout = styled.div`
  padding: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 100%;
`;

export default function IndexedMemoGroup({
  data,
}: {
  data: IndexedMemoType[];
}) {
  return (
    <MemoGroupLayout>
      {data.map((memo) => (
        <IndexedMemo key={memo.id} memo={memo} />
      ))}
    </MemoGroupLayout>
  );
}
