import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { authAtom, memosAtom } from "../atoms/memoAtom";
import { debounce } from "lodash";
import { MemoType } from "../../types/types";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function useSaveMemos() {
  const user = useAtomValue(authAtom);
  const memos = useAtomValue(memosAtom);

  useEffect(() => {
    if (!user || memos.size === 0) return;
    const saveMemos = debounce(async (memos: Map<string, MemoType[]>) => {
      try {
        const memosObj = Object.fromEntries(memos);
        await setDoc(doc(db, "users", user.uid, "memos", "latest"), {
          memos: JSON.stringify(memosObj),
          updatedAt: new Date(),
        });
      } catch (e) {
        console.error("❌ 저장 실패:", e);
      }
    }, 500);

    saveMemos(memos);

    return () => saveMemos.cancel();
  }, [user, memos]);
}
