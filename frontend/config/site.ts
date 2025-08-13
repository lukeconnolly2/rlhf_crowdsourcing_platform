export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Themis",
  description: "A framework for training Reinforcement Learning Agents from Human Feedback.",
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
    github: "https://github.com/achouliaras/Themis",
    hitl: "/hitl",
    developer: "/dev",
    about: "#about",
    admin: "/admin",
    setup: "/dev/setup",
  },
}
