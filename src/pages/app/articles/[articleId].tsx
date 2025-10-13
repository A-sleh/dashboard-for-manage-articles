
import Link from "next/link";
import Image from "next/image";

import parse from "html-react-parser";
import { useRouter } from "next/router";

import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useArticles } from "@/stores/Article-store/Articles-store";
import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";
import { AiOutlineDelete } from "react-icons/ai";
import { FaDownload, FaPencilAlt } from "react-icons/fa";

import { useTranslations } from "next-intl";

import { formatDate } from "@/utils/helper";
import Loader  from "@/components/Model/Loader" 
import { successToast } from "@/components/custom/toast";
import DownLoadArticlePdf from "@/pdf/Article/DownLoadArticlePdf";
import ArticleForm from "@/features/articles/components/ArticleForm";
import NotFoundMessage from "@/components/ui/NotFoundMessage";
import ConfirmModal from "@/components/Model/ConfirmModel";
import AnimateDownEffect from "@/lib/Animation/AnimateDownEffect";
import AnimateParentScaleUp, {
  AnimateChildScaleUpChild,
} from "@/lib/Animation/AnimateParentScaleUpChild";
import AnimateFromToRight from "@/lib/Animation/AnimateFromLeftToRight";
import Head from "next/head";
import DashBoradLayout from "@/components/layout/DashBoardLayout";
import { ReactElement } from "react";
import { GetServerSideProps } from "next";
import useLoadinPage from "@/hooks/useLoadingPage";

const ICON_SIZE = 20;

export default function Article() {
  const router = useRouter();
  const isLoading = useLoadinPage()
  const t = useTranslations("articles.article");
  const id = Number(router.query?.articleId) 
  
  const { getArticleBy, deleteArticle } = useArticles((state) => state);
  const locale = useNavSetting((state) => state.lang);
  const article = getArticleBy(id);
  
  if(isLoading) {
    return <Loader />
  }

  if (!article) return <NotFoundMessage message={t("not-found-message")} />;
  const { cover, title, published, scheduled, category, tags, richText } =
    article;

  async function handleDelete(id: number) {
    try {
      await deleteArticle(id);
      successToast(t("article-deleted"));
      router.replace("/app/articles");
    } catch (err) {
      throw new Error(t("delete-error"));
    }
  }

  return (
    <section className="p-4">
      <AnimateDownEffect className="flex justify-between p-2 bg-primary dark:bg-primary-dark rounded-md mb-2 text-white">
        <span>{formatDate(new Date(scheduled || ""), locale)}</span>
        <Link href="/app/articles" aria-label={t("back-to-articles")}>
          <IoChevronBackCircleOutline size={25} />
        </Link>
      </AnimateDownEffect>
      <AnimateFromToRight className="w-full">
        <div className="flex justify-between w-full">
          <h1 className="text-xl font-bold uppercase dark:text-white flex items-center gap-2">
            {title}
            <span
              className={`${
                published ? "bg-green-400" : "bg-red-400"
              } text-white p-1 px-2 rounded-md font-normal text-sm`}
            >
              {published ? t("published") : t("not-published")}
            </span>
          </h1>
          <div className="actions flex gap-2">
            <ConfirmModal
              ModalKey="delete-range"
              handleApply={() => handleDelete(id)}
              message={t("confirm-delete-message")}
            >
              <AiOutlineDelete
                size={ICON_SIZE}
                className="text-red-400 cursor-pointer"
                title={t("delete-article")}
              />
            </ConfirmModal>
            <ArticleForm method="PUT" initialForm={article}>
              <FaPencilAlt
                size={ICON_SIZE}
                className="text-blue-400 cursor-pointer"
                title={t("edit-article")}
              />
            </ArticleForm>
            <DownLoadArticlePdf article={article}>
              <FaDownload
                size={ICON_SIZE}
                className="cursor-pointer dark:text-white"
                title={t("download-pdf")}
              />
            </DownLoadArticlePdf>
          </div>
        </div>

        <div className="my-3">
          <span className="text-white bg-primary dark:bg-primary-dark rounded-md px-2 py-1">
            {category}
          </span>
        </div>
      </AnimateFromToRight>

      <div className="flex flex-col md:flex-row gap-3 md:gap-8 items-center md:items-start dark:text-white">
        {/* Left column (Image + Tags) */}
        <AnimateFromToRight className="w-full md:w-1/2 lg:w-[45%] flex flex-col items-center md:items-start">
          {cover && (
            <Image
              src={cover}
              width={400}
              height={200}
              alt={t("cover-image-alt")}
              className="w-full  rounded-md object-cover"
            />
          )}

          {/* Tags */}
          {tags?.length > 0 && (
            <AnimateParentScaleUp className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
              {tags.map((tag, Idx) => (
                <AnimateChildScaleUpChild
                  duration={Idx / 3}
                  key={Idx}
                  className="px-3 py-1 rounded-md bg-primary dark:bg-primary-dark text-white text-sm"
                >
                  {tag}
                </AnimateChildScaleUpChild>
              ))}
            </AnimateParentScaleUp>
          )}
        </AnimateFromToRight>

        {/* Right column (Rich text content) */}
        <AnimateFromToRight
          offsetValue={100}
          className="w-full converted-richtext dark:prose-invert max-w-none"
        >
          {parse(richText)}
        </AnimateFromToRight>
      </div>
    </section>
  );
}

Article.getLayout = (page: ReactElement) => {
  return <DashBoradLayout>{page}</DashBoradLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = require('cookie')
  const cookieHeader = context.req.headers.cookie || "";
  const parsedCookies = cookieHeader ? cookie.parse(cookieHeader) : {};
  const locale = parsedCookies.locale || context.locale ||  "en";
  
  return {
    props: {
      messages: (await import(`../../../../messages/${locale}.json`)).default,
      locale,
    },
  };
};

