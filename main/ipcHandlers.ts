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

  ipcMain.on("resize-window", (_event, { direction, dx, baseWidth }) => {
    const win = BrowserWindow.getFocusedWindow();
    if (!win || direction !== "right") return;

    const bounds = win.getBounds();
    const display = screen.getDisplayMatching(bounds);
    const screenWidth = display.workArea.width;

    const newWidth = Math.min(
      Math.max(baseWidth + dx, screenWidth * 0.3),
      screenWidth
    );

    win.setBounds({ ...bounds, width: newWidth });
  });
}
