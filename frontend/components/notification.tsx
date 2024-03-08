"use client"

import React from "react"
import { sendNotification } from "@/actions/setNotificationsSent"

import { cn } from "@/lib/utils"

import { Button, buttonVariants } from "./ui/button"

function Notification() {
  return (
    <div className="w-full">
      <form action={sendNotification}>
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
