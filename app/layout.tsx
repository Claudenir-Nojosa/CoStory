import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "/styles/globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import LeftSidebar from "@/components/shared/LeftSideBar";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { NavBar } from "@/components/shared/Navbar";
import BottomBar from "@/components/shared/BottomBar";
import { siteConfig } from "@/config/site";
import { auth } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "https://raw.githubusercontent.com/Claudenir-Nojosa/servidor_estaticos/main/logo.ico",
    shortcut:
      "https://raw.githubusercontent.com/Claudenir-Nojosa/servidor_estaticos/main/logo.ico",
    apple:
      "https://raw.githubusercontent.com/Claudenir-Nojosa/servidor_estaticos/main/logo.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="flex">
                {session?.user.id ? <LeftSidebar /> : ""}
                <div className="flex flex-col flex-1">
                  <NavBar />
                  <MaxWidthWrapper className="mb-12 mt-14 sm:mt-15 text-center">
                    {children}
                  </MaxWidthWrapper>
                </div>
                {session?.user.id ? <BottomBar /> : ""}
              </div>
            </ThemeProvider>
          </QueryProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
