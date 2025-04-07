import { useEffect, useState } from "react";
import { MemoType } from "../../types";
import { MemoList, StyledTextarea, Wrapper } from "./styles";
import DaySelector from "./DaySelector";
import Memo from "./Memo";
import { dateAtom, memosAtom } from "../../atoms/memoAtom";
import { useAtom, useAtomValue } from "jotai";
import { v4 as uuidv4 } from "uuid";

export default function Dashboard() {
  const [input, setInput] = useState("");
  const [memos, setMemos] = useAtom(memosAtom);
  const [date] = useAtomValue(dateAtom);

  useEffect(() => {
    console.log(date);
  }, [date]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() !== "") {
        console.log(date);
        const newMemo: MemoType = {
          text: input,
          date: date,
          checked: false,
          id: uuidv4(),
        };
        setMemos((prev) => [...prev, newMemo]);
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
        {memos.map((memo, index) => (
          <Memo key={index} memo={memo} />
        ))}
      </MemoList>
    </Wrapper>
  );
}
