"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { SortableItem, SortableKnob } from "react-easy-sort";

import { formatDate } from "@/utils/helper";
import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";
import { IArticle, useArticles } from "@/stores/Article-store/Articles-store";

import { RiDraggable } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";
import { FaPencilAlt } from "react-icons/fa";

import ArticleForm from "./ArticleForm";
import ConfirmModal from "@/components/Model/ConfirmModel";
import { errorToast, successToast } from "@/components/custom/toast";

export default function Article({ article }: { article: IArticle }) {
  const t = useTranslations("articles.article");
  const {lang,isDarkMode} = useNavSetting((state) => state);
  const { deleteArticle } = useArticles((state) => state);
  const { id, published, title, scheduled, category } = article;

  // For drag and drop ( cursor style )
  const [cursorStyle, setCursorStyle] = useState(false);

  async function handleDelete(id: number) {
    try {
      await deleteArticle(id);
      successToast(t("article-deleted"));
    } catch (err) {
      errorToast(t("delete-error"));
    }
  }

  useEffect(() => {
    const handleMouseUp = () => setCursorStyle(false);

    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <SortableItem key={id} >
      <div
        className={`${isDarkMode ? 'dark' : ''} flex gap-2 items-center dark:text-white  md:items-start bg-white dark:bg-primary-dark rounded-md p-2 border-dashed border-2 border-primary dark:border-white `}
        dir={lang == "ar" ? "rtl" : "ltr"}
      >
        <Link
          href={`/articles/${id}`}
          title={t("back-to-articles")}
          className="flex flex-col md:flex-row justify-between flex-1"
        >
          <div>
            <div className="flex gap-2 mb-2">
              <h3 className="font-bold">{title}</h3>
              <span
                className={`${
                  published ? "bg-green-400" : "bg-red-400"
                } text-white px-1 py-0.5 rounded-xs text-[12px]`}
              >
                {published ? t("published") : t("not-published")}
              </span>
            </div>
            {category && (
              <span className="px-2 py-1 rounded-md text-sm bg-primary dark:bg-secondary-dark text-white">
                {category}
              </span>
            )}
          </div>
          <div>
            <p className="text-sm my-1">
              {formatDate(new Date(scheduled || ""), lang)}
            </p>
          </div>
        </Link>
        <div className="flex gap-2 flex-col">
          <ConfirmModal
            ModalKey="delete-article"
            handleApply={() => handleDelete(id)}
            message={t("confirm-delete-message")}
          >
            <AiOutlineDelete
              size={20}
              className="text-red-400 cursor-pointer"
              title={t("delete-article")}
            />
          </ConfirmModal>

          <ArticleForm method="PUT" initialForm={article}>
            <FaPencilAlt
              size={20}
              className="text-blue-400 cursor-pointer"
              title={t("edit-article")}
            />
          </ArticleForm>
        </div>
        <SortableKnob>
          <div
            className={`text-gray-400 dark:text-white self-center ${
              cursorStyle ? "cursor-grabbing" : "cursor-grab"
            }`}
            onMouseDown={() => setCursorStyle(true)}
            onMouseUp={() => setCursorStyle(false)}
            title={t("drag-to-reorder") || "Drag to reorder"}
          >
            <RiDraggable size={20} />
          </div>
        </SortableKnob>
      </div>
    </SortableItem>
  );
}
