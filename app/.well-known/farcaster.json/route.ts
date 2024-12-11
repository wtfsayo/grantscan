export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL;
  const header = process.env.FRAME_HEADER;
  const payload = process.env.FRAME_PAYLOAD;
  const signature = process.env.FRAME_SIG;
  const config = {
    accountAssociation: {
      header,
      payload,
      signature,
    },

    frame: {
      version: "0.0.0",
      name: "GrantScan",
      iconUrl: `${appUrl}/icon.png`,
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#171717",
      homeUrl: appUrl,
      webhookUrl: `${appUrl}/webhook`,
    },
  };

  return Response.json(config);
}
