import { contextBridge, ipcRenderer } from "electron";
import { IpcListenerType, IpcRendererTyped } from "../types/ipc";

const electronApi: { ipcRenderer: IpcRendererTyped } = {
  ipcRenderer: {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, callback) =>
      ipcRenderer.on(channel, (_event, data) => callback(data)),
    invoke: (channel, data) => ipcRenderer.invoke(channel, data),
    onBoundsChanged: (
      callback: (
        event: Electron.IpcRendererEvent,
        bounds: Electron.Rectangle
      ) => void
    ) => {
      const wrapped: IpcListenerType = (event, data) => {
        callback(event, data as Electron.Rectangle);
      };

      ipcRenderer.on("window-bounds-changed", wrapped);

      return {
        channel: "window-bounds-changed",
        listener: wrapped,
      };
    },
    removeListener: (channel, callback) => {
      ipcRenderer.removeListener(channel, callback);
    },
  },
};

contextBridge.exposeInMainWorld("electron", electronApi);
