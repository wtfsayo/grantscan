"use client";

import { Button } from "./button";
import { Input } from "./input";
import { Search } from "lucide-react";

export default function SearchForm({ query }: { query: string }) {
  return (
    <form action="/search" method="GET" className="flex justify-center">
      <div className="relative w-full max-w-2xl">
        <Input
          type="search"
          name="query"
          defaultValue={query}
          placeholder="Search grant applications..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus-visible:ring-blue-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <Button
        type="submit"
        className="ml-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
      >
        Search
      </Button>
    </form>
  );
}
