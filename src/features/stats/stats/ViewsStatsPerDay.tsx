"use client";

import { useTranslations } from "next-intl";

import useFilteredArticlesOnDate from "../hooks/useFilteredArticlesOnDate";
import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";

import Chart from "@/components/charts/Chart";
import DatePicker from "@/components/ui/DatePicker";
import { getDayName } from "@/utils/helper";
import AnimateFromToRight from "@/lib/Animation/AnimateFromLeftToRight";

export default function ViewsStatsPerDay() {
  const t = useTranslations("stats");
  const { lang, isDarkMode } = useNavSetting((state) => state);

  const { filterdArticles, startDate, setStartDate, endDate, setEndDate } =
    useFilteredArticlesOnDate();
  const viewsMap: Record<string, number> = {};
  filterdArticles.forEach((a) => {
    const day = getDayName(
      new Date(a.scheduled || ""),
      lang == "ar" ? "ar-SA" : "en-US"
    );
    viewsMap[day] = (viewsMap[day] || 0) + Number(a.views);
  });

  return (
    <AnimateFromToRight offsetValue={100} className="flex-1 w-full h-full">
      <div className="bg-white dark:bg-secondary-dark shadow p-4 rounded-2xl dark:shadow-white flex-1 w-full h-full">
        <h2 className="text-sm mb-2 font-semibold dark:text-white">
          {t("views-per-day-chart-title")}
        </h2>
        <div className="flex gap-2 items-center mb-4">
          <div className="flex-1">
            <DatePicker
              selectedDate={startDate}
              setSelectedDate={setStartDate}
            />
          </div>
          <div className="flex-1">
            <DatePicker selectedDate={endDate} setSelectedDate={setEndDate} />
          </div>
        </div>

        <Chart
          className="w-full z-1 "
          type="line"
          width="100%"
          heigth="290"
          series={[
            {
              name: "Views",
              data: Object.values(viewsMap),
            },
          ]}
          options={{
            xaxis: {
              categories: Object.keys(viewsMap),
              labels: {
                style: {
                  colors: isDarkMode ? "white" : "black",
                },
              },
            },
            yaxis: {
              labels: {
                style: {
                  colors: isDarkMode ? "white" : "black",
                  fontSize: "14px",
                },
              },
            },
            stroke: { curve: "smooth" },
          }}
        />
      </div>
    </AnimateFromToRight>
  );
}
