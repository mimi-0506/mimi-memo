import { useEffect } from "react";
import { getDoc } from "firebase/firestore";
import { useAtomValue, useSetAtom } from "jotai";
import { authAtom } from "../atoms/memoAtom";
import { getLatestIndexesDocRef } from "../lib/firestoreRefs";
import { loadIndexedMemosAtom } from "../atoms/indexedMemoAtom";
import { IndexedMemoType } from "../../types/types";

/**
 * Firestore에서 인덱스 메모를 가져오는 훅
 */
export default function useLoadIndexes() {
  const user = useAtomValue(authAtom);
  const setLoadIndexedMemos = useSetAtom(loadIndexedMemosAtom);

  useEffect(() => {
    if (!user) return;

    const loadIndexes = async () => {
      try {
        const docSnap = await getDoc(getLatestIndexesDocRef(user.uid));

        if (!docSnap.exists()) {
          console.info("ℹ️ indexes 문서가 존재하지 않음.");
          return;
        }

        const data = docSnap.data();
        if (!data.bounds) {
          console.warn("⚠️ 'indexes' 필드가 존재하지 않음.");
          return;
        }

        const parsedIndexes = JSON.parse(data.bounds);
        const parsedMap: Map<string, IndexedMemoType[]> = new Map(
          Object.entries(parsedIndexes)
        );
        setLoadIndexedMemos(parsedMap);
      } catch (error) {
        console.error("indexes 불러오기 실패:", error);
      }
    };

    loadIndexes();
  }, [user]);
}
