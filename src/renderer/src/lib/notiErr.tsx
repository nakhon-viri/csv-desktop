import { toast } from "sonner"

export const toastError = (message: string, error: any) => {
    toast(<div className="flex flex-col gap-0.5 w-full">
        <div className="font-semibold text-sm flex items-end gap-[10px]">
            <span className="icon icon-danger bg-red-500"></span> {message}
        </div>
        <div className="w-full font-normal leading-[1.4] text-inherit">
            <pre className="mt-2 text-wrap rounded-md bg-slate-950 p-4">
                <div className="text-white">{error.toString()}</div>
            </pre>
        </div>
    </div>, {
        position: 'bottom-right',
        closeButton: true
    })
}