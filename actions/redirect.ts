import { redirect } from "next/navigation";

export function redirectToSearch() {
  redirect('/search/all');
}