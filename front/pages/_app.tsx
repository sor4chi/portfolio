import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { usePageView, GoogleAnalytics } from "lib/gtag";

function MyApp({ Component, pageProps }: AppProps) {
  usePageView(); // 追加

  return (
    <>
      <GoogleAnalytics />

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
