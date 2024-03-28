"use server"

import { logger } from "@/logger"
import { auth, currentUser } from "@clerk/nextjs"

export default async function getVideos() {
  logger.info("Getting Videos")
  const user = await currentUser()
  const { getToken } = auth()
  const token = await getToken()
  console.log(token)

  try {
    const res = await fetch(
      `http://${process.env.ORCHESTRATOR_URL}/video?user=${user?.emailAddresses[0].emailAddress}`,
      {
        cache: "no-store",
        headers: { Authorization: `Bearer ${await getToken()}` },
      }
    )
    const json = await res.json()
    logger.info("Videos received")
    logger.info(json)
    return json
  } catch (error) {
    logger.warn("Error getting videos")
    logger.error(error)
  }
}
