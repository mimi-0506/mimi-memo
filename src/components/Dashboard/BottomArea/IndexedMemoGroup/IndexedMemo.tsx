import { useSetAtom } from "jotai";

import styled from "@emotion/styled";
import DeleteIcon from "@/assets/delete.svg?react";
import { deleteIndexedMemoAtom } from "../../../../atoms/indexedMemoAtom";
import { IndexedMemoType } from "../../../../../types/types";

const MemoItem = styled.div`
  width: 100%;

  boxing-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  background-color: white;
  border-radius: 4px;
`;

const MemoText = styled.span`
  white-space: pre-wrap;
  border: 1px solid black;
`;

const Button = styled.button`
  * {
    display: block;
  }
`;

export default function IndexedMemo({ memo }: { memo: IndexedMemoType }) {
  const memoDelete = useSetAtom(deleteIndexedMemoAtom);

  const handleMemoDeleteClick = () => {
    memoDelete(memo);
  };

  return (
    <MemoItem>
      <MemoText>{memo.text}</MemoText>

      <Button onClick={handleMemoDeleteClick}>
        <DeleteIcon />
      </Button>
    </MemoItem>
  );
}
