"use client"

import React, { useState } from "react"
import { RefreshCcw } from "lucide-react"

import useTimeout from "@/hooks/use-timeout"

import { Button } from "./ui/button"

interface RefreshButtonProps {
  refresh: () => void
}

export default function RefreshButton({ refresh }: RefreshButtonProps) {
  const [loading, setLoading] = useState(false)
  const { reset } = useTimeout(() => setLoading(false), 3000)

  const handleOnClick = () => {
    refresh()
    setLoading(true)
    reset()
  }
  return (
    <Button
      disabled={loading}
      variant="outline"
      size="icon"
      onClick={handleOnClick}
    >
      <RefreshCcw className={`${loading ? "animate-spin" : ""} h-4 w-4`} />
    </Button>
  )
}
