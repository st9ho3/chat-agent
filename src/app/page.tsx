"use client";
import React from "react";
import ChatUI from "./components/chatUI/chatUI";
import { Bot, X } from "lucide-react";
import { useHomeContext } from "./context/homeContext/homeContext";

export default function Home() {
  const { state, dispatch } = useHomeContext();
  const toggleChat = (): void => {
    dispatch({ type: "TOGGLE_CHAT" });
  };
  return (
    <div className="flex justify-end ">
      {!state.chatOpen ? (
        <div
          onClick={toggleChat}
          className="fixed bottom-0 right-0 z-50 m-4 p-3 bg-white rounded-full cursor-pointer shadow-lg"
        >
          <Bot />
        </div>
      ) : (
        <>
          <div
            onClick={toggleChat}
            className="fixed bottom-0 right-0 z-50 m-4 p-2 bg-white rounded-full cursor-pointer shadow-lg transition-transform duration-300 hover:scale-110"
          >
            <X />
          </div>
          <ChatUI />
        </>
      )}
    </div>
  );
}