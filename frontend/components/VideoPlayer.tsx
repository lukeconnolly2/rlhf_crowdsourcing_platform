import React from "react"
import { preferenceAction } from "@/actions/preferenceAction"
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
      <VideoPlayerWithPolling serverAction={preferenceAction} />
    </HydrationBoundary>
  )
}

export default VideoPlayer
