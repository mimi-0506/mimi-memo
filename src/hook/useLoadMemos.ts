import { useEffect } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";
import { useSetAtom } from "jotai";
import { MemoType } from "../types/types";
import { memosAtom } from "../atoms/memoAtom";

export default function useLoadMemos() {
  const setMemos = useSetAtom(memosAtom);

  useEffect(() => {
    const fetchMemos = async () => {
      try {
        const q = query(
          collection(db, "memos"),
          orderBy("createdAt", "desc"),
          limit(1)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const latest = querySnapshot.docs[0].data();

          if (latest.memos) {
            const parsedObj = JSON.parse(latest.memos) as Record<
              string,
              MemoType[]
            >;
            const map = new Map<string, MemoType[]>(Object.entries(parsedObj));
            setMemos(map);
          } else {
            console.warn("⚠️ 'memos' 필드가 존재하지 않음.");
          }
        } else {
          console.info("ℹ️ memos 컬렉션이 비어 있음.");
        }
      } catch (e) {
        console.error("❌ Firestore 불러오기 실패:", e);
      }
    };

    fetchMemos();
  }, [setMemos]);
}
