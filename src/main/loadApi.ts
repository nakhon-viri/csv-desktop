import { ipcMain } from "electron";
import { db } from "./db";

export const loadApi = () => {
  ipcMain.handle("db", async (event, ...args) => {
    return db(args[0], args[1]);
  });
};
