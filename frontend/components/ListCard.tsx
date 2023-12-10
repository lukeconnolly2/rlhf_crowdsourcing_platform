import React from 'react'
import { IoIosRefresh } from 'react-icons/io'

const videos = [ 
    {title: 'video1', views: 2, done: false},  
    {title: 'video1', views: 2, done: false},
    {title: 'video1', views: 2, done: false},
    {title: 'video1', views: 2, done: false},
    {title: 'video1', views: 2, done: false},
    {title: 'video1', views: 2, done: false},
    {title: 'video1', views: 2, done: false},
    {title: 'video1', views: 2, done: false},
    {title: 'video1', views: 2, done: false},

]

function ListCard() {
  return (
    <div className='relative h-96 w-[45%] bg-white rounded-lg shadow-lg overflow-y-auto'>
        <div className='sticky top-0 h-10 w-full bg-gray-200 flex items-center p-3 rounded-t-lg justify-between'> 
            <p>Current Videos</p>
            <div className='cursor-pointer' onClick={() => alert('lol')}><IoIosRefresh /></div>
        </div>
        <div className='sticky top-10 h-8 grid grid-flow-col items-center border-b-2 px-2 bg-gray-300'>
                <p className='flex justify-center'>Title</p>
                <p className='flex justify-center'>View Count</p>
                <p className='flex justify-center'>Done</p>
            </div>
        {videos.map((video) => (
            <div key={video.title} className='h-16 grid grid-flow-col justify-around items-center border-b-2 px-2'>
                <p className='flex justify-center'>{video.title}</p>
                <p className='flex justify-center'>{video.views}</p>
                <p className='flex justify-center'>{video.done.toString()}</p>
            </div>
        ))}
    </div>
  )
}

export default ListCard