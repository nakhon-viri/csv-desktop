import { useEffect, useState } from "react";
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

  const handleFileUpload = (e: any) => {
    setData([]);
    // setHeader([]);
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
          order_id: dataArr["หมายเลขคำสั่งซื้อ"],
          order_date: moment(dataArr["วันที่ทำการสั่งซื้อ"]).format(
            "yyyy/MM/DD HH:mm:ss"
          ),
          commission: dataArr["ค่าคอมมิชชั่น"] || 0,
          quantity: +dataArr["จำนวน"] || 0,
          status_order: dataArr["สถานะการสั่งซื้อ"],
          cancel_reason: dataArr["เหตุผลในการยกเลิกคำสั่งซื้อ"],
          status_return: dataArr["สถานะการคืนเงินหรือคืนสินค้า"],
          name_buyer: dataArr["ชื่อผู้ใช้ (ผู้ซื้อ)"],
          paid_date: dataArr["เวลาการชำระสินค้า"]
            ? moment(dataArr["เวลาการชำระสินค้า"]).format("yyyy/MM/DD HH:mm:ss")
            : "",
          paid_channel: dataArr["ช่องทางการชำระเงิน"],
          paid_channel_detail: dataArr["ช่องทางการชำระเงิน (รายละเอียด) _1"],
          installment_plan: dataArr["แผนการผ่อนชำระ"],
          fee_percent: dataArr["ค่าธรรมเนียม (%)"]
            ? dataArr["ค่าธรรมเนียม (%)"].replace("%", "")
            : 0,
          shipping_option: dataArr["ตัวเลือกการจัดส่ง"],
          shipping_method: dataArr["วิธีการจัดส่ง"],
          tracking_number: dataArr["*หมายเลขติดตามพัสดุ"],
          expected_delivery_date: dataArr["วันที่คาดว่าจะทำการจัดส่งสินค้า"]
            ? moment(dataArr["วันที่คาดว่าจะทำการจัดส่งสินค้า"]).format(
                "yyyy/MM/DD HH:mm:ss"
              )
            : "",
          delivery_date: dataArr["เวลาส่งสินค้า"]
            ? moment(dataArr["เวลาส่งสินค้า"]).format("yyyy/MM/DD HH:mm:ss")
            : "",
          sku_parent_reference_number: dataArr["เลขอ้างอิง Parent SKU"],
          product_name: dataArr["ชื่อสินค้า"],
          sku_reference_number: dataArr["เลขอ้างอิง SKU (SKU Reference No.)"],
          option_name: dataArr["ชื่อตัวเลือก"],
          initial_price: dataArr["ราคาตั้งต้น"],
          selling_price: dataArr["ราคาขาย"],
          returned_quantity: +dataArr["Returned quantity"],
          net_selling_price: dataArr["ราคาขายสุทธิ"],
          shopee_discount: dataArr["ส่วนลดจาก Shopee"],
          seller_discount: dataArr["โค้ดส่วนลดชำระโดยผู้ขาย"],
          code_coins_cashback: dataArr["โค้ด Coins Cashback"],
          code_discount_shopee: dataArr["โค้ดส่วนลดชำระโดย Shopee"],
          code: dataArr["โค้ดส่วนลด"],
          join_bundle_deal: dataArr["เข้าร่วมแคมเปญ bundle deal หรือไม่"],
          discount_bundle_deal_seller:
            dataArr["ส่วนลด bundle deal ชำระโดยผู้ขาย"],
          discount_bundle_deal_shopee:
            dataArr["ส่วนลด bundle deal ชำระโดย Shopee"],
          discount_coins: dataArr["ส่วนลดจากการใช้เหรียญ"],
          all_discounts_credit_cards: dataArr["ส่วนลดทั้งหมดจากบัตรเครดิต"],
          transaction_fee: dataArr["Transaction Fee"],
          cost_sales_minus_coupons_coins: dataArr["ต้นทุนขายหักคูปองและcoin"],
          shipping_cost_seller: dataArr["ค่าจัดส่งที่ชำระโดยผู้ซื้อ"],
          shipping_cost_shopee: dataArr["ค่าจัดส่งที่ Shopee ออกให้โดยประมาณ"],
          return_shipping_cost: dataArr["ค่าจัดส่งสินค้าคืน"],
          service_fee: dataArr["ค่าบริการ"],
          total_amount: dataArr["จำนวนเงินทั้งหมด"],
          estimated_shipping_cost: dataArr["ค่าจัดส่งโดยประมาณ"],
          customer_name: dataArr["ชื่อผู้รับ"],
          phone: dataArr["หมายเลขโทรศัพท์"],
          note_buyer: dataArr["หมายเหตุจากผู้ซื้อ"],
          address: dataArr["ที่อยู่ในการจัดส่ง"],
          country: dataArr["ประเทศ"],
          district: dataArr["เขต/อำเภอ"],
          zip_code: dataArr["รหัสไปรษณีย์"],
          order_type: dataArr["ประเภทคำสั่งซื้อ"],
          completed_date: moment(dataArr["เวลาที่ทำการสั่งซื้อสำเร็จ"]).format(
            "yyyy/MM/DD HH:mm:ss"
          ),
          record: dataArr["บันทึก"],
          province: dataArr["จังหวัด"],
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

  return (
    <div className=" h-screen relative w-screen flex justify-center items-center overflow-hidden">
      <CSSTransition
        in={!activeMenu}
        timeout={200}
        classNames="menu-primary"
        unmountOnExit
        // onEnter={calcHeight}
      >
        <div className=" h-full w-full relative flex flex-col justify-center items-center">
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
            {/* <img src={IconSetting} className=" h-10 w-auto" alt="" /> */}
            <span className="icon icon-setting h-6 w-6 text-muted-foreground"></span>
          </div>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu}
        timeout={200}
        classNames="menu-secondary"
        unmountOnExit
      >
        <div className="absolute top-0 bottom-0 right-0 left-0">
          <div className="flex">
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
            <div className="flex grow shrink basis-[576px] items-start">
              <div className=" h-full w-[576px] pr-3 pb-96">
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
                          <Input value={config.column_value} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className=" fixed top-6 right-4 pr-4">
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
