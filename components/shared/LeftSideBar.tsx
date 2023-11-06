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
import { useSession } from "next-auth/react";

const LeftSidebar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-3 px-6">
        <Link href="/">
          <Image
            src="/assets/logo.svg"
            alt="Logo"
            height={100}
            width={100}
            className="mb-7"
          />
        </Link>
        {siteConfig.sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          if (link.label === "Perfil" && session?.user.id) {
            link.route = `/profile/${session.user.id}`;
          }
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link ${
                isActive && "bg-primary-foreground"
              }`}
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
