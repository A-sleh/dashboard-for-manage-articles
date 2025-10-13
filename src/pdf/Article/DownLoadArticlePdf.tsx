"use client";

import dynamic from "next/dynamic";

import { IArticle } from "@/stores/Article-store/Articles-store";
import { ArticlePdf } from "./ArticlePdf";
import Loader from "@/components/Model/Loader";
import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";

const PDFDownloadLink = dynamic(
  () =>
    import("@react-pdf/renderer").then((reactPdf) => reactPdf.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

export default function DownLoadArticlePdf({
  article,
  children,
}: {
  article: IArticle;
  children: React.ReactNode;
}) {
  const locale = useNavSetting(state => state.lang)
  return (
    <PDFDownloadLink
      document={<ArticlePdf article={article} locale={locale} />}
      fileName={`${article.title}.pdf`}
    >
      {children}
    </PDFDownloadLink>
  );
}
