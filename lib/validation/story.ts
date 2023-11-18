import { z } from "zod";

export const StorySchema = z.object({
  title: z
    .string({ required_error: "Insira um título" })
    .min(1, { message: "Insira um título" })
    .max(60, { message: "Título muito longo!" }),
  content: z
    .string({ required_error: "Insira um conteúdo" })
    .min(1, { message: "Insira um conteúdo" }),
  category: z.string({ required_error: "Selecione uma opção." }),
  coverImage: z.string().optional(),
  isCompleted: z.boolean().default(false),
});
