"use client";

import { useTranslations } from "next-intl";

import useFilteredArticlesOnDate from "@/features/auth/hooks/useFilteredArticlesOnDate"; 
import Chart from "@/components/charts/Chart";
import DatePicker from "@/components/ui/DatePicker";
import AnimateFromToRight from '@/lib/Animation/AnimateFromLeftToRight'

export default function ArticlesStatsPerCate() {
  const t = useTranslations("stats");
  const { filterdArticles, startDate, setStartDate, endDate, setEndDate } =
    useFilteredArticlesOnDate();

  const categoryMap: Record<string, number> = {};
  filterdArticles.forEach((a) => {
    categoryMap[a.category] = (categoryMap[a.category] || 0) + 1;
  });

  return (
    <AnimateFromToRight className="flex-1 w-full h-full">
      <div className="bg-white dark:bg-secondary-dark shadow p-4 dark:shadow-white rounded-2xl flex-1 w-full h-full">
        <h2 className="text-sm mb-2 font-semibold dark:text-white">
            {t("articles-per-category-chart-title")}
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
          type="pie"
          width="100%"
          heigth="300"
          className="flex justify-center w-full"
          series={Object.values(categoryMap)}
          options={{
            labels: Object.keys(categoryMap),
            legend: { position: "bottom" },
            noData: {
              text:  t('no-data'), 
              align: "center",
              verticalAlign: "middle",
              style: {
                color: "#999",
                fontSize: "16px",
              },
            },
          }}
        />
      </div>
    </AnimateFromToRight>
  );
}
