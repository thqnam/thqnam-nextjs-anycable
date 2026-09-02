"use client";

import { Menu } from "../menu";
import { createMessage } from "@/app/stores/messages";
import { $cableState } from "@/app/stores/cable";
import { useStore } from "@nanostores/react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function copyToClipboard() {
  const state = useStore($cableState);
  if (state === "connected" || state === "idle") {
    const username = (await cookies()).get("username")?.value ?? "Guest";
    createMessage(`User ${username} has copied the room URL to clipboard.`);
    await navigator.clipboard.writeText(window.location.href);
  } else {
    await navigator.clipboard.writeText(window.location.href);
  }
}

async function newRoom({ newRoomId }: { newRoomId: string }) {
  const state = useStore($cableState);
  if (state === "connected" || state === "idle") {
    const username = (await cookies()).get("username")?.value ?? "Guest";
    createMessage(`User ${username} has created a new room.`);
    redirect(`/?roomId=${newRoomId}`);
  } else {
    redirect(`/?roomId=${newRoomId}`);
  }
}

export function RoomActions({ newRoomId }: { newRoomId: string }) {
  return (
    <Menu.Root>
      <Menu.Trigger />
      <Menu.Body align="left">
        <Menu.ItemRoot>
          <Menu.InteractiveItem as="button" onClick={copyToClipboard}>
            Copy URL
          </Menu.InteractiveItem>
        </Menu.ItemRoot>
        <Menu.ItemRoot>
          <Menu.InteractiveItem as="button" onClick={() => newRoom({ newRoomId })}>
            New room
          </Menu.InteractiveItem>
        </Menu.ItemRoot>
      </Menu.Body>
    </Menu.Root>
  );
}
