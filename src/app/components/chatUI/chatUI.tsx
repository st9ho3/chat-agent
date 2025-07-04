"use client";
import React from 'react';
import { useEffect, useRef } from "react";
import ChatDialog from './chatDialog';
import ChatInput from './chatInput';
import { useHomeContext } from '../../context/homeContext/homeContext';

const ChatUI = ({isOpen, onClose}: {isOpen: boolean, onClose: () => void}) => {
  const { state, dispatch } = useHomeContext();

  const chatRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
          const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
              onClose();
            }
          };
      
          if (isOpen) {
            document.addEventListener('keydown', handleEscape);
          }
      
          return () => {
            document.removeEventListener('keydown', handleEscape);
          };
        }, [isOpen, onClose]);
      
        useEffect(() => {
          const handleClickOutside = (event: MouseEvent) => {
           
            if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
              onClose();
            }
          };
      
          if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
          }
      
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
        }, [isOpen, onClose]);
      
      
        if (!isOpen) {
          return null;
        }

  return (
    <div ref={chatRef}  className="flex flex-col items-center justify-end w-full lg:w-1/2 border-l-1 bg-gray-50 border-gray-200 h-screen p-2">
      {state.messages.length > 0 && <ChatDialog />}
      <ChatInput /> 
    </div>
  );
};

export default ChatUI;