import { db } from "../db";

export const getConfigs = (platform: string) => {
    return db(`select * from column_configs where platform = ?`, [platform]);
}

export const getConfigsObj = async (platform: string) => {
    try {
        const responseColumn = await getConfigs(platform);
        return responseColumn.reduce((acc, cur) => {
            acc[cur.column_db] = cur.column_value;
            return acc;
        }, {});
    } catch (error) {
        throw new Error(error);
    }
}