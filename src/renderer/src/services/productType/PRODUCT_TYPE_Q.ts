import { db } from "../db";

export const getProductType = () => {
    return db(`select * from product_type`, []);
}

export const getProductTypeObj = async () => {
    try {
        const responseProductType = await getProductType();
        return responseProductType.reduce((acc, cur) => {
            acc[cur.product_name] = cur.product_type;
            return acc;
        }, {});
    } catch (error) {
        throw new Error(error);
    }
}