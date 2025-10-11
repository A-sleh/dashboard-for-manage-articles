import Head from "next/head";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";

import { NewsArticle, NewsResponse } from "@/models/NewsArticles";
import NewsArticlesGrrid from "@/components/NewsArticles/NewsArticlesGrrid";
import { Typography } from "@mui/material";

interface CategoryNewsProps {
  articles: NewsArticle[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  const paths = categories.map((slug) => ({ params: { category: slug } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<CategoryNewsProps> = async ({
  params,
}) => {
  const category = params?.category?.toString();
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_KEY}&category=${category}`
  );

  const newsResponse: NewsResponse = await response.json();
  return {
    props: {
      articles: newsResponse.articles || [],
    },
  };
};

function CategoryNews({ articles }: CategoryNewsProps) {
  const router = useRouter();
  const category = router.query.cateory?.toString();

  return (
    <>
      <Head>
        <title>{category} News - Next.js News App</title>
      </Head>
      <main>
        <Typography variant="h3" color="black">
          Categories News
        </Typography>
        <NewsArticlesGrrid articles={articles} />
      </main>
    </>
  );
}

export default CategoryNews;
