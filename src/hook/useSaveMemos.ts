import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { memosAtom } from "../atoms/memoAtom";
import { debounce } from "lodash";
import { addDoc, collection } from "firebase/firestore";
import { MemoType } from "../../types/types";
import { db } from "../firebase";

export default function useSaveMemos() {
  const memos = useAtomValue(memosAtom);

  useEffect(() => {
    const saveMemos = debounce(async (memos: Map<string, MemoType[]>) => {
      try {
        await addDoc(collection(db, "memos"), {
          memos: JSON.stringify(Object.fromEntries(memos)),
          createdAt: new Date(),
        });
      } catch (e) {
        console.error("❌ 저장 실패:", e);
      }
    }, 500);

    saveMemos(memos);

    return () => saveMemos.cancel();
  }, [memos]);
}
