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
    },
    {
      title: "About",
      href: "/#about",
    },
  ],
  links: {
    github: "https://csgitlab.ucd.ie/lukeconnolly/fyp",
    hitl: "/hitl",
    developer: "/developer",
    about: "#about",
  },
}
