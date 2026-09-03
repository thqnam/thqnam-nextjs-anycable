import { Channel } from "@anycable/web";
import type { ChannelEvents } from "@anycable/core";
import type { Message as IMessage } from "../components/message";

export type SentMessage = {
  body: string;
};

export type ChatChannelParams = {
  roomId: string;
};

export interface ChatActions {
  sendMessage(message: SentMessage): Promise<void>;
}

interface ChatEvents extends ChannelEvents<IMessage> {}

export default class ChatChannel extends Channel<
  ChatChannelParams,
  IMessage,
  ChatEvents,
  ChatActions
> {
  static identifier = "chat";

  async sendMessage(message: SentMessage): Promise<void> {
    await this.perform("sendMessage", message);
  }
}
