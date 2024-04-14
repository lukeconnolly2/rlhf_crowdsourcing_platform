"use client"

import React from "react"

import { cn } from "@/lib/utils"

import { Button, buttonVariants } from "./ui/button"

function Notification({
  serverAction,
  ...props
}: {
  serverAction: (FormData) => Promise<void>
}) {
  return (
    <div className="w-full">
      <form action={serverAction}>
        <Button
          className={cn(buttonVariants({ variant: "default" }), "w-full")}
          type="submit"
        >
          Send Notifications to all users
        </Button>
      </form>
    </div>
  )
}

export default Notification
