"use server"

import { logger } from "@/logger"
import { currentUser } from "@clerk/nextjs"

export default async function getVideos() {
  logger.info("Getting Videos")
  const user = await currentUser()
  try {
    const res = await fetch(
      `http://${process.env.ORCHESTRATOR_URL}/video?user=${user?.emailAddresses[0].emailAddress}`,
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
