import moment from "moment";

export const lazadaToDb = (data, column) => {
  const dataValue: any[] = [];
  data.forEach((dataArr: any) => {
    dataValue.push({
      orderitem_id: dataArr[column.orderitem_id],
      order_type: dataArr[column.order_type],
      guarantee: dataArr[column.guarantee],
      delivery_type: moment(dataArr[column.delivery_type]).format(
        "yyyy/MM/DD HH:mm:ss"
      ),
      lazada_id: dataArr[column.lazada_id],
      seller_sku: dataArr[column.seller_sku],
      lazada_sku: dataArr[column.lazada_sku],
      warehouse: dataArr[column.warehouse],
      create_time: moment(dataArr[column.create_time]).format(
        "yyyy/MM/DD HH:mm:ss"
      ),
      update_time: moment(dataArr[column.update_time]).format(
        "yyyy/MM/DD HH:mm:ss"
      ),
      rtssla: dataArr[column.rtssla],
      ttssla: dataArr[column.ttssla],
      order_num: dataArr[column.order_num],
      invoice_required: dataArr[column.invoice_required],
      invoice_num: dataArr[column.invoice_num],
      delivered_date: dataArr[column.delivered_date],
      customer_name: dataArr[column.customer_name],
      customer_email: dataArr[column.customer_email],
      national_registration_number:
        dataArr[column.national_registration_number],
      shipping_name: dataArr[column.shipping_name],
      shipping_address1: dataArr[column.shipping_address1],
      shipping_address2: dataArr[column.shipping_address2],
      shipping_address3: dataArr[column.shipping_address3],
      shipping_address4: dataArr[column.shipping_address4],
      shipping_address5: dataArr[column.shipping_address5],
      shipping_phone1: dataArr[column.shipping_phone1],
      shipping_phone2: dataArr[column.shipping_phone2],
      shipping_city: dataArr[column.shipping_city],
      shipping_post_code: dataArr[column.shipping_post_code],
      shipping_country: dataArr[column.shipping_country],
      shipping_region: dataArr[column.shipping_region],
      billing_name: dataArr[column.billing_name],
      billing_address1: dataArr[column.billing_address1],
      billing_address2: dataArr[column.billing_address2],
      billing_address3: dataArr[column.billing_address3],
      billing_address4: dataArr[column.billing_address4],
      billing_address5: dataArr[column.billing_address5],
      billing_phone: dataArr[column.billing_phone],
      billing_phone2: dataArr[column.billing_phone2],
      billing_city: dataArr[column.billing_city],
      billing_post_code: dataArr[column.billing_post_code],
      billing_country: dataArr[column.billing_country],
      tax_code: dataArr[column.tax_code],
      branch_number: dataArr[column.branch_number],
      tax_invoice_requested: dataArr[column.tax_invoice_requested],
      pay_method: dataArr[column.pay_method],
      paid_price: dataArr[column.paid_price],
      unit_price: dataArr[column.unit_price],
      seller_discount_total: dataArr[column.seller_discount_total],
      shipping_fee: dataArr[column.shipping_fee],
      wallet_credit: dataArr[column.wallet_credit],
      item_name: dataArr[column.item_name],
      variation: dataArr[column.variation],
      cd_shipping_provider: dataArr[column.cd_shipping_provider],
      shipping_provider: dataArr[column.shipping_provider],
      shipment_type_name: dataArr[column.shipment_type_name],
      shipping_provider_type: dataArr[column.shipping_provider_type],
      cd_tracking_code: dataArr[column.cd_tracking_code],
      tracking_code: dataArr[column.tracking_code],
      tracking_url: dataArr[column.tracking_url],
      shipping_provider_fm: dataArr[column.shipping_provider_fm],
      tracking_code_fm: dataArr[column.tracking_code_fm],
      tracking_url_fm: dataArr[column.tracking_url_fm],
      promised_shipping_time: dataArr[column.promised_shipping_time],
      premium: dataArr[column.premium],
      status: dataArr[column.status],
      buyer_failed_delivery_return_Initiator:
        dataArr[column.buyer_failed_delivery_return_Initiator],
      buyer_failed_delivery_reason:
        dataArr[column.buyer_failed_delivery_reason],
      buyer_failed_delivery_detail:
        dataArr[column.buyer_failed_delivery_detail],
      buyer_failed_delivery_username:
        dataArr[column.buyer_failed_delivery_username],
      bundle_id: dataArr[column.bundle_id],
      semi_managed: dataArr[column.semi_managed],
      bundle_discount: dataArr[column.bundle_discount],
      refund_amount: dataArr[column.refund_amount],
      seller_note: dataArr[column.seller_note],
    });
  });
  return dataValue;
};
