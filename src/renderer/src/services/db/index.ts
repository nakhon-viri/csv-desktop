

export const db = async (sql, values) => {
    return window.electron.db(sql, values);
}