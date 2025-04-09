import { useEffect } from "react";
import { getDoc } from "firebase/firestore";
import { useAtomValue } from "jotai";
import { authAtom } from "../atoms/memoAtom";
import { getLatestBoundsDocRef } from "../lib/firestoreRefs";

/**
 * Firestore에서 위치 및 창 크기 정보를 불러와 적용하는 훅
 */
export default function useLoadBounds() {
  const user = useAtomValue(authAtom);

  useEffect(() => {
    if (!user) return;

    const loadBounds = async () => {
      try {
        const docSnap = await getDoc(getLatestBoundsDocRef(user.uid));

        if (!docSnap.exists()) {
          console.info("ℹ️ bounds 문서가 존재하지 않음.");
          return;
        }

        const data = docSnap.data();
        if (!data.bounds) {
          console.warn("⚠️ 'bounds' 필드가 존재하지 않음.");
          return;
        }

        const parsedBounds = JSON.parse(data.bounds);
        window.electron?.ipcRenderer.send("apply-bounds", parsedBounds);
      } catch (error) {
        console.error("bounds 불러오기 실패:", error);
      }
    };

    loadBounds();
  }, [user]);
}
