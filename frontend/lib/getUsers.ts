import { clerkClient } from "@clerk/nextjs/server"
import { User } from "@clerk/nextjs/dist/types/server"

export const getUsers = async (role: string) => {
  const cclient = await clerkClient()
  const usersResponse = await cclient.users.getUserList();
  const users = usersResponse.data;
  const usersByRole = users.filter(
    (user) => user.publicMetadata.role === role || !user.publicMetadata.role
  )

  const usersEmails = usersByRole.map(
    (user) => user.emailAddresses[0].emailAddress
  )
  return usersEmails
}
