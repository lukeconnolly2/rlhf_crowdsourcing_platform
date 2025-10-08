"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"
import { clerkClient } from "@clerk/nextjs/server"

import { checkRole } from "@/lib/role"

export async function setRole(formData: FormData) {
  const { userId } = await auth()
  if (!userId) {
    throw new Error("You must be signed in")
  }

  if (!(await checkRole("admin"))) {
    throw new Error("Not Authorized")
  }
  const cclient = await clerkClient()
  await cclient.users.updateUser(formData.get("id") as string, {
    publicMetadata: { role: formData.get("role") },
  })
  revalidatePath("/admin")
}
