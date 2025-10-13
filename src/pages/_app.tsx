import "@/styles/globals.css";
import "@/styles/modal.css"

import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { Readex_Pro } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { NextIntlClientProvider } from "next-intl";
import type { AppProps } from "next/app";
import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const inter = Readex_Pro({ subsets: ["arabic"] });

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const {isDarkMode,lang} = useNavSetting(state => state);
  
  return (
    <div className={inter.className}>
      <div className={`${isDarkMode ? 'dark' : ""}`} dir={lang == 'ar' ? 'rtl' : 'ltr'}>
        <NextIntlClientProvider
          messages={pageProps.messages}
          locale={pageProps.locale}
        >
          {getLayout(<Component {...pageProps} />)}
        </NextIntlClientProvider>
      </div>
        <Toaster position="top-right" />
    </div>
  );
}
