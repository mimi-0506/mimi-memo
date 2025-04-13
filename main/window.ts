//창 생성 로직

import { BrowserWindow } from "electron";
import * as path from "path";
import { debounce } from "lodash";

export let win: BrowserWindow | null = null;

export function createMainWindow(pendingToken: string | null) {
  win = new BrowserWindow({
    width: 400,
    height: 600,
    transparent: true,
    frame: false,
    vibrancy: "appearance-based",
    webPreferences: {
      devTools: true,
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
    autoHideMenuBar: true,
  });

  //창 크기 및 위치 저장 위한 연동------------------------------
  const sendBoundsUpdate = debounce(() => {
    if (win) {
      const bounds = win.getBounds();
      win.webContents.send("window-bounds-changed", bounds);
    }
  }, 1000);
  win.on("resize", sendBoundsUpdate);
  win.on("move", sendBoundsUpdate);
  win.setIgnoreMouseEvents(false);
  win.setAlwaysOnTop(true);

  //브라우저 로그인 이후 데스크탑 앱으로 토큰 받아올 때 사용----------
  win.once("ready-to-show", () => {
    if (pendingToken) {
      win?.webContents.send("auth-token", pendingToken);
    }
  });

  //배포 상태---------------------------------------------------
  if (process.env.NODE_ENV === "dev") {
    win.loadURL("http://localhost:5173");
    //    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, "../index.html"));
  }

  return win;
}
