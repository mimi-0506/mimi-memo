import { app, BrowserWindow } from "electron";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.setPath("userData", path.join(app.getPath("appData"), "mimi-memo-cache"));

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "../preload/preload.js"),
    },
    autoHideMenuBar: true,
  });

  if (import.meta.env?.DEV || process.env.NODE_ENV === "dev") {
    win.loadURL("http://localhost:5173");
  } else {
    win.loadFile(path.join(__dirname, "../index.html"));
  }
};

app.whenReady().then(createWindow);
