'use client'

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import VideoPlayer from '@/components/video-player';
import React, { useEffect, useState } from "react"


interface Video {
  public_url: string,
  viewed: number,
  user: string,
  _id: string
}

interface Preference {
  index: number,
  preference: [number, number]
}

export default function Home() {
  const [videoIndex, setVideoIndex] = useState(0)
  const [preferences, setPreferences] = useState([] as Preference[])
  const [videos, setVideos] = useState([] as Video[])

  useEffect(() => {
    fetch('/api')
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
    setPreferences([...preferences, {index, preference}])

    if(index + 1 === videos.length) {reset(); alert('You have finished the HITL task!')}
    else {setVideoIndex(index + 1)};
  }

  return (
    <>
      <main className="container">
        <section className="grid grid-cols-2 items-center gap-6 pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Interact to Train AI models</CardTitle>
                <CardDescription>Help train AI models by providing feedback on which video is better.</CardDescription>
              </CardHeader>
              <CardContent className='flex flex-col justify-center items-center'>
                {videos.length === 0 && <div className='aspect-square w-5/12 flex items-center justify-center'> No Videos available currently</div>}
                {videos.length > 0 && <VideoPlayer fileName={videos[videoIndex].public_url} />}
                <div className="flex flex-row justify-between pt-3 gap-6">
                  <Button onClick={() => humanInput(videoIndex, [0, 0])}>Left is better</Button>
                  <Button variant='secondary' onClick={() => humanInput(videoIndex, [0, 0])}>Cant Tell</Button>
                  <Button onClick={() => humanInput(videoIndex, [0, 0])}>Right is better</Button>
                </div>
              </CardContent>
            </Card>
          <Card className='h-full'>
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
