// Server action for fetching orgs
import { DATALAKE_URI } from "@/lib/consts";
export default async function GetOrgs() {
  const response = await fetch(DATALAKE_URI);
  const orgs = response.json();
  return orgs;
}
