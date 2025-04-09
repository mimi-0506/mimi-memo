import { useEffect } from "react";
import { IpcRendererEvent, Rectangle } from "electron";
import { useAtomValue } from "jotai";
import { setDoc } from "firebase/firestore";
import { authAtom } from "../atoms/memoAtom";
import { IpcRendererTyped } from "../../types/ipc";
import { getLatestBoundsDocRef } from "../lib/firestoreRefs";

/**
 * Electron 윈도우 위치(bounds)가 변경될 때 Firestore에 저장하는 훅
 */
export default function useBoundsSave() {
  const user = useAtomValue(authAtom);

  useEffect(() => {
    if (!user) return;

    const ipc = window.electron?.ipcRenderer as IpcRendererTyped;
    if (!ipc?.onBoundsChanged) return;

    const handleBoundsChange = async (
      _event: IpcRendererEvent,
      bounds: Rectangle
    ) => {
      try {
        await setDoc(getLatestBoundsDocRef(user.uid), {
          bounds: JSON.stringify(bounds),
          updatedAt: new Date(),
        });
      } catch (error) {
        console.error("bounds 저장 실패:", error);
      }
    };

    const { channel, listener } = ipc.onBoundsChanged(handleBoundsChange);

    return () => {
      ipc.removeListener(channel, listener);
    };
  }, [user]);
}
