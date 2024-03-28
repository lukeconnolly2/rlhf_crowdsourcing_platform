import React from "react"
import { sendNotification } from "@/actions/setNotificationsSent"

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
      <Notification serverAction={sendNotification} />
    </NumberCard>
  )
}

export default NotificationsCard
