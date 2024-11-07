import handleSearch from "@/actions/handleSearch";
import { Suspense } from "react";
import OrgButtons from "@/components/orgbuttons";
import Loading from "@/components/loading";



export default async function GrantSearch() {
  return (
    <div
      className="min-h-screen bg-black text-gray-300"
      style={{
        backgroundImage:
          "radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 100%)",
      }}
    >
      {/* Search Header Section */}
      <div className="w-full backdrop-blur-sm pt-10 ">
        <div className="max-w-7xl mx-auto py-12 px-4">
          <h1 className="text-3xl font-serif font-bold text-gray-200 mb-8 text-center">
            GrantScan
          </h1>
          <form action={handleSearch} className="max-w-3xl mx-auto">
            <input
              type="text"
              name="query"
              placeholder="Search Projects"
              defaultValue={""}
              className="w-full bg-[#1E1E1E] border border-gray-700 rounded-lg px-6 py-3 text-gray-300 focus:outline-none focus:border-gray-600 text-lg"
            />
          </form>
          <div className="flex gap-2 mt-4 max-w-3xl mx-auto overflow-x-auto py-2">
            <Suspense fallback={<Loading />}>
            <OrgButtons />
          </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
