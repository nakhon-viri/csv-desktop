import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button"
import UploadPng from "@/assets/images/upload.jpg";
import IconSetting from "@/assets/icons/setting.svg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => { }, []);

  return (
    <div className=" h-screen  w-screen flex justify-center items-center">
      <div className=" h-full w-full relative flex flex-col justify-center items-center">
        <input
          className=" absolute top-0 bottom-0  right-0 left-0 opacity-0"
          type="file"
          accept=".xlsx, .xls"
        />
        <div className=" h-1/2 w-1/2 flex flex-col items-center">
          <img src={UploadPng} className=" h-full w-auto" alt="" />
          <span className="text-lg font-bold text-muted-foreground">Upload your excel (.xlsx).</span>
        </div>
      </div>
      <div className="flex justify-center items-center fixed bottom-6 right-6 w-14 h-14 rounded-full border ">
        {/* <img src={IconSetting} className=" h-10 w-auto" alt="" /> */}
        <span className="icon icon-setting h-6 w-6 text-muted-foreground"></span>
      </div>
      <div className="absolute top-4">
        <Select value="mc">
          <SelectTrigger className=" w-32">
            <SelectValue defaultValue="shopee" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="shopee">Shopee</SelectItem>
              <SelectItem value="shopeemall">Shopee Mall</SelectItem>
              <SelectItem value="lazada">Lazada</SelectItem>
              <SelectItem value="lazadamall">Lazada Mall</SelectItem>
              <SelectItem value="tiktok">Tiktok</SelectItem>
              <SelectItem value="mc">MC</SelectItem>
              <SelectItem value="pv">PV</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div >
  );
}

export default App;
