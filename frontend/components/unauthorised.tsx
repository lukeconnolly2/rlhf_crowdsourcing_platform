import React from "react"

function Unauthorised() {
  return (
    <section className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-5xl">
        You are not authorised to access this page.
      </h1>
      <p className="text-xl font-extrabold leading-tight tracking-tighter md:text-2xl">
        Please contact the administrator.
      </p>
    </section>
  )
}

export default Unauthorised
