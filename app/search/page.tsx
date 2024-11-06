import handleSearch from "@/actions/handleSearch";
import { redirect } from "next/navigation";

export default async function GrantSearch() {
  async function submitSearch(formData: FormData) {
    "use server";
    const result = await handleSearch(formData);
    if (result.searchTerm) {
      redirect(`/search/${result.searchTerm.replace("", "-")}`);
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
      <div className="w-full backdrop-blur-sm pt-10 ">
        <div className="max-w-7xl mx-auto py-12 px-4">
          <h1 className="text-3xl font-serif font-bold text-gray-200 mb-8 text-center">
            GrantScan
          </h1>
          <form action={submitSearch} className="max-w-3xl mx-auto">
            <input
              type="text"
              name="query"
              placeholder="Search Projects"
              defaultValue={""}
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
    </div>
  );
