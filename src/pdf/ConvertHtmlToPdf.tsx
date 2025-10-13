// @ts-nocheck

import React from "react";
import { Text, View, StyleSheet, Link, Font } from "@react-pdf/renderer";
import { parseDocument } from "htmlparser2";

type IListContext = {
  type: string;
  count?: number;
};

const baseStyles = StyleSheet.create({
  ol: { marginBottom: 8, paddingLeft: 14, display: "flex", flexDirection: "column", width: "100%" },
  ul: { marginBottom: 8, paddingLeft: 14, display: "flex", flexDirection: "column", width: "100%" },
  li: { marginBottom: 4, padding: 15 },
  listItemMarker: { width: 14, fontSize: 12 },
  text: {},
  strong: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
  underline: { textDecoration: "underline" },
  link: { color: "blue", textDecoration: "underline" },
  todoContainer: { flexDirection: "row", alignItems: "center" },
  checkbox: { width: 10, height: 10, borderWidth: 1, borderColor: "#000", marginRight: 6 },
  checkboxChecked: { backgroundColor: "#000" },
  todoText: { flex: 1 },
  h1: { fontSize: 24, fontWeight: "bold", marginBottom: 1 },
  h2: { fontSize: 22, fontWeight: "bold", marginBottom: 1 },
  h3: { fontSize: 20, fontWeight: "bold", marginBottom: 1 },
  h4: { fontSize: 18, fontWeight: "bold", marginBottom: 1 },
  h5: { fontSize: 16, fontWeight: "bold", marginBottom: 1 },
  h6: { fontSize: 14, fontWeight: "bold", marginBottom: 1 },
});

const getLocaleStyles = (locale: string) => {
  const isArabic = locale?.startsWith("ar");
  return {
    direction: isArabic ? "rtl" : "ltr",
    textAlign: isArabic ? "right" : "left",
    fontFamily: "Amiri" 
  };
};

const withFont = (style: any = {}, locale: string = "en") => [
  style,
  {
    fontFamily: getLocaleStyles(locale).fontFamily,
    textAlign: getLocaleStyles(locale).textAlign,
  },
];

function renderNode(node: any, index: number, listContext: IListContext = {} as IListContext, locale: string) {
  if (typeof node === "string") {
    return (
      <Text key={index} style={withFont(baseStyles.text, locale)}>
        {node}
      </Text>
    );
  }

  if (node.type === "text") {
    return (
      <Text key={index} style={withFont(baseStyles.text, locale)}>
        {node.data}
      </Text>
    );
  }

  if (node.type === "tag") {
    const children = node.children
      ? node.children.map((child: any, i: number) => renderNode(child, i, listContext, locale))
      : null;

    switch (node.name) {
      case "p":
        return (
          <Text key={index} style={withFont(baseStyles.text, locale)}>
            {children}
          </Text>
        );
      case "strong":
      case "b":
        return (
          <Text key={index} style={withFont(baseStyles.strong, locale)}>
            {children}
          </Text>
        );
      case "i":
      case "em":
        return (
          <Text key={index} style={withFont(baseStyles.italic, locale)}>
            {children}
          </Text>
        );
      case "u":
        return (
          <Text key={index} style={withFont(baseStyles.underline, locale)}>
            {children}
          </Text>
        );
      case "a":
        return (
          <Link key={index} src={node.attribs.href} style={withFont(baseStyles.link, locale)}>
            {children}
          </Link>
        );
      case "ol": {
        let count = 1;
        const newContext = { ...listContext, type: "ol" };
        return (
          <View
            key={index}
            style={[
              ...withFont(baseStyles.ol, locale),
              { textAlign: getLocaleStyles(locale).textAlign },
            ]}
          >
            {node.children.map((child: any, i: number) =>
              child.name === "li" ? renderNode(child, i, { ...newContext, count: count++ }, locale) : null
            )}
          </View>
        );
      }
      case "ul": {
        return (
          <View
            key={index}
            style={[
              ...withFont(baseStyles.ul, locale),
              { textAlign: getLocaleStyles(locale).textAlign },
            ]}
          >
            {node.children.map((child: any, i: number) =>
              child.name === "li" ? renderNode(child, i, { type: "ul" }, locale) : null
            )}
          </View>
        );
      }
      case "li": {
        const marker = listContext.type === "ol" ? `${listContext.count}` : "\u2022";
        return (
          <View
            key={index}
            style={withFont(
              {
                flexDirection: getLocaleStyles(locale).direction === "rtl" ? "row-reverse" : "row",
                marginBottom: 4,
                display: "flex",
                alignItems: "center",
              },
              locale
            )}
          >
            <Text style={withFont(baseStyles.listItemMarker, locale)}>{marker}</Text>
            <Text style={withFont(baseStyles.text, locale)}>{children}</Text>
          </View>
        );
      }
      
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6":
        const nodeName: 'h1'|'h2'|'h3'|'h4'|'h5'|'h6' =  node.name
        return (
          <Text key={index} style={withFont(baseStyles[nodeName], locale)}>
            {children}
          </Text>
        );
      default:
        return (
          <Text key={index} style={withFont(baseStyles.text, locale)}>
            {children}
          </Text>
        );
    }
  }

  return null;
}

export default function HtmlToPdf({ html, locale }: { html: string; locale: string }) {
  const dom = parseDocument(html);
  const { direction, textAlign, fontFamily } = getLocaleStyles(locale);

  
  return (
    <View style={{ fontFamily, width: "100%", textAlign, direction }}>
      {dom.children.map((node, i) => renderNode(node, i, {} as IListContext, locale))}
    </View>
  );
}
