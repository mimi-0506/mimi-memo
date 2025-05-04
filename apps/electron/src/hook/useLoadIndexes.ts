import { useEffect } from "react";
import { getDoc } from "firebase/firestore";
import { useSetAtom, useAtomValue } from "jotai";
import { authAtom } from "../atoms/memoAtom";
import { getLatestDocRef } from "../lib/firestoreRefs";
import { IndexedMemoType } from "../../types/types";
import { loadIndexedMemosAtom } from "../atoms/indexedMemoAtom";

/**
 * 유저 인증 상태에 따라 Firestore에서 indexedMemos 데이터를 불러와 jotai atom에 저장하는 훅
 * user별로 초기 1회만 진행
 */
export default function useLoadMemos() {
  const setLoadIndexedMemos = useSetAtom(loadIndexedMemosAtom);
  const user = useAtomValue(authAtom);

  useEffect(() => {
    if (!user) return;

    const loadIndexedMemos = async () => {
      try {
        const snapshot = await getDoc(
          getLatestDocRef(user.uid, "indexedMemos")
        );

        if (!snapshot.exists()) {
          console.info("indexedMemos 문서가 존재하지 않음");
          return;
        }

        const data = snapshot.data();
        const raw = data.indexedMemos;

        if (!raw) {
          console.warn("'indexedMemos' 필드가 존재하지 않음");
          return;
        }

        const parsed: Record<string, IndexedMemoType[]> = JSON.parse(raw);
        const mapped = new Map(Object.entries(parsed));
        setLoadIndexedMemos(mapped);
      } catch (error) {
        console.error("indexedMemos 불러오기 실패", error);
      }
    };

    loadIndexedMemos();
  }, [user, setLoadIndexedMemos]);
}
