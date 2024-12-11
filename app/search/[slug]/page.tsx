import HeaderAttribution from "@/components/attribution";
import Loading from "@/components/loading";
import { Suspense } from "react";
import GetOrgs from "@/actions/getOrgs";
import GetSearchResults from "@/actions/getSearchResults";
import SearchInput from "@/components/searchInput";
import ResultsClient from "@/components/searchResults";
import { Metadata } from "next";

type tParams = Promise<{ slug: string[] }>;

export const dynamicParams = true;
export const revalidate = 300;

const frame = {
  version: "next",
  imageUrl: `https://grantscan.org/og.png`,
  button: {
    title: "Open Frame",
    action: {
      type: "launch_frame",
      name: "GrantScan | Indexing all grant applications ever ",
      url: `https://grantscan.org/search/all`,
      splashImageUrl: `https://grantscan.org/splash.png`,
      splashBackgroundColor: "#020202",
    },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "GrantScan",
    description: "Indexing all grant applications ever",
    openGraph: {
      title: "GrantScan",
      description: "Indexing all grant applications ever",
      images: [`https://grantscan.org/og.png`],
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default async function GrantSearch(props: { params: tParams }) {
  const { slug } = await props.params;
  const query = String(slug)?.replace(/-+/g, " ") || "";
  const orgs = await GetOrgs();

  const results = await GetSearchResults(query);

  return (
    <div
      className="min-h-screen bg-black text-gray-300"
      style={{
        backgroundImage:
          "radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 100%)",
      }}
    >
      <HeaderAttribution />
      <SearchInput orgs={orgs} />
      <Suspense fallback={<Loading />}>
        <ResultsClient searchResults={results} query={query} />
      </Suspense>
    </div>
  );
}
