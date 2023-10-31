"use client";
import { pusherClient } from "@/lib/pusher";
import { FC, useEffect, useState } from "react";

interface MessagesProps {
  initialMessages: {
    text: string;
    id: string;
  }[];
  roomId: string;
}

const Messages: FC<MessagesProps> = ({ initialMessages, roomId }) => {
  const [incomingMessages, setIncomingMessages] = useState<string[]>([]);

  useEffect(() => {
    setIncomingMessages([]);

    const channel = pusherClient.subscribe(roomId);

    const handleIncomingMessage = (text: string) => {
      setIncomingMessages((prev) => [...prev, text]);
    };

    channel.bind("incoming-message", handleIncomingMessage);

    return () => {
      channel.unbind("incoming-message", handleIncomingMessage); 
      pusherClient.unsubscribe(roomId);
    };
  }, [roomId]);

  return (
    <div>
      {initialMessages.map((message) => (
        <p key={message.id}>{message.text}</p>
      ))}
      {incomingMessages.map((text, i) => (
        <p key={i}>{text}</p>
      ))}
    </div>
  );
};

export default Messages;
