"use client"

import { setRole } from "@/actions/setRole"
import { User } from "@clerk/nextjs/dist/types/server"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorFn: (originalRow: User, index: number) =>
      originalRow.emailAddresses[0].emailAddress,
    header: "Email",
  },
  {
    accessorFn: (originalRow: User, index: number) =>
      originalRow.publicMetadata.role,
    header: "Role",
    cell: ({ row }) => {
      const user: User = row.original
      const role = (user.publicMetadata.role as string) || "user"
      const roleFormatted = role.charAt(0).toUpperCase() + role.slice(1)

      return <div>{roleFormatted}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user: User = row.original
      const role = user.publicMetadata.role || "user"

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(role as string)}
            >
              Copy Role
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <form action={setRole}>
              <input type="hidden" name="id" value={user.id} />
              <input type="hidden" value="user" name="role" />
              <button type="submit">
                <DropdownMenuItem disabled={role === "user"}>
                  Make User
                </DropdownMenuItem>
              </button>
            </form>

            <form action={setRole}>
              <input type="hidden" name="id" value={user.id} />
              <input type="hidden" value="developer" name="role" />
              <button type="submit">
                <DropdownMenuItem disabled={role === "developer"}>
                  Make Developer
                </DropdownMenuItem>
              </button>
            </form>

            <form action={setRole}>
              <input type="hidden" name="id" value={user.id} />
              <input type="hidden" value="admin" name="role" />
              <button type="submit">
                <DropdownMenuItem disabled={role === "admin"}>
                  Make Admin
                </DropdownMenuItem>
              </button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
