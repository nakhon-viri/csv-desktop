import { app, BrowserWindow, ipcMain } from "electron";
import { join } from "path";
import { db } from "./db";
import { shopee, test } from "./db/schema/schema";
import { sql } from "drizzle-orm";
let mainWindow;

const insertShopee = async (args) => {
  let raw = "";
  try {
    // console.log("1", 1);
    // const chunkSize = 3000;
    // const chunks: any[] = [];
    // for (let i = 0; i < args[0].length; i += chunkSize) {
    //   const chunk = args[0].slice(i, i + chunkSize);
    //   chunks.push(chunk);
    // }
    // const res: any[] = [];

    // for (let index = 0; index < chunks.length; index++) {
    //   const result = await db.insert(shopee).values(chunks[index]);
    //   res.push(result);
    // }
    // =================================================================

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
    '${item.order_id}',
    '${item.order_date}',
    '${item.commission}',
    '${item.quantity}',
    '${item.status_order}',
    '${item.cancel_reason}',
    '${item.status_return}',
    '${item.name_buyer}',
    '${item.paid_date}',
    '${item.paid_channel}',
    '${item.paid_channel_detail}',
    '${item.installment_plan}',
    '${item.fee_percent}',
    '${item.shipping_option}',
    '${item.shipping_method}',
    '${item.tracking_number}',
    '${item.expected_delivery_date}',
    '${item.delivery_date}',
    '${item.sku_parent_reference_number}',
    '${item.product_name}',
    '${item.sku_reference_number}',
    '${item.option_name}',
    '${item.initial_price}',
    '${item.selling_price}',
    '${item.returned_quantity}',
    '${item.net_selling_price}',
    '${item.shopee_discount}',
    '${item.seller_discount}',
    '${item.code_coins_cashback}',
    '${item.code_discount_shopee}',
    '${item.code}',
    '${item.join_bundle_deal}',
    '${item.discount_bundle_deal_seller}',
    '${item.discount_bundle_deal_shopee}',
    '${item.discount_coins}',
    '${item.all_discounts_credit_cards}',
    '${item.transaction_fee}',
    '${item.cost_sales_minus_coupons_coins}',
    '${item.shipping_cost_seller}',
    '${item.shipping_cost_shopee}',
    '${item.return_shipping_cost}',
    '${item.service_fee}',
    '${item.total_amount}',
    '${item.estimated_shipping_cost}',
    '${item.customer_name}',
    '${item.phone}',
    '${item.note_buyer}',
    '${item.address}',
    '${item.country}',
    '${item.district}',
    '${item.zip_code}',
    '${item.order_type}',
    '${item.completed_date}',
    '${item.record}',
    '${item.province}'
    )`
        )
        .join(", ");

      raw = `INSERT INTO shopee (
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

const getColumnConfig = async (args) => {
  try {
    const result = await db.execute(
      sql.raw(
        `select * from column_configs where platform = '${args[0].platform}'`
      )
    );
    return result;
  } catch (error) {
    return error;
  }
};

function createWindow() {
  mainWindow = new BrowserWindow({
    // minWidth: 1200,
    minWidth: 800,
    minHeight: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, "../preload"),
      sandbox: false,
    },
  });
  mainWindow.webContents.openDevTools();
  // Vite dev server URL

  ipcMain.handle("ping", async (event, ...args) => {
    return insertShopee(args);
  });

  ipcMain.handle("get_column_config", async (event, ...args) => {
    return getColumnConfig(args);
  });

  mainWindow.loadURL("http://localhost:5173");
  // mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  // mainWindow.loadURL("http://localhost:5173");
  mainWindow.on("closed", () => (mainWindow = null));
}

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow == null) {
    createWindow();
  }
});

// const result = await db.insert(shopee).values();

//     const chunkSize = 2000;
//     const chunks: any[] = [];
//     for (let i = 0; i < args[0].length; i += chunkSize) {
//       const chunk = args[0].slice(i, i + chunkSize);
//       chunks.push(chunk);
//     }
//     const res: any[] = [];

//     for (let index = 0; index < chunks.length; index++) {
//       const insertValue = chunks[index]
//         .map(
//           (item) => `(
// ${item.order_id},
// ${item.order_date},
// ${item.commission},
// ${item.quantity},
// '${item.status_order}',
// '${item.cancel_reason}',
// '${item.status_return}',
// '${item.name_buyer}',
// ${item.paid_date},
// '${item.paid_channel}',
// '${item.paid_channel_detail}',
// '${item.installment_plan}',
// ${item.fee_percent},
// '${item.shipping_option}',
// '${item.shipping_method}',
// '${item.tracking_number}',
// ${item.expected_delivery_date},
// ${item.delivery_date},
// '${item.sku_parent_reference_number}',
// '${item.product_name}',
// '${item.sku_reference_number}',
// '${item.option_name}',
// ${item.initial_price},
// ${item.selling_price},
// ${item.returned_quantity},
// ${item.net_selling_price},
// ${item.shopee_discount},
// ${item.seller_discount},
// ${item.code_coins_cashback},
// ${item.code_discount_shopee},
// '${item.code}',
// '${item.join_bundle_deal}',
// ${item.discount_bundle_deal_seller},
// ${item.discount_bundle_deal_shopee},
// ${item.discount_coins},
// ${item.all_discounts_credit_cards},
// ${item.transaction_fee},
// ${item.cost_sales_minus_coupons_coins},
// ${item.shipping_cost_seller},
// ${item.shipping_cost_shopee},
// ${item.return_shipping_cost},
// ${item.service_fee},
// ${item.total_amount},
// ${item.estimated_shipping_cost},
// '${item.customer_name}',
// '${item.phone}',
// '${item.note_buyer}',
// '${item.address}',
// '${item.country}',
// '${item.district}',
// '${item.zip_code}',
// '${item.order_type}',
// ${item.completed_date},
// '${item.record}',
// '${item.province}',
// )`
//         )
//         .join(", ");
//       const result = await db.execute(
//         sql.raw(`INSERT INTO test (
// ('order_id'),
// ('order_date'),
// ('commission'),
// ('quantity'),
// ('status_order'),
// ('cancel_reason'),
// ('status_return'),
// ('name_buyer'),
// ('paid_date'),
// ('paid_channel'),
// ('paid_channel_detail'),
// ('installment_plan'),
// ('fee_percent'),
// ('shipping_option'),
// ('shipping_method'),
// ('tracking_number'),
// ('expected_delivery_date'),
// ('delivery_date'),
// ('sku_parent_reference_number'),
// ('product_name'),
// ('sku_reference_number'),
// ('option_name'),
// ('initial_price'),
// ('selling_price'),
// ('returned_quantity'),
// ('net_selling_price'),
// ('shopee_discount'),
// ('seller_discount'),
// ('code_coins_cashback'),
// ('code_discount_shopee'),
// ('code'),
// ('join_bundle_deal'),
// ('discount_bundle_deal_seller'),
// ('discount_bundle_deal_shopee'),
// ('discount_coins'),
// ('all_discounts_credit_cards'),
// ('transaction_fee'),
// ('cost_sales_minus_coupons_coins'),
// ('shipping_cost_seller'),
// ('shipping_cost_shopee'),
// ('return_shipping_cost'),
// ('service_fee'),
// ('total_amount'),
// ('estimated_shipping_cost'),
// ('customer_name'),
// ('phone'),
// ('note_buyer'),
// ('address'),
// ('country'),
// ('district'),
// ('zip_code'),
// ('order_type'),
// ('completed_date'),
// ('record'),
// ('province')
//       ) VALUES  ${insertValue};`)
//       );
//       res.push(result);
//     }

//     const insertValue = args[0]
//       .map(
//         (item) => `(
// ${item.order_id},
// ${item.order_date},
// ${item.commission},
// ${item.quantity},
// '${item.status_order}',
// '${item.cancel_reason}',
// '${item.status_return}',
// '${item.name_buyer}',
// ${item.paid_date},
// '${item.paid_channel}',
// '${item.paid_channel_detail}',
// '${item.installment_plan}',
// ${item.fee_percent},
// '${item.shipping_option}',
// '${item.shipping_method}',
// '${item.tracking_number}',
// ${item.expected_delivery_date},
// ${item.delivery_date},
// '${item.sku_parent_reference_number}',
// '${item.product_name}',
// '${item.sku_reference_number}',
// '${item.option_name}',
// ${item.initial_price},
// ${item.selling_price},
// ${item.returned_quantity},
// ${item.net_selling_price},
// ${item.shopee_discount},
// ${item.seller_discount},
// ${item.code_coins_cashback},
// ${item.code_discount_shopee},
// '${item.code}',
// '${item.join_bundle_deal}',
// ${item.discount_bundle_deal_seller},
// ${item.discount_bundle_deal_shopee},
// ${item.discount_coins},
// ${item.all_discounts_credit_cards},
// ${item.transaction_fee},
// ${item.cost_sales_minus_coupons_coins},
// ${item.shipping_cost_seller},
// ${item.shipping_cost_shopee},
// ${item.return_shipping_cost},
// ${item.service_fee},
// ${item.total_amount},
// ${item.estimated_shipping_cost},
// '${item.customer_name}',
// '${item.phone}',
// '${item.note_buyer}',
// '${item.address}',
// '${item.country}',
// '${item.district}',
// '${item.zip_code}',
// '${item.order_type}',
// ${item.completed_date},
// '${item.record}',
// '${item.province}',
// )`
//       )
//       .join(", ");
//     const res = await db.execute(
//       sql.raw(`INSERT INTO test (
// order_id,
// order_date,
// commission,
// quantity,
// status_order,
// cancel_reason,
// status_return,
// name_buyer,
// paid_date,
// paid_channel,
// paid_channel_detail,
// installment_plan,
// fee_percent,
// shipping_option,
// shipping_method,
// tracking_number,
// expected_delivery_date,
// delivery_date,
// sku_parent_reference_number,
// product_name,
// sku_reference_number,
// option_name,
// initial_price,
// selling_price,
// returned_quantity,
// net_selling_price,
// shopee_discount,
// seller_discount,
// code_coins_cashback,
// code_discount_shopee,
// code,
// join_bundle_deal,
// discount_bundle_deal_seller,
// discount_bundle_deal_shopee,
// discount_coins,
// all_discounts_credit_cards,
// transaction_fee,
// cost_sales_minus_coupons_coins,
// shipping_cost_seller,
// shipping_cost_shopee,
// return_shipping_cost,
// service_fee,
// total_amount,
// estimated_shipping_cost,
// customer_name,
// phone,
// note_buyer,
// address,
// country,
// district,
// zip_code,
// order_type,
// completed_date,
// record,
// province,
//       ) VALUES  ${insertValue};`)
//     );
