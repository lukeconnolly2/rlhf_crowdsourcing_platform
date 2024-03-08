import React from "react"
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query"

import getVideos from "@/lib/getVideos"

import NumberCardWithPolling from "./number-card-with-polling"

async function VideoNumberCard() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["videos"],
    queryFn: getVideos,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NumberCardWithPolling />
    </HydrationBoundary>
  )
}

export default VideoNumberCard
