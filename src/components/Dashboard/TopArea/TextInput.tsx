import styled from "@emotion/styled";
import { useRef } from "react";
import {
  addMemoAtom,
  dateAtom,
  scrollCoordAtom,
  scrollDateAtom,
} from "../../../atoms/memoAtom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { createMemoFromInput } from "../../../utils/inputUtils";

export const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  resize: vertical;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
  height: 80px;
`;

export default function TextInput() {
  const addMemo = useSetAtom(addMemoAtom);
  const date = useAtomValue(dateAtom);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [scrollDate, setScrollDate] = useAtom(scrollDateAtom);
  const [scrollCoord, setScrollCoord] = useAtom(scrollCoordAtom);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (textRef.current) {
        const newMemo = createMemoFromInput(textRef.current.value.trim(), date);
        if (newMemo) {
          addMemo(newMemo);

          //해당 위치로 스크롤 이동 (같은 날짜는 coord위치 갱신을 위해 null을 주기 )
          if (newMemo.date === scrollDate) setScrollCoord(null);
          else setScrollDate(newMemo.date);
        }
        textRef.current.value = "";
      }
    }
  };

  return (
    <StyledTextarea
      ref={textRef}
      onKeyDown={handleKeyDown}
      rows={5}
      placeholder="Type something and press Enter to submit"
    />
  );
}
