import { app, BrowserWindow } from "electron";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.setPath("userData", path.join(app.getPath("appData"), "mimi-memo-cache"));

const createWindow = () => {
  const win = new BrowserWindow({
    width: 400,
    height: 600,
    transparent: true,
    frame: false,
    vibrancy: "appearance-based",
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: true,
      devTools: true,
      contextIsolation: false,
    },
    autoHideMenuBar: true,
  });

  if (import.meta.env?.DEV || process.env.NODE_ENV === "dev") {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, "../index.html"));
  }

  win.setIgnoreMouseEvents(false);
};

app.whenReady().then(createWindow);
