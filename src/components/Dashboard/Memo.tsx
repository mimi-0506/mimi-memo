import { useAtom } from "jotai";
import { MemoType } from "../../types";
import { MemoItem, MemoLeft, MemoText } from "./styles";
import { memosAtom } from "../../atoms/memoAtom";

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
        <MemoText checked={memo.checked}>{memo.text}</MemoText>
      </MemoLeft>
    </MemoItem>
  );
}
