"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import DatePicker from "react-datepicker";
import CKEdite from "@/components/ui/CKEdite";
import MainInput from "@/components/ui/MainInput";
import ToggleButton from "@/components/ui/ToggleButton";
import Model from "@/components/Model/Model";
import MultiSelectInput from "@/components/ui/MultiSelectInput";
import SelectInput from "@/components/ui/SelectInput";
import FileInputSecondary from "@/components/ui/FileInputSecondary";

import { arSA, enUS } from "date-fns/locale";
import { IArticle, useArticles } from "@/stores/Article-store/Articles-store";
import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";
import { errorToast, successToast } from "@/components/custom/toast";
import { delayChangeState, getFileUrl } from "@/utils/helper";
import { MdClose } from "react-icons/md";
import AnimateFromToRight from "@/lib/Animation/AnimateFromLeftToRight";
import AnimateScale from "@/lib/Animation/AnimateScale";

const Categories = {
  en: ["Article", "Post", "Short post"],
  ar: ["مقالة", "منشور", "منشور قصير"],
};

const tags = {
  ar: ["اخبار", "شخصي", "رياضة"],
  en: ["News", "Personal", "Sport"],
};

const localInitialForm: IArticle = {
  id: 0,
  title: "",
  category: "",
  tags: [],
  cover: "",
  published: false,
  scheduled: null,
  richText: "",
  localUrl: "",
  views: 0,
};

export default function ArticleForm({
  initialForm,
  method,
  children,
}: {
  initialForm?: IArticle;
  method: "POST" | "PUT";
  children: React.ReactElement;
}) {
  const t = useTranslations("articles.article-form");
  const locale = useNavSetting((state) => state.lang);

  const [closeModel, setCloseModel] = useState(false);
  const [form, setForm] = useState<IArticle>(initialForm ?? localInitialForm);
  const { createArticle, updateArticle } = useArticles((state) => state);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!form.cover) {
      errorToast(t('empty-cover-image'))
      return 
    }

    try {
      if (method === "POST") {
        await createArticle(form);
        successToast(t("success-add"));
        setForm(localInitialForm);
        delayChangeState(setCloseModel);
        return;
      }
      await updateArticle(form.id, form);
      successToast(t("success-update"));
      delayChangeState(setCloseModel);
    } catch (err) {
      errorToast((err as Error).message);
    }
  };

  const handleFileSelected = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const localUrl = e.target.value.toString();

    try {
      const url = (await getFileUrl(e.target.files[0], ["jpeg", "png"])) ?? "";
      setForm((prev) => ({ ...prev, cover: url, localUrl }));
    } catch (err) {
      errorToast((err as Error).message);
    }
  };

  return (
    <Model outCloseAction={closeModel}>
      <Model.Open opens="new-article">{children}</Model.Open>
      <Model.Window name="new-article">
        <form
          className="p-3 px-5 bg-white dark:bg-primary-dark shadow-xl rounded-lg max-h-[90vh] w-[90vw] md:w-full overflow-y-auto no-scrollbar transition-all duration-300"
          onSubmit={onSubmit}
          style={{}}
        >
          <Model.Close>
            <button className="flex justify-end w-full p-1 cursor-pointer dark:text-white ">
              <MdClose size={24} />
            </button>
          </Model.Close>
          {/* Title and Image */}
          <AnimateFromToRight className="flex flex-col md:flex-row gap-3 mb-2">
            <MainInput
              label={t("title")}
              type="text"
              placeHolder={t("title-placeholder")}
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <div className="mb-1 flex flex-col w-full">
              <label className="text-primary dark:text-white mb-1">
                {t("date")}
              </label>
              <DatePicker
                required
                className="px-4 py-2 bg-white w-full text-secondary-dark dark:text-white dark:bg-transparent placeholder:text-sm dark:placeholder:text-white dark:border dark:border-white outline-hidden shadow-sm rounded-sm"
                selected={form.scheduled}
                locale={locale == "ar" ? arSA : enUS}
                placeholderText={t("date-placeholder")}
                onChange={(date) => setForm({ ...form, scheduled: date })}
              />
            </div>
          </AnimateFromToRight>

          {/* Category & Date */}
          <AnimateFromToRight
            delay={0.2}
            className="flex flex-col md:flex-row gap-3 mb-4"
          >
            <SelectInput
              label={t("category")}
              values={Categories[locale]}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              value={form?.category}
            />

            <FileInputSecondary
              label={t("cover-image")}
              placeHolder={t("cover-image-placeholder")}
              onChange={handleFileSelected}
              value={form.localUrl}
            />
          </AnimateFromToRight>

          {/* Tags and Published */}
          <AnimateFromToRight
            delay={0.4}
            className="flex flex-col md:flex-row items-end gap-3 mb-2"
          >
            <MultiSelectInput
              label={t("tags")}
              options={tags[locale]}
              selectedValues={form.tags}
              onChange={(values) => setForm({ ...form, tags: values })}
              placeholder={t("tags-placeholder")}
            />

            <div className="flex items-center gap-2 justify-between w-full flex-1">
              <label
                onClick={() => setForm({ ...form, published: !form.published })}
                htmlFor="toggle"
                className="text-sm font-medium text-gray-800 dark:text-gray-200 text-nowrap"
              >
                {t(form.published ? "published" : "un-published")}
              </label>
              <ToggleButton
                value={form.published}
                onChangeFn={() =>
                  setForm({ ...form, published: !form.published })
                }
              />
            </div>
          </AnimateFromToRight>

          {/* Rich Text Editor */}
          <AnimateFromToRight
            delay={0.6}
            className="my-4 border border-gray-300 dark:border-white rounded-lg  bg-gray-50 dark:bg-secondary-dark w-full md:w-[50vw]"
          >
            <CKEdite
              setRichText={(data) => setForm({ ...form, richText: data })}
              initalValue={form.richText}
              placeholder={t("ckeditor-placeholder")}
            />
          </AnimateFromToRight>

          {/* Submit Button */}
          <AnimateScale>
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2 rounded-md bg-primary dark:bg-secondary-dark text-white hover:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300"
            >
              {t("confirm")}
            </button>
          </AnimateScale>
        </form>
      </Model.Window>
    </Model>
  );
}
