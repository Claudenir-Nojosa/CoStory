"use client";

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
import { auth } from "@/lib/auth";
import { useSession } from "next-auth/react";
import { UploadButton } from "@/lib/uploadthing";
import Link from "next/link";
import Image from "next/image";

interface EditUserProps {
  params: {
    id: string;
  };
}

const UserEdit: FC<EditUserProps> = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const { data: session } = useSession();

  const { mutate: editUser } = useMutation<
    User,
    unknown,
    z.infer<typeof UserSchema>
  >({
    mutationFn: async (editUserData) => {
      const response = await axios.patch(`/api/user/${id}`, editUserData);
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
      image: "",
    },
  });
  function onSubmit(data: z.infer<typeof UserSchema>) {
    editUser(data);
  }

  return (
    <div className=" flex flex-col items-start justify-start max-w-2xl text-start p-6">
      <Form {...form}>
        <h1 className="text-3xl font-bold mb-10">Editar Usuário</h1>
        {typeof session?.user.image === "string" && (
          <div className="flex mb-10 ml-14 items-center justify-center text-center">
            <Image
              src={session.user.image}
              alt="Usuário"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
        )}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <UploadButton
                    {...field}
                    appearance={{
                      button:
                        "bg-primary-foreground focus-within-ring-secondary after:bg-primary-foreground",
                    }}
                    content={{
                      button({ ready }) {
                        if (ready)
                          return (
                            <div className="text-primary">Escolher foto</div>
                          );

                        return "Ficando pronto...";
                      },
                      allowedContent({ ready, fileTypes, isUploading }) {
                        if (!ready) return "Espere um pouco";
                        if (isUploading) return "Alterando foto de perfil";
                        return "Imagem (4MB)";
                      },
                    }}
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      console.log("Files: ", res);
                      if (res && (res?.length ?? 0) > 0) {
                        toast.success("Foto alterada com sucesso");
                        const file = res[0];
                        console.log(file);
                      }
                    }}
                    onUploadError={(error: Error) => {
                      toast.error(
                        "Aconteceu um erro ao alterar a foto de perfil."
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={session?.user.name as string}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    type="text"
                    placeholder={session?.user.email as string}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center gap-3">
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
