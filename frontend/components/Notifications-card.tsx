import React from "react"

import getNotificationsSent from "@/lib/getNotificationsSent"

import Notification from "./notification"
import NumberCard from "./number-card"

async function NotificationsCard() {
  const notifications = await getNotificationsSent()
  return (
    <NumberCard
      title="Notifications sent"
      number={notifications}
      description={"Number of Notifications sent to users."}
      min={0}
      max={100000}
    >
      <Notification />
    </NumberCard>
  )
}

export default NotificationsCard
