import AnimateScale from "@/lib/Animation/AnimateScale";
import { MdClose } from "react-icons/md";

type SelectType = {
  label: string;
  onChange: (e: any) => void;
  value?: string | number;
  values: (string | number)[];
  error?: string;
  register?: any;
};

export default function SelectInput({
  onChange,
  values,
  label,
  value,
  register,
  error = "",
  ...props
}: SelectType) {
  return (
    <div className="w-full">
      <div className="flex flex-col flex-1 w-full">
        <label className="text-primary dark:text-white mb-1">{label}</label>
        <select
          onChange={onChange}
          value={value}
          {...props}
          {...register}
          className="px-4 py-2 bg-white text-secondary-dark dark:text-white dark:bg-transparent placeholder:text-sm dark:placeholder:text-secondary-dark dark:border dark:border-white outline-hidden shadow-xs rounded-xs"
        >
          <option
            disabled
            className={`flex items-center gap-2 px-3 py-2 bg-white dark:bg-secondary-dark cursor-pointer select-none
            hover:bg-blue-100 dark:hover:bg-gray-700 `}
          ></option>
          {values?.map((value) => {
            return (
              <option
                value={value}
                key={value}
                className={`flex items-center gap-2 px-3 py-2 bg-white dark:bg-secondary-dark cursor-pointer select-none
              hover:bg-blue-100 dark:hover:bg-gray-700 `}
              >
                {value}
              </option>
            );
          })}
        </select>
      </div>
      {error && (
        <AnimateScale>
          <p className="text-[13px] mx-1 text-red-500 mt-1 font-medium">
            {error}
          </p>
        </AnimateScale>
      )}
    </div>
  );
}
