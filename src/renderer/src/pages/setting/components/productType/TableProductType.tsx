import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toastError } from '@/lib/notiErr';
import React, { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';

type Props = { productType: { product_name: string, product_type: string }[] }

const TableProductType = ({ productType }: Props) => {
    const [loading, setLoading] = useState(false);

    const {
        register,
        formState: { dirtyFields },
        control,
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: {
            column: productType,
        },
    });
    const { fields } = useFieldArray({
        name: "column",
        control,
    });

    const onSubmit = async (data) => {
        console.log("data", data);
        const result: any[] = [];
        dirtyFields?.column?.forEach((column, index) => {
            result.push(data.column[index]);
        });
        try {
            setLoading(true);
            toast.loading("Loading...");
            // const response = await updateColumnConfig(result)
            // console.log("response", response);
            reset(data);
        } catch (error) {
            console.log("error", error);
            toastError('Capture this alert and send to admin.', error)
        } finally {
            setLoading(false);
            toast.dismiss();
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div
                    className={`fixed transition-all duration-300 ease-in-out 
          ${dirtyFields?.column && !loading ? "bottom-3" : "-bottom-full"} 
        w-[576px]  px-4 py-4 rounded-md shadow-md border bg-white`}
                >
                    <div className="flex justify-between items-center">
                        <div>Product type has been edited.</div>
                        <div className="flex gap-2">
                            <Button onClick={() => reset()} variant="ghost">
                                reset
                            </Button>
                            <Button type="submit">update</Button>
                        </div>
                    </div>
                </div>
                <table className="table-auto w-full border-separate border-spacing-2">
                    <thead>
                        <tr>
                            <th className=" text-nowrap text-left">Header Db</th>
                            <th className=" text-left">Map Column</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fields?.map((field, index) => (
                            <tr key={field.id} className="">
                                <td scope="row">{field.product_name}</td>
                                <td>
                                    <Input
                                        key={field.id}
                                        {...register(`column.${index}.product_type`)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </form>
        </>
    );
};

export default TableProductType;
