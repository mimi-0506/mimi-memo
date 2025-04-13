import { app } from "electron";
import { win } from "./window";

//브라우저 로그인을 위한 1개 인스턴스 유지

export function setupSingleInstance(pendingTokenRef: {
  current: string | null;
}) {
  const gotLock = app.requestSingleInstanceLock();
  if (!gotLock) {
    app.quit();
    return false;
  }

  app.on("second-instance", (_event, argv) => {
    const deepLink = argv.find((arg) => arg.startsWith("mimi://"));
    if (deepLink) {
      const parsed = new URL(deepLink);
      const token = parsed.searchParams.get("token");
      if (token) {
        pendingTokenRef.current = token;
        if (win) {
          win.webContents.send("auth-token", token);
          win.focus();
        }
      }
    }

    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });

  return true;
}
