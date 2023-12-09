'use client'
import React from "react"
import { Playfair_Display, Roboto } from 'next/font/google'
import { useSession } from "@clerk/nextjs"

const playfair = Playfair_Display({ subsets: ['latin'] })
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] })

export default function Home() {
  const { isLoaded, session, isSignedIn } = useSession();

  return (
    <main className="flex flex-col ">
      { !isSignedIn &&
      <div className="min-h-screen flex flex-col items-center justify-center text-4xl gap-2"> 
         <h1 className={playfair.className + " font-bold"}> Human in the loop </h1>
         <p className={roboto.className}> Luke Connolly </p>
         <div className={playfair.className + " flex flex-row gap-10 mt-10"}>
            <a href="#about">
              <button  className="bg-electric-yellow hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                Learn More
              </button>
            </a>
            <a href="/hitl">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Try it out
              </button>
            </a>
          </div>
      </div>}
      <div id="about" className="flex flex-col gap-2 min-h-screen font-bold bg-slate-400 p-5 ">
        <div className="bg-white rounded-lg p-5 w-[30%] text-2xl flex items-center justify-center">
          About the Project.
        </div>
      </div>
    </main>
  )
}
