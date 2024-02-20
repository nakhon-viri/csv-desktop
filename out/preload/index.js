"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electron", {
  insertShopee: (...args) => electron.ipcRenderer.invoke("insertShopee", ...args),
  insertMc: (...args) => electron.ipcRenderer.invoke("insertMc", ...args),
  insertLazada: (...args) => electron.ipcRenderer.invoke("insertLazada", ...args),
  columnConfig: (...args) => electron.ipcRenderer.invoke("get_column_config", ...args),
  updateColumnConfig: (...args) => electron.ipcRenderer.invoke("updateColumnConfig", ...args)
});
