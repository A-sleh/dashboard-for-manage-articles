"use client";

import { createPortal } from "react-dom";
import AnimateScale from "@/lib/Animation/AnimateScale";
import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  ReactElement,
  MouseEvent,
} from "react";
import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";

type OpenProps = {
  children: ReactElement;
  opens: string;
};

type WindowProps = {
  children: ReactNode;
  name: string;
  className?: string;
};

type ModalContextType = {
  openName: string;
  open: (name: string) => void;
  close: () => void;
};

const ModalContext = createContext<ModalContextType>({} as ModalContextType);

function Modal({
  children,
  outCloseAction,
}: {
  children: ReactNode;
  outCloseAction?: boolean;
}) {
  const [openName, setOpenName] = useState<string>("");

  const close = () => setOpenName("");
  const open = setOpenName;

  useEffect(() => {
    if (outCloseAction) close();
  }, [outCloseAction]);

  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens }: OpenProps) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opens) });
}

function Close({ children }: { children: ReactNode }) {
  const { close } = useContext(ModalContext);
  return cloneElement(children as ReactElement, { onClick: close });
}

function Window({ children, name, className = "" }: WindowProps) {
  const { isDarkMode, lang } = useNavSetting((state) => state);
  const { openName, close } = useContext(ModalContext);

  if (name !== openName) return null;

  return createPortal(
    <div
      onClick={close}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`bg-[#0000004d] fixed inset-0 h-screen z-40 overflow-hidden ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <AnimateScale
        onClick={(e: MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.stopPropagation();
        }}
        className={`fixed top-1/2 left-1/2 z-50 translate-x-[-50%] translate-y-[-50%] p-2 hide-scrollbar  overflow-auto w-[90%] md:w-fit ${className}`}
      >
        {children}
      </AnimateScale>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Close = Close;
Modal.Window = Window;

export default Modal;
