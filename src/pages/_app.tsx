import "@/styles/globals.css";
import "@/styles/modal.css";
import "react-datepicker/dist/react-datepicker.css";

import { NextPage } from "next";
import { Readex_Pro } from "next/font/google";
import { ReactElement, ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import type { AppProps } from "next/app";
import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";
import { useHydration } from "@/hooks/useHydration";
import Loading from "@/components/ui/Loading";
import { Toaster } from "react-hot-toast";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const inter = Readex_Pro({ subsets: ["arabic"] });

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const { isDarkMode, lang } = useNavSetting((state) => state);
  const hydration = useHydration();

  return (
    <div className={inter.className}>
      <div
        className={`${isDarkMode ? "dark" : ""}`}
        dir={lang == "ar" ? "rtl" : "ltr"}
      >
        {hydration ? (
          <Loading />
        ) : (
          <NextIntlClientProvider
            messages={pageProps?.messages || {}}
            locale={pageProps?.locale || "en"}
          >
            {getLayout(<Component {...pageProps} />)}
          </NextIntlClientProvider>
        )}
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
