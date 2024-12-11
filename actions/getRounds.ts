// Server action for fetching orgs rounds
import { DATALAKE_URI } from "@/lib/consts";

export default async function GetRounds(org: string) {
  try {
    const response = await fetch(`${DATALAKE_URI}/${org}`, {
      next: {
        revalidate: 3600, // revalidate every hour
        tags: ["rounds", org]
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch rounds: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching rounds:', error);
    throw error;
  }
}
