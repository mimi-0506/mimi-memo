import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { authAtom, memosAtom } from "../atoms/memoAtom";
import { debounce } from "lodash";
import { IndexedMemoType, MemoType } from "../../types/types";
import { setDoc } from "firebase/firestore";
import { getLatestMemosDocRef } from "../lib/firestoreRefs";
import { indexedMemosAtom } from "../atoms/indexedMemoAtom";

/**
 * indexed indexedMemos 상태가 변경될 때 Firebase에 저장하는 훅
 */
export default function useSaveIndexes() {
  const user = useAtomValue(authAtom);
  const indexedMemos = useAtomValue(indexedMemosAtom);

  useEffect(() => {
    if (!user || indexedMemos.size === 0) return;

    const debouncedSaveMemos = debounce(
      async (indexedMemos: Map<string, IndexedMemoType[]>) => {
        try {
          const memosObj = Object.fromEntries(indexedMemos);

          await setDoc(getLatestMemosDocRef(user.uid), {
            indexedMemos: JSON.stringify(memosObj),
            updatedAt: new Date(),
          });
        } catch (error) {
          console.error("indexedMemos 저장 실패", error);
        }
      },
      500
    );

    debouncedSaveMemos(indexedMemos);

    return () => debouncedSaveMemos.cancel();
  }, [user, indexedMemos]);
}
