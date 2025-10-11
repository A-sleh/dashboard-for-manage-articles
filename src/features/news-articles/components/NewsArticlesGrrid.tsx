import { NewsArticle } from "@/models/NewsArticles";

import { Grid } from "@mui/material";
import NewsArticleEntery from "./NewsArticleEntery";

interface NewsArticlesGrridProps {
  articles: NewsArticle[];
}

function NewsArticlesGrrid({ articles }: NewsArticlesGrridProps) {
  return (
    <Grid container spacing={2} className="my-5">
      {articles?.map((article) => (
        <NewsArticleEntery article={article} />
      ))}
    </Grid>
  );
}

export default NewsArticlesGrrid;
