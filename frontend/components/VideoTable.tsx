import { releaseManyAction } from "@/actions/releaseManyAction"
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query"

import getVideos from "../lib/getVideos"
import VideoTableWithPolling from "./VideoTableWithPolling"

async function VideoTable() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["videos"],
    queryFn: getVideos,
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VideoTableWithPolling serverAction={releaseManyAction} />
    </HydrationBoundary>
  )
}

export default VideoTable
