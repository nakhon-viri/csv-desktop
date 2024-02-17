import { useEffect, useRef, useState } from "react";
// import { Button } from "@/components/ui/button"
import UploadPng from "@/assets/images/upload.jpg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import * as XLSX from "xlsx";

import { CSSTransition } from "react-transition-group";
import moment from "moment";

type Platform = { label: string; value: string };

const createPlatform = (label: string, value: string) => ({ value, label });

const platformList = [
  createPlatform("Shopee", "shopee"),
  createPlatform("Shopee Mall", "shopeemall"),
  createPlatform("Lazada", "lazada"),
  createPlatform("Lazada Mall", "lazadamall"),
  createPlatform("Tiktok", "tiktok"),
  createPlatform("MC", "mc"),
  createPlatform("PV", "pv"),
];
declare global {
  interface Window {
    electron: any;
    api: unknown;
  }
}

interface ListConfig {
  id: number;
  platform: string;
  column_db: string;
  column_value?: any;
}

type columnConfig = {
  platform: string;
  config: ListConfig[];
};

function App() {
  const [platform, setPlatform] = useState(platformList[3].value);
  const [activeMenu, setActiveMenu] = useState(false);

  const [data, setData] = useState([]);
  const [columnConfig, setColumnConfig] = useState<columnConfig>();
  const func = async () => {
    try {
      const response = await window.electron.columnConfig({
        platform: "shopee",
      });
      console.log("response", response[0]);
      setColumnConfig({
        config: response[0],
        platform: "shopee",
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    func();
  }, []);

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

  const handleFileUpload = async (e: any) => {
    let column: any = {}
    try {
      const response = await window.electron.columnConfig({
        platform: "shopee",
      })
      column = response[0].reduce((acc, cur) => {
        acc[cur.column_db] = cur.column_value
        return acc
      }, {})
    } catch (error) {
      console.log("error", error);
    }

    console.log('column', column)
    setData([]);
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = async (er: any) => {
      const data = er.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      console.log("parsedData", parsedData);
      e.target.file = [];
      const dataValue: any[] = [];

      // parsedData.forEach((dataArr: any) => {
      //   dataValue.push({
      //     order_id: dataArr["หมายเลขคำสั่งซื้อ"],
      //     status: dataArr["สถานะ"],
      //     emp: dataArr["พนง."],
      //     invoice: dataArr["ใบแจ้งหนี้"],
      //     payment: dataArr["การชำระเงิน"],
      //     discount: dataArr["ส่วนลด"],
      //     sale: dataArr["ยอดขาย"],
      //     transport_service_provider: dataArr["ผู้ให้บริการ"],
      //     quantity: dataArr["จำนวน"],
      //     shipping_cost: dataArr["ค่าจัดส่ง"]
      //       ? dataArr["ค่าจัดส่ง"].replaceAll(",", "")
      //       : 0,
      //     cod_cost: dataArr["ค่า COD"],
      //     tracking_number: dataArr["หมายเลขพัสดุ"],
      //     channel: dataArr["ประเภท"],
      //     channel_name: dataArr["ชื่อช่องทาง"],
      //     name: dataArr["ชื่อ-สกุล"],
      //     phone: dataArr["เบอร์โทรศัพท์"],
      //     address: dataArr["ที่อยู่"],
      //     subdistrict: dataArr["ตำบล"],
      //     district: dataArr["อำเภอ"],
      //     province: dataArr["จังหวัด"],
      //     zipcode: dataArr["รหัสไปรษณีย์"],
      //     pack_date: formatDate(dataArr["วันที่แพค"]),
      //     // pack_date: dataArr["วันที่แพค"]
      //     //   ? moment(dataArr["วันที่แพค"]).format("yyyy/MM/DD HH:mm:ss")
      //     //   : "",
      //     create_date: formatDate(dataArr["วันที่สร้าง"]),
      //     // create_date: dataArr["วันที่สร้าง"]
      //     //   ? moment(dataArr["วันที่สร้าง"]).format("yyyy/MM/DD HH:mm:ss")
      //     //   : "",
      //     paid_date: formatDate(dataArr["วันที่ชำระเงิน"]),
      //     // paid_date: dataArr["วันที่ชำระเงิน"]
      //     //   ? moment(dataArr["วันที่ชำระเงิน"]).format("yyyy/MM/DD HH:mm:ss")
      //     //   : "",
      //     seller_discount: dataArr["ส่วนลดร้านค้า"],
      //     platform_discount: dataArr["ส่วนลดแพลตฟอร์ม"],
      //     coin: dataArr["เหรียญ"],
      //     sku_code: dataArr["รหัส SKU"],
      //     product_name: dataArr["ชื่อสินค้า"],
      //     product_options: dataArr["ตัวเลือกสินค้า (ถ้ามี)"],
      //     price_per_piece: dataArr["ราคาต่อชิ้น"],
      //     discount_per_piece: dataArr["ส่วนลดต่อชิ้น"],
      //     quantity_product: dataArr["จำนวนสินค้าตามรายการ"],
      //     note: dataArr["หมายเหตุ"],
      //     discount_per_product_p: dataArr["ส่วนลดรายสินค้า(พี)"],
      //     shipping_cost_p: dataArr["ค่าจัดส่ง(พี)"],
      //     cod_cost_p: dataArr["ค่า COD(พี)"],
      //     sale_per_product_p: dataArr["ยอดขายรายสินค้า(พี)"],
      //     channel_p: dataArr["ช่องทางการขาย (พี)"],
      //     type_chit: dataArr["รูปแบบ"],
      //     product_name_p: dataArr["รายชื่อสินค้า(พี)"],
      //   });
      // });

      parsedData.forEach((dataArr: any) => {
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
      setData(dataValue);
      console.log("dataValue", dataValue);
      try {
        const response = await window.electron.ping(dataValue);
        console.log("response", response);
      } catch (error) {
        console.log("error", error);
      }
    };
  };
  const settingNode = useRef(null)
  const mainNode = useRef(null)
  return (
    <div className=" h-screen relative w-screen flex justify-center items-center overflow-hidden">
      <CSSTransition
        nodeRef={mainNode}
        in={!activeMenu}
        timeout={200}
        classNames="menu-primary"
        unmountOnExit
      // onEnter={calcHeight}
      >
        <div ref={mainNode} className=" h-full w-full relative flex flex-col justify-center items-center">
          <input
            className=" absolute top-0 bottom-0  right-0 left-0 opacity-0"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
          />
          <div className=" h-1/2 w-1/2 flex flex-col items-center">
            <img src={UploadPng} className=" h-full w-auto" alt="" />
            <span className="text-lg font-bold text-muted-foreground">
              Upload your excel (.xlsx).
            </span>
          </div>
          <div className="absolute top-4">
            <Select onValueChange={setPlatform} defaultValue={platform}>
              <SelectTrigger className=" w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {platformList.map(({ label, value }: Platform) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div
            onClick={() => setActiveMenu(true)}
            className="flex justify-center items-center fixed bottom-6 right-6 w-14 h-14 rounded-full border  cursor-pointer shadow-sm"
          >
            <span className="icon icon-setting h-6 w-6 text-muted-foreground"></span>
          </div>
        </div>
      </CSSTransition>

      <CSSTransition
        nodeRef={settingNode}
        in={activeMenu}
        timeout={200}
        classNames="menu-secondary"
        unmountOnExit
      >
        <div ref={settingNode} className="absolute top-0 bottom-0 right-0 left-0">
          <div className="flex h-full pr-1">
            <div className="flex grow basis-36 shrink-0 justify-end">
              <div className=" w-36">
                <div>
                  <div className="mb-2 pl-3 text-muted-foreground text-xs text-ellipsis text-nowrap overflow-hidden">
                    platform
                  </div>
                  <ul>
                    {["shopee", "lazada", "tiktok", "mc", "pv"].map(
                      (platform, i) => (
                        <li
                          key={i}
                          className="px-3 py-1 mb-[2px] cursor-pointer hover:bg-[rgba(0,0,0,.05)] rounded-sm"
                        >
                          {platform}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex grow shrink overflow-y-scroll overflow-x-hidden basis-[576px] items-start">
              <div className="flex">
                <div className=" w-[576px] pr-3 pb-40">
                  <table className="table-auto w-full border-separate border-spacing-2">
                    <thead>
                      <tr>
                        <th className=" text-nowrap text-left">Header Db</th>
                        <th className=" text-left">Map Column</th>
                      </tr>
                    </thead>
                    <tbody>
                      {columnConfig?.config.map((config) => (
                        <tr key={config.id} className="">
                          <td scope="row">{config.column_db}</td>
                          <td>
                            <Input value={config.column_value} onChange={() => { }} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="w-8">
                <div
                  onClick={() => setActiveMenu(false)}
                  className=" h-8 w-8 rounded-full border flex justify-center items-center cursor-pointer"
                >
                  x
                </div>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}

export default App;

//  <div className=" h-screen w-screen">
//    <div className="mx-auto w-full px-0 max-w-[800px]  h-full flex">
//      <div className=" fixed top-0 bottom-0 h-full w-56 overflow-auto py-6 pl-3 pr-4">
//        <div className="">
//          <div>
//            <div className="mb-2 pl-3 text-muted-foreground text-xs text-ellipsis text-nowrap overflow-hidden">
//              platform
//            </div>
//            <ul>
//              {["shopee", "lazada", "tiktok", "mc", "pv"].map((platform, i) => (
//                <li
//                  key={i}
//                  className="px-3 py-1 mb-[2px] cursor-pointer hover:bg-[rgba(0,0,0,.05)] rounded-sm"
//                >
//                  {platform}
//                </li>
//              ))}
//            </ul>
//          </div>
//        </div>
//      </div>
//      <div className="relative h-full w-full  pt-6 flex ml-56 pr-12">
//        <div className=" h-full w-full pr-3 pb-96">
//          <table className="table-auto w-full border-separate border-spacing-2">
//            <thead>
//              <tr>
//                <th className=" text-nowrap text-left">Header Db</th>
//                <th className=" text-left">Map Column</th>
//              </tr>
//            </thead>
//            <tbody>
//              {columnConfig?.config.map((config) => (
//                <tr key={config.id} className="">
//                  <td scope="row">{config.column_db}</td>
//                  <td>
//                    <Input value={config.column_value} />
//                  </td>
//                </tr>
//              ))}
//            </tbody>
//          </table>
//        </div>
//        <div className=" fixed top-6 right-4 pr-4">
//          <div
//            onClick={() => setActiveMenu(false)}
//            className=" h-8 w-8 rounded-full border flex justify-center items-center cursor-pointer"
//          >
//            x
//          </div>
//        </div>
//      </div>
//    </div>
//  </div>;
