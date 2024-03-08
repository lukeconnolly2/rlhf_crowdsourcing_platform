"use server"

import { logger } from "@/logger"
import { currentUser } from "@clerk/nextjs"

export default async function setNotificationsSent(number: number) {
  const user = await currentUser()
  logger.info(
    `Setting Notifications sent for user: ${user?.emailAddresses[0].emailAddress} `
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
        body: JSON.stringify({ number_sent: number }),
        method: "POST",
      }
    )
    const json = await res.json()
    logger.info("Notifications set: " + JSON.stringify(json))
    return json
  } catch (error) {
    logger.warn("Error setting notifications")
    logger.error(error)
  }
}
