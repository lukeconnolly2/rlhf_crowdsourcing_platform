"use server"

import { logger } from "@/logger"
import { currentUser } from "@clerk/nextjs"

export default async function getDefaultRequiredViews() {
  const user = await currentUser()
  logger.info(
    `Getting Released Videos for user: ${user?.emailAddresses[0].emailAddress} `
  )
  try {
    const res = await fetch(
      `http://${process.env.ORCHESTRATOR_URL}/getRequiredViews?user=${user?.emailAddresses[0].emailAddress}`,
      {
        cache: "no-store",
        headers: new Headers({
          "Content-Type": "application/json",
          "x-api-key": process.env.PRIVATE_API_KEY,
        } as any),
      }
    )
    const json = await res.json()
    logger.info("defaultRequiredViews: " + JSON.stringify(json))
    return json["requiredViews"]
  } catch (error) {
    logger.warn("Error getting videos")
    logger.error(error)
  }
}
