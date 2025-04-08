import { contextBridge, ipcRenderer } from "electron";
import { IpcChannels } from "../src/types/ipc";

type IpcRendererTyped = {
  send<K extends keyof IpcChannels>(channel: K, data: IpcChannels[K]): void;
  on<K extends keyof IpcChannels>(
    channel: K,
    callback: (data: IpcChannels[K]) => void
  ): void;
  invoke<K extends keyof IpcChannels>(
    channel: K,
    data?: IpcChannels[K]
  ): Promise<any>;
};

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
