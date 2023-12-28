"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import { Video } from "@/types/number-card"

export const columns: ColumnDef<Video>[] = [
    {
      accessorKey: "id",
      header: () => <div className="text-center">ID</div>,
      cell: ({row}) => <div className="text-center">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "views",
      header: () => <div className="text-center">Views</div>,
      cell: ({row}) => <div className="text-center">{row.getValue("views")}</div>,
    },
    {
      accessorKey: "status",
      header: () => <div className="text-center">Status</div>,
      cell: ({row}) => <div className="text-center">{row.getValue("status")}</div>,
    },
  ]

