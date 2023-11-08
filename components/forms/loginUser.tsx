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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoginSchema } from "@/lib/validation/auth";
import Image from "next/image";

const LoginForm = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
  });
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    console.log(values);
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

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
      <h1 className="text-3xl font-bold my-10">Seja bem vindo</h1>
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
          <Button type="submit" className="w-full">
            Continue
          </Button>
          <p className="text-center text-sm">
            Não tem uma conta?
            <Link
              className="text-muted-foreground hover:underline ml-2"
              href="/register"
            >
              Registrar
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

export default LoginForm;
