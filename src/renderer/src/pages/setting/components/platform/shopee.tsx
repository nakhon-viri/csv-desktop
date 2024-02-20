import { Input } from "@/components/ui/input";
import { ListConfig } from "../..";
import { Button } from "@/components/ui/button";
import { useFieldArray, useForm } from "react-hook-form";
import { useEffect } from "react";

type Props = {
  columnConfig: ListConfig[];
};
const TableColumn = ({ columnConfig }: Props) => {
  const {
    register,
    formState: { dirtyFields },
    control,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      column: columnConfig,
    },
  });
  const { fields } = useFieldArray({
    name: "column",
    control,
  });

  useEffect(() => {}, [columnConfig]);

  const onSubmit = async (data) => {
    console.log("data", data);
    console.log(dirtyFields?.column);
    const result: any[] = [];
    dirtyFields?.column?.forEach((column, index) => {
      result.push(data.column[index]);
    });
    try {
      const response = await window.electron.updateColumnConfig(result);
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`fixed transition-all duration-300 ease-in-out ${
            dirtyFields?.column ? "bottom-3" : "-bottom-full"
          } w-[576px] px-4 py-3 rounded-md shadow-md border bg-white`}
        >
          <div className="flex justify-between items-center">
            <div>The column has been edited.</div>
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
                <td scope="row">{field.column_db}</td>
                <td>
                  <Input
                    key={field.id}
                    {...register(`column.${index}.column_value`)}
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

export default TableColumn;
