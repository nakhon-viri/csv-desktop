"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electron", {
  db: (...args) => electron.ipcRenderer.invoke("db", ...args)
});
