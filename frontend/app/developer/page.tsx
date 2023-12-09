'use client'
import React, { useState, useEffect } from 'react'
import { useUser } from "@clerk/nextjs";
import LoadingSpinner from '@/components/LoadingSpinner';

function Developer() {
    const { user, isLoaded } = useUser();
    const [apikey, setApikey] = useState("");

    useEffect(() => {
        if(isLoaded) {
            fetch(`/api/get_api_key?user=${user.primaryEmailAddress.emailAddress}`)
                .then((res) => res.json())
                .then((data) => {
                    const {apikey} = data
                    setApikey(apikey.key)
                })
        }
        if(!isLoaded) {
            setApikey("Loading...")
        }
    }, [isLoaded])


    if(!isLoaded) {
        return ( 
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <LoadingSpinner />
            </div>
        )
    }

    return (
        //dashboard
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-6xl font-bold text-purple-800">
                Developer Page
            </h1>
            <p className="mt-3 text-2xl text-purple-800">
                Your API key is:
            </p>
            <p className="mt-3 text-2xl text-black">
                {apikey}
            </p>
        </div>
  )
}

export default Developer