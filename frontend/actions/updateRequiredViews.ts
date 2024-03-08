"use server"

import { revalidatePath } from "next/cache"
import { logger } from "@/logger"
import { currentUser } from "@clerk/nextjs"

export const updateRequiredViews = async (formData: FormData) => {
  logger.info(`Releasing video ${formData.get("requiredViews")}`)
  const user = await currentUser()
  const requiredViews = formData.get("requiredViews") as string
  fetch(`http://${process.env.ORCHESTRATOR_URL}/updateRequiredViews`, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      "x-api-key": process.env.PRIVATE_API_KEY,
    } as any),
    body: JSON.stringify({
      user: user?.emailAddresses[0].emailAddress,
      requiredViews: requiredViews,
    }),
  })
  revalidatePath("/dev")
}
