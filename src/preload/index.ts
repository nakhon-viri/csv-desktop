import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  db: (...args) => ipcRenderer.invoke("db", ...args),
});
