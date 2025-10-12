// @ts-nocheck
"use client"

import { Dispatch, SetStateAction, useRef } from "react";

import DatePickerApi, { DatePicker } from "react-datepicker";
import { MdDateRange } from "react-icons/md";
import { arSA, enUS } from 'date-fns/locale';
import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store"; 
import "react-datepicker/dist/react-datepicker.css";

export default function DatePicker({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
}) {
  const dateRef = useRef<null | DatePicker>(null);
  const locale = useNavSetting(state => state.lang)

  return (
    <div className="cursor-pointer p-2 border border-primary  justify-between items-center dark:border-white text-primary dark:text-white outline-hidden roudned-sm focus:shadow-md rounded-md flex ">
      <DatePickerApi
        ref={dateRef}
        locale={locale == 'ar' ? arSA : enUS }
        selected={selectedDate}
        className="outline-hidden w-[150px] cursor-pointer z-100"
        onChange={(date) => setSelectedDate(date || new Date())}
      />
      <MdDateRange
        onClick={() => dateRef.current?.onInputClick()}
        size={26}
        className="p-1 rounded-xs  text-primary  hover:bg-white/50 transition-all dark:text-white "
      />
    </div>
  );
}
