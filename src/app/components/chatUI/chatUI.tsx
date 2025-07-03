import React from 'react'
import ChatDialog from './chatDialog'
import ChatInput from './chatInput'

const ChatUI = () => {
  return (
    <div className="flex flex-col items-center justify-center border-l-1 border-gray-200 h-screen p-2">
     <ChatDialog />

     <ChatInput /> 
    </div>
  )
}

export default ChatUI
