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
                src={'Reference_Clips/Minigrid_Clips/TestPairClip_2.mp4'}
                autoPlay
                controls
                loop
                onCanPlay={() => {setPlaying(true)}}
                onWaiting={() => {setPlaying(false)}}
                suppressHydrationWarning
            />
        </div>
    )
}
