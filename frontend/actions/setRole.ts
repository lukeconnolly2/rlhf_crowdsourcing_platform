"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs"
import { clerkClient } from "@clerk/nextjs/server"

import { checkRole } from "@/lib/role"

export async function setRole(formData: FormData) {
  const { userId } = auth()
  if (!userId) {
    throw new Error("You must be signed in")
  }

  if (!checkRole("admin")) {
    return { message: "Not Authorized" }
  }
  await clerkClient.users.updateUser(formData.get("id") as string, {
    publicMetadata: { role: formData.get("role") },
  })
  revalidatePath("/admin")
}
