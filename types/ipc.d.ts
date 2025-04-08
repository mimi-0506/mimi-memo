import type { Rectangle } from "electron";
import { IpcRendererEvent } from "electron";

interface IpcChannelsType {
  "window-bounds-changed": Rectangle;
  "apply-bounds": Rectangle;
  "save-memos": Record<string, unknown>;
}

export type IpcListenerType = (
  event: IpcRendererEvent,
  data: Rectangle | Record<string, unknown>
) => void;

export type IpcRendererTyped = {
  send<K extends Extract<keyof IpcChannelsType, string>>(
    channel: K,
    data: IpcChannelsType[K]
  ): void;
  on<K extends Extract<keyof IpcChannelsType, string>>(
    channel: K,
    callback: (data: IpcChannelsType[K]) => void
  ): void;
  invoke<K extends Extract<keyof IpcChannelsType, string>>(
    channel: K,
    data?: IpcChannelsType[K]
  ): Promise<unknown>;
  onBoundsChanged(
    callback: (event: IpcRendererEvent, bounds: Rectangle) => void
  ): {
    channel: keyof IpcChannelsType;
    listener: IpcListenerType;
  };
  removeListener<K extends keyof IpcChannelsType>(
    channel: K,
    callback: (event: IpcRendererEvent, data: IpcChannelsType[K]) => void
  ): void;
};
