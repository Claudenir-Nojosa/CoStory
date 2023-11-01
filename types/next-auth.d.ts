import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string | unknown;
      name: string | unknown;
      email: string | unknown;
      image: string | unknown;
    };
  }
}
