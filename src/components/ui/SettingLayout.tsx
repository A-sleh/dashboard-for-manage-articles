"use client";

import { FC, ReactNode } from "react";

interface SettingLayoutProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  description?: string;
}

const SettingLayout: FC<SettingLayoutProps> = ({
  title,
  icon,
  children,
  description,
}) => (
  <div className="flex justify-between items-center p-5 bg-white dark:bg-primary-dark rounded-2xl shadow-sm hover:shadow-lg hover:scale-[1.01] transition-all border border-gray-100 dark:border-white w-full">
    <div className="flex flex-col gap-1 text-gray-900 dark:text-gray-100 max-w-[70%]">
      <div className="flex items-center gap-3">
        <span className="text-primary dark:text-primary/80">{icon}</span>
        <h3 className="font-semibold text-base md:text-lg tracking-tight">
          {title}
        </h3>
      </div>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 ml-7">
          {description}
        </p>
      )}
    </div>
    <div className="flex-shrink-0">{children}</div>
  </div>
);

export default SettingLayout;
