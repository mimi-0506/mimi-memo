import styled from "@emotion/styled";
import { useRef, useState } from "react";
import {
  addMemoAtom,
  dateAtom,
  scrollCoordAtom,
  scrollDateAtom,
} from "../../../atoms/memoAtom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  createIndexedMemoFromInput,
  createMemoFromInput,
} from "../../../utils/inputUtils";
import { addIndexedMemoAtom } from "../../../atoms/indexedMemoAtom";
import { colorAtom } from "../../../atoms/uiAtom";

export const StyledTextarea = styled.textarea<{ color: string }>`
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  resize: vertical;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
  height: 80px;

  outline-color: ${({ color }) => color};
  resize: none;
  margin-top: 5px;
`;

export default function TextInput() {
  const { mainColor } = useAtomValue(colorAtom);
  const addMemo = useSetAtom(addMemoAtom);
  const date = useAtomValue(dateAtom);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [scrollDate, setScrollDate] = useAtom(scrollDateAtom);
  const setScrollCoord = useSetAtom(scrollCoordAtom);
  const addIndexedMemo = useSetAtom(addIndexedMemoAtom);
  const [isComposing, setIsComposing] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isComposing) return; // 한글 조합 중이면 무시

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (textRef.current) {
        const input = textRef.current.value.trim();

        if (input.startsWith("#")) {
          const newIndexedMemo = createIndexedMemoFromInput(input);
          addIndexedMemo(newIndexedMemo);
        } else {
          const newMemo = createMemoFromInput(input, date);
          console.log(newMemo);

          if (newMemo) {
            addMemo(newMemo);

            if (newMemo.date === scrollDate) setScrollCoord(null);
            else setScrollDate(newMemo.date);
          }
        }
        textRef.current.value = "";
      }
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  return (
    <StyledTextarea
      ref={textRef}
      onKeyDown={handleKeyDown}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      rows={5}
      color={mainColor}
      placeholder="Type something and press Enter to submit"
    />
  );
}
