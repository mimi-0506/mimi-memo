import { useAtom } from "jotai";
import { MemoType } from "../../../types/types";
import { memosAtom } from "../../atoms/memoAtom";
import styled from "@emotion/styled";

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
  const [, setMemos] = useAtom(memosAtom); // 값은 쓰기만 하므로 생략 가능

  const toggleCheck = () => {
    const updated = {
      ...memo,
      checked: !memo.checked,
    };
    setMemos(updated);
  };

  return (
    <MemoItem>
      <MemoLeft>
        <input type="checkbox" checked={memo.checked} onChange={toggleCheck} />
        <MemoText checked={memo.checked} important={memo.important}>
          {memo.text}
        </MemoText>
      </MemoLeft>
    </MemoItem>
  );
}
