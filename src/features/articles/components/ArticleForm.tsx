// @ts-nocheck
"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { ChangeEvent, FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

import DatePicker from "react-datepicker";
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
import SubmitBtn from "@/components/ui/SubmitBtn";


const CKEdite = dynamic(() => import("@/components/ui/CKEdite"), {
  ssr: false,
});

const Categories = {
  en: ["Article", "Post", "Short post"],
  ar: ["مقالة", "منشور", "منشور قصير"],
};

const tags = {
  ar: ["اخبار", "شخصي", "رياضة"],
  en: ["News", "Personal", "Sport"],
};

export default function ArticleForm({
  initialForm,
  method,
  children,
}: {
  initialForm?: any;
  method: "POST" | "PUT";
  children: React.ReactElement;
}) {
  const t = useTranslations("articles.article-form");
  const locale = useNavSetting((state) => state.lang);
  const { createArticle, updateArticle } = useArticles((state) => state);
  const [closeModel, setCloseModel] = useState(false);

  const schema = yup.object({
    id: yup.number(),
    title: yup.string().required(t("title-required-msg")),
    category: yup.string().required(t("category-required-msg")),
    tags: yup.array().of(yup.string().required()).min(1, t("tags-required-msg")),
    scheduled: yup.date().required(t("date-required-msg")),
    cover: yup.string(),
    published: yup.boolean(),
    localUrl: yup.string(),
    richText: yup.string(),
    views: yup.number(),
  });

  type FormType = yup.InferType<typeof schema>;

  const { handleSubmit, control, setValue, reset, formState, getValues } =
    useForm<FormType>({
      defaultValues: (initialForm as FormType) ?? {
        id: 0,
        title: "",
        category: "",
        scheduled: new Date(),
        cover: "",
        tags: [],
        published: false,
        richText: "",
        localUrl: "",
        views: 0,
      },
      resolver: yupResolver(
        schema.pick(["title", "category", "tags", "scheduled"])
      ),
    });
  const { errors, isSubmitting } = formState;

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    try {
      if (method === "POST") {
        await createArticle(data as IArticle);
        successToast(t("success-add"));
        reset();
        delayChangeState(setCloseModel);
        return;
      }
      await updateArticle(initialForm?.id ?? 0, data as IArticle);
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

      setValue("cover", url);
      setValue("localUrl", localUrl);
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
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Model.Close>
            <button className="flex justify-end w-full p-1 cursor-pointer dark:text-white ">
              <MdClose size={24} />
            </button>
          </Model.Close>
          {/* Title and Image */}
          <AnimateFromToRight className="flex flex-col md:flex-row gap-3 mb-2">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <MainInput
                  label={t("title")}
                  type="text"
                  placeHolder={t("title-placeholder")}
                  error={errors.title?.message}
                  required
                  {...field}
                />
              )}
            />

            <div className="mb-1 flex flex-col w-full">
              <label className="text-primary dark:text-white mb-1">
                {t("date")}
              </label>
              <Controller
                name="scheduled"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    required
                    className="px-4 py-2 bg-white w-full text-secondary-dark dark:text-white dark:bg-transparent placeholder:text-sm dark:placeholder:text-white dark:border dark:border-white outline-hidden shadow-xs rounded-xs"
                    locale={locale === "ar" ? arSA : enUS}
                    placeholderText={t("date-placeholder")}
                  />
                )}
              />
              {errors.scheduled && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.scheduled.message}
                </p>
              )}
            </div>
          </AnimateFromToRight>

          {/* Category & Date */}
          <AnimateFromToRight
            delay={0.2}
            className="flex flex-col md:flex-row gap-3 mb-4"
          >
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <SelectInput
                  label={t("category")}
                  values={Categories[locale]}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={errors.category?.message}
                />
              )}
            />

            <FileInputSecondary
              label={t("cover-image")}
              placeHolder={t("cover-image-placeholder")}
              onChange={handleFileSelected}
              value={getValues("localUrl")}
            />
          </AnimateFromToRight>

          {/* Tags and Published */}
          <AnimateFromToRight
            delay={0.4}
            className="flex flex-col md:flex-row items-end gap-3 mb-2"
          >
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <MultiSelectInput
                  label={t("tags")}
                  options={tags[locale]}
                  selectedValues={field?.value || []}
                  onChange={(values) => field.onChange(values)}
                  placeholder={t("tags-placeholder")}
                />
              )}
            />

            <div className="flex items-center gap-2 justify-between w-full flex-1">
              <Controller
                name="published"
                control={control}
                render={({ field }) => (
                  <>
                    <label
                      htmlFor="toggle"
                      className="text-sm font-medium text-gray-800 dark:text-gray-200 text-nowrap cursor-pointer"
                      onClick={() => field.onChange(!field.value)}
                    >
                      {t(field.value ? "published" : "un-published")}
                    </label>
                    <ToggleButton
                      value={field.value || false}
                      onChangeFn={() => field.onChange(!field.value)}
                    />
                  </>
                )}
              />
            </div>
          </AnimateFromToRight>

          {/* Rich Text Editor */}
          <AnimateFromToRight
            delay={0.6}
            className="my-4 border border-gray-300 dark:border-white rounded-lg  bg-gray-50 dark:bg-secondary-dark w-full md:w-[50vw]"
          >
            <Controller
              name="richText"
              control={control}
              render={({ field }) => (
                <CKEdite
                  setRichText={(data) => field.onChange(data)}
                  initalValue={field.value || ""}
                  placeholder={t("ckeditor-placeholder")}
                />
              )}
            />
          </AnimateFromToRight>

          {/* Submit Button */}
          <AnimateScale>
            <SubmitBtn lable={t("confirm")} isLoading={isSubmitting} />
          </AnimateScale>
        </form>
      </Model.Window>
    </Model>
  );
}
