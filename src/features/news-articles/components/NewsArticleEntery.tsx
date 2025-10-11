import React from "react";

import { NewsArticle } from "@/models/NewsArticles";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

interface NewsArticleEnteryProps {
  article: NewsArticle;
}

function NewsArticleEntery({
  article: { title, author, content, description, url, urlToImage },
}: NewsArticleEnteryProps) {
  const validImageUrl =
    urlToImage?.startsWith("http://") || urlToImage?.startsWith("https://")
      ? urlToImage
      : undefined;

  return (
    <a href={url}>
      <Card sx={{ maxWidth: 345 ,height: '100%' }}>
        <CardActionArea>
          <CardMedia
            sx={{ height: 140 }}
            image={validImageUrl}
            title="green iguana"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              lineHeight={1.2}
            >
              {title}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </a>
  );
}

export default NewsArticleEntery;
