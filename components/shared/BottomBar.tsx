"use client";

import { sidebarLinks, siteConfig } from "@/config/site";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function BottomBar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {siteConfig.sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`bottombar_link ${
                isActive && "bg-primary-foreground bg-opacity-50"
              }`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-subtle-medium text-center text-light-1 max-sm:hidden">
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default BottomBar;
