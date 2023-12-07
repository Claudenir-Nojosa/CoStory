"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { RegisterSchema } from "@/lib/validation/auth";
import { useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";
const RegisterForm = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
  });

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof RegisterSchema>> = async (
    values
  ) => {
    console.log(values);
    try {
      const response = await axios.post(
        "/api/register",
        {
          name: values.username,
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200) {
        router.push("/login");
        toast.success("Cadastro realizado com sucesso")
        router.refresh();
      } else {
        toast.error("Erro ao realizar cadastro")
      }
      const user = response.data;
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const googleSignInHandler = async () => {
    try {
      const res = await signIn("google");
      if (res?.error == null) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const githubSignInHandler = async () => {
    try {
      const res = await signIn("github");
      if (res?.error == null) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" flex flex-col items-center w-2/6 p-6">
      <Image src="/assets/logo.svg" alt="Logo" height={80} width={80} />
      <h1 className="text-3xl font-bold mb-6">Criar conta</h1>
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
                <FormControl>
                  <Input type="text" placeholder="Seu nome" {...field} />
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
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Seu melhor e-mail"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center items-center">
            <Button type="submit" className="w-full">
              Registrar
            </Button>
          </div>
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
        <div className="flex flex-col w-full justify-center items-center">
          <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-muted-foreground after:ml-4 after:block after:h-px after:flex-grow after:bg-muted-foreground">
            ou
          </div>
          <div className="gap-3 flex flex-col mt-6 w-full">
            <Button variant="outline" onClick={githubSignInHandler}>
              <div className="flex gap-5 w-full items-center">
                <Image
                  src="/assets/github.svg"
                  alt="Github"
                  height={25}
                  width={25}
                />
                <p>Continue com Github</p>
              </div>
            </Button>
            <Button
              className=""
              variant="outline"
              onClick={googleSignInHandler}
            >
              <div className="flex gap-5 w-full items-center">
                <Image
                  src="/assets/google.svg"
                  alt="Google"
                  height={25}
                  width={25}
                />
                <p>Continue com Google</p>
              </div>
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default RegisterForm;
