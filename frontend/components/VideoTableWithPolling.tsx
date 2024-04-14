"use client"

import { useGetPosts } from "@/lib/getVideosPolling"
import { columns } from "@/app/dev/columns"
import { DataTable } from "@/app/dev/data-table"

function VideoTableWithPolling({
  serverAction,
}: {
  serverAction: (formData: FormData) => Promise<void>
}) {
  const { data: videos } = useGetPosts()
  return (
    <>
      <DataTable columns={columns} data={videos} serverAction={serverAction} />
    </>
  )
}

export default VideoTableWithPolling
