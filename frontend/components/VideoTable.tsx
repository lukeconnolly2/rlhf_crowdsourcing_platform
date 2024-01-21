import { columns } from "../lib/columns"
import { DataTable } from "../lib/data-table"
import getVideos from "../lib/getVideos"
import { Video } from "../types/video"

async function VideoTable() {
  const videos: Video[] = await getVideos()
  return <DataTable columns={columns} data={videos} />
}

export default VideoTable
