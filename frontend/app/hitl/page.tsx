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
                <CardTitle>Interact to Train AI models</CardTitle>
                <CardDescription>
                  Help train AI models by providing feedback on which video is
                  better.
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
