"use client"

import { columns } from "@/lib/columns"
import { DataTable } from "@/lib/data-table"
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
