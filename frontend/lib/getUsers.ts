import { clerkClient } from "@clerk/nextjs"
import { User } from "@clerk/nextjs/dist/types/server"

export const getUsers = async (role: string) => {
  const users: User[] = await clerkClient.users.getUserList()
  const usersByRole = users.filter(
    (user) => user.publicMetadata.role === role || !user.publicMetadata.role
  )

  const usersEmails = usersByRole.map(
    (user) => user.emailAddresses[0].emailAddress
  )
  return usersEmails
}
