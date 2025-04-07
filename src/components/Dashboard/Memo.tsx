import { useSetAtom } from "jotai";
import { MemoType } from "../../types";
import { MemoDate, MemoItem, MemoLeft, MemoText } from "./styles.ts";
import { memosAtom } from "../../atoms/memoAtom.ts";

export default function Memo({ memo }: { memo: MemoType }) {
  const setMemos = useSetAtom(memosAtom);

  const toggleCheck = () => {
    setMemos((prev) => {
      const updated = prev.map((i) =>
        i.id === memo.id ? { ...memo, checked: !memo.checked } : i
      );

      const sorted = updated.sort((a, b) => {
        return Number(a.checked) - Number(b.checked);
      });

      return sorted;
    });
  };

  return (
    <MemoItem>
      <MemoLeft>
        <input type="checkbox" checked={memo.checked} onChange={toggleCheck} />
        <MemoText checked={memo.checked}>{memo.text}</MemoText>
      </MemoLeft>
      <MemoDate>{memo.date}</MemoDate>
    </MemoItem>
  );
}
