"use client";

import { Suspense } from "react";

interface OrgButtonsProps {
  orgs: string[];
}

export default function OrgButtons({ orgs }: OrgButtonsProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex gap-2 mt-4 max-w-3xl mx-auto overflow-x-auto py-2">
        <button className="px-4 py-1.5 rounded-full bg-gray-900 text-gray-400 text-sm hover:bg-gray-800">
          All
        </button>
        {orgs?.map((org: string, index: number) => (
          <button
            key={index}
            className="px-4 py-1.5 rounded-full bg-gray-900 text-gray-400 text-sm hover:bg-gray-800"
          >
            {org}
          </button>
        ))}
      </div>
    </Suspense>
  );
}
