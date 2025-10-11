"use client";

import { IArticle } from "@/stores/Article-store/Articles-store";
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import HtmlToPdf from "../ConvertHtmlToPdf";
import { formatDate } from "@/utils/helper";

Font.register({
  family: "Amiri",
  fonts: [
    {
      src: "/fonts/arabic/Amiri-Regular.ttf",
      fontWeight: "normal",
    },
    {
      src: "/fonts/arabic/Amiri-Bold.ttf",
      fontWeight: "bold",
    },
    {
      src: "/fonts/arabic/Amiri-Italic.ttf",
      fontStyle: "italic",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontFamily: "Amiri",
    direction: "rtl", // RTL support
  },
  section: {
    display: "flex",
    gap: 10,
    flexDirection: "column",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    flex: 1,
  },
  image: {
    width: "80%",
    height: 400,
    backgroundColor: "#1C6EA4",
    alignSelf: "center",
  },
  tages: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "center",
    gap: 10,
  },
  tage: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#1C6EA4",
    fontSize: 12,
    color: "#FFFFFF",
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
  },
  dateContainer: {
    fontSize: 15,
    marginHorizontal: 10,
    textAlign: "left",
  },
  categoryContainer: {
    display: "flex",
  },
  category: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 5,
    fontSize: 12,
    color: "#ffffff",
    backgroundColor: "#1C6EA4",
  },
  spaceBetweenContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
});

// Main PDF Component
export const ArticlePdf = ({
  article,
  locale,
}: {
  article: IArticle;
  locale: "ar" | "en";
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={[
            styles.spaceBetweenContainer,
            { flexDirection: locale == "ar" ? "row-reverse" : "row" },
          ]}
        >
          <View style={{ textAlign: locale == "ar" ? "right" : "left" }}>
            <Text style={styles.title}>{article.title}</Text>
            <View
              style={[
                styles.categoryContainer,
                { flexDirection: locale == "ar" ? "row-reverse" : "row" },
              ]}
            >
              <Text style={styles.category}>{article.category}</Text>
            </View>
          </View>
          <Text style={styles.dateContainer}>
            {formatDate(article.scheduled || "", locale)}
          </Text>
        </View>

        <View style={[styles.container]}>
          {article.cover && (
            <Image src={article.cover.trim()} style={styles.image} />
          )}
          <View style={styles.tages}>
            {article?.tags?.map((tag, i) => (
              <Text key={i} style={styles.tage}>
                {tag}
              </Text>
            ))}
          </View>
          <View
            style={{
              fontFamily: "Amiri",
              width: "100%",
              textAlign: locale == "ar" ? "right" : "left",
            }}
          >
            {HtmlToPdf({ html: article.richText, locale: locale })}
          </View>
        </View>
      </Page>
    </Document>
  );
};
