"use client";

import Article from "./Article";
import { arrayMoveImmutable } from "array-move";
import { useArticles } from "@/stores/Article-store/Articles-store";

import SortableList from "react-easy-sort";
import NotFoundMessage from "@/components/ui/NotFoundMessage";
import ArticleForm from "./ArticleForm";

import { useTranslations } from "next-intl";
import AnimateParentLeftEffect, {
  AnimateChildLeftEffect,
} from "@/lib/Animation/AnimateParentLeftEffect";

export default function ArticlesList() {
  const t = useTranslations("articles");
  const { getAllArticles, updateArticles } = useArticles((state) => state);
  const articles = getAllArticles();
  // For sortable items
  const onSortEnd = (oldIndex: number, newIndex: number) => {
    const newSortedArticles = arrayMoveImmutable(articles, oldIndex, newIndex);
    updateArticles(newSortedArticles);
  };

  return (
    <section className="p-1 w-full space-y-2">
      <ArticleForm method="POST">
        <button className="px-4 py-1 rounded-md text-white bg-primary dark:bg-primary-dark cursor-pointer">
          {t("new-article")}
        </button>
      </ArticleForm>
      <SortableList onSortEnd={onSortEnd} draggedItemClassName="dragged">
        {articles?.length === 0 ? (
          <NotFoundMessage message={t("no-articles-message")} />
        ) : (
          <AnimateParentLeftEffect className="list space-y-2">
            {articles?.map((article, Idx: number) => (
              <AnimateChildLeftEffect duration={Idx / 3}>
                <Article article={article} key={article.id} />
              </AnimateChildLeftEffect>
            ))}
          </AnimateParentLeftEffect>
        )}
      </SortableList>
    </section>
  );
}
