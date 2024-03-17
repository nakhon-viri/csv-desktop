import { forwardRef, useEffect, useState } from 'react'
import TableColumn from './components/platform/TableColumn';
import { getConfigs } from '@/services/config/CONFIG_Q';
import { getProductType } from '@/services/productType/PRODUCT_TYPE_Q';
import TableProductType from './components/productType/TableProductType';

export interface ListConfig {
    platform: string;
    column_db: string;
    column_value?: any;
}

type Config = {
    config: ListConfig[]
    platform: string
}

type Props = {
    onClose: (isActive: boolean) => void;
}

const Setting = (props: Props, ref) => {
    const [columnConfig, setColumnConfig] = useState<Config>();
    const [productType, setProductType] = useState([])
    const [tabName, setTabName] = useState<'PLATFORM' | 'PRODUCT_TYPE'>('PLATFORM')
    const loadConfig = async (platform: string) => {
        if (tabName !== 'PLATFORM') {
            setTabName('PLATFORM');
        }
        try {
            setColumnConfig(null);
            const response = await getConfigs(platform);
            setColumnConfig({ config: response, platform });
        } catch (error) {
            console.log("error", error);
        }
    };

    const loadProductType = async () => {
        if (tabName !== 'PRODUCT_TYPE') {
            setTabName('PRODUCT_TYPE');
        }

        try {
            const response = await getProductType();
            console.log('getProductType', response)
            setProductType(response)
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        loadConfig('shopee')
    }, []);



    const PageSetting = () => {
        if (tabName === 'PLATFORM') {
            return columnConfig ? <TableColumn columnConfig={columnConfig.config} /> : null
        } else if (tabName === 'PRODUCT_TYPE') {
            return productType ? <TableProductType productType={productType} /> : null
        } else {
            return columnConfig ? <TableColumn columnConfig={columnConfig.config} /> : null
        }
    }

    const menus = [
        {
            header: 'platform',
            items: [
                {
                    computed: (value) => loadConfig(value),
                    className: `px-3 py-1 mb-[2px] cursor-pointer ${columnConfig?.platform === 'shopee' ? 'bg-[rgba(0,0,0,.05)]' : ''} hover:bg-[rgba(0,0,0,.05)] rounded-sm`,
                    label: "shopee"
                },
                {
                    computed: (value) => loadConfig(value),
                    className: `px-3 py-1 mb-[2px] cursor-pointer ${columnConfig?.platform === 'lazada' ? 'bg-[rgba(0,0,0,.05)]' : ''} hover:bg-[rgba(0,0,0,.05)] rounded-sm`,
                    label: "lazada"
                },
                {
                    computed: (value) => loadConfig(value),
                    className: `px-3 py-1 mb-[2px] cursor-pointer ${columnConfig?.platform === 'mc' ? 'bg-[rgba(0,0,0,.05)]' : ''} hover:bg-[rgba(0,0,0,.05)] rounded-sm`,
                    label: "mc"
                }
            ]
        },
        {
            header: 'product type',
            items: [
                {
                    computed: (value) => loadProductType(),
                    className: `px-3 py-1 mb-[2px] cursor-pointer ${tabName === 'PRODUCT_TYPE' ? 'bg-[rgba(0,0,0,.05)]' : ''} hover:bg-[rgba(0,0,0,.05)] rounded-sm`,
                    label: "shopee"
                },
            ]
        }
    ]


    return (
        <div ref={ref} className="absolute top-0 bottom-0 right-0 left-0">
            <div className="flex h-full pr-1">
                <div className="flex grow basis-36 shrink-0 justify-end">
                    <div className="pt-4 w-36">
                        {menus.map((menu, i_g) => {
                            return <div>
                                <div key={i_g} className="mb-2 pl-3 text-muted-foreground text-xs text-ellipsis text-nowrap overflow-hidden">
                                    {menu.header}
                                </div>
                                <ul>
                                    {menu.items.map(
                                        (item, i) => (
                                            <li
                                                onClick={() => item.computed(item.label)}
                                                key={i}
                                                className={item.className}
                                            >
                                                {item.label}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        })}

                    </div>
                </div>
                <div className="flex grow shrink overflow-y-hidden pt-4 hover:overflow-y-scroll overflow-x-hidden basis-[600px] items-start">
                    <div className="flex">
                        <div className=" w-[576px] pb-40">
                            {<PageSetting />}
                        </div>
                    </div>
                    <div className="w-8">
                        <div
                            onClick={() => props.onClose(false)}
                            className="fixed h-8 w-8 rounded-full border flex justify-center items-center cursor-pointer"
                        >
                            x
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default forwardRef(Setting)