'use client'
import React, { useState, useEffect } from 'react'
import { useUser } from "@clerk/nextjs";
import LoadingSpinner from '@/components/LoadingSpinner';
import NumberCard from '@/components/NumberCard';
import ListCard from '@/components/ListCard';

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
        <div className="flex flex-col min-h-screen p-10 h-full bg-gray-100 gap-10">
            <div className='flex flex-row justify-evenly h-64 '>
                <NumberCard number={100} title={'Videos'} callback={() => {alert('make this work')}} />
                <NumberCard number={100} title={'Preferences collected'} callback={() => {alert('make this work')}} />
                <NumberCard number={100} title={'Views per video'} callback={() => {alert('make this work')}} />
                <NumberCard number={1000} title={'Notifications Sent'} callback={() => {alert('make this work')}} />
            </div>
            <div className='flex flex-row justify-evenly h-96'>
                <ListCard />
                <ListCard />
            </div>
            <div className='flex flex-row h-10 bg-white rounded-lg shadow-md'>
                <div className='flex flex-row items-center justify-between w-full px-3'>
                    <p>API Key</p>
                    <p>{apikey}</p>
                </div>
            </div>
        </div>
  )
}

export default Developer