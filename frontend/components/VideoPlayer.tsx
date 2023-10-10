'use client'

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

const ReactPlayer = dynamic(() => import("react-player"), {ssr: false})

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
            <ReactPlayer
                url={fileName}
                playing={true}
                controls={true}
                height={'100%'}
                width={'100%'}
            />
        </div>
    )
}
