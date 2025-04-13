import { ipcMain, shell, Rectangle, BrowserWindow } from "electron";

export function setupIpc(win: BrowserWindow) {
  ipcMain.on("apply-bounds", (_event, bounds: Rectangle) => {
    console.log("받아온 창 크기: ", bounds);
    win.setBounds(bounds);
  });

  ipcMain.on("app-close", () => {
    win.close();
  });

  ipcMain.handle("open-external", async (_event, url: string) => {
    console.log("로그인 위한 브라우저 오픈", url);
    return await shell.openExternal(url);
  });
}
