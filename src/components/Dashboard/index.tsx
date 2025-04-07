import { useState } from "react";
import { MemoType } from "../../types";
import { MemoList, StyledTextarea, Wrapper, MemoGroup } from "./styles"; // Divider 추가
import DaySelector from "./DaySelector";
import Memo from "./Memo";
import { dateAtom, memosAtom } from "../../atoms/memoAtom";
import { useAtom, useAtomValue } from "jotai";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import { fillMissingDates } from "../../utils/dateUtils";

export default function Dashboard() {
  const [input, setInput] = useState("");
  const [memos, setMemos] = useAtom(memosAtom); // Map<string, MemoType[]>
  const date = useAtomValue(dateAtom);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() !== "") {
        const newMemo: MemoType = {
          text: input,
          date,
          checked: false,
          important: false,
          id: uuidv4(),
        };
        setMemos(newMemo);
        setInput("");
      }
    }
  };

  return (
    <Wrapper>
      <DaySelector />

      <StyledTextarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={5}
        placeholder="Type something and press Enter to submit"
      />

      <MemoList>
        {fillMissingDates(memos).map(([date, memos]) => (
          <MemoGroup key={date}>
            {date}
            {memos.map((memo) => (
              <Memo key={memo.id} memo={memo} />
            ))}
          </MemoGroup>
        ))}
      </MemoList>
    </Wrapper>
  );
}
