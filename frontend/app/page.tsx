'use client'

import VideoPlayer from '@/components/VideoPlayer';
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import React, { useEffect, useState } from "react"

const VIDEOS = [
  '/Reference_Clips/Minigrid_Clips/TestPairClip_8.mp4',
  '/Reference_Clips/Minigrid_Clips/TestPairClip_4.mp4',
  '/Reference_Clips/Minigrid_Clips/TestPairClip_5.mp4',
  '/Reference_Clips/Minigrid_Clips/TestPairClip_7.mp4',
  '/Reference_Clips/Minigrid_Clips/TestPairClip_6.mp4',
  '/Reference_Clips/Minigrid_Clips/TestPairClip_2.mp4',
  '/Reference_Clips/Minigrid_Clips/TestPairClip_3.mp4',
  '/Reference_Clips/Minigrid_Clips/TestPairClip_1.mp4',
]

interface Preference {
  index: number,
  preference: [number, number]
}

export default function Home() {
  const [videoIndex, setVideoIndex] = useState(0)
  const [preferences, setPreferences] = useState([] as Preference[])
  const [videoLinks, setVideoLinks] = useState([] as string[])

  const reset = () => {
    setVideoIndex(0)
    setPreferences([])
  }

  const humanInput = (index: number, preference: [number, number]) => {
    setPreferences([...preferences, {index, preference}])

    if(index === VIDEOS.length - 1) {reset()}
    else {setVideoIndex(index + 1)};
  }

  useEffect(()=> {
     const links = fetch('http://orchastrator:8080/videolink')
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-2 bg-background text-white">
      <h1 className="text-2xl font-bold text-center">
        Final Year Project
      </h1>
        <div className="grid grid-cols-2 gap-4">
            <div>
              <VideoPlayer fileName={VIDEOS[videoIndex]} />
              <div className='grid grid-cols-3 h-10 gap-2 mt-2'>
                <button className='bg-button-left rounded-md' onClick={() => humanInput(videoIndex, [1, 0])}>Left</button>
                <button className='bg-button-cant-tell rounded-md' onClick={() => humanInput(videoIndex, [0.5, 0.5])}>Cant Tell</button>
                <button className='bg-button-right rounded-md' onClick={() => humanInput(videoIndex, [0, 1])}>Right</button> 
              </div>
            </div>
            <div className='flex flex-col pt-7 gap-5'>
              <p>Current Video: {VIDEOS[videoIndex].split('/')[3]}</p>
              {
                preferences.map((preference, index) => {
                  return (
                    <div key={index} className='flex flex-col gap-1'>
                      <p>Video: {VIDEOS[preference.index].split('/')[3]}</p>
                      <p>Preference: {preference.preference[0]} : {preference.preference[1]}</p>
                    </div>
                  )
                })
              }
            </div>
        </div>
    </main>
  )
}
