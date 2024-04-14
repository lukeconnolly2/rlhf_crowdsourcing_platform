"use client"

import React, { useEffect } from "react"
import { Clipboard, ClipboardCheck } from "lucide-react"

import { Button } from "./ui/button"
import { Card, CardTitle } from "./ui/card"

function ApiKeyCard({ api_key }: { api_key: string }) {
  const [copied, setCopied] = React.useState(false)
  function copyText(entryText) {
    navigator.clipboard.writeText(entryText)
  }

  const handleCopy = () => {
    copyText(api_key)
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
      <CardTitle>Api Key</CardTitle>
      <pre className="text-2xl text-foreground font-thin bg-secondary p-2 rounded-sm grid grid-flow-col justify-between items-center">
        {api_key}
        <Button
          onClick={handleCopy}
          className="text-2xl text-gray-400 font-normal"
        >
          {copied ? <ClipboardCheck size={24} /> : <Clipboard size={24} />}
        </Button>
      </pre>
    </Card>
  )
}

export default ApiKeyCard
