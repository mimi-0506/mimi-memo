import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAtomValue } from "jotai";
import { authAtom } from "../atoms/memoAtom";

export default function useLoadBounds() {
  const user = useAtomValue(authAtom);

  useEffect(() => {
    if (!user) return;

    const loadBounds = async () => {
      try {
        const docSnap = await getDoc(
          doc(db, "users", user.uid, "bounds", "latest")
        );

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.bounds) {
            const parsed = JSON.parse(data.bounds);

            window.electron?.ipcRenderer.send("apply-bounds", parsed);
          }
        }
      } catch (e) {
        console.error("❌ bounds 불러오기 실패:", e);
      }
    };

    loadBounds();
  }, [user]);
}
