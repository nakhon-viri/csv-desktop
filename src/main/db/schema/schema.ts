import {
  datetime,
  decimal,
  int,
  mysqlTable,
  varchar,
} from "drizzle-orm/mysql-core";

export const test = mysqlTable("test", {
  id: int("id").notNull().primaryKey(),
  test: datetime("test", { mode: "string" }),
});

export const shopee = mysqlTable("shopee", {
  order_date: datetime("order_date", { mode: "string" }),
  commission: decimal("commission", { precision: 10, scale: 3 }),
  quantity: int("quantity", { unsigned: true }),
  status_order: varchar("status_order", { length: 50 }),
  cancel_reason: varchar("cancel_reason", { length: 100 }),
  status_return: varchar("status_return", { length: 100 }),
  name_buyer: varchar("name_buyer", { length: 100 }),
  paid_date: datetime("paid_date", { mode: "string" }),
  paid_channel: varchar("paid_channel", { length: 100 }),
  paid_channel_detail: varchar("paid_channel_detail", { length: 100 }),
  Installment_plan: varchar("Installment_plan", { length: 100 }),
  fee_percent: decimal("fee_percent", { precision: 10, scale: 3 }),
  shipping_option: varchar("shipping_option", { length: 100 }),
  shipping_method: varchar("shipping_method", { length: 50 }),
  tracking_number: varchar("tracking_number", { length: 40 }),
  expected_delivery_date: datetime("expected_delivery_date", {
    mode: "string",
  }),
  delivery_date: datetime("delivery_date", { mode: "string" }),
  sku_parent_reference_number: varchar("sku_parent_reference_number", {
    length: 30,
  }),
  product_name: varchar("product_name", { length: 300 }),
  sku_reference_number: varchar("sku_reference_number", { length: 30 }),
  option_name: varchar("option_name", { length: 60 }),
  initial_price: decimal("initial_price", { precision: 10, scale: 3 }),
  selling_price: decimal("selling_price", { precision: 10, scale: 3 }),
  returned_quantity: int("returned_quantity", { unsigned: true }),
  net_selling_price: decimal("net_selling_price", { precision: 10, scale: 3 }),
  shopee_discount: decimal("shopee_discount", { precision: 10, scale: 3 }),
  seller_discount: decimal("seller_discount", { precision: 10, scale: 3 }),
  code_coins_cashback: decimal("code_coins_cashback", {
    precision: 10,
    scale: 3,
  }),
  code_discount_shopee: decimal("code_discount_shopee", {
    precision: 10,
    scale: 3,
  }),
  code: varchar("code", { length: 100 }),
  join_bundle_deal: varchar("join_bundle_deal", { length: 5 }),
  discount_bundle_deal_seller: decimal("discount_bundle_deal_seller", {
    precision: 10,
    scale: 3,
  }),
  discount_bundle_deal_shopee: decimal("discount_bundle_deal_shopee", {
    precision: 10,
    scale: 3,
  }),
  discount_coins: decimal("discount_coins", { precision: 10, scale: 3 }),
  all_discounts_credit_cards: decimal("all_discounts_credit_cards", {
    precision: 10,
    scale: 3,
  }),
  transaction_fee: decimal("transaction_fee", { precision: 10, scale: 3 }),
  cost_sales_minus_coupons_coins: decimal("cost_sales_minus_coupons_coins", {
    precision: 10,
    scale: 3,
  }),
  shipping_cost_seller: decimal("shipping_cost_seller", {
    precision: 10,
    scale: 3,
  }),
  shipping_cost_shopee: decimal("shipping_cost_shopee", {
    precision: 10,
    scale: 3,
  }),
  return_shipping_cost: decimal("return_shipping_cost", {
    precision: 10,
    scale: 3,
  }),
  service_fee: decimal("service_fee", { precision: 10, scale: 3 }),
  total_amount: decimal("total_amount", { precision: 10, scale: 3 }),
  estimated_shipping_cost: decimal("estimated_shipping_cost", {
    precision: 10,
    scale: 3,
  }),
  customer_name: varchar("customer_name", { length: 100 }),
  phone: varchar("phone", { length: 20 }),
  note_buyer: varchar("note_buyer", { length: 100 }),
  address: varchar("address", { length: 100 }),
  country: varchar("country", { length: 5 }),
  district: varchar("district", { length: 100 }),
  zip_code: varchar("zip_code", { length: 10 }),
  order_type: varchar("order_type", { length: 30 }),
  completed_date: datetime("completed_date", { mode: "string" }),
  record: varchar("record", { length: 30 }),
  province: varchar("province", { length: 50 }),
  order_id: varchar("order_id", { length: 100 }).primaryKey(),
});
