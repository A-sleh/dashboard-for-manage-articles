"use client";

import { cn } from "@/lib/utils";
import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface IConfirmeModel {
  handleCancel: () => void;
  handleApply: () => void;
  showModal: boolean;
  message: string;
}

const UpplayChangesModel: FC<IConfirmeModel> = ({
  handleApply,
  handleCancel,
  showModal,
  message
}) => {
  const t = useTranslations("model");
  const locale = useNavSetting(state => state.lang)

  return (
    <>
      {showModal && (
        <div className={cn("fixed bottom-4  z-50 animate-slide-up transition-all",locale === "en" ? "left-4 animate-slide-left" : "right-4 animate-slide-right")}>
          <div className="bg-white dark:bg-primary-dark border border-gray-200 dark:border-white shadow-xl rounded-lg px-4 py-3 flex items-center gap-3">
            <span className="text-sm text-gray-700 dark:text-gray-200">
              {message}
            </span>
            <div className="flex gap-2 ml-auto">
              <button
                onClick={handleCancel}
                className="cursor-pointer px-3 py-1 text-sm rounded-md bg-gray-200 dark:bg-secondary-dark hover:bg-gray-300 dark:text-white dark:hover:bg-gray-600 transition"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleApply}
                className="cursor-pointer px-3 py-1 text-sm rounded-md bg-primary   hover:bg-primary/80 transition-all text-white dark:text-black"
              >
                {t('apply')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation styles */}
      <style jsx>{`
        @keyframes slide-right {
          from {
            transform: translateX(50%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slide-left {
          from {
            transform: translateX(-50%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-right {
          animation: slide-right 0.3s ease-out;
        }

        .animate-slide-left {
          animation: slide-left 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default UpplayChangesModel;
