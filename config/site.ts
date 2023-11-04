export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "co.Story",
  description: "A Next.js collaborative storytelling app.",
  sidebarLinks: [
    {
      imgURL: "/assets/homepage.svg",
      route: "/",
      label: "Homepage",
    },
    {
      imgURL: "/assets/books.svg",
      route: "/stories",
      label: "Suas histórias",
    },
    {
      imgURL: "/assets/pencil.svg",
      route: "/create/story",
      label: "Nova história",
    },
    {
      imgURL: "/assets/favorite.svg",
      route: "/favorites",
      label: "Favoritos",
    },
  ],
};

export const sidebarLinks = [];
