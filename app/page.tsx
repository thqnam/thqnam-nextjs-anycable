import { redirect } from "next/navigation";
import { Chat } from "./components/chat";
import { nanoid } from "nanoid";
import { getRoomLabel } from "./utils/room-label";
import { Header } from "./components/header/header";
import { cookies } from "next/headers";
import { Metadata } from "next";
import { Intro } from "./components/intro";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string }> | { [key: string]: string };
}): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const roomId = resolvedSearchParams?.roomId ?? "default-room";
  const roomLabel = getRoomLabel(roomId);

  return {
    title: `${roomLabel} | THQNAM AnyCable Next.js`,
    description: "Next.js messaging application of THQNAM using AnyCable as a real-time server and deployed on Vercel",
    openGraph: {
      title: `${roomLabel} | THQNAM AnyCable Next.js`,
      description: "Next.js messaging application of THQNAM using AnyCable as a real-time server and deployed on Vercel",
      locale: "vi_VN",
      type: "website",
      alternateLocale: ["en_US"],
      siteName: "THQNAM AnyCable Next.js",
      emails: ["thieuhuynhquangnam1996@gmail.com"],
      countryName: "Vietnam",
      phoneNumbers: ["+84937821788"],
      url: "https://thqnam-nextjs-anycable.vercel.app",
      images: [
        {
          url: `/api/og/?roomLabel=${roomLabel}`,
          width: 1200,
          height: 630,
          alt: `${roomLabel} | THQNAM AnyCable Next.js`,
          type: "image/jpg",
          secureUrl: `/api/og/?roomLabel=${roomLabel}`,
        },
      ],
    },
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string }> | { [key: string]: string };
}) {
  const resolvedSearchParams = await searchParams;
  const roomId = resolvedSearchParams?.roomId ?? nanoid();

  if (!resolvedSearchParams?.roomId) {
    return redirect(`/?roomId=${roomId}`);
  }

  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value ?? "Guest";
  const showIntro = !cookieStore.get("introShown")?.value;

  async function introShownAction() {
    "use server";

    (await cookies()).set("introShown", "1");
  }

  return (
    <>
      <Chat
        username={username}
        header={<Header roomLabel={getRoomLabel(resolvedSearchParams.roomId)} />}
      />
      <Intro showIntro={showIntro} introShownAction={introShownAction} />
    </>
  );
}
