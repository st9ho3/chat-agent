"use client";

import ChatDialog from "./components/chatDialog";
import ChatInput from "./components/chatInput";
import { useHomeContext } from "./context/homeContext/homeContext";

export default function Home() {
  const {state} = useHomeContext();

  
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen p-2">
      { state.dialogExists && <ChatDialog />}
     <ChatInput />
    </div>
  );
}
