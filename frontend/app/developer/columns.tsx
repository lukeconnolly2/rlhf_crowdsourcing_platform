"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import { Video } from "@/types/video"

export const columns: ColumnDef<Video>[] = [
    {
      accessorKey: "id",
      header: () => <div className="text-center">ID</div>,
      cell: ({row}) => <div className="text-center">{row.getValue("id") ? String(row.getValue("id")).substring(0, 10) : ""}</div>,
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

