import {
  contextBridge,
  ipcRenderer,
  IpcRendererEvent,
  Rectangle,
} from "electron";
import {
  IpcListenerType,
  IpcRendererTyped,
  OpenExternalType,
} from "../types/ipc";

const { shell } = require("electron");

const electronApi: {
  ipcRenderer: IpcRendererTyped;
  openExternal: OpenExternalType;
} = {
  ipcRenderer: {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, callback) =>
      ipcRenderer.on(channel, (_event, data) => callback(data)),
    invoke: (channel, data) => ipcRenderer.invoke(channel, data),
    onBoundsChanged: (
      callback: (event: IpcRendererEvent, bounds: Rectangle) => void
    ) => {
      const wrapped: IpcListenerType = (event, data) => {
        callback(event, data as Rectangle);
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
  openExternal: async (url: string) => {
    await ipcRenderer.invoke("open-external", url);
  },
};

contextBridge.exposeInMainWorld("electron", electronApi);
