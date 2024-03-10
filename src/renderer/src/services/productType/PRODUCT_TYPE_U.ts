import { db } from "../db";

export const updateProductType = (productNames: string[]) => {
    const values = productNames.map(productName => [productName])
    return db(` INSERT INTO product_type (product_name) VALUES ?;`, [values]);
}
