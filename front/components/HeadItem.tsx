import * as React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

interface Props {
  title: string;
  description: string;
  keyword: string;
  image: string;
}

const HeadItem = ({
  title,
  description,
  keyword,
  image,
}: Props): JSX.Element => {
  const router = useRouter();
  const url = process.env.CurrentURL + router.pathname;
  return (
    <Head>
      <title>{title + " | Monica's Portfolio"}</title>
      <meta property="og:title" content={title + " | Monica's Portfolio"} />
      <meta property="og:description" content={description} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keyword} />
      <meta property="og:type" content="blog" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={title + " | Monica's Portfolio"} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@tcr_jp" />
      <meta name="twitter:url" content={image} />
      <meta name="twitter:title" content={title + " | Monica's Portfolio"} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={url} />
      <link rel="shortcut icon" href={""} />
      <link rel="apple-touch-icon" href={""} />
    </Head>
  );
};
export default HeadItem;
