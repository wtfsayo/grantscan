"use server";

import handleSearch from "@/actions/handleSearch";
import HeaderAttribution from "@/components/attribution";
import { ExternalLink } from "lucide-react";
import { redirect } from "next/navigation";

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

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function GrantSearch({
  params,
}: {
  params: { query: string };
}) {
  // Convert hyphenated URL back to spaces for display and search
  const query = params?.query ? params?.query.replace(/-+/g, " ") : " ";
  let searchResults: SearchResponse | null = null;

  if (query.trim()) {
    // Use the space-formatted query for the actual search
    const response = await fetch(
      `http://localhost:3000/search/${encodeURIComponent(query)}`,
    );
    searchResults = await response.json();
  }

  async function submitSearch(formData: FormData) {
    "use server";
    const result = await handleSearch(formData);
    if (result.searchTerm) {
      redirect(`/search/${result.searchTerm}`);
    } else {
      redirect("/search/");
    }
  }

  return (
    <div
      className="min-h-screen bg-black text-gray-300"
      style={{
        backgroundImage:
          "radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 100%)",
      }}
    >
      {/* Search Header Section */}
      <HeaderAttribution />
      <div className="w-full border-b border-gray-800 backdrop-blur-sm pt-10">
        <div className="max-w-7xl mx-auto py-12 px-4">
          <h1 className="text-3xl font-serif font-bold text-gray-200 mb-8 text-center">
            GrantScan
          </h1>
          <form action={submitSearch} className="max-w-3xl mx-auto">
            <input
              type="text"
              name="query"
              placeholder="Search Projects"
              defaultValue={query}
              className="w-full bg-[#1E1E1E] border border-gray-700 rounded-lg px-6 py-3 text-gray-300 focus:outline-none focus:border-gray-600 text-lg"
            />
          </form>
          <div className="flex gap-2 mt-4 max-w-3xl mx-auto overflow-x-auto py-2">
            <button className="px-4 py-1.5 rounded-full bg-gray-800 text-gray-300 text-sm hover:bg-gray-700">
              All
            </button>
            <button className="px-4 py-1.5 rounded-full bg-[#1E1E1E] text-gray-400 text-sm hover:bg-gray-800">
              RetroPGF
            </button>
            <button className="px-4 py-1.5 rounded-full bg-[#1E1E1E] text-gray-400 text-sm hover:bg-gray-800">
              Grants
            </button>
            <button className="px-4 py-1.5 rounded-full bg-[#1E1E1E] text-gray-400 text-sm hover:bg-gray-800">
              Missions
            </button>
          </div>
        </div>
      </div>

      {/* Results Section - Only shown when there's a query */}
      {query.trim() && searchResults && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-sm text-gray-400 mb-6">
            {`Found ${searchResults.count} grant applications`}
          </div>

          <div className="space-y-4">
            {searchResults.results.map((result) => (
              <div
                key={`${result.projectId}-${result.id}-${Math.floor(Math.random() * 16777215).toString(16)}`}
                className="bg-[#1E1E1E] border border-gray-800 rounded-lg p-6 backdrop-blur-sm hover:border-gray-700 transition-colors"
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-medium text-gray-200">
                    {result.projectName}
                  </h3>
                  <a
                    href={result.contentURI}
                    className="text-gray-400 hover:text-gray-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-gray-500 min-w-32">
                        Registration Contract:
                      </span>
                      <span className="text-gray-300 break-all">
                        {result.projectId}
                      </span>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="text-gray-500 min-w-32">
                        Grant Pool:
                      </span>
                      <span>{result.grantPoolName}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-gray-500 min-w-32">
                        Grant PoolID:
                      </span>
                      <span>{result.grantPoolId}</span>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-gray-500 min-w-32">
                        Created At:
                      </span>
                      <span>{formatDate(result.createdAt)}</span>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="text-gray-500 min-w-32">
                        Funds Asked:
                      </span>
                      <span>
                        {result.fundsAsked[0]?.amount.toLocaleString() ?? 0}{" "}
                        {result.fundsAsked[0]?.denomination ?? ""}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-gray-500 min-w-32">
                        Funds Approved:
                      </span>
                      <span>
                        {result.fundsApproved[0]?.amount.toLocaleString() ?? 0}{" "}
                        {result.fundsApproved[0]?.denomination ?? ""}
                      </span>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="text-gray-500 min-w-32">
                        Content URI:
                      </span>
                      <span className="break-all text-blue-400 hover:text-blue-300">
                        <a
                          href={result.contentURI}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {result.contentURI}
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
