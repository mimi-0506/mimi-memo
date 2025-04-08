import type { IpcRendererTyped } from "./ipc";

declare global {
  interface Window {
    electron: {
      ipcRenderer: IpcRendererTyped;
    };
  }
}
