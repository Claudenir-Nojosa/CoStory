"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { siteConfig } from "@/config/site";
import { signOut, useSession } from "next-auth/react";

const LeftSidebar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = () => {
    signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-3 px-6">
        <div className="flex justify-center">
          <Link href="/">
            <Image
              src="/assets/logo.svg"
              alt="Logo"
              height={100}
              width={100}
              className="mb-7"
            />
          </Link>
        </div>
        {siteConfig.sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          const isProfileLink = link.label === "Perfil";

          const linkClasses = `leftsidebar_link ${
            isActive && "bg-primary-foreground"
          } ${isProfileLink && "mt-48"}`;
          if (isProfileLink && session?.user.id) {
            link.route = `/profile/${session.user.id}`;
          }
          return (
            <Link
              href={link.route}
              key={link.label}
              className={linkClasses}
              onClick={() => {
                if (link.label === "Sair") {
                  handleSignOut();
                }
              }}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default LeftSidebar;
