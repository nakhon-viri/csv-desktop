import { toast } from "sonner";
import { getConfigsObj } from "../config/CONFIG_Q";
import { db } from "../db";
import { getProductTypeObj } from "../productType/PRODUCT_TYPE_Q";
import { updateProductType } from "../productType/PRODUCT_TYPE_U";

export const insertShopee = async (data) => {
    try {
        const column = await getConfigsObj('shopee');
        const type = await getProductTypeObj();

        const product_name = {}
        const values = data.reduce((acc, dataArr: any) => {
            if (type[dataArr[column.product_name]] === undefined) {
                product_name[dataArr[column.product_name]] = dataArr[column.product_name]
            }
            acc.push([
                dataArr[column.order_id],
                dataArr[column.order_date],
                dataArr[column.commission],
                dataArr[column.quantity],
                dataArr[column.status_order],
                dataArr[column.cancel_reason],
                dataArr[column.status_return],
                dataArr[column.name_buyer],
                (dataArr[column.paid_date] === '-' ? null : dataArr[column.paid_date]) || null,
                dataArr[column.paid_channel],
                dataArr[column.paid_channel_detail],
                dataArr[column.installment_plan],
                dataArr[column.fee_percent]?.replace("%", "") || 0,
                dataArr[column.shipping_option],
                dataArr[column.shipping_method],
                dataArr[column.tracking_number],
                dataArr[column.expected_delivery_date] || null,
                dataArr[column.delivery_date] || null,
                dataArr[column.sku_parent_reference_number],
                dataArr[column.product_name],
                dataArr[column.sku_reference_number],
                dataArr[column.option_name],
                dataArr[column.initial_price],
                dataArr[column.selling_price],
                dataArr[column.returned_quantity],
                dataArr[column.net_selling_price],
                dataArr[column.shopee_discount],
                dataArr[column.seller_discount],
                dataArr[column.code_coins_cashback],
                dataArr[column.code_discount_shopee],
                dataArr[column.code],
                dataArr[column.join_bundle_deal],
                dataArr[column.discount_bundle_deal_seller],
                dataArr[column.discount_bundle_deal_shopee],
                dataArr[column.discount_coins],
                dataArr[column.all_discounts_credit_cards],
                dataArr[column.transaction_fee],
                dataArr[column.cost_sales_minus_coupons_coins],
                dataArr[column.shipping_cost_seller],
                dataArr[column.shipping_cost_shopee],
                dataArr[column.return_shipping_cost],
                dataArr[column.service_fee],
                dataArr[column.total_amount],
                dataArr[column.estimated_shipping_cost],
                dataArr[column.customer_name],
                dataArr[column.phone],
                dataArr[column.note_buyer],
                dataArr[column.address],
                dataArr[column.country],
                dataArr[column.district],
                dataArr[column.zip_code],
                dataArr[column.order_type],
                dataArr[column.completed_date] || null,
                dataArr[column.record],
                dataArr[column.province],
            ])
            return acc
        }, []);
        const product_name_not_dup = Object.keys(product_name)
        if (product_name_not_dup.length) {
            toast.warning('Event start time cannot be earlier than 8am', { position: 'top-right' })
            await updateProductType(product_name_not_dup)
        }

        return await db(`REPLACE INTO shopee ( 
    order_id,
    order_date,
    commission,
    quantity,
    status_order,
    cancel_reason,
    status_return,
    name_buyer,
    paid_date,
    paid_channel,
    paid_channel_detail,
    installment_plan,
    fee_percent,
    shipping_option,
    shipping_method,
    tracking_number,
    expected_delivery_date,
    delivery_date,
    sku_parent_reference_number,
    product_name,
    sku_reference_number,
    option_name,
    initial_price,
    selling_price,
    returned_quantity,
    net_selling_price,
    shopee_discount,
    seller_discount,
    code_coins_cashback,
    code_discount_shopee,
    code,
    join_bundle_deal,
    discount_bundle_deal_seller,
    discount_bundle_deal_shopee,
    discount_coins,
    all_discounts_credit_cards,
    transaction_fee,
    cost_sales_minus_coupons_coins,
    shipping_cost_seller,
    shipping_cost_shopee,
    return_shipping_cost,
    service_fee,
    total_amount,
    estimated_shipping_cost,
    customer_name,
    phone,
    note_buyer,
    address,
    country,
    district,
    zip_code,
    order_type,
    completed_date,
    record,
    province
          ) VALUES ?`, [values]);
    } catch (error) {
        throw new Error(error);
    }
}