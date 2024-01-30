"use client"

import { columns } from "@/app/dev/columns"
import { DataTable } from "@/app/dev/data-table"
import { useGetPosts } from "@/lib/getVideosPolling"

function VideoTableWithPolling() {
  const { data: videos } = useGetPosts()
  return (
    <>
      <DataTable columns={columns} data={videos} />
    </>
  )
}

export default VideoTableWithPolling
