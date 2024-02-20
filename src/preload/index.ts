import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  insertShopee: (...args) => ipcRenderer.invoke("insertShopee", ...args),
  insertMc: (...args) => ipcRenderer.invoke("insertMc", ...args),
  insertLazada: (...args) => ipcRenderer.invoke("insertLazada", ...args),
  columnConfig: (...args) => ipcRenderer.invoke("get_column_config", ...args),
  updateColumnConfig: (...args) =>
    ipcRenderer.invoke("updateColumnConfig", ...args),
});
