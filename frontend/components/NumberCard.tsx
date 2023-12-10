import React from 'react'
import { IoIosRefresh } from 'react-icons/io'

function NumberCard({ number, title, callback}) {
  return (
    <div className='relative h-64 w-64 bg-white rounded-lg grid grid-flow-row shadow-md'>
        <div onClick={() => callback()} className="absolute top-3 right-3 cursor-pointer"> <IoIosRefresh /> </div>
        <div className='row-span-2 flex justify-center items-center text-2xl'>{number}</div>
        <div className='flex justify-center items-center border-t-2 border-gray-300 text-gray-600'>{title}</div>
    </div>
  )
}

export default NumberCard