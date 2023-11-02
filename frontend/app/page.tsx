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
    console.log('CiCd only on merge ')
    fetch('/api')
      .then((res) => res.json())
      .then((data) => {
        const {links} = data
        setVideoLinks(links)
        console.log(links)
      })
  }, [])

  const reset = () => {
    setVideoIndex(0)
    setPreferences([])
  }

  const humanInput = (index: number, preference: [number, number]) => {
    setPreferences([...preferences, {index, preference}])

    if(index === videoLinks.length) {reset()}
    else {setVideoIndex(index + 1)};
  }

  console.log(videoLinks)

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-2 bg-background text-black">
        <div className="grid grid-cols-2 gap-4">
            <div>
              <VideoPlayer fileName={videoLinks[videoIndex]} />
              {/* <div className='grid grid-cols-3 h-10 gap-2 mt-2'>
                <button className='bg-button-left rounded-md' onClick={() => humanInput(videoIndex, [1, 0])}>Left</button>
                <button className='bg-button-cant-tell rounded-md' onClick={() => humanInput(videoIndex, [0.5, 0.5])}>Cant Tell</button>
                <button className='bg-button-right rounded-md' onClick={() => humanInput(videoIndex, [0, 1])}>Right</button> 
              </div> */}
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
        <div className="w-full flex flex-row place-content-evenly">
            <button type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" onClick={() => humanInput(videoIndex, [1, 0])} >Left</button>
            <button type="button" className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800" onClick={() => humanInput(videoIndex, [0.5, 0.5])} >Can't Tell</button>
            <button type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" onClick={() => humanInput(videoIndex, [0, 1])} >Right</button>
        </div>
    </main>
  )
}
