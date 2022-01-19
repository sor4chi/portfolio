import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

    return (
      <Html>
        <Head>
          <script
            id="gad-tag"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            data-ad-client={adsenseId}
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
