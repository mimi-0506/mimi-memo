import styled from "@emotion/styled";
import { useRef } from "react";
import { MemoType } from "../../types/types";
import { dateAtom, memosAtom } from "../../atoms/memoAtom";
import { useAtomValue, useSetAtom } from "jotai";
import { v4 as uuidv4 } from "uuid";

export const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  resize: vertical;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
`;

export default function TextInput() {
  const setMemos = useSetAtom(memosAtom);
  const date = useAtomValue(dateAtom);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (textRef.current) {
        let input = textRef.current.value.trim();

        if (input !== "") {
          const isImportant = input.startsWith("!");
          if (isImportant) input = input.slice(1).trim();

          const newMemo: MemoType = {
            text: input,
            date,
            checked: false,
            important: isImportant,
            id: uuidv4(),
          };

          setMemos(newMemo);
          textRef.current.value = "";
        }
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
