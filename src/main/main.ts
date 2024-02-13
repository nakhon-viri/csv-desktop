import { app, BrowserWindow } from "electron";
// import { db } from "./db/index";
// import { test } from "./db/schema/schema";
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    autoHideMenuBar: true,
  });
  // mainWindow.webContents.openDevTools();
  // Vite dev server URL

  mainWindow.loadURL("http://localhost:5173");
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

// const load = async () => {
//   const result = await db.insert(test).values({
//     id: 7,
//   });
//   console.log("result", result);
// };
// load();
