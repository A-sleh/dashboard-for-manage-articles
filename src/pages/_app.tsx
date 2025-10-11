import "@/styles/globals.css";

import Head from "next/head";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { Inter } from "next/font/google";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { NextIntlClientProvider } from "next-intl";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <div className={inter.className}>
      <Head>
        <title key="title">Nextjs News - App</title>
        <meta
          name="description"
          content="The latest news cames from  news api"
        />
      </Head>
      <div className="">
        <NextIntlClientProvider>

        {getLayout(<Component {...pageProps} />)}
        </NextIntlClientProvider>
        <Toaster position="top-right" />
      </div>
    </div>
  );
}
