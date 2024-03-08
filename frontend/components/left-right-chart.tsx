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
        <div className="w-full h-3 rounded-lg bg-secondary text-transparent flex flex-row overflow-hidden">
          <Tooltip>
            <TooltipTrigger style={{ width: `${(left / total) * 100}%` }}>
              <div className={`h-full bg-green-500 text-transparent `}></div>
            </TooltipTrigger>
            <TooltipContent>Left Preferences: {left}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              style={{ width: `${(nopreference / total) * 100}%` }}
            >
              <div
                className={`h-full bg-slate-400 w-full text-transparent`}
              ></div>
            </TooltipTrigger>
            <TooltipContent>No Preference: {nopreference}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger style={{ width: `${(right / total) * 100}%` }}>
              <div className={`h-full bg-red-500 text-transparent`}></div>
            </TooltipTrigger>
            <TooltipContent>Right Preferences: {right}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              style={{
                width: `${
                  ((total - (left + right + nopreference)) / total) * 100
                }%`,
              }}
            >
              <div
                className={`h-full rounded-r-lg bg-transparent text-transparent`}
              ></div>
            </TooltipTrigger>
            <TooltipContent>
              Waiting for {total - (left + right + nopreference)} preferences
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}

export default LeftRightChart
