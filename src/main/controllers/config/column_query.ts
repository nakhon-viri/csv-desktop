import { db2 } from "../../db";

export const getColumnConfig = async (args) => {
  try {
    const result = await db2(
      `select * from column_configs where platform = ?`,
      [args[0].platform]
    );
    return result;
  } catch (error) {
    return error;
  }
};
