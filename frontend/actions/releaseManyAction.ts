"use server"

import { revalidatePath } from "next/cache"
import { logger } from "@/logger"
import { currentUser } from "@clerk/nextjs"

export const releaseManyAction = async (formData: FormData) => {
  logger.info(`Releasing video ${formData.get("video_ids")}`)
  const user = await currentUser()
  const ids_string = formData.get("video_ids") as string
  const ids = ids_string.split(",")
  fetch(`http://${process.env.ORCHESTRATOR_URL}/release/list`, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      "x-api-key": process.env.PRIVATE_API_KEY,
    } as any),
    body: JSON.stringify({
      user: user?.emailAddresses[0].emailAddress,
      video_ids: ids,
    }),
  })
  revalidatePath("/dev")
}
