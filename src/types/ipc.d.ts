export type IpcChannels = {
  "app-close": void;
  "save-memo": { text: string; id: string };
  "load-memo": { id: string };
};
