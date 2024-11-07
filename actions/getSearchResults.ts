import { DATALAKE_URI } from "@/lib/consts";
export default async function GetSearchResults(query: string) {
  const response = await fetch(
    `${DATALAKE_URI}/search/${query === "all" ? "" : query}`,
  );
  return response.json();
}