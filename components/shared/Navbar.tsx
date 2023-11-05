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

export function NavBar() {
  const session = useSession();
  const router = useRouter();
  const handleSignOut = () => {
    signOut();
    router.push("/");
  };
  return (
    <div className="navbar justify-end ">
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
                  <Avatar>
                    <AvatarImage src={session.data.user.image} />
                    <AvatarFallback>
                      {typeof session.data.user.name === "string"
                        ? session.data.user.name.charAt(0).toUpperCase()
                        : ""}
                    </AvatarFallback>
                  </Avatar>
                ) : null}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                {session.data.user.name &&
                typeof session.data.user.name === "string" &&
                typeof session.data.user.email === "string" ? (
                  <div>
                    <ListItem className="flex flex-col p-3 pr-10 font-semibold">
                      <p>{session.data.user.name}</p>{" "}
                      <p>{session.data.user.email}</p>
                    </ListItem>
                  </div>
                ) : (
                  ""
                )}
                <ul>
                  <ListItem href="/profile/configurations">
                    Configurações
                  </ListItem>
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
    </div>
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
