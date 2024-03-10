import { Toaster } from 'sonner'
import DialogAddProductType from './components/DialogAddProductType'


export const ComponentProvider = () => {
    return (
        <>
            <DialogAddProductType />
            <Toaster position="bottom-center" />
        </>
    )
}
