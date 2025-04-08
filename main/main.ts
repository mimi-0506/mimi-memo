import { app, BrowserWindow, ipcMain, Rectangle } from "electron";
import { debounce } from "lodash";
import * as path from "path";

app.setPath("userData", path.join(app.getPath("appData"), "mimi-memo-cache"));

let win: BrowserWindow | null = null;

const createWindow = () => {
  win = new BrowserWindow({
    width: 400,
    height: 600,
    transparent: true,
    frame: false,
    vibrancy: "appearance-based",
    skipTaskbar: true,
    webPreferences: {
      // devTools: true,
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
    autoHideMenuBar: true,
  });

  if (process.env.NODE_ENV === "dev") {
    win.loadURL("http://localhost:5173");
    // win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, "../index.html"));
  }

  const sendBoundsUpdate = debounce(() => {
    if (win) {
      const bounds = win.getBounds();
      win.webContents.send("window-bounds-changed", bounds);
    }
  }, 1000);

  win.on("resize", sendBoundsUpdate);
  win.on("move", sendBoundsUpdate);
  win.setIgnoreMouseEvents(false);
};

ipcMain.on("apply-bounds", (_event, bounds: Rectangle) => {
  if (win && bounds) {
    console.log("📦 apply-bounds 수신:", bounds);
    win.setBounds(bounds);
  }
});

ipcMain.on("app-close", () => {
  app.quit();
});

app.whenReady().then(() => {
  console.log("✅ App is ready!");
  createWindow();
});
