"use client";

import Image from "next/image";
import { useRef, useState, useEffect, ChangeEvent, FormEvent, KeyboardEvent } from "react";

import { useAuth } from "@/stores/Auth-store/Auth-srore";

import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

import AnimateScale from "@/lib/Animation/AnimateScale";
import { errorToast, successToast } from "@/components/custom/toast";
import { getFileUrl } from "@/utils/helper";
import { useTranslations } from "next-intl";

export default function UserAvatar() {
  const t = useTranslations("settings.userAvatar");

  const imageRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);

  const { user, changeImage, updateUserName } = useAuth((state) => state);
  const [userName, setUserName] = useState(user?.userName || "");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isEditing) {
      nameRef.current?.focus();
    }
  }, [isEditing]);

  const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    try {
      const file = e.target.files[0];
      const url = await getFileUrl(file);

      if (url) {
        changeImage(url);
        successToast(t("update-image-success"));
      } else {
        throw new Error(t("error-setting-user-image"));
      }
    } catch (err) {
      errorToast((err as Error).message);
    }
  };

  const handleSaveName = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!userName.trim()) {
      errorToast(t('error-user-name-empty'))
      return
    }

    updateUserName(userName.trim());
    successToast(t("success-update-userName"));
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setUserName(user?.userName || "");
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSaveName();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  const handleRemoveImage = () => {
    if (!user?.image) return;
    changeImage(null);
    successToast(t("image-removed-success"));
  };

  return (
    <AnimateScale className="flex flex-col gap-3 flex-[0.5] items-center text-center dark:text-white relative transition-all">
      {/* Avatar with hover controls */}
      <div className="relative w-32 h-32 rounded-full overflow-hidden group">
        <Image
          src={user?.image || "/default-avatar.png"}
          width={128}
          height={128}
          alt={t("user-image-label")}
          className="w-full h-full bg-black dark:bg-primary-dark object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-focus:opacity-100 group-hover:opacity-100 flex items-center justify-center gap-3">
          <input
            type="file"
            hidden
            ref={imageRef}
            onChange={handleChangeImage}
            accept="image/*"
          />
          <button onClick={() => imageRef.current?.click()} title={t("upload-image")}>
            <FaFileUpload size={22} className="text-white hover:text-primary transition cursor-pointer" />
          </button>
          <button onClick={handleRemoveImage} title={t("remove-image")}>
            <MdOutlineDeleteOutline size={22} className="text-white hover:text-red-600 transition cursor-pointer" />
          </button>
        </div>
      </div>

      {/* Editable Username */}
      <div className="flex items-center gap-2 transition-all">
        {isEditing ? (
          <form onSubmit={handleSaveName} className="flex items-center gap-2 dark:bg-">
            <input
              ref={nameRef}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="rounded-xs p-1 bg-white dark:bg-primary-dark text-sm outline-hidden focus:ring-2 focus:ring-primary"
            />
            <button type="submit" title={t("save-name")}>
              <FaCheck size={16} className="dark:text-white text-green-500 hover:text-green-700 cursor-pointer" />
            </button>
            <button type="button" onClick={handleCancelEdit} title={t("cancel-edit")}>
              <IoIosClose size={25} className="dark:text-white text-red-500 hover:text-red-700 cursor-pointer" />
            </button>
          </form>
        ) : (
          <>
            <span className="font-medium text-lg">{userName}</span>
            <button onClick={() => setIsEditing(true)} >
              <FaPenToSquare size={16} className="text-primary hover:text-primary/80 cursor-pointer" />
            </button>
          </>
        )}
      </div>
    </AnimateScale>
  );
}
