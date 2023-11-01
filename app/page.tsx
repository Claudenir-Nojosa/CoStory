"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC } from "react";

const Page: FC = () => {
  const { data: session, status } = useSession();
  let roomIdInput = "";
  const router = useRouter();

  const createRoom = async () => {
    const res = await fetch("/api/rooms/create");
    const roomId: string = await res.text();
    router.push(`/room/${roomId}`);
  };

  const joinRoom = async (roomId: string) => {
    router.push(`/room/${roomId}`);
  };

  return (
    <div>
      {session?.user?.name}
      <button onClick={createRoom}>Criar sala</button>
      <div className="flex gap-2">
        <input
          type="text"
          onChange={({ target }) => (roomIdInput = target.value)}
          className="border border-zinc-300 bg-transparent"
        />
        <button onClick={() => joinRoom(roomIdInput)}>Entrar na sala</button>
      </div>
    </div>
  );
};

export default Page;
