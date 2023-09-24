'use client'

import { useEffect, useState } from "react"

interface Props { 
    fileName: string,
}

export default function VideoPlayer({fileName}: Props){
    const [playing, setPlaying] = useState(false)

    useEffect(() => {
        setPlaying(false)
    }, [fileName])

    return (
        <div className='h-video aspect-square bg-transparent justify-center'> 
            <video
                src={fileName}
                autoPlay
                controls
                loop
                onCanPlay={() => {setPlaying(true)}}
                onWaiting={() => {setPlaying(false)}}
                suppressHydrationWarning
            />
            {
                !playing && <div className='h-full w-full flex items-center bg-black justify-center'>spinner</div>
            }
        </div>
    )
}
