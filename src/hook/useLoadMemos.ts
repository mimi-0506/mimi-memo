import { useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useSetAtom, useAtomValue } from "jotai";
import { MemoType } from "../../types/types";
import { memosAtom, authAtom } from "../atoms/memoAtom";
import { getLatestMemosDocRef } from "../lib/firestoreRefs";

/**
 * 유저 인증 상태에 따라 Firestore에서 memos 데이터를 불러와 jotai atom에 저장하는 훅
 * user별로 초기 1회만 진행
 */
export default function useLoadMemos() {
  const setMemos = useSetAtom(memosAtom);
  const user = useAtomValue(authAtom);

  useEffect(() => {
    if (!user) return;

    // Firestore에서 memos 문서 불러오기
    const loadMemos = async () => {
      try {
        const snapshot = await getDoc(getLatestMemosDocRef(user.uid));

        if (!snapshot.exists()) {
          console.info("memos 문서가 존재하지 않음");
          return;
        }

        const data = snapshot.data();
        const raw = data.memos;

        if (!raw) {
          console.warn("'memos' 필드가 존재하지 않음");
          return;
        }

        const parsed: Record<string, MemoType[]> = JSON.parse(raw);
        const mapped = new Map(Object.entries(parsed));
        setMemos(mapped);
      } catch (error) {
        console.error("memos 불러오기 실패", error);
      }
    };

    loadMemos();
  }, [user, setMemos]);
}
