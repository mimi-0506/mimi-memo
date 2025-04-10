export {};

declare global {
  interface Window {
    electron: {
      ipcRenderer: IpcRendererTyped;
      openExternal: OpenExternalType;
    };
  }
}
