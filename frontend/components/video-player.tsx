"use client"

import dynamic from "next/dynamic"

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false })

interface Props {
  fileName: string
  className?: string
}

export default function VideoPlayer({ fileName, className }: Props) {
  return (
    <div className={`max-w-full bg-transparent overflow-hidden ${className}`}>
      <ReactPlayer
        url={fileName}
        playing={true}
        controls={true}
        height={"100%"}
        width={"100%"}
      />
    </div>
  )
}
