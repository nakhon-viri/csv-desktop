import { useRef, useState } from "react";
// import { Button } from "@/components/ui/button"
import UploadPng from "@/assets/images/upload.jpg";
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as XLSX from "xlsx";

import { CSSTransition } from "react-transition-group";
// import moment from "moment";
import { fileReaderXlsx } from "./lib/loadFile";
import { shopeeToDb } from "./lib/convert-platform/shopee";
import { Toaster } from "./components/ui/sonner";
import { mcToDb } from "./lib/convert-platform/mc";
import Setting from "./pages/setting";

type Platform = { label: string; value: string };

const createPlatform = (label: string, value: string) => ({ value, label });

const platformList = [
  createPlatform("Shopee", "shopee"),
  // createPlatform("Shopee Mall", "shopeemall"),
  // createPlatform("Lazada", "lazada"),
  // createPlatform("Lazada Mall", "lazadamall"),
  // createPlatform("Tiktok", "tiktok"),
  createPlatform("MC", "mc"),
  // createPlatform("PV", "pv"),
];
declare global {
  interface Window {
    electron: any;
    api: unknown;
  }
}



function App() {
  const initPlatform = localStorage.getItem('platform') || platformList[0].value
  const [platform, setPlatform] = useState(initPlatform);
  const [activeMenu, setActiveMenu] = useState(false);

  const settingNode = useRef(null)
  const mainNode = useRef(null)




  const handleFileUpload = async (e: any) => {
    let column: any = {}
    const isLoading = toast.loading('Loading data');
    try {

      const responseColumn = await window.electron.columnConfig({
        platform: "shopee",
      })
      column = responseColumn[0].reduce((acc, cur) => {
        acc[cur.column_db] = cur.column_value
        return acc
      }, {})
      const evt = await fileReaderXlsx(e.target.files[0])
      const data = evt.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      e.target.value = null;
      let dataValue: any[]
      let response: any
      console.log('platform', platform)
      if (platform === 'shopee') {
        dataValue = shopeeToDb(parsedData, column)
        response = await window.electron.insertShopee(dataValue);
      } else if (platform === 'mc') {
        dataValue = mcToDb(parsedData, column)
        console.log('dataValue', dataValue)
        response = await window.electron.insertMc(dataValue);
      }
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
    toast.dismiss(isLoading);
    toast.success('My success toast');
  };


  const handleChangePlatform = (value) => {
    setPlatform(value)
    localStorage.setItem('platform', value)
  }


  return (
    <div className=" h-screen relative w-screen flex justify-center items-center overflow-hidden">
      <Toaster position="bottom-center" />
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
            <Select onValueChange={handleChangePlatform} defaultValue={platform}>
              <SelectTrigger className="shadow-md w-32">
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
            className="flex justify-center items-center fixed bottom-6 right-6 w-14 h-14 rounded-full border  cursor-pointer shadow-md"
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
        <Setting ref={settingNode} onClose={setActiveMenu} />
      </CSSTransition>
    </div>
  );
}

export default App;