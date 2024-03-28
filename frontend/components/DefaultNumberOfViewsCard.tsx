import React from "react"
import { updateRequiredViews } from "@/actions/updateRequiredViews"

import getDefaultRequiredViews from "@/lib/getDefaultRequiredViews"

import EditableNumberCard from "./editable-number-card"

async function DefaultNumberOfViewsCard() {
  const requiredNumberOfViews = await getDefaultRequiredViews()

  return (
    <EditableNumberCard
      title="Views per Video"
      number={requiredNumberOfViews}
      description={"Default number of views required for a video"}
      className="col-span-1"
      min={1}
      max={10}
      serverAction={updateRequiredViews}
    />
  )
}

export default DefaultNumberOfViewsCard
