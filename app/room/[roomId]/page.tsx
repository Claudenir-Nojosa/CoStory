import MessageField from "@/components/message-field";
import Messages from "@/components/messages";
import { db } from "@/lib/prismadb";

interface PageProps {
  params: {
    roomId: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { roomId } = params;
  const existingMessages = await db.message.findMany({
    where: {
      chatRoomId: roomId,
    },
  });

  const serializedMessages = existingMessages.map((message) => ({
    text: message.text,
    id: message.id,
  }));

  return (
    <div>
      <p>messages:</p>
      <Messages roomId={roomId} initialMessages={serializedMessages} />
      <MessageField roomId={roomId} />
    </div>
  );
};

export default page;
