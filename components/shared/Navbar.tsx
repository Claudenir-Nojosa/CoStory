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
import { ToggleTheme } from "./toggleTheme";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export function NavBar() {
  const session = useSession();
  const router = useRouter();
  const handleSignOut = () => {
    signOut();
    router.push("/");
  };
  return (
    <div className="navbar justify-end pb-16">
      <NavigationMenu>
        <NavigationMenuList className="flex gap-2">
          <NavigationMenuItem>
            <ToggleTheme />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Perfil</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul>
                <ListItem href="/profile/configurations">
                  Configurações
                </ListItem>
                {session.data?.user ? (
                  <ListItem onClick={handleSignOut} className="cursor-pointer">
                    Sair
                  </ListItem>
                ) : (
                  <ListItem href="/login">Entrar</ListItem>
                )}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
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
