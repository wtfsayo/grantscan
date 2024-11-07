import HeaderAttribution from "@/components/attribution";
import Loading from "@/components/loading";
import { Suspense } from "react";

import GetOrgs from "@/actions/getOrgs";
import GetSearchResults from "@/actions/getSearchResults";
import SearchInput from "@/components/searchInput";
import ResultsClient from "@/components/searchResults";

type tParams = Promise<{ slug: string[] }>;

export const dynamicParams = true;

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
