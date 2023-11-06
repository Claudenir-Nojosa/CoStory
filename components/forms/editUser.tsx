import { Card } from "@/components/ui/card";
import { UserSchema } from "@/lib/validation/auth";
import { User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface EditUserProps {
  params: {
    id: string;
  };
}

const UserEdit: FC<EditUserProps> = ({ params }) => {
  const { id } = params;
  const router = useRouter();

  const { mutate: editUser } = useMutation<
    User,
    unknown,
    z.infer<typeof UserSchema>
  >({
    mutationFn: async (editUserData) => {
      const response = await axios.patch(
        `/api/user/${id}`,
        editUserData
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Usuário editado com sucesso!");
      router.push("/");
      router.refresh();
    },
    onError: (data) => {
      toast.error("Aconteceu um erro ao editar o usuário, tente novamente");
    },
  });

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      username: "",
    },
  });
  function onSubmit(data: z.infer<typeof UserSchema>) {
    editUser(data);
  }

  return (
    <div className=" flex flex-col items-center rounded-lg border w-fit p-6">
      <h1 className="text-3xl font-bold mb-6">Editar Usuário</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Seu nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center items-center">
            <Button variant="outline" type="submit">
              Editar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserEdit;