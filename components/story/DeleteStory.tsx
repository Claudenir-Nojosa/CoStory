"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { toast } from "sonner";

interface ButtonDeleteProps {
  id: string;
}

const DeleteStory: FC<ButtonDeleteProps> = ({ id }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: deleteStory } = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(`/api/story/${id}`);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("História deletada com sucesso!");
      router.push("/");
      router.refresh();
    },
    onError: (data) => {
      toast.error("Aconteceu um erro ao deletar a história, tente novamente");
    },
  });
  return <p onClick={() => deleteStory()}>Continuar</p>;
};

export default DeleteStory;
