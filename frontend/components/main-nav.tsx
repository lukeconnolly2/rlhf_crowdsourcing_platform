import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

import { buttonVariants } from "./ui/button"

interface MainNavProps {
  items?: NavItem[]
  userRoles: { isAdmin: boolean; isDeveloper: boolean }
}

export function MainNav({ items, userRoles }: MainNavProps) {
  const roleFilter = (item: NavItem) => {
    if (item.developer) {
      return userRoles.isDeveloper || userRoles.isAdmin
    }
    if (item.admin) {
      return userRoles.isAdmin
    }
    return true
  }
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.filter(roleFilter).map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-md font-large cursor-pointer dark:text-white",
                    buttonVariants({ variant: "link" }),
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
