"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ToggleTheme } from "./toggleTheme";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { motion } from "framer-motion";

export function NavBar() {
  const session = useSession();
  const router = useRouter();
  const handleSignOut = () => {
    signOut();
    router.push("/");
    router.refresh();
  };
  return (
    <motion.div
      initial={{ top: -100 }}
      animate={{ top: 0 }}
      transition={{ duration: 0.5 }}
      className="navbar justify-between"
    >
      {session.status === "authenticated" ? (
        <div className="text-transparent">.</div>
      ) : (
        <NavigationMenu>
          <Link href="/">
            <Image src="/assets/logo.svg" alt="Logo" height={50} width={50} />
          </Link>
        </NavigationMenu>
      )}
      <NavigationMenu>
        <NavigationMenuList className="flex gap-3">
          <NavigationMenuItem>
            <ToggleTheme />
          </NavigationMenuItem>
          {session.status === "authenticated" ? (
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                {session.data.user.image &&
                typeof session.data.user.image === "string" ? (
                  <Link href={`/profile/${session.data.user.id}`}>
                    <Avatar>
                      <AvatarImage src={session.data.user.image} />
                      <AvatarFallback>
                        {typeof session.data.user.name === "string"
                          ? session.data.user.name.charAt(0).toUpperCase()
                          : ""}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                ) : null}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                {session.data.user.name &&
                typeof session.data.user.name === "string" &&
                typeof session.data.user.email === "string" ? (
                  <div className="text-sm p-4">
                    <p className="text-muted-foreground mb-2">Logado em</p>
                    <p>{session.data.user.name}</p>
                    <p>{session.data.user.email}</p>
                  </div>
                ) : (
                  ""
                )}
                <Separator />
                <ul>
                  <ListItem href="/">Pagina inicial</ListItem>
                  <ListItem href={`/profile/${session.data.user.id}`}>
                    Configurações
                  </ListItem>
                  <Separator />
                  <ListItem onClick={handleSignOut} className="cursor-pointer">
                    Sair
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem>
              <Link href="/login">
                <Button variant="ghost">Entrar</Button>
              </Link>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </motion.div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
