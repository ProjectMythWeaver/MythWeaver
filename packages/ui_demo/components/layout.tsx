import Header from "./header";
import Footer from "./footer";
import type { ReactChildren } from "react";
import Head from "next/head";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      {/* <Header /> */}
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=VT323&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
}
