import { ipcMain } from "electron";
import { db } from "./db";
import { sql } from "drizzle-orm";
import { insertShopee } from "./controllers/shopee/insert_shopee";
import { insertMc } from "./controllers/mc/insert_mc";
import { checkNull } from "./utils/checkNull";
import { insertLazada } from "./controllers/lazada/insert_lazada";
import { getColumnConfig } from "./controllers/config/column_query";

// const getColumnConfig = async (args) => {
//     try {
//         const result = await db.execute(
//             sql.raw(
//                 `select * from column_configs where platform = '${args[0].platform}'`
//             )
//         );
//         return result;
//     } catch (error) {
//         return error;
//     }
// };

const updateConfig = async (args) => {
  try {
    const updateValues = args[0]
      .map(
        (item) => `(
                ${checkNull(item.platform)},
                ${checkNull(item.column_db)},
                ${checkNull(item.column_value)}
            )`
      )
      .join(", ");
    const rawSql = `
                INSERT INTO column_configs (platform, column_db, column_value)
                VALUES ${updateValues}
                ON DUPLICATE KEY UPDATE 
                column_value=VALUES(column_value);
            `;
    const result = await db.execute(sql.raw(rawSql));
    return { result, rawSql };
  } catch (error) {
    throw new Error(error);
  }
};

export const loadApi = () => {
  ipcMain.handle("insertShopee", async (event, ...args) => {
    return insertShopee(args);
  });

  ipcMain.handle("insertLazada", async (event, ...args) => {
    return insertLazada(args);
  });

  ipcMain.handle("insertMc", async (event, ...args) => {
    return insertMc(args);
  });

  ipcMain.handle("get_column_config", async (event, ...args) => {
    return getColumnConfig(args);
  });

  ipcMain.handle("updateColumnConfig", async (event, ...args) => {
    return updateConfig(args);
  });
};
