import React from "react"

import LeftRightChart from "@/components/left-right-chart"

function TestPage() {
  return (
    <div>
      <LeftRightChart left={50} right={20} nopreference={30} total={100} />
    </div>
  )
}

export default TestPage
