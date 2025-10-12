import { useTranslations } from "next-intl"
import { useRef } from "react";
import { inputType } from "./Input";

export default function FileInputSecondary({
  label,
  placeHolder,
  required = false,
  register,
  value,
  className = '',
  ...props
}: Omit<inputType, "type">) {
  const t = useTranslations("components.FileInput")
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="mb-1 flex flex-col w-full overflow-hidden shadow-xs flex-1">
      <label className="text-primary dark:text-white mb-1 ">{label}</label>
      <div onClick={() => inputRef.current?.click()} className=" bg-white text-secondary-dark  dark:text-white dark:bg-transparent placeholder:text-sm dark:placeholder:text-white dark:border dark:border-white outline-hidden shadow-xs rounded-xs flex justify-between overflow-hidden">
        {value == "" ? (
          <p className="px-4 py-2 text-nowrap max-w-[20rem] overflow-hidden text-[#5252528e] dark:text-white">
            {placeHolder}
          </p>
        ) : (
          <p className="px-4 py-2 text-nowrap max-w-[20rem] overflow-hidden dark:text-white">
            {value}
          </p>
        )}
        <span
          onClick={(e) => {e.stopPropagation(); inputRef.current?.click()}}
          title={t('upload-file')}
          className="px-2 py-2 text-sm cursor-pointer bg-primary  dark:bg-secondary-dark text-white text-nowrap "
          style={{ lineHeight: "-10px" }}
        >
          {t('upload-file')}
        </span>
      </div>
      <input type="file" className="hidden" ref={inputRef} {...props} />
    </div>
  );
}
