"use client"

import { columns } from "@/lib/columns"
import { DataTable } from "@/lib/data-table"
import { useGetPosts } from "@/lib/getVideosPolling"

function VideoTableWithPolling() {
  const { data: videos, isFetching } = useGetPosts()
  return (
    <>
      <DataTable isFetching={isFetching} columns={columns} data={videos} />
    </>
  )
}

export default VideoTableWithPolling
