import { useArticles } from "@/stores/Article-store/Articles-store";
import { convertDateToTimeStamp } from "@/utils/helper";
import { useState } from "react";

export default function useFilteredArticlesOnDate() {
  const articles = useArticles((state) => state.getAllArticles());
  // Make the intial date based on min and max article date
  const dates = articles.map((a) => new Date(a.scheduled || ""));
  const minDate =
    dates.length > 0
      ? new Date(Math.min(...dates.map((d) => d.getTime())))
      : new Date();
  const maxDate =
    dates.length > 0
      ? new Date(Math.max(...dates.map((d) => d.getTime())))
      : new Date();
  const [startDate, setStartDate] = useState(minDate);
  const [endDate, setEndDate] = useState(maxDate);

  const filterdArticles = articles.filter(
    (artcle) =>
      convertDateToTimeStamp(artcle.scheduled || "") >=
        convertDateToTimeStamp(startDate) &&
      convertDateToTimeStamp(artcle.scheduled || "") <=
        convertDateToTimeStamp(endDate)
  );

  return { filterdArticles, startDate, setStartDate, endDate, setEndDate };
}
