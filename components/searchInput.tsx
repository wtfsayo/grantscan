"use client";

import { useSearchParams, useRouter, useParams } from "next/navigation";
import handleSearch from "@/actions/handleSearch";
import Loading from "@/components/loading";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SearchIcon } from "lucide-react";

interface SearchInputProps {
  orgs: string[];
}

export default function SearchInput({ orgs }: SearchInputProps) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const { slug } = useParams();
  const query = slug || "all";
  const selectedOrg = searchParams?.get("org");

  const handleOrgClick = (org: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (org === "All") {
      params.delete("org");
    } else {
      params.set("org", org);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-full border-b border-gray-800 lg:backdrop-blur-sm pt-10">
      <Analytics />
      <div className="max-w-7xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-serif font-bold text-gray-200 mb-8 text-center">
          GrantScan
          <p className="text-sm font-sans font-light">
            Indexing all grant applications ever
          </p>
        </h1>

        <form action={handleSearch} className="max-w-3xl mx-auto relative">
          <input
            type="text"
            name="query"
            placeholder="Search Projects"
            defaultValue={
              query === "all" ? "" : query.toString().replace("-", " ")
            }
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 focus:outline-none focus:border-gray-600 text-lg pr-12"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-200 transition-colors"
          >
            <SearchIcon size={20} />
          </button>
        </form>
        <Suspense fallback={<Loading />}>
          <div className="flex gap-2 mt-4 max-w-3xl mx-auto overflow-x-auto py-2">
            <button
              onClick={() => handleOrgClick("All")}
              className={`w-max whitespace-nowrap rounded-full py-2 px-4 h-full text-sm transition-colors ${
                !selectedOrg
                  ? "bg-gray-800 text-white"
                  : "bg-gray-900 text-gray-400 hover:bg-gray-800"
              }`}
            >
              All
            </button>
            {orgs?.map((org: string, index: number) => (
              <button
                key={index}
                onClick={() => handleOrgClick(org)}
                className={`w-max whitespace-nowrap rounded-full py-2 px-4 h-full text-sm transition-colors ${
                  selectedOrg === org
                    ? "bg-gray-800 text-white"
                    : "bg-gray-900 text-gray-400 hover:bg-gray-800"
                }`}
              >
                {org}
              </button>
            ))}
          </div>
        </Suspense>
      </div>
    </div>
  );
}
