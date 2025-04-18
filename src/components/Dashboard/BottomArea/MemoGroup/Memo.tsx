import { useSetAtom } from "jotai";

import styled from "@emotion/styled";
import CloseIcon from "@/assets/close.svg?react";
import { MemoType } from "../../../../../types/types";
import { deleteMemoAtom, toggleCheckedAtom } from "../../../../atoms/memoAtom";

const MemoItem = styled.div`
  width: 100%;
  boxing-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 8px;
  background-color: #f7f7f7;
  border-radius: 4px;
  border: 1px solid #eee;
`;

const MemoLeft = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  flex: 1;
`;

const MemoText = styled.span<{ checked: boolean; important: boolean }>`
  color: ${({ checked, important }) =>
    checked ? "#999" : important ? "red" : "#000"};
  text-decoration: ${({ checked }) => (checked ? "line-through" : "none")};
  font-weight: ${({ important }) => (important ? "bold" : "normal")};
  white-space: pre-wrap;
`;

export default function Memo({ memo }: { memo: MemoType }) {
  const toggleChecked = useSetAtom(toggleCheckedAtom);
  const memoDelete = useSetAtom(deleteMemoAtom);

  const handleCheckClick = () => {
    toggleChecked(memo);
  };

  const handleMemoDeleteClick = () => {
    memoDelete(memo);
  };

  return (
    <MemoItem>
      <MemoLeft>
        <input
          type="checkbox"
          checked={memo.checked}
          onChange={handleCheckClick}
        />
        <MemoText checked={memo.checked} important={memo.important}>
          {memo.text}
        </MemoText>
      </MemoLeft>
      <button onClick={handleMemoDeleteClick}>
        <CloseIcon />
      </button>
    </MemoItem>
  );
}
