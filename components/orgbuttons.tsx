import GetOrgs from "@/actions/getOrgs";
export default async function OrgButtons() {
    const orgs = await GetOrgs();
    
    return (
      <div className="flex gap-2 mt-4 max-w-3xl mx-auto overflow-x-auto py-2">
        <button className="px-4 py-1.5 rounded-full bg-[#1E1E1E] text-gray-400 text-sm hover:bg-gray-800">
          All
        </button>
        {orgs &&
          orgs.map((org: string, index: number) => (
            <button
              key={index}
              className="px-4 py-1.5 rounded-full bg-[#1E1E1E] text-gray-400 text-sm hover:bg-gray-800"
            >
              {org}
            </button>
          ))}
      </div>
    );
  }