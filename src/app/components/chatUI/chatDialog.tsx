"use client"
import React, { useEffect, useRef } from 'react'
import { MessageType } from '@/shemas/chat';
import Message from './message';
import { useHomeContext } from '@/app/context/homeContext/homeContext';

const ChatDialog = () => {

  const {state} = useHomeContext();
  const messageRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    const container = messageRef.current ? messageRef.current.parentElement : null;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages]);

  return (
    <div className="flex flex-col w-full h-4/5 mb-1 p-3 overflow-y-auto">
      {state.messages.map((message: MessageType) => (
        <Message key={message.id} user={message.sender} text={message.message} />
      ))}
      <div ref={messageRef} />
    </div>
  )
}

export default ChatDialog;