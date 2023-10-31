"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FC, useState } from "react";

interface MessageFieldProps {
  roomId: string;
}

const MessageField: FC<MessageFieldProps> = ({ roomId }) => {
  const [input, setInput] = useState<string>("");

  const { mutate: sendMessage } = useMutation({
    mutationFn: async (text: string) => {
      const response = await axios.post("/api/message", { text, roomId });
      console.log(response.data);

      return response.data;
    },
  });

  const handleSend = () => {
    sendMessage(input || "");
    setInput("");
  };

  return (
    <div className="flex gap-2">
      Escreva uma nova mensagem:
      <input
        onChange={({ target }) => setInput(target.value)}
        value={input}
        className="border border-zinc-300 bg-transparent"
        type="text"
      />
      <button onClick={handleSend}>Enviar</button>
    </div>
  );
};

export default MessageField;
