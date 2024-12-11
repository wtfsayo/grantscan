import { redirect } from "next/navigation";
import { Metadata } from "next";

const frame = {
  version: "next",
  imageUrl: `https://grantscan.org/og.png`,
  button: {
    title: "Open Frame",
    action: {
      type: "launch_frame",
      name: "GrantScan | Indexing all grant applications ever ",
      url: `https://grantscan.org/search/all`,
      splashImageUrl: `https://grantscan.org/splash.png`,
      splashBackgroundColor: "#020202",
    },
  },
};

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "GrantScan",
    description: "Indexing all grant applications ever",
    openGraph: {
      title: "GrantScan",
      description: "Indexing all grant applications ever",
      images: [`https://grantscan.org/og.png`],
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}
export default function Home() {
  redirect("/search/all");
}
