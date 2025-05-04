import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { authAtom } from "../atoms/memoAtom";
import { debounce } from "lodash";
import { setDoc } from "firebase/firestore";
import { colorAtom } from "../atoms/uiAtom";
import { getLatestDocRef } from "../lib/firestoreRefs";

/**
 * ui 상태가 변경될 때 Firebase에 저장하는 훅
 * bound와 분리. 나중에 합칠 수도..
 */
export default function useSaveMemos() {
  const user = useAtomValue(authAtom);
  const ui = useAtomValue(colorAtom);

  useEffect(() => {
    if (!user) return;

    const debouncedSaveMemos = debounce(async (ui) => {
      try {
        await setDoc(getLatestDocRef(user.uid, "ui"), {
          ui: JSON.stringify(ui),
          updatedAt: new Date(),
        });
      } catch (error) {
        console.error("ui 저장 실패", error);
      }
    }, 500);

    debouncedSaveMemos(ui);

    return () => debouncedSaveMemos.cancel();
  }, [user, ui]);
}
