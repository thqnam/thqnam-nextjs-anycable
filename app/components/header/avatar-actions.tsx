"use client";

import { Menu } from "../menu";
import { Avatar } from "../avatar";
import { $cable, $cableState, CableState } from "@/app/stores/cable";
import { useStore } from "@nanostores/react";
import { cx } from "class-variance-authority";
import { createMessage } from "@/app/stores/messages";

export function AvatarActions({
  usernameOrEmail,
  signOutAction,
}: {
  usernameOrEmail: string;
  signOutAction: () => void;
}) {
  return (
    <Menu.Root>
      <Menu.Trigger label="My profile">
        <WrappedAvatar usernameOrEmail={usernameOrEmail} />
      </Menu.Trigger>
      <Menu.Body align="right">
        <div className="divide-y divide-gray-100">
          <Menu.TextItem>{usernameOrEmail}</Menu.TextItem>
          <div className="py-1">
            <Menu.TextItem>
              <Status />
            </Menu.TextItem>

            <Menu.ItemRoot>
              <DisconnectButton usernameOrEmail={usernameOrEmail}/>
            </Menu.ItemRoot>
          </div>
          <div className="pt-1">
            <Menu.ItemRoot>
              <SignOutButton
                usernameOrEmail={usernameOrEmail}
                signOutAction={signOutAction}
              />
            </Menu.ItemRoot>
          </div>
        </div>
      </Menu.Body>
    </Menu.Root>
  );
}

function WrappedAvatar({ usernameOrEmail }: { usernameOrEmail: string }) {
  const state = useStore($cableState);

  return (
    <div className="h-9 w-9 hover:opacity-80">
      <Avatar username={usernameOrEmail} indicatorClass={bgClass[state]} />
    </div>
  );
}

function Status() {
  const state = useStore($cableState);

  return (
    <div className="-ml-3 flex items-center gap-2">
      <Indicator />
      <div className="text-xs text-gray-500">{state}</div>
    </div>
  );
}

const bgClass: Record<CableState, string> = {
  idle: "bg-green-400",
  disconnected: "bg-red-400",
  connecting: "bg-blue-400",
  connected: "bg-green-400",
  closed: "bg-gray-400",
};
function Indicator() {
  const state = useStore($cableState);

  return (
    <div
      className={cx("h-1 w-1 rounded-full transition-colors", bgClass[state])}
    />
  );
}

function DisconnectButton({
  usernameOrEmail,
}: {
  usernameOrEmail: string;
}) {
  const state = useStore($cableState);
  const cable = useStore($cable);

  // We can't do anything here
  if (state === "disconnected") return null;

  const onClick =
    state === "closed"
      ? async () => {
      cable?.connect();
      await createMessage(`User ${usernameOrEmail} has connected to the server.`);
    }
      : async () => {
      await createMessage(`User ${usernameOrEmail} is disconnecting from the server.`);
      cable?.disconnect();
    };

  return (
    <Menu.InteractiveItem as="button" onClick={onClick}>
      {state === "closed" ? "Connect" : "Disconnect"}
    </Menu.InteractiveItem>
  );
}

function SignOutButton({
  usernameOrEmail,
  signOutAction,
}: {
  usernameOrEmail: string;
  signOutAction: () => void;
}) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createMessage(`Goodbye ${usernameOrEmail} from our chat room`);
    signOutAction();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Menu.InteractiveItem as="button" type="submit">
        Sign out
      </Menu.InteractiveItem>
    </form>
  );
}
