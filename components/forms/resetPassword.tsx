"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoginSchema, ResetPasswordSchema } from "@/lib/validation/auth";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";

const ResetPasswordForm = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
  });
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof ResetPasswordSchema>> = async (
    values
  ) => {
    console.log(values);
    try {
      const response = await axios.patch(
        "/api/forgot-password",
        {
          email: values.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const user = response.data;
      toast.success("E-mail para alteração de senha enviado");
    } catch (error: any) {
      console.error("Error reseting password:", error);
      toast.error("E-mail não cadastrado");
    }
  };
  return (
    <div className=" flex flex-col items-center w-2/6 p-6">
      <Image src="/assets/logo.svg" alt="Logo" height={80} width={80} />
      <h1 className="text-3xl font-bold my-10">Esqueci a senha</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Insira aqui seu e-mail"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Enviar e-mail
          </Button>
          <p className="text-center text-sm  mt-10">
            Você já possui uma conta?
            <Link
              className="text-muted-foreground hover:underline ml-2"
              href="/login"
            >
              Login
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
