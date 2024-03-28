"use client"

import React, { useEffect } from "react"
import { Clipboard, ClipboardCheck } from "lucide-react"

import { Button } from "./ui/button"
import { Card, CardTitle } from "./ui/card"

function Code_Card({
  title,
  code,
  terminal = true,
  copy = true,
}: {
  title: string
  code: string
  terminal?: boolean
  copy?: boolean
}) {
  const [copied, setCopied] = React.useState(false)
  function copyText(entryText) {
    navigator.clipboard.writeText(entryText)
  }

  const handleCopy = () => {
    copyText(code)
    setCopied(true)
  }

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }, [copied])
  return (
    <Card className="p-10 flex flex-col gap-5">
      <CardTitle>{title}</CardTitle>
      <pre className="text-foreground font-thin bg-secondary p-2 rounded-sm grid grid-flow-col justify-between items-center text-sm">
        {terminal ? (
          <div>
            <span className="text-green-300">hitl@lab</span>:
            <span className="text-blue-400">~/project</span>$ {code}
          </div>
        ) : (
          code
        )}

        {copy && (
          <Button
            onClick={handleCopy}
            className="text-2xl text-gray-400 font-normal"
          >
            {copied ? <ClipboardCheck size={24} /> : <Clipboard size={24} />}
          </Button>
        )}
      </pre>
    </Card>
  )
}

export default Code_Card
