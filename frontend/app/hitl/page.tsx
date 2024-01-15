"use client"

import React, { useEffect, useState } from "react"
import { Eye } from "lucide-react"

import { Video } from "@/types/video"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/icons"
import RefreshButton from "@/components/refreshButton"
import VideoPlayer from "@/components/video-player"

interface Preference {
  index: number
  preference: [number, number]
}

export default function Home() {
  const [videoIndex, setVideoIndex] = useState(0)
  const [preferences, setPreferences] = useState([] as Preference[])
  const [videos, setVideos] = useState([] as Video[])
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data)
      })
  }, [])

  const reset = () => {
    setVideoIndex(0)
    setPreferences([])
  }

  const humanInput = (index: number, preference: [number, number]) => {
    setPreferences([...preferences, { index, preference }])

    if (index + 1 === videos.length) {
      reset()
      alert("You have finished the HITL task!")
    } else {
      setVideoIndex(index + 1)
    }
  }

  return (
    <>
      <main className="container">
        <section
          className={`grid transition-all duration-300 ease-in-out ${
            focused ? "lg:grid-cols-1" : "lg:grid-cols-2"
          } md:grid-cols-1 sm:grid-cols-1 items-center gap-6 pt-6`}
        >
          <Card>
            <CardHeader className="flex flex-row justify-between">
              <div>
                <CardTitle>Interact to Train AI models</CardTitle>
                <CardDescription>
                  Help train AI models by providing feedback on which video is
                  better.
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setFocused(!focused)}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center">
              {videos.length === 0 && (
                <div className="aspect-square w-5/12 flex items-center justify-center">
                  {" "}
                  No Videos available currently
                </div>
              )}
              {videos.length > 0 && (
                <VideoPlayer fileName={videos[videoIndex].public_url} />
              )}
              <div className="flex flex-row justify-between pt-3 gap-6">
                <Button onClick={() => humanInput(videoIndex, [0, 0])}>
                  Left is better
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => humanInput(videoIndex, [0, 0])}
                >
                  Cant Tell
                </Button>
                <Button onClick={() => humanInput(videoIndex, [0, 0])}>
                  Right is better
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Some Details</CardTitle>
              <CardDescription>Something will go down here</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Some details will go here</p>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  )
}
