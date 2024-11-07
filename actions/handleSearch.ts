"use server";
import { redirect } from "next/navigation";
export default async function handleSearch(formData: FormData) {
  const searchTerm = formData.get("query")?.toString() || "";
  const formattedTerm = searchTerm.trimStart().replace(/\s+/g, "-");

  if (formattedTerm) {
    redirect(`/search/${formattedTerm}`);
  } else {
    redirect("/search/");
  }
}
