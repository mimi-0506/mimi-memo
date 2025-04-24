import { useSetAtom } from "jotai";

import styled from "@emotion/styled";
import DeleteIcon from "@/assets/delete.svg?react";
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
  background-color: white;
  border-radius: 4px;
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
  pointer-events: auto;
  cursor: pointer;
  display: "inline-block";
`;

const Button = styled.button`
  * {
    display: block;
  }
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

  const handleTextClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const text = e.currentTarget.textContent || "";
    navigator.clipboard.writeText(text);
  };

  return (
    <MemoItem>
      <MemoLeft>
        <input
          type="checkbox"
          checked={memo.checked}
          onChange={handleCheckClick}
        />
        <MemoText
          title={"클릭시 복사"}
          onClick={handleTextClick}
          checked={memo.checked}
          important={memo.important}
        >
          {memo.text}
        </MemoText>
      </MemoLeft>
      <Button onClick={handleMemoDeleteClick}>
        <DeleteIcon />
      </Button>
    </MemoItem>
  );
}
