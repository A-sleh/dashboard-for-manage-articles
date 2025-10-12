"use client";

import React, { FC } from "react";
import { useTranslations } from "next-intl";

import { AiOutlineInfoCircle } from "react-icons/ai";

import Modal from "./Model";
import AnimateScale from "@/lib/Animation/AnimateScale";
import AnimateButton from "@/lib/Animation/AnimateButton";
import AnimateFromToRight from "@/lib/Animation/AnimateFromLeftToRight";

interface IConfirmeModal {
  handleApply: () => void;
  ModalKey: string;
  message: string;
  children: React.ReactElement;
}

const ConfirmModal: FC<IConfirmeModal> = ({
  handleApply,
  ModalKey,
  children,
  message,
}) => {
  const t = useTranslations("model");

  return (
    <Modal>
      <Modal.Open opens={ModalKey}>{children}</Modal.Open>
      <Modal.Window
        name={ModalKey}
        className="w-fit bg-white dark:bg-secondary-dark dark:text-white rounded-xs p-5"
      >
        <AnimateScale className=" text-gray-600 w-full">
          <AiOutlineInfoCircle size={100} className="mx-auto dark:text-white" />
        </AnimateScale>
        <AnimateFromToRight>
          <p className="text-center w-100 font-unset text-gray-600 dark:text-white my-3 px-3">
            {message}
          </p>
        </AnimateFromToRight>
        <div className="gap-2 flex justify-center ">
          <AnimateButton
            scale={0.9}
            className="px-3 py-1 bg-primary dark:bg-primary-dark hover:bg-primary-hover text-white transition-all duration-100 cursor-pointer hover:opacity-75  rounded-xs "
            onClick={() => handleApply()}
          >
            {t("apply")}
          </AnimateButton>
          <Modal.Close>
            <AnimateButton
              scale={0.9}
              className="px-3 py-1 bg-white  text-red-600 border transition-all duration-100 border-red-600 hover:bg-red-600 hover:text-white cursor-pointer rounded-xs"
            >
              {t("cancel")}
            </AnimateButton>
          </Modal.Close>
        </div>
      </Modal.Window>
    </Modal>
  );
};

export default ConfirmModal;
