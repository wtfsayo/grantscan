import { Metadata } from "next";
import App from "./app";

const appUrl = process.env.NEXT_PUBLIC_URL;

const frame = {
  version: "next",
  imageUrl: `${appUrl}/og.png`,
  button: {
    title: "Open Frame",
    action: {
      type: "launch_frame",
      name: "GrantScan | Indexing all grant applications ever ",
      url: appUrl,
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#ffffff",
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


export default function Demo() {

  return (
    <App />
  );
}