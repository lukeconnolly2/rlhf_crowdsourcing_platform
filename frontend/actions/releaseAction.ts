"use server"

import { revalidatePath } from "next/cache"
import { logger } from "@/logger"
import { currentUser } from "@clerk/nextjs"

import { siteConfig } from "@/config/site"

export const releaseAction = async (formData: FormData) => {
  logger.info(`Releasing video ${formData.get("video_id")}`)
  const user = await currentUser()
  fetch(`http://${process.env.ORCHESTRATOR_URL}/release`, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      "x-api-key": process.env.PRIVATE_API_KEY,
    } as any),
    body: JSON.stringify({
      user: user?.emailAddresses[0].emailAddress,
      video_id: formData.get("video_id"),
    }),
  })
  revalidatePath(siteConfig.links.developer)
}
