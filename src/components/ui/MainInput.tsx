import { inputType } from "./Input";

export default function MainInput({
  label,
  type,
  placeHolder,
  required = false,
  readOnly = false,
  register,
  ...props
}: inputType) {

  return (
    <div className="mb-1 flex flex-col w-full">
      <label className="text-primary dark:text-white mb-1 ">{label}</label>
      <input
        className="px-4 py-2 bg-white text-secondary-dark dark:text-white dark:bg-transparent placeholder:text-sm dark:placeholder:text-white dark:border dark:border-white outline-hidden shadow-xs rounded-xs"
        readOnly={readOnly}
        type={type}
        placeholder={placeHolder}
        required={required}
        {...props}
        {...register}
      />
    </div>
  );
}
