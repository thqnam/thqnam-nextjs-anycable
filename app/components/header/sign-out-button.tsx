"use client";

import { Button } from "../button";

export function SignOutButton({ action }: { action: () => void }) {
  return (
    <form action={action}>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  return <Button size="sm">Sign out</Button>;
}
