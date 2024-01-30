import React from "react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function LeftRightChart({ left, right, nopreference, total }) {
  return (
    <TooltipProvider>
      <div className="h-full w-full flex justify-center items-center">
        <div className="w-full h-3 rounded-lg bg-secondary text-transparent flex flex-row">
          <Tooltip>
            <TooltipTrigger style={{ width: `${(left / total) * 100}%` }}>
              <div
                className={`h-full rounded-l-lg bg-green-500 text-transparent ${
                  left === total ? "rounded-r-lg" : ""
                }`}
              ></div>
            </TooltipTrigger>
            <TooltipContent>Left Preferences: {left}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              style={{ width: `${(nopreference / total) * 100}%` }}
            >
              <div
                className={`h-full bg-slate-400 w-full text-transparent ${
                  left === 0 ? "rounded-l-lg" : ""
                } ${right === 0 ? "rounded-r-lg" : ""}`}
              ></div>
            </TooltipTrigger>
            <TooltipContent>No Preferences: {nopreference}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger style={{ width: `${(right / total) * 100}%` }}>
              <div
                className={`h-full rounded-r-lg bg-red-500 text-transparent ${
                  right === total ? "rounded-l-lg" : ""
                }`}
              ></div>
            </TooltipTrigger>
            <TooltipContent>Right Preferences: {right}</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}

export default LeftRightChart
