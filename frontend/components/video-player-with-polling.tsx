"use client"

import React, { useState } from "react"
import dynamic from "next/dynamic"
import { preferenceAction } from "@/actions/preferenceAction"

import { useGetReleasedVideos } from "@/lib/getReleasedVideosPolling"

import { Button } from "./ui/button"

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false })

export function VideoPlayerWithPolling() {
  const { data: videos } = useGetReleasedVideos()
  const [currentVideoIndex, setCurrentVideo] = useState(0)
  const numberOfVideos = videos?.length || 0
  const current_video = videos?.[currentVideoIndex]

  console.log("videos", videos)

  if (currentVideoIndex >= numberOfVideos) {
    return (
      <div className="flex justify-center items-center h-64">
        There are no more videos available.
      </div>
    )
  }

  const handleSubmit = () => setCurrentVideo(currentVideoIndex + 1)

  return (
    <>
      <ul>
        <ReactPlayer
          url={current_video.public_url}
          playing
          muted
          controls={true}
          width="100%"
          height="100%"
        />
      </ul>
      <div className="grid grid-flow-col gap-4 mt-3">
        <form action={preferenceAction} onSubmit={handleSubmit}>
          <input type="hidden" name="video_id" value={current_video._id} />
          <input type="hidden" name="preference" value="Left" />
          <Button type="submit"> Left is better </Button>
        </form>
        <form action={preferenceAction} onSubmit={handleSubmit}>
          <input type="hidden" name="video_id" value={current_video._id} />
          <input type="hidden" name="preference" value="None" />
          <Button variant={"secondary"} type="submit">
            {" "}
            No preference{" "}
          </Button>
        </form>
        <form action={preferenceAction} onSubmit={handleSubmit}>
          <input type="hidden" name="video_id" value={current_video._id} />
          <input type="hidden" name="preference" value="Right" />
          <Button type="submit"> Right is better </Button>
        </form>
      </div>
    </>
  )
}
