import { DATALAKE_URI } from "@/lib/consts"; 

export default async function GetOrgs() {
  try {
    const response = await fetch(DATALAKE_URI, {
      next: {
        revalidate: 3600 // revalidate every hour
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch orgs: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching orgs:', error);
    throw error;
  }
}
