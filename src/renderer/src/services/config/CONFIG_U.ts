import { db } from "../db";


interface ColumnConfig {
    platform: string;
    column_db: string;
    column_value: string;
}

export const updateColumnConfig = (columnUpdates: ColumnConfig[]) => {
    const values = columnUpdates.map(column => [column.platform, column.column_db, column.column_value])
    return db(` INSERT INTO column_configs (platform, column_db, column_value)
                VALUES ?
                ON DUPLICATE KEY UPDATE 
                column_value=VALUES(column_value);`, [values]);
}
