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

export const mcToDb = (data, column) => {
    const dataValue: any[] = [];
    data.forEach((dataArr: any) => {
        dataValue.push({
            order_id: dataArr["หมายเลขคำสั่งซื้อ"],
            status: dataArr["สถานะ"],
            emp: dataArr["พนง."],
            invoice: dataArr["ใบแจ้งหนี้"],
            payment: dataArr["การชำระเงิน"],
            discount: dataArr["ส่วนลด"],
            sale: dataArr["ยอดขาย"],
            transport_service_provider: dataArr["ผู้ให้บริการ"],
            quantity: dataArr["จำนวน"],
            shipping_cost: dataArr["ค่าจัดส่ง"]
                ? dataArr["ค่าจัดส่ง"].replaceAll(",", "")
                : 0,
            cod_cost: dataArr["ค่า COD"],
            tracking_number: dataArr["หมายเลขพัสดุ"],
            channel: dataArr["ประเภท"],
            channel_name: dataArr["ชื่อช่องทาง"],
            name: dataArr["ชื่อ-สกุล"],
            phone: dataArr["เบอร์โทรศัพท์"],
            address: dataArr["ที่อยู่"],
            subdistrict: dataArr["ตำบล"],
            district: dataArr["อำเภอ"],
            province: dataArr["จังหวัด"],
            zipcode: dataArr["รหัสไปรษณีย์"],
            pack_date: formatDate(dataArr["วันที่แพค"]),
            create_date: formatDate(dataArr["วันที่สร้าง"]),
            paid_date: formatDate(dataArr["วันที่ชำระเงิน"]),
            seller_discount: dataArr["ส่วนลดร้านค้า"],
            platform_discount: dataArr["ส่วนลดแพลตฟอร์ม"],
            coin: dataArr["เหรียญ"],
            sku_code: dataArr["รหัส SKU"],
            product_name: dataArr["ชื่อสินค้า"],
            product_options: dataArr["ตัวเลือกสินค้า (ถ้ามี)"],
            price_per_piece: dataArr["ราคาต่อชิ้น"],
            discount_per_piece: dataArr["ส่วนลดต่อชิ้น"],
            quantity_product: dataArr["จำนวนสินค้าตามรายการ"],
            note: dataArr["หมายเหตุ"],
            discount_per_product_p: dataArr["ส่วนลดรายสินค้า(พี)"],
            shipping_cost_p: dataArr["ค่าจัดส่ง(พี)"],
            cod_cost_p: dataArr["ค่า COD(พี)"],
            sale_per_product_p: dataArr["ยอดขายรายสินค้า(พี)"],
            channel_p: dataArr["ช่องทางการขาย (พี)"],
            type_chit: dataArr["รูปแบบ"],
            product_name_p: dataArr["รายชื่อสินค้า(พี)"],
        });
    });
    return dataValue
}