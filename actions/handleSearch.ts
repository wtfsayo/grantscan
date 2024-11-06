// Server action for handling search
export default async function handleSearch(formData: FormData) {
  const searchTerm = formData.get("query")?.toString() || "";
  // Replace spaces with hyphens for URL-friendly format
  const formattedSearchTerm = searchTerm.trim().replace(/\s+/g, "-");
  return { searchTerm: formattedSearchTerm };
}
