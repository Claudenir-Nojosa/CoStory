"use client";

import { FC } from "react";
import { ProvidersProps } from "./query-provider";
import { SessionProvider } from "next-auth/react";

export const AuthProvider: FC<ProvidersProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
