import { db } from "../../db";
import { sql } from "drizzle-orm";
import { checkNull } from "../../utils/checkNull";



export const insertMc = async (args) => {
    let raw = "";
    try {
        const chunkSize = 10000;
        const chunks: any[] = [];
        for (let i = 0; i < args[0].length; i += chunkSize) {
            const chunk = args[0].slice(i, i + chunkSize);
            chunks.push(chunk);
        }
        const res: any[] = [];

        for (let index = 0; index < chunks.length; index++) {
            const insertValue = chunks[index]
                .map(
                    (item) => `(
        ${checkNull(item.order_id)},
        ${checkNull(item.status)},
        ${checkNull(item.emp)},
        ${checkNull(item.invoice)},
        ${checkNull(item.payment)},
        ${checkNull(item.discount)},
        ${checkNull(item.sale)},
        ${checkNull(item.transport_service_provider)},
        ${checkNull(item.quantity)},
        ${checkNull(item.shipping_cost)},
        ${checkNull(item.cod_cost)},
        ${checkNull(item.tracking_number)},
        ${checkNull(item.channel)},
        ${checkNull(item.channel_name)},
        ${checkNull(item.name)},
        ${checkNull(item.phone)},
        ${checkNull(item.address)},
        ${checkNull(item.subdistrict)},
        ${checkNull(item.district)},
        ${checkNull(item.province)},
        ${checkNull(item.zipcode)},
        ${checkNull(item.pack_date)},
        ${checkNull(item.create_date)},
        ${checkNull(item.paid_date)},
        ${checkNull(item.seller_discount)},
        ${checkNull(item.platform_discount)},
        ${checkNull(item.coin)},
        ${checkNull(item.sku_code)},
        ${checkNull(item.product_name)},
        ${checkNull(item.product_options)},
        ${checkNull(item.price_per_piece)},
        ${checkNull(item.discount_per_piece)},
        ${checkNull(item.quantity_product)},
        ${checkNull(item.note)},
        ${checkNull(item.id_mc)},
        ${checkNull(item.discount_per_product_p)},
        ${checkNull(item.shipping_cost_p)},
        ${checkNull(item.cod_cost_p)},
        ${checkNull(item.sale_per_product_p)},
        ${checkNull(item.channel_p)},
        ${checkNull(item.type_chit)},
        ${checkNull(item.product_name_p)}
    )`
                )
                .join(", ");

            raw = `REPLACE INTO MC (
    order_id,
    status,
    emp,
    invoice,
    payment,
    discount,
    sale,
    transport_service_provider,
    quantity,
    shipping_cost,
    cod_cost,
    tracking_number,
    channel,
    channel_name,
    name,
    phone,
    address,
    subdistrict,
    district,
    province,
    zipcode,
    pack_date,
    create_date,
    paid_date,
    seller_discount,
    platform_discount,
    coin,
    sku_code,
    product_name,
    product_options,
    price_per_piece,
    discount_per_piece,
    quantity_product,
    note,
    id_mc,
    discount_per_product_p,
    shipping_cost_p,
    cod_cost_p,
    sale_per_product_p,
    channel_p,
    type_chit,
    product_name_p
          ) VALUES  ${insertValue};`;
            const result = await db.execute(sql.raw(raw));
            res.push(result);
        }
        return res;
        // return args[0];
    } catch (error) {
        // return raw;
        return error;
    }
};