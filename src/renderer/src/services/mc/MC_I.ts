import { toast } from "sonner";
import { getConfigsObj } from "../config/CONFIG_Q";
import { db } from "../db";
import { getProductTypeObj } from "../productType/PRODUCT_TYPE_Q";
import { updateProductType } from "../productType/PRODUCT_TYPE_U";
import moment from "moment";

const formatDate = (dateInput: any) => {
    // console.log('dateInput', dateInput)
    if (!dateInput || dateInput === "-") return null;
    const [date, time] = dateInput.split(" ");
    // console.log('date', date)
    // console.log('time', time)
    const [day, month, year] = date.split("-");
    // console.log('day, month, year', day, month, year)
    // console.log('`${year}-${month}-${day} ${time}`', `${year}-${month}-${day} ${time}`)
    const resultDate = new Date(`${year}-${month}-${day} ${time}`);
    // console.log("resultDate.toString()", resultDate);
    return moment(resultDate.toString()).format("yyyy/MM/DD HH:mm:ss");
};

export const insertMC = async (data) => {
    try {
        const column = await getConfigsObj('mc');
        const type = await getProductTypeObj();


        const checkDuplicate = {}

        const product_name = {}

        let order_id_mem = ''

        const values = data.reduce((acc, dataArr: any) => {
            if (dataArr[column.order_id] && order_id_mem !== dataArr[column.order_id]) {
                order_id_mem = dataArr[column.order_id]
            }

            if (!dataArr[column.order_id]) {
                dataArr[column.order_id] = order_id_mem
            }


            if (!checkDuplicate[dataArr[column.order_id] + '@' + dataArr[column.sku_code]]) {
                checkDuplicate[dataArr[column.order_id] + '@' + dataArr[column.sku_code]] = 0
            }
            checkDuplicate[dataArr[column.order_id] + '@' + dataArr[column.sku_code]] += 1

            return acc

            if (type[dataArr[column.product_name]] === undefined) {
                product_name[dataArr[column.product_name]] = dataArr[column.product_name]
            }

            if (!checkDuplicate[dataArr[column.order_id] + '@' + dataArr[column.sku_code]]) {
                checkDuplicate[dataArr[column.order_id] + '@' + dataArr[column.sku_code]] = 0
            }
            checkDuplicate[dataArr[column.order_id] + '@' + dataArr[column.sku_code]] += 1
            acc.push([
                dataArr[column.order_id],
                dataArr[column.status],
                dataArr[column.emp],
                dataArr[column.invoice],
                dataArr[column.payment],
                dataArr[column.discount],
                dataArr[column.sale],
                dataArr[column.transport_service_provider],
                dataArr[column.quantity],
                dataArr[column.shipping_cost].toString().replaceAll(',', '') || 0,
                dataArr[column.cod_cost],
                dataArr[column.tracking_number],
                dataArr[column.channel],
                dataArr[column.channel_name],
                dataArr[column.name],
                dataArr[column.phone],
                dataArr[column.address],
                dataArr[column.subdistrict],
                dataArr[column.district],
                dataArr[column.province],
                dataArr[column.zipcode],
                ['-', ''].includes(dataArr[column.pack_date]) ? null : formatDate(dataArr[column.pack_date]),
                formatDate(dataArr[column.create_date]) || null,
                formatDate(dataArr[column.paid_date]),
                dataArr[column.seller_discount],
                dataArr[column.platform_discount],
                dataArr[column.coin],
                dataArr[column.sku_code],
                dataArr[column.product_name],
                dataArr[column.product_options],
                dataArr[column.price_per_piece],
                dataArr[column.discount_per_piece],
                dataArr[column.quantity_product],
                dataArr[column.note],
                dataArr[column.discount_per_product_p],
                dataArr[column.shipping_cost_p],
                dataArr[column.cod_cost_p],
                dataArr[column.sale_per_product_p],
                dataArr[column.channel_p],
                dataArr[column.type_chit],
                dataArr[column.product_name_p],
            ]);
            return acc
        }, []);
        console.log('checkDuplicate', checkDuplicate)
        const product_name_not_dup = Object.keys(product_name)
        if (product_name_not_dup.length) {
            toast.warning('Event start time cannot be earlier than 8am', { position: 'top-right' })
            await updateProductType(product_name_not_dup)
        }
        return ''
        return await db(`REPLACE INTO mc (
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
    discount_per_product_p,
    shipping_cost_p,
    cod_cost_p,
    sale_per_product_p,
    channel_p,
    type_chit,
    product_name_p
          ) VALUES ?`, [values]);
    } catch (error) {
        throw new Error(error);
    }
}