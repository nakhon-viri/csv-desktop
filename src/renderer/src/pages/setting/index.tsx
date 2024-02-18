import { forwardRef, useEffect, useState } from 'react'
import TableColumn from './components/platform/shopee';

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
    const loadConfig = async (platform: string) => {
        try {
            setColumnConfig(null);
            const response = await window.electron.columnConfig({ platform });
            setColumnConfig({ config: response[0], platform });
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        loadConfig('shopee')
    }, []);

    return (
        <div ref={ref} className="absolute top-0 bottom-0 right-0 left-0">
            <div className="flex h-full pr-1">
                <div className="flex grow basis-36 shrink-0 justify-end">
                    <div className=" w-36">
                        <div>
                            <div className="mb-2 pl-3 text-muted-foreground text-xs text-ellipsis text-nowrap overflow-hidden">
                                platform
                            </div>
                            <ul>
                                {["shopee", "mc"].map(
                                    (platform, i) => (
                                        <li
                                            onClick={() => loadConfig(platform)}
                                            key={i}
                                            className={`px-3 py-1 mb-[2px] cursor-pointer ${columnConfig?.platform === platform ? 'bg-[rgba(0,0,0,.05)]' : ''} hover:bg-[rgba(0,0,0,.05)] rounded-sm`}
                                        >
                                            {platform}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex grow shrink overflow-y-hidden hover:overflow-y-scroll overflow-x-hidden basis-[600px] items-start">
                    <div className="flex">
                        <div className=" w-[576px] pb-40">
                            {columnConfig ? <TableColumn columnConfig={columnConfig.config} /> : null}
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