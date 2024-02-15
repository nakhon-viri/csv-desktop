import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  ping: (...args) => ipcRenderer.invoke("ping", ...args),
  columnConfig: (...args) => ipcRenderer.invoke("get_column_config", ...args),
});
