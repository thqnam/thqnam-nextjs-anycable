"use client";

import { Menu } from "../menu";
import { createSystemMessage } from "@/app/stores/messages";
import { $cableState } from "@/app/stores/cable";
import { useStore } from "@nanostores/react";
import { redirect } from "next/navigation";

async function copyToClipboard({
  usernameOrEmail,
  state,
}: {
  usernameOrEmail?: string;
  state: ReturnType<typeof useStore<typeof $cableState>>;
}) {
  if (state === "connected" || state === "idle") {
    await createSystemMessage(`User ${usernameOrEmail} has copied the room URL to clipboard.`);
    await navigator.clipboard.writeText(window.location.href);
  } else {
    await navigator.clipboard.writeText(window.location.href);
  }
}

async function newRoom({
  usernameOrEmail,
  newRoomId,
  state,
}: {
  usernameOrEmail: string;
  newRoomId: string;
  state: ReturnType<typeof useStore<typeof $cableState>>;
}) {
  if (state === "connected" || state === "idle") {
    await createSystemMessage(`User ${usernameOrEmail} has created a new room.`);
    redirect(`/?roomId=${newRoomId}`);
  } else {
    redirect(`/?roomId=${newRoomId}`);
  }
}

export function RoomActions({ usernameOrEmail, newRoomId }: { usernameOrEmail: string; newRoomId: string }) {
  const state = useStore($cableState);

  return (
    <Menu.Root>
      <Menu.Trigger />
      <Menu.Body align="left">
        <Menu.ItemRoot>
          <Menu.InteractiveItem
            as="button"
            onClick={() => copyToClipboard({ usernameOrEmail, state })}
          >
            Copy URL
          </Menu.InteractiveItem>
        </Menu.ItemRoot>
        <Menu.ItemRoot>
          <Menu.InteractiveItem
            as="button"
            onClick={() => newRoom({ usernameOrEmail, newRoomId, state })}
          >
            New room
          </Menu.InteractiveItem>
        </Menu.ItemRoot>
      </Menu.Body>
    </Menu.Root>
  );
}
