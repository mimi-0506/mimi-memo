import { useSetAtom } from "jotai";
import { RefObject, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { keyframes, css } from "@emotion/react";
import DeleteIcon from "@/assets/delete.svg?react";
import { MemoType } from "../../../../../types/types";
import { deleteMemoAtom, toggleCheckedAtom } from "../../../../atoms/memoAtom";

// 애니메이션 정의
const slideOutRight = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
`;

const slideInLeft = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const MemoItem = styled.div<{
  animation: boolean;
  direction: boolean;
}>`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 8px;
  background-color: white;
  border-radius: 4px;
  animation: ${({ animation, direction }) =>
    animation &&
    (direction
      ? css`
          ${slideOutRight} 0.5s ease-in-out
        `
      : css`
          ${slideInLeft} 0.5s ease-out
        `)};
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
`;

const Button = styled.button`
  * {
    display: block;
  }
`;

export default function Memo({
  memo,
  justChangeRef,
}: {
  memo: MemoType;
  justChangeRef: RefObject<null | string>;
}) {
  const toggleChecked = useSetAtom(toggleCheckedAtom);
  const memoDelete = useSetAtom(deleteMemoAtom);
  const [animation, setAnimation] = useState(
    justChangeRef.current === memo.id ? true : false
  );
  const [direction, setDirection] = useState(true);

  // 초기 렌더링 시 slideInLeft 애니메이션 적용
  useEffect(() => {
    if (justChangeRef.current === memo.id) {
      setAnimation(true);
      setDirection(false);
      const timer = setTimeout(() => {
        setAnimation(false);
        setDirection(true);
      }, 500); // 애니메이션 후 상태 리셋
      return () => clearTimeout(timer); // 클린업 함수
    }
  }, [memo]);

  const handleCheckClick = () => {
    setAnimation(true);

    setTimeout(() => {
      toggleChecked(memo);
      setAnimation(false);
      justChangeRef.current = memo.id;
    }, 400);
  };

  const handleMemoDeleteClick = () => {
    memoDelete(memo); // 삭제 버튼 클릭 시 삭제 처리
  };

  const handleTextClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const text = e.currentTarget.textContent || "";
    navigator.clipboard.writeText(text);
  };

  return (
    <MemoItem animation={animation} direction={direction}>
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
