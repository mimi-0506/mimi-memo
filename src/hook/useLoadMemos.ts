import { useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useSetAtom, useAtomValue } from "jotai";
import { MemoType } from "../../types/types";
import { memosAtom, authAtom } from "../atoms/memoAtom";

export default function useLoadMemos() {
  const setMemos = useSetAtom(memosAtom);
  const user = useAtomValue(authAtom);

  useEffect(() => {
    if (!user) return;

    const loadMemos = async () => {
      try {
        const docSnap = await getDoc(
          doc(db, "users", user.uid, "memos", "latest")
        );

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.memos) {
            const parsedObj: Record<string, MemoType[]> = JSON.parse(
              data.memos
            );
            const map = new Map<string, MemoType[]>(Object.entries(parsedObj));
            setMemos(map);
          } else console.warn("⚠️ 'memos' 필드가 존재하지 않음.");
        } else console.info("ℹ️ memos 문서가 존재하지 않음.");
      } catch (e) {
        console.error("❌ Firestore에서 memos 불러오기 실패:", e);
      }
    };

    loadMemos();
  }, [setMemos, user]);
}
