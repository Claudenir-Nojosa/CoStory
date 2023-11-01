"use client";
import { ThemeProviderProps } from "next-themes/dist/types";
import React, { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export interface ProvidersProps {
  children: ReactNode;
  themeProps?: ThemeProviderProps;
}
export const QueryProvider: FC<ProvidersProps> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
