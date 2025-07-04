"use client";
import React from 'react';
import ChatDialog from './chatDialog';
import ChatInput from './chatInput';
import { useHomeContext } from '../../context/homeContext/homeContext';

const ChatUI = () => {
  const { state, dispatch } = useHomeContext();

  return (
    <div className="flex flex-col items-center justify-end w-full lg:w-1/2 border-l-1 bg-gray-50 border-gray-200 h-screen p-2">
      {state.messages.length > 0 && <ChatDialog />}
      <ChatInput /> 
    </div>
  );
};

export default ChatUI;