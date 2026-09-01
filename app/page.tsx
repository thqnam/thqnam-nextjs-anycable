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
  searchParams?: { [key: string]: string };
}): Promise<Metadata> {
  const roomId = searchParams?.roomId ?? "default-room";
  const roomLabel = getRoomLabel(roomId);

  return {
    title: `${roomLabel} | AnyCable Next.js Demo`,
    openGraph: {
      images: [
        {
          url: `/api/og/?roomLabel=${roomLabel}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  const roomId = searchParams?.roomId ?? nanoid();

  if (!searchParams?.roomId) {
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
        header={<Header roomLabel={getRoomLabel(searchParams.roomId)} />}
      />
      <Intro showIntro={showIntro} introShownAction={introShownAction} />
    </>
  );
}
