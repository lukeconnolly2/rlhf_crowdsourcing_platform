export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "HITL",
  description: "A human in the loop framework for final year project.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "HITL",
      href: "/hitl",
    },
    {
      title: "Developer",
      href: "/developer",
    },
    {
      title: "About",
      href: "/#about",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    hitl: "/hitl",
    developer: "/developer",
    about: "#about",
  },
}
