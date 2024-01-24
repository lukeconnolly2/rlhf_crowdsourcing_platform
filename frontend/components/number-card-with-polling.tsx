"use client"

import React from "react"

import { useGetPosts } from "@/lib/getVideosPolling"

import NumberCard from "./number-card"

function NumberCardWithPolling() {
  const { data: videos } = useGetPosts()
  return (
    <NumberCard
      description="Number of videos you have uploaded to the system"
      number={videos?.length}
      title="Videos"
      min={0}
      max={300}
    />
  )
}

export default NumberCardWithPolling
