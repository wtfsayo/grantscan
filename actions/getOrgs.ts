// Server action for fetching orgs
export default async function GetOrgs() {
  const response = await fetch("http://localhost:3000");
  return response.json();
}
