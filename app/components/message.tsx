import { cx } from "class-variance-authority";
import { formatDateToHours } from "../utils/format-date";
import { Avatar } from "./avatar";

export type MessageKind = "user" | "system";

export type Message = {
  id: string;
  username: string;
  avatar?: string;
  body: string;
  createdAt: string;
  kind?: MessageKind;
};

interface Props {
  message: Message;
  mine: boolean;
  showName: boolean;
  showAvatar: boolean;
}

export const Message = ({ message, mine, showName, showAvatar }: Props) => {
  if (message.kind === "system") {
    return (
      <div className="self-center px-3 py-1 text-center text-xs italic text-gray-500">
        <p>{message.body}</p>
        <time
          className="select-none text-2xs text-gray-400"
          title={message.createdAt}
          dateTime={message.createdAt}
        >
          {formatDateToHours(message.createdAt)}
        </time>
      </div>
    );
  }

  return (
    <div
      className={cx(
        "relative flex max-w-[85%] flex-col gap-1 rounded-md border p-2 pb-1 shadow md:max-w-[66%]",
        mine ? "self-end border-red-200 bg-red-100" : "self-start bg-white",
      )}
    >
      {showAvatar && (
        <div className="absolute bottom-0 left-0 h-8 w-8 -translate-x-[calc(100%+8px)]">
          <Avatar username={message.username} />
        </div>
      )}
      {showName && (
        <span className="select-none truncate text-xs font-semibold text-gray-400">
          {message.username}
        </span>
      )}
      <p>{message.body}</p>
      <time
        className={cx(
          mine ? "text-red-400" : "text-gray-400",
          "select-none text-right text-xs",
        )}
        title={message.createdAt}
        dateTime={message.createdAt}
      >
        {formatDateToHours(message.createdAt)}
      </time>
    </div>
  );
};
