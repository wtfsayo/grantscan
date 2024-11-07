// Server action for fetching orgs rounds
import { DATALAKE_URI } from "@/lib/consts";
export default async function GetRounds(org: string) {
  const response = await fetch(`${DATALAKE_URI}/${org}`);
  return response.json();
}
