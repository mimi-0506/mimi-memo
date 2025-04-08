import { useEffect } from "react";
import { IpcRendererEvent, Rectangle } from "electron";
import { IpcRendererTyped } from "../../types/ipc";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAtomValue } from "jotai";
import { authAtom } from "../atoms/memoAtom";

export default function useBoundsSave() {
  const user = useAtomValue(authAtom);

  useEffect(() => {
    if (!user) return;

    const ipc = window.electron?.ipcRenderer as IpcRendererTyped;
    if (!ipc?.onBoundsChanged) return;

    const saveBounds = async (bounds: Rectangle) => {
      try {
        await setDoc(doc(db, "users", user.uid, "bounds", "latest"), {
          bounds: JSON.stringify(bounds),
          updatedAt: new Date(),
        });
      } catch (e) {
        console.error("❌ 저장 실패:", e);
      }
    };

    const handler = (_event: IpcRendererEvent, bounds: Rectangle) => {
      saveBounds(bounds);
    };

    const { channel, listener } = ipc.onBoundsChanged(handler);

    return () => {
      ipc.removeListener(channel, listener);
    };
  }, [user]);
}
