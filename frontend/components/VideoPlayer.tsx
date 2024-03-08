import React from "react"
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query"

import getReleasedVideos from "@/lib/getReleasedVideos"

import { VideoPlayerWithPolling } from "./video-player-with-polling"

async function VideoPlayer() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["releasedVideos"],
    queryFn: getReleasedVideos,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VideoPlayerWithPolling />
    </HydrationBoundary>
  )
}

export default VideoPlayer
