import { DATALAKE_URI } from "@/lib/consts";

export default async function GetSearchResults(query: string) {
  try {
    const response = await fetch(
      `${DATALAKE_URI}/search/${query === "all" ? "" : query}`,
      {
        next: {
          revalidate: 60 // revalidate every minute for search results
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch search results: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
}
