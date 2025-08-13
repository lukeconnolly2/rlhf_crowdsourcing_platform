"use server"

import { revalidatePath } from "next/cache"
import { logger } from "@/logger"
import { Resend } from "resend"

import { getUsers } from "@/lib/getUsers"
import setNotificationsSent from "@/lib/setNotificationsSent"
import { EmailTemplate } from "@/components/email-template"

export const sendNotification = async () => {
  console.log("Sending Notifications")
  const resend = new Resend(process.env.RESEND_API_KEY)
  const users = await getUsers("user")
  setNotificationsSent(users.length || 0)
  revalidatePath("/dev")
  try {
    const data = await resend.emails.send({
      from: "Interactive RL <andreas@daisthree.ucd.ie>",
      to: users,
      subject: "New Machine Learning Outputs!",
      react: EmailTemplate(),
    })
  } catch (error) {
    logger.error(error)
  }
}
