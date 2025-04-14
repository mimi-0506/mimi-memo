import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { authAtom, memosAtom } from "../atoms/memoAtom";
import { debounce } from "lodash";
import { MemoType } from "../../types/types";
import { setDoc } from "firebase/firestore";
import { getLatestMemosDocRef } from "../lib/firestoreRefs";

/**
 * memos 상태가 변경될 때 Firebase에 저장하는 훅
 */
export default function useSaveMemos() {
  const user = useAtomValue(authAtom);
  const memos = useAtomValue(memosAtom);

  useEffect(() => {
    if (!user || memos.size === 0) return;

    const debouncedSaveMemos = debounce(
      async (memos: Map<string, MemoType[]>) => {
        try {
          const memosObj = Object.fromEntries(memos);

          await setDoc(getLatestMemosDocRef(user.uid), {
            memos: JSON.stringify(memosObj),
            updatedAt: new Date(),
          });
        } catch (error) {
          console.error("memos 저장 실패", error);
        }
      },
      500
    );

    debouncedSaveMemos(memos);

    return () => debouncedSaveMemos.cancel();
  }, [user, memos]);
}
