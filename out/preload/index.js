"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electron", {
  ping: (...args) => electron.ipcRenderer.invoke("ping", ...args),
  columnConfig: (...args) => electron.ipcRenderer.invoke("get_column_config", ...args)
});
