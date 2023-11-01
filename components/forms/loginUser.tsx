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
import { Card, CardBody, CardFooter } from "@nextui-org/react";

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
    <>
      <h1 className={`text-2xl`}>Fazer Login</h1>
      <Card className="min-w-[400px] max-h-[800px] border rounded-lg p-2 pb-2 mt-6">
        <Form {...form}>
          <CardBody>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
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
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center items-center">
                <Button
                  className="hover:text-zinc-400 w-full mt-[20px]"
                  variant="outline"
                  type="submit"
                >
                  Login
                </Button>
              </div>
            </form>
          </CardBody>
          <CardFooter className="flex text-center items-center justify-center">
            <div className="flex flex-col justify-center items-center">
              <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
                ou
              </div>
              <div className="gap-3 flex flex-col justify-center items-center w-full">
                <Button
                  className="hover:text-zinc-400 w-full"
                  variant="outline"
                  onClick={githubSignInHandler}
                >
                  Login com Github
                </Button>
                <Button
                  className="hover:text-zinc-400 w-full"
                  variant="outline"
                  onClick={googleSignInHandler}
                >
                  Login com Google
                </Button>
              </div>
              <p className="text-center text-sm text-slate-300 mt-20">
                Se você não possui uma conta
                <Link
                  className="text-violet-400 hover:underline ml-2"
                  href="/register"
                >
                  Registrar
                </Link>
              </p>
            </div>
          </CardFooter>
        </Form>
      </Card>
    </>
  );
};

export default LoginForm;
