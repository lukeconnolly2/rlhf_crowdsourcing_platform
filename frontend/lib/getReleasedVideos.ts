"use server"

import { logger } from "@/logger"
import { currentUser } from "@clerk/nextjs"

export default async function getReleasedVideos() {
  const user = await currentUser()
  logger.info(
    `Getting Released Videos for user: ${user?.emailAddresses[0].emailAddress} `
  )
  try {
    const res = await fetch(
      `http://${process.env.ORCHESTRATOR_URL}/releasedVideos?user=${user?.emailAddresses[0].emailAddress}`,
      {
        cache: "no-store",
      }
    )
    const json = await res.json()
    logger.info("Videos received")
    return json
  } catch (error) {
    logger.warn("Error getting videos")
    logger.error(error)
  }
}
