import { useTranslations } from "next-intl"
import { useRef } from "react";
import { inputType } from "./Input";

export default function FileInput({
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
    <div className="mb-2 flex flex-col  w-full overflow-hidden">
      <label className="text-sm font-medium text-gray-700  dark:text-secondary-dark">{label}</label>
      <div onClick={() => inputRef.current?.click()} className="cursor-pointer bg-white flex justify-between focus:shadow-md border dark:border-secondary-dark rounded-md overflow-hidden ">
        {value == "" ? (
          <p className="px-4 py-1 text-nowrap max-w-[20rem] overflow-hidden text-[#5252528e]">
            {placeHolder}
          </p>
        ) : (
          <p className="px-4 py-1 text-nowrap max-w-[20rem] overflow-hidden ">
            {value}
          </p>
        )}
        <span
          onClick={(e) =>{e.stopPropagation();inputRef.current?.click()}}
          title={t('upload-file')}
          className="px-2 py-1 text-sm cursor-pointer bg-primary  dark:bg-secondary-dark text-white text-nowrap "
          style={{ lineHeight: "-20px" }}
        >
          {t('upload-file')}
        </span>
      </div>
      <input type="file" className="hidden" ref={inputRef} {...props} />
    </div>
  );
}
