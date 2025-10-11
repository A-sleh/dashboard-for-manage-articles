import React from "react";
import { Range, Times } from "../stores/Working-hours-store/WorkingHoursStore";

export const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result.split(",")[1]);
      } else {
        reject(new Error("Faild to convert file to base64"));
      }
    };
    reader.onerror = () => {
      reject(new Error("Error reading the file"));
    };

    reader.readAsDataURL(file);
  });
};

export async function getFileUrl(file: File,allowImages: string[] = []): Promise<string | null> {
  const maxFileSize = 1048576; //   < == > 1MB

  if (!file) return null;
  try {
    // Check the file if greater than 2 Mb
    if (file.size > maxFileSize) {
      throw new Error("Image size must be less than 1 Mb");
    }
    const type = file.type.split("/")[1];

    if(allowImages.length != 0 && !allowImages.includes(type)) {
      throw new Error("The type of image is not allowed")
    }

    const imageBase64 = await convertImageToBase64(file);
    return `data:image/${type};base64,${imageBase64}`;
  } catch (err) {
    // Check the file if greater than 2 Mb
    throw new Error((err as Error).message);
  }
}

export function genterateTimes(maxValue: number): string[] {
  const times = [];
  for (let time = 0; time < maxValue; time++) {
    const hourStr = time.toString().padStart(2, "0");
    times.push(`${hourStr}`);
  }
  return times;
}

export function delayChangeState(
  setFc: React.Dispatch<React.SetStateAction<boolean>>
) {
  setFc(true);
  setTimeout(() => setFc(false), 500);
}

export function timeToMinutes(time: Times) {
  return Number(time.hours) * 60 + Number(time.minutes);
}

export function isTimeRangeValid(
  firstRange: Range,
  secondRange: Range
): boolean {
  const startA = timeToMinutes(firstRange.start);
  const endA = timeToMinutes(firstRange.end);
  const startB = timeToMinutes(secondRange.start);
  const endB = timeToMinutes(secondRange.end);

  // Overlap occurs if startA < endB AND startB < endA
  return endA <= startB || startA >= endB;
}

export function validTimeOrder(startTime: Times, endTimes: Times) {
  const start = timeToMinutes(startTime);
  const end = timeToMinutes(endTimes);
  return end < start;
}

export function convertDateToTimeStamp(date: string | Date ): number {

  if(!date ) return 0
  try {
    return new Date(date).getTime()
  }catch (err) {
    return 0
  }
}

export function getDayName(date: Date, locale: string = "en-US"): string {
  return date.toLocaleDateString(locale, { weekday: "long" });
}

export function formatDate(date: Date | string, locale: 'en' | 'ar') {
  const d = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(d);
}

