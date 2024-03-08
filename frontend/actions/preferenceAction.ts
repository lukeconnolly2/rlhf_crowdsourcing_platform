"use server"

import { logger } from "@/logger"
import { currentUser } from "@clerk/nextjs"

export const preferenceAction = async (formData: FormData) => {
  const user = await currentUser()
  logger.info(
    "user",
    user?.emailAddresses[0].emailAddress,
    "video_id",
    formData.get("video_id"),
    "preference",
    formData.get("preference")
  )
  fetch(`http://${process.env.ORCHESTRATOR_URL}/preference`, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      "x-api-key": process.env.PRIVATE_API_KEY,
    } as any),
    body: JSON.stringify({
      user: user?.emailAddresses[0].emailAddress,
      video_id: formData.get("video_id"),
      preference: formData.get("preference"),
    }),
  })
}
