import React from "react"

import getApiKey from "@/lib/getApiKey"

async function Setup() {
  const apiKey = await getApiKey()
  return (
    <section className="container py-5">
      <div className="tracking-tighter leading-tight text-4xl text-white font-bold">
        Api Key
        <span className="text-2xl text-gray-400 font-normal">
          {" "}
          (Keep this secret)
        </span>
      </div>
      <span className="text-2xl text-gray-400 font-normal mt-10">{apiKey}</span>
    </section>
  )
}

export default Setup
