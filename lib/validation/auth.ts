import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({ required_error: "Insira seu e-mail" })
    .min(1, { message: "Insira seu e-mail" }),
  password: z
    .string({ required_error: "Insira sua senha" })
    .min(1, { message: "Insira sua senha" })
    .min(6, { message: "Senha deve conter no mínimo 6 caracteres" }),
});
export const RegisterSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Insira seu Nome" })
    .max(50, { message: "Limite de caracteres" })
    .refine((username) => /^[A-Za-z]+$/.test(username), {
      message: "O nome de usuário deve conter apenas letras",
    }),
  email: z
    .string()
    .min(1, { message: "Insira seu e-mail" })
    .refine((email) => email.includes("@"), {
      message: "Insira um e-mail válido",
    }),
  password: z
    .string()
    .min(6, { message: "Senha deve conter no mínimo 6 caracteres" }),
});
