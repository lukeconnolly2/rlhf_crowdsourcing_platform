"use server"

import { logger } from "@/logger"
import { currentUser } from "@clerk/nextjs"

export const preferenceAction = async (formData: FormData) => {
  logger.info(`Releasing video ${formData.get("video_id")}`)
  const user = await currentUser()
  console.log(
    "user",
    user?.emailAddresses[0].emailAddress,
    "video_id",
    formData.get("video_id"),
    "preference",
    formData.get("preference")
  )
}
