import moment from "moment";


export const shopeeToDb = (data, column) => {
    const dataValue: any[] = [];
    data.forEach((dataArr: any) => {
        if (dataArr["สถานะการสั่งซื้อ"] === "ยกเลิกแล้ว") return;
        dataValue.push({
            order_id: dataArr[column.order_id],
            order_date: moment(dataArr[column.order_date]).format(
                "yyyy/MM/DD HH:mm:ss"
            ),
            commission: dataArr[column.commission] || 0,
            quantity: +dataArr[column.quantity] || 0,
            status_order: dataArr[column.status_order],
            cancel_reason: dataArr[column.cancel_reason],
            status_return: dataArr[column.status_return],
            name_buyer: dataArr[column.name_buyer],
            paid_date: dataArr[column.paid_date]
                ? moment(dataArr[column.paid_date]).format("yyyy/MM/DD HH:mm:ss")
                : "",
            paid_channel: dataArr[column.paid_channel],
            paid_channel_detail: dataArr[column.paid_channel_detail],
            installment_plan: dataArr[column.installment_plan],
            fee_percent: dataArr[column.fee_percent]
                ? dataArr[column.fee_percent].replace("%", "")
                : 0,
            shipping_option: dataArr[column.shipping_option],
            shipping_method: dataArr[column.shipping_method],
            tracking_number: dataArr[column.tracking_number],
            expected_delivery_date: dataArr[column.expected_delivery_date]
                ? moment(dataArr[column.expected_delivery_date]).format(
                    "yyyy/MM/DD HH:mm:ss"
                )
                : "",
            delivery_date: dataArr[column.delivery_date]
                ? moment(dataArr[column.delivery_date]).format("yyyy/MM/DD HH:mm:ss")
                : "",
            sku_parent_reference_number: dataArr[column.sku_parent_reference_number],
            product_name: dataArr[column.product_name],
            sku_reference_number: dataArr[column.sku_reference_number],
            option_name: dataArr[column.option_name],
            initial_price: dataArr[column.initial_price],
            selling_price: dataArr[column.selling_price],
            returned_quantity: +dataArr[column.returned_quantity],
            net_selling_price: dataArr[column.net_selling_price],
            shopee_discount: dataArr[column.shopee_discount],
            seller_discount: dataArr[column.seller_discount],
            code_coins_cashback: dataArr[column.code_coins_cashback],
            code_discount_shopee: dataArr[column.code_discount_shopee],
            code: dataArr[column.code],
            join_bundle_deal: dataArr[column.join_bundle_deal],
            discount_bundle_deal_seller:
                dataArr[column.discount_bundle_deal_seller],
            discount_bundle_deal_shopee:
                dataArr[column.discount_bundle_deal_shopee],
            discount_coins: dataArr[column.discount_coins],
            all_discounts_credit_cards: dataArr[column.all_discounts_credit_cards],
            transaction_fee: dataArr[column.transaction_fee],
            cost_sales_minus_coupons_coins: dataArr[column.cost_sales_minus_coupons_coins],
            shipping_cost_seller: dataArr[column.shipping_cost_seller],
            shipping_cost_shopee: dataArr[column.shipping_cost_shopee],
            return_shipping_cost: dataArr[column.return_shipping_cost],
            service_fee: dataArr[column.service_fee],
            total_amount: dataArr[column.total_amount],
            estimated_shipping_cost: dataArr[column.estimated_shipping_cost],
            customer_name: dataArr[column.customer_name],
            phone: dataArr[column.phone],
            note_buyer: dataArr[column.note_buyer],
            address: dataArr[column.address],
            country: dataArr[column.country],
            district: dataArr[column.district],
            zip_code: dataArr[column.zip_code],
            order_type: dataArr[column.order_type],
            completed_date: moment(dataArr[column.completed_date]).format(
                "yyyy/MM/DD HH:mm:ss"
            ),
            record: dataArr[column.record],
            province: dataArr[column.province],
        });
    });
    return dataValue
}