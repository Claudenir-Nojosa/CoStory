"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
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
import { initialValues } from "../tiptap/initialValue";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Category, Story } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ScrollArea } from "../ui/scroll-area";
import StoryPreview from "../story/StoryPreview";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "../ui/label";
import { FormStoryInput } from "@/types";

interface FormStoryProps {
  isEditing: boolean;
  initialValue?: FormStoryInput;
  params: {
    id: string;
  };
}

export const StoryForm: FC<FormStoryProps> = ({
  isEditing,
  initialValue,
  params,
}) => {
  const router = useRouter();
  const { id } = params;
  const [generatedImage, setGeneratedImage] = useState<string>("");
  const [coverImageUrl, setCoverImageUrl] = useState<string>("");

  const form = useForm<z.infer<typeof StorySchema>>({
    resolver: zodResolver(StorySchema),
    defaultValues: initialValue,
  });

  const { data: dataCategories, isLoading: isLoadingCategories } = useQuery<
    Category[]
  >({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get("/api/story/categories");
      return response.data;
    },
  });

  const defaultValue =
    initialValue && dataCategories
      ? dataCategories.find((category) => category.id)?.name || ""
      : "Selecione";

  const [realTimeData, setRealTimeData] = useState({
    title: initialValue?.title,
    category: initialValue?.category,
    coverImage: initialValue?.coverImage,
    content: initialValue?.content,
    isCompleted: initialValue?.isCompleted,
  });

  useEffect(() => {
    if (initialValue) {
      form.reset(initialValue);
    }
  }, [form, initialValue]);

  const { mutate: createStory } = useMutation<
    Story,
    unknown,
    z.infer<typeof StorySchema>
  >({
    mutationFn: async (newStoryData) => {
      const response = await axios.post("/api/story/create", newStoryData);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("História criada com sucesso!");
      router.push("/");
      router.refresh();
    },
    onError: (data) => {
      toast.error("Aconteceu um erro ao criar a História, tente novamente");
    },
  });

  const { mutate: editStory, status } = useMutation<
    Story,
    unknown,
    z.infer<typeof StorySchema>
  >({
    mutationFn: async (newStoryEditData) => {
      const response = await axios.patch(`/api/story/${id}`, newStoryEditData);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("História editada com sucesso!");
      router.push("/");
      router.refresh();
    },
    onError: (data) => {
      toast.error("Aconteceu um erro ao editar a história, tente novamente");
    },
    
  });
  
  const onSubmit: SubmitHandler<z.infer<typeof StorySchema>> = async (
    values
  ) => {
    {
      isEditing
        ? editStory(values)
        : createStory({ ...values, coverImage: generatedImage });
    }
    form.reset();
  };

  console.log("Image value:", generatedImage);
  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <h1 className="text-4xl font-bold mb-7">
          {isEditing ? "Editar história" : "Criar História"}
        </h1>
        <Sheet>
          <SheetTrigger>Compartilhar</SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Faça edições colaborativas em tempo real!</SheetTitle>
              <SheetDescription>
                Compartilhe esse link para convidar uma pessoa para a edição:
              </SheetDescription>
              <Button>Link aqui</Button>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-2xl">
                    Título
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      defaultValue={initialValue?.title}
                      placeholder="Título da história"
                      onChange={(e) => {
                        field.onChange(e);
                        setRealTimeData({
                          ...realTimeData,
                          title: e.target.value,
                        });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {generatedImage === "" ? (
              ""
            ) : (
              <FormField
                control={form.control}
                name="coverImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-2xl">
                      Capa da História
                    </FormLabel>
                    <FormControl>
                      <div className="flex justify-center">
                        <Input
                          type="text"
                          {...field}
                          value={coverImageUrl}
                          onChange={(e: any) => {
                            field.onChange(e);
                            setRealTimeData({
                              ...realTimeData,
                              coverImage: e.target.value,
                            });
                          }}
                          className="hidden"
                        />
                        <Image
                          src={generatedImage}
                          alt="Capa da História"
                          height={300}
                          width={300}
                          className="rounded-xl"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-2xl">
                    Categoria
                  </FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={initialValue?.category}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setRealTimeData({
                          ...realTimeData,
                          category: value,
                        });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <ScrollArea className="h-[200px]">
                          {dataCategories?.map((item) => (
                            <SelectItem
                              className=""
                              key={item.id}
                              value={item.id}
                            >
                              <div className="flex justify-between items-center gap-3">
                                <Image
                                  alt={item.name}
                                  src={item.icon}
                                  height={35}
                                  width={35}
                                />

                                {item.name}
                              </div>
                            </SelectItem>
                          ))}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
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
                    <Tiptap
                      content={initialValue?.content || ""}
                      onChange={(newContent: any) => {
                        field.onChange(newContent);
                        setRealTimeData({
                          ...realTimeData,
                          content: newContent,
                        });
                      }}
                      onImageGenerated={setGeneratedImage}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isCompleted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>A história está completa?</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <div className="flex justify-center items-center">
              <Button variant="outline" type="submit" className="w-full">
                {isEditing ? "Editar" : "Criar"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="dotted">
        <StoryPreview
          title={realTimeData.title || ""}
          content={realTimeData.content || ""}
          coverImage={realTimeData.coverImage}
          category={realTimeData.category}
        />
      </div>
    </div>
  );
};
