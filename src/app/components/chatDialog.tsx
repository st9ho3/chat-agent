import React from 'react'

const ChatDialog = () => {
  return (
    <div className=" flex flex-col items-end border-1 w-full lg:w-1/2 h-4/5 p-3 ">
      <div className='flex justify-center items-center flex-col w-fit h-1 text-sm bg-white rounded-2xl border-gray-300 border-1 p-3 '>
        Hello, bro. What's up? Are you up for today? Hello, bro. What's up? Are you up for today?
      </div>
      <div className='flex justify-center items-center flex-col max-w-1/2 max-h-40 min-w-fit min-h-1 text-sm bg-white rounded-2xl border-gray-300 border-1 p-3 '>
        Hello, bro. 
      </div>
    </div>
  )
}

export default ChatDialog
