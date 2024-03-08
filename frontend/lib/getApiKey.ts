"use server"

import { logger } from "@/logger"
import { currentUser } from "@clerk/nextjs"

export default async function getApiKey() {
  logger.info("Getting Api Key")
  const user = await currentUser()
  try {
    const res = await fetch(
      `http://${process.env.ORCHESTRATOR_URL}/get_api_key?user=${user?.emailAddresses[0].emailAddress}`,
      {
        cache: "no-store",
        headers: new Headers({
          "Content-Type": "application/json",
          "x-api-key": process.env.PRIVATE_API_KEY,
        } as any),
      }
    )
    const json = await res.json()
    logger.info(
      "Api key received for user: " + user?.emailAddresses[0].emailAddress
    )
    logger.info(json)
    return json["api_key"]
  } catch (error) {
    logger.warn("Error getting videos")
    logger.error(error)
  }
}
