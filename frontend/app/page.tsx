'use client'

import VideoPlayer from '@/components/VideoPlayer';
import React, { useEffect, useState } from "react"


interface Preference {
  index: number,
  preference: [number, number]
}

export default function Home() {
  const [videoIndex, setVideoIndex] = useState(0)
  const [preferences, setPreferences] = useState([] as Preference[])
  const [videoLinks, setVideoLinks] = useState([] as string[])

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => {
        const {links} = data
        setVideoLinks(links)
      })
  }, [])

  const reset = () => {
    setVideoIndex(0)
    setPreferences([])
  }

  const humanInput = (index: number, preference: [number, number]) => {
    setPreferences([...preferences, {index, preference}])

    if(index === videoLinks.length - 1) {reset()}
    else {setVideoIndex(index + 1)};
  }

  console.log(preferences, 'preferences');
  console.log(videoLinks, 'videoLinks');
  console.log(videoIndex, 'videoIndex');

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-2 bg-background text-white">
      <h1 className="text-2xl font-bold text-center">
        Final Year Project
      </h1>
        <div className="grid grid-cols-2 gap-4">
            <div>
              <VideoPlayer fileName={videoLinks[videoIndex]} />
              <div className='grid grid-cols-3 h-10 gap-2 mt-2'>
                <button className='bg-button-left rounded-md' onClick={() => humanInput(videoIndex, [1, 0])}>Left</button>
                <button className='bg-button-cant-tell rounded-md' onClick={() => humanInput(videoIndex, [0.5, 0.5])}>Cant Tell</button>
                <button className='bg-button-right rounded-md' onClick={() => humanInput(videoIndex, [0, 1])}>Right</button> 
              </div>
            </div>
            <div className='flex flex-col pt-7 gap-5 border border-white rounded-lg p-2'>
              <p>Current Video: {videoLinks[videoIndex]}</p>
              {
                preferences.map((preference, index) => {
                  return (
                    <div key={index} className='flex flex-col gap-1'>
                      <p>Video: {videoLinks[preference.index].split('/')[3]}</p>
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
