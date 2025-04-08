import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
app.setPath("userData", path.join(app.getPath("appData"), "mimi-memo-cache"));

ipcMain.on("app-close", () => {
  app.quit();
});

const createWindow = () => {
  const win = new BrowserWindow({
    width: 400,
    height: 600,
    transparent: true,
    frame: false,
    vibrancy: "appearance-based",
    skipTaskbar: true,
    webPreferences: {
      // devTools: true,
      preload: path.join(__dirname, "preload.js"), // ✅ dist/main/preload.js 기준
      contextIsolation: true,
      nodeIntegration: false,
    },
    autoHideMenuBar: true,
  });

  if (process.env.NODE_ENV === "dev") {
    win.loadURL("http://localhost:5173");
    // win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, "../index.html")); // 📦 index.html 위치 확인!
  }

  win.setIgnoreMouseEvents(false);
};

app.whenReady().then(() => {
  console.log("✅ App is ready!");
  createWindow();
});
