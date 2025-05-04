import { ipcMain, shell, Rectangle, BrowserWindow } from "electron";
import { screen } from "electron";

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

  ipcMain.on("resize-window", (_event, { direction, next }) => {
    const win = BrowserWindow.getFocusedWindow();
    if (!win) return;

    const bounds = win.getBounds();
    const display = screen.getDisplayMatching(bounds);

    const minSize = 300;

    switch (direction) {
      case "right": {
        const max = display.workArea.width;
        const newWidth = Math.min(Math.max(next, minSize), max);
        win.setBounds({ ...bounds, width: newWidth });
        break;
      }
      case "bottom": {
        const max = display.workArea.height;
        const newHeight = Math.min(Math.max(next, minSize), max);
        win.setBounds({ ...bounds, height: newHeight });
        break;
      }
    }
  });
}
