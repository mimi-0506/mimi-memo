import { app } from "electron";
import { createMainWindow, win } from "./window";
import { setupIpc } from "./ipcHandlers";
import { setupSingleInstance } from "./singleInstance";

let pendingToken: string | null = null;

//앱 여러 개 실행 방지
if (!setupSingleInstance({ current: pendingToken })) {
  app.quit();
} else {
  // 브라우저에서 mimi:// 링크를 열면 이 앱이 실행됨 = 수정시 브라우저도 같이 수정필요
  app.setAsDefaultProtocolClient("mimi");

  // 브라우저에서 mimi://?token=xxx 형태로 보낸 토큰 받아옴
  app.on("open-url", (event, url) => {
    event.preventDefault();
    const parsed = new URL(url);
    const token = parsed.searchParams.get("token");
    if (token && win) {
      win.webContents.send("auth-token", token);
    }
  });

  app.whenReady().then(() => {
    const browserWindow = createMainWindow(pendingToken);
    setupIpc(browserWindow);
  });
}
