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
      href: "/dev",
      developer: true,
      admin: false,
    },
    {
      title: "Admin",
      href: "/admin",
      admin: true,
      developer: false,
    },
    {
      title: "About",
      href: "/#about",
    },
  ],
  links: {
    github: "https://csgitlab.ucd.ie/lukeconnolly/fyp",
    hitl: "/hitl",
    developer: "/dev",
    about: "#about",
    admin: "/admin",
    setup: "/dev/setup",
  },
}
