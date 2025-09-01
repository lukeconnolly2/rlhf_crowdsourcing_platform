import React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import VideoPlayer from "@/components/VideoPlayer"

export default function Home() {
  return (
    <>
      <main className="container">
        <section
          className={`grid transition-all duration-300 ease-in-out ${
            "lg:grid-cols-1" + "lg:grid-cols-2"
          } md:grid-cols-1 sm:grid-cols-1 items-center gap-6 pt-6`}
        >
          <Card>
            <CardHeader className="flex flex-row justify-between">
              <div>
                <CardTitle>Pick the video the AI agent performs better</CardTitle>
                <CardDescription>
                  On the left and right side are two different examples of an AI agent trying to play the game.
                  Click the button that corresponds to the video in which the AI agent performs better. 
                  If you can&apos;t decide, you can click the &quot;No Preference&quot; button (use sparingly). 
                  You can watch the video as many times as you want. 
                  After you make your choice, a new pair of videos will be shown to you.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center">
              <VideoPlayer />
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  )
}
