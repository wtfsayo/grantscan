import GetSearchResults from "@/actions/getSearchResults";
import ResultsClient from "@/components/searchResults";

interface FundsData {
  amount: number;
  denomination: string;
}

interface SearchResult {
  contentURI: string;
  createdAt: string;
  fundsApproved: FundsData[];
  fundsAsked: FundsData[];
  grantPoolId: string;
  grantPoolName: string;
  id: string;
  projectId: string;
  projectName: string;
}

interface SearchResponse {
  count: number;
  message: string;
  results: SearchResult[];
}

export default async function SearchResults({ query }: { query: string }) {
  const searchResults = (await GetSearchResults(
    query === "all" ? "" : query,
  )) as SearchResponse;

  if (!searchResults) return null;

  return <ResultsClient searchResults={searchResults} query={query} />;
}
