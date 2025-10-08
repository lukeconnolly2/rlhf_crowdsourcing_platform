import { clerkClient } from "@clerk/nextjs/server"
import { User } from "@clerk/nextjs/dist/types/server"

import { columns } from "./columns"
import { DataTable } from "./data-table"

export async function AdminDataTable() {
  const usersResponse = await (await clerkClient()).users.getUserList()
  const users: User[] = usersResponse.data
  return (
    <DataTable columns={columns} data={JSON.parse(JSON.stringify(users))} />
  )
}

export default AdminDataTable
