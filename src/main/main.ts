import { app, BrowserWindow } from "electron";
import { join } from "path";
import { loadApi } from "./loadApi";

let mainWindow;



function createWindow() {
  mainWindow = new BrowserWindow({
    // minWidth: 1200,
    minWidth: 800,
    minHeight: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, "../preload"),
      sandbox: false,
    },
  });
  mainWindow.webContents.openDevTools();
  // Vite dev server URL

  loadApi()

  mainWindow.loadURL("http://localhost:5173");
  // mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  // mainWindow.loadURL("http://localhost:5173");
  mainWindow.on("closed", () => (mainWindow = null));
}

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow == null) {
    createWindow();
  }
});
