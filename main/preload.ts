import { contextBridge, ipcRenderer } from "electron";
import { IpcListenerType, IpcRendererTyped } from "../types/ipc";

const electronApi: { ipcRenderer: IpcRendererTyped } = {
  ipcRenderer: {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, callback) =>
      ipcRenderer.on(channel, (_event, data) => callback(data)),
    invoke: (channel, data) => ipcRenderer.invoke(channel, data),
  },
};

console.log("✅ preload loaded");

contextBridge.exposeInMainWorld("electron", electronApi);
