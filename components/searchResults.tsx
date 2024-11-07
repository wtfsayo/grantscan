"use client";

import { ExternalLink } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface FundsData {
  amount: number;
  denomination: string;
}

interface SearchResultMetadata {
  grantPoolId: string;
  grantPoolName: string;
  grantSystem: string;
  sourceFile: string;
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
  metadata: SearchResultMetadata;
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

export default function ResultsClient({
  searchResults,
  query,
}: {
  searchResults: SearchResponse;
  query: string;
}) {
  const searchParams = useSearchParams();
  const selectedOrg = searchParams?.get("org");

  // Filter results based on selected organization
  const filteredResults = selectedOrg
    ? searchResults.results.filter(
        (result) => result?.metadata?.grantSystem === selectedOrg,
      )
    : searchResults.results;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="text-sm text-gray-400 mb-6">
        {query === "all"
          ? selectedOrg
            ? `Showing ${filteredResults.length} results for ${query} in ${selectedOrg}`
            : `Showing all ${searchResults.count} results`
          : selectedOrg
            ? `Found ${filteredResults.length} grant applications for "${query}" in ${selectedOrg} grant system`
            : `Found ${searchResults.count} grant applications for "${query}"`}
      </div>

      <div className="space-y-4">
        {filteredResults.map((result) => (
          <div
            key={`${result.projectId}-${result.id}-${Math.floor(Math.random() * 16777215).toString(16)}`}
            className="bg-gray-900 border border-gray-800 rounded-lg p-6 backdrop-blur-sm hover:border-gray-700 transition-colors"
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
                  <span className="text-gray-500 min-w-32">Grant Pool:</span>
                  <span>{result.grantPoolName}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-500 min-w-32">Grant PoolID:</span>
                  <span>{result.grantPoolId}</span>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-gray-500 min-w-32">Created At:</span>
                  <span>{formatDate(result.createdAt)}</span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-gray-500 min-w-32">Funds Asked:</span>
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
                  <span className="text-gray-500 min-w-32">Content URI:</span>
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
  );
}
