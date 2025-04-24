import styled from "@emotion/styled";
import { useRef } from "react";
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
  const [scrollCoord, setScrollCoord] = useAtom(scrollCoordAtom);
  const addIndexedMemo = useSetAtom(addIndexedMemoAtom);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (textRef.current) {
        const input = textRef.current.value.trim();

        if (input.startsWith("#")) {
          const newIndexedMemo = createIndexedMemoFromInput(input);
          addIndexedMemo(newIndexedMemo);
          textRef.current.value = "";
          //왜인지 여기서 자꾸 if문과 else문을 같이 탐.. 조기 리턴으로 해결.
          return;
        } else {
          const newMemo = createMemoFromInput(input, date);

          if (newMemo) {
            addMemo(newMemo);

            if (newMemo.date === scrollDate) setScrollCoord(null);
            else setScrollDate(newMemo.date);

            textRef.current.value = "";
          }
        }
      }
    }
  };

  return (
    <StyledTextarea
      ref={textRef}
      onKeyDown={handleKeyDown}
      rows={5}
      color={mainColor}
      placeholder="Type something and press Enter to submit"
    />
  );
}
