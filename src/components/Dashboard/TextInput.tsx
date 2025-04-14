import styled from "@emotion/styled";
import { useRef } from "react";
import { MemoType } from "../../../types/types";
import { addMemoAtom, dateAtom, memosAtom } from "../../atoms/memoAtom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { v4 as uuidv4 } from "uuid";
import { parseDateText, utilDateToString } from "../../utils/dateUtils";
import { createMemoFromInput } from "../../utils/inputUtils";

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
  const addMemo = useSetAtom(addMemoAtom);
  const date = useAtomValue(dateAtom);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (textRef.current) {
        const newMemo = createMemoFromInput(textRef.current.value.trim(), date);
        if (newMemo) addMemo(newMemo);
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
