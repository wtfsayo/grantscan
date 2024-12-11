import { getCachedData } from './getCachedData';

export default async function GetSearchResults(query: string) {
  return getCachedData(`/search/${query === "all" ? "" : query}`);
}