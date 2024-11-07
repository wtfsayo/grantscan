// Server action for fetching orgs rounds
export default async function GetRounds(org: string) {
  const response = await fetch(`http://localhost:3000/${org}`);
  return response.json();
}
