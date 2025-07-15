"use client"

import { useHomeContext } from "@/app/context/homeContext/homeContext";
import { useEffect, useState } from "react";

const Notification = () => {

    const {state, dispatch} = useHomeContext()

    useEffect(() => {
    // Set a timer to automatically close the notification
    const timer = setTimeout(() => {
        dispatch({ type: "CLOSE_NOTIFICATION"})
    }, 4000);

    return () => clearTimeout(timer);
  }, []);
  
    const baseClass = "fixed bottom-5 left-5 flex items-center p-4 rounded-lg shadow-lg max-w-sm transition-transform duration-300 ease-in-out border-l-4";
  
  

  return (
    <div className={`${baseClass}`}>
      
      <div className="flex-1 text-sm font-medium">{state.notification.message}</div>
      {/* Updated button style for better contrast on light backgrounds */}
      <button  className="ml-4 -mr-2 p-1.5 rounded-md hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-current">
        <span className="sr-only">Close</span>
        
      </button>
    </div>
  );
};

export default Notification