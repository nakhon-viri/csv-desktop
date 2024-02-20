import { db } from "../../db";
import { sql } from "drizzle-orm";
import { checkNull } from "../../utils/checkNull";

export const insertLazada = async (args) => {
  let raw = "";
  try {
    const chunkSize = 2000;
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
  ${checkNull(item.orderitem_id)},
  ${checkNull(item.order_type)},
  ${checkNull(item.guarantee)},
  ${checkNull(item.delivery_type)},
  ${checkNull(item.lazada_id)},
  ${checkNull(item.seller_sku)},
  ${checkNull(item.lazada_sku)},
  ${checkNull(item.warehouse)},
  ${checkNull(item.create_time)},
  ${checkNull(item.update_time)},
  ${checkNull(item.rtssla)},
  ${checkNull(item.ttssla)},
  ${checkNull(item.order_num)},
  ${checkNull(item.invoice_required)},
  ${checkNull(item.invoice_num)},
  ${checkNull(item.delivered_date)},
  ${checkNull(item.customer_name)},
  ${checkNull(item.customer_email)},
  ${checkNull(item.national_registration_number)},
  ${checkNull(item.shipping_name)},
  ${checkNull(item.shipping_address1)},
  ${checkNull(item.shipping_address2)},
  ${checkNull(item.shipping_address3)},
  ${checkNull(item.shipping_address4)},
  ${checkNull(item.shipping_address5)},
  ${checkNull(item.shipping_phone1)},
  ${checkNull(item.shipping_phone2)},
  ${checkNull(item.shipping_city)},
  ${checkNull(item.shipping_post_code)},
  ${checkNull(item.shipping_country)},
  ${checkNull(item.shipping_region)},
  ${checkNull(item.billing_name)},
  ${checkNull(item.billing_address1)},
  ${checkNull(item.billing_address2)},
  ${checkNull(item.billing_address3)},
  ${checkNull(item.billing_address4)},
  ${checkNull(item.billing_address5)},
  ${checkNull(item.billing_phone)},
  ${checkNull(item.billing_phone2)},
  ${checkNull(item.billing_city)},
  ${checkNull(item.billing_post_code)},
  ${checkNull(item.billing_country)},
  ${checkNull(item.tax_code)},
  ${checkNull(item.branch_number)},
  ${checkNull(item.tax_invoice_requested)},
  ${checkNull(item.pay_method)},
  ${checkNull(item.paid_price)},
  ${checkNull(item.unit_price)},
  ${checkNull(item.seller_discount_total)},
  ${checkNull(item.shipping_fee)},
  ${checkNull(item.wallet_credit)},
  ${checkNull(item.item_name)},
  ${checkNull(item.variation)},
  ${checkNull(item.cd_shipping_provider)},
  ${checkNull(item.shipping_provider)},
  ${checkNull(item.shipment_type_name)},
  ${checkNull(item.shipping_provider_type)},
  ${checkNull(item.cd_tracking_code)},
  ${checkNull(item.tracking_code)},
  ${checkNull(item.tracking_url)},
  ${checkNull(item.shipping_provider_fm)},
  ${checkNull(item.tracking_code_fm)},
  ${checkNull(item.tracking_url_fm)},
  ${checkNull(item.promised_shipping_time)},
  ${checkNull(item.premium)},
  ${checkNull(item.status)},
  ${checkNull(item.buyer_failed_delivery_return_Initiator)},
  ${checkNull(item.buyer_failed_delivery_reason)},
  ${checkNull(item.buyer_failed_delivery_detail)},
  ${checkNull(item.buyer_failed_delivery_username)},
  ${checkNull(item.bundle_id)},
  ${checkNull(item.semi_managed)},
  ${checkNull(item.bundle_discount)},
  ${checkNull(item.refund_amount)},
  ${checkNull(item.seller_note)}
    )`
        )
        .join(", ");

      raw = `INSERT INTO shopee (
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



