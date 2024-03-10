import { toast } from "sonner";
import { getConfigsObj } from "../config/CONFIG_Q";
import { db } from "../db";
import { getProductTypeObj } from "../productType/PRODUCT_TYPE_Q";
import { updateProductType } from "../productType/PRODUCT_TYPE_U";
import moment from "moment";

export const insertLazada = async (data) => {
    try {
        const column = await getConfigsObj('lazada');
        const type = await getProductTypeObj();

        const product_name = {}
        const values = data.reduce((acc, dataArr: any) => {
            if (type[dataArr[column.item_name]] === undefined) {
                product_name[dataArr[column.item_name]] = dataArr[column.item_name]
            }
            acc.push([
                dataArr[column.orderitem_id],
                dataArr[column.order_type],
                dataArr[column.guarantee],
                dataArr[column.delivery_type],
                dataArr[column.lazada_id],
                dataArr[column.seller_sku],
                dataArr[column.lazada_sku],
                dataArr[column.warehouse],
                moment(dataArr[column.create_time]).format(
                    "yyyy/MM/DD HH:mm:ss"
                ),
                moment(dataArr[column.update_time]).format(
                    "yyyy/MM/DD HH:mm:ss"
                ),
                dataArr[column.rtssla],
                dataArr[column.ttssla],
                dataArr[column.order_num],
                dataArr[column.invoice_required],
                dataArr[column.invoice_num],
                dataArr[column.delivered_date] ? moment(dataArr[column.delivered_date]).format(
                    "yyyy/MM/DD HH:mm:ss"
                ) : null,
                dataArr[column.customer_name],
                dataArr[column.customer_email],
                dataArr[column.national_registration_number],
                dataArr[column.shipping_name],
                dataArr[column.shipping_address1],
                dataArr[column.shipping_address2],
                dataArr[column.shipping_address3],
                dataArr[column.shipping_address4],
                dataArr[column.shipping_address5],
                dataArr[column.shipping_phone1],
                dataArr[column.shipping_phone2],
                dataArr[column.shipping_city],
                dataArr[column.shipping_post_code],
                dataArr[column.shipping_country],
                dataArr[column.shipping_region],
                dataArr[column.billing_name],
                dataArr[column.billing_address1],
                dataArr[column.billing_address2],
                dataArr[column.billing_address3],
                dataArr[column.billing_address4],
                dataArr[column.billing_address5],
                dataArr[column.billing_phone],
                dataArr[column.billing_phone2],
                dataArr[column.billing_city],
                dataArr[column.billing_post_code],
                dataArr[column.billing_country],
                dataArr[column.tax_code],
                dataArr[column.branch_number],
                dataArr[column.tax_invoice_requested],
                dataArr[column.pay_method],
                dataArr[column.paid_price],
                dataArr[column.unit_price],
                dataArr[column.seller_discount_total] || null,
                dataArr[column.shipping_fee],
                dataArr[column.wallet_credit] || 0,
                dataArr[column.item_name],
                dataArr[column.variation],
                dataArr[column.cd_shipping_provider],
                dataArr[column.shipping_provider],
                dataArr[column.shipment_type_name],
                dataArr[column.shipping_provider_type],
                dataArr[column.cd_tracking_code],
                dataArr[column.tracking_code],
                dataArr[column.tracking_url],
                dataArr[column.shipping_provider_fm],
                dataArr[column.tracking_code_fm],
                dataArr[column.tracking_url_fm],
                dataArr[column.promised_shipping_time],
                dataArr[column.premium],
                dataArr[column.status],
                dataArr[column.buyer_failed_delivery_return_Initiator],
                dataArr[column.buyer_failed_delivery_reason],
                dataArr[column.buyer_failed_delivery_detail],
                dataArr[column.buyer_failed_delivery_username],
                dataArr[column.bundle_id],
                dataArr[column.semi_managed],
                dataArr[column.bundle_discount],
                dataArr[column.refund_amount] || 0,
                dataArr[column.seller_note],
            ])
            return acc
        }, []);
        const product_name_not_dup = Object.keys(product_name)
        if (product_name_not_dup.length) {
            toast.warning('Event start time cannot be earlier than 8am', { position: 'top-right' })
            await updateProductType(product_name_not_dup)
        }
        return await db(`REPLACE INTO lazada (
  orderitem_id,
  order_type,
  guarantee,
  delivery_type,
  lazada_id,
  seller_sku,
  lazada_sku,
  warehouse,
  create_time,
  update_time,
  rtssla,
  ttssla,
  order_num,
  invoice_required,
  invoice_num,
  delivered_date,
  customer_name,
  customer_email,
  national_registration_number,
  shipping_name,
  shipping_address1,
  shipping_address2,
  shipping_address3,
  shipping_address4,
  shipping_address5,
  shipping_phone1,
  shipping_phone2,
  shipping_city,
  shipping_post_code,
  shipping_country,
  shipping_region,
  billing_name,
  billing_address1,
  billing_address2,
  billing_address3,
  billing_address4,
  billing_address5,
  billing_phone,
  billing_phone2,
  billing_city,
  billing_post_code,
  billing_country,
  tax_code,
  branch_number,
  tax_invoice_requested,
  pay_method,
  paid_price,
  unit_price,
  seller_discount_total,
  shipping_fee,
  wallet_credit,
  item_name,
  variation,
  cd_shipping_provider,
  shipping_provider,
  shipment_type_name,
  shipping_provider_type,
  cd_tracking_code,
  tracking_code,
  tracking_url,
  shipping_provider_fm,
  tracking_code_fm,
  tracking_url_fm,
  promised_shipping_time,
  premium,
  status,
  buyer_failed_delivery_return_Initiator,
  buyer_failed_delivery_reason,
  buyer_failed_delivery_detail,
  buyer_failed_delivery_username,
  bundle_id,
  semi_managed,
  bundle_discount,
  refund_amount,
  seller_note
          ) VALUES ?`, [values]);
    } catch (error) {
        throw new Error(error);
    }
}