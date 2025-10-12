// @ts-nocheck
"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";

// Dynamically import CKEditor to avoid SSR issues
const CKEditor = dynamic(
  () => import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor),
  { ssr: false }
);

// Import open-source build (no license key required)
const ClassicEditor = dynamic(
  () => import("@ckeditor/ckeditor5-build-classic").then((mod) => mod.ClassicEditor),
  { ssr: false }
);


// If you want inline editing, use this instead:
// import InlineEditor from '@ckeditor/ckeditor5-build-inline';

export default function CKEdite({
  setRichText,
  initalValue,
  placeholder,
}: {
  setRichText: (data: string) => void;
  initalValue: string;
  placeholder?: string;
}) {
  const locale = useNavSetting((state) => state.lang);
  // const [isReady, setIsReady] = useState(false);

  // useEffect(() => {
  //   setIsReady(true);
  // }, []);

  // if (!isReady) return null;

  return (
    <div className="main-container ">
      <div className="editor-container dark:text-white">
        <CKEditor
          editor={ClassicEditor}
          data={initalValue}
          config={{
            placeholder: placeholder,
            bodyClass: 'bg-amber-300 ',
            language: locale,
            toolbar: [
              "undo",
              "redo",
              "|",
              "heading",
              "|",
              "bold",
              "italic",
              "underline",
              "|",
              "bulletedList",
              "numberedList",
            ],
            heading: {
              options: [
                {
                  model: "paragraph",
                  title: "Paragraph",
                  class: "ck-heading_paragraph",
                },
                {
                  model: "heading1",
                  view: "h1",
                  title: "Heading 1",
                  class: "ck-heading_heading1",
                },
                {
                  model: "heading2",
                  view: "h2",
                  title: "Heading 2",
                  class: "ck-heading_heading2",
                },
                {
                  model: "heading3",
                  view: "h3",
                  title: "Heading 3",
                  class: "ck-heading_heading3",
                },
                {
                  model: "heading4",
                  view: "h4",
                  title: "Heading 4",
                  class: "ck-heading_heading4",
                },
                {
                  model: "heading5",
                  view: "h5",
                  title: "Heading 5",
                  class: "ck-heading_heading5",
                },
                {
                  model: "heading6",
                  view: "h6",
                  title: "Heading 6",
                  class: "ck-heading_heading6",
                },
              ],
            },
          }}
          onChange={(_, editor) => {
            const data = editor.getData();
            setRichText(data);
          }}
        />
      </div>
    </div>
  );
}
