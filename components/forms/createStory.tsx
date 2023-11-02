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
import { StorySchema } from "@/lib/validation/story";
import Tiptap from "../tiptap/Tiptap";

export const StoryForm = () => {
  const form = useForm<z.infer<typeof StorySchema>>({
    mode: "onChange",
    resolver: zodResolver(StorySchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof StorySchema>> = async (
    values
  ) => {
    console.log(values);
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-7">Criar história</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-2xl">Título</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Título da história"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-2xl">
                  Conteúdo
                </FormLabel>
                <FormControl>
                  <Tiptap content={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center items-center">
            <Button
              variant="outline"
              type="submit"
              className="w-full"
            >
              Criar
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
