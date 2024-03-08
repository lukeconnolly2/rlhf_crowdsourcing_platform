import { clerkClient } from "@clerk/nextjs"
import { User } from "@clerk/nextjs/dist/types/server"

import { columns } from "./columns"
import { DataTable } from "./data-table"

export async function AdminDataTable() {
  const users: User[] = await clerkClient.users.getUserList()
  return (
    <DataTable columns={columns} data={JSON.parse(JSON.stringify(users))} />
  )
}

export default AdminDataTable
