"use server"

import { logger } from "@/logger"
import { currentUser } from "@clerk/nextjs"

export default async function getNotificationsSent() {
  const user = await currentUser()
  logger.info(
    `Getting Notifications sent for user: ${user?.emailAddresses[0].emailAddress} `
  )
  try {
    const res = await fetch(
      `http://${process.env.ORCHESTRATOR_URL}/notifications?user=${user?.emailAddresses[0].emailAddress}`,
      {
        cache: "no-store",
        headers: new Headers({
          "Content-Type": "application/json",
          "x-api-key": process.env.PRIVATE_API_KEY,
        } as any),
      }
    )
    const json = await res.json()
    logger.info("Notifications Sent: " + JSON.stringify(json))
    return json
  } catch (error) {
    logger.warn("Error getting notifications")
    logger.error(error)
  }
}
