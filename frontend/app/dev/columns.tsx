"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Video } from "@/types/video"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LeftRightChart from "@/components/left-right-chart"
import { VideoPlayerWithoutPolling } from "@/components/video-player"

export const columns: ColumnDef<Video>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "_id",
    header: () => <div className="text-center">ID</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {row.getValue("_id")
          ? String(row.getValue("_id")).substring(0, 10)
          : ""}
      </div>
    ),
  },
  {
    accessorKey: "views",
    header: () => <div className="text-center">Views</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("views")}</div>
    ),
  },
  {
    accessorKey: "required_views",
    header: () => <div className="text-center">Required Views</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("required_views")}</div>
    ),
  },
  {
    accessorKey: "preferences",
    header: () => <div className="text-center">Preferences</div>,
    cell: ({ row }) => {
      const originalRow = row.original
      const preferences = originalRow["preferences"]
      const preferenceCounts = preferences.reduce(
        (acc, item) => {
          const preference = item.preference

          if (preference[0] === 0 && preference[1] === 1) {
            acc.countRight++
          } else if (preference[0] === 0 && preference[1] === 0) {
            acc.countNoPreference++
          } else if (preference[0] === 1 && preference[1] === 0) {
            acc.countLeft++
          }

          return acc
        },
        { countRight: 0, countNoPreference: 0, countLeft: 0 }
      )
      const { countRight, countNoPreference, countLeft } = preferenceCounts
      return (
        <LeftRightChart
          left={countLeft}
          right={countRight}
          nopreference={countNoPreference}
          total={originalRow.required_views}
        />
      )
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      switch (row.getValue("status")) {
        case "Unreleased":
          return (
            <div className="text-center cursor-default">
              <Badge variant="outline">{row.getValue("status")}</Badge>
            </div>
          )
        case "Released":
          return (
            <div className="text-center cursor-default">
              <Badge variant="secondary">{row.getValue("status")}</Badge>
            </div>
          )
        case "Done":
          return (
            <div className="text-center cursor-default">
              <Badge variant="default">{row.getValue("status")}</Badge>
            </div>
          )
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const video = row.original

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Video Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(video.public_url)}
              >
                Copy Video ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DialogTrigger asChild>
                <DropdownMenuItem>View Video</DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className="p-10">
            <VideoPlayerWithoutPolling fileName={video.public_url} />
          </DialogContent>
        </Dialog>
      )
    },
  },
]
