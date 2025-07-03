"use client";
import { Paperclip, Hammer } from 'lucide-react';
import { useHomeContext } from '../context/homeContext/homeContext';


const ChatInput = () => {
const {state, dispatch} = useHomeContext()
  
const toggleDialog = (): void => {
    dispatch({type: "TOGGLE_DIALOG"});
  
    console.log(state)
    }  
    
    return (
    <div className="border-1 w-full lg:w-1/2 lg:h-1/8 h-1/5 min-h-26 p-3 rounded-2xl border-gray-300">
      <div className="flex ">
        <input type="text" className=" w-full h-1/4 p-2 focus:outline-none text-gray-500 placeholder:text-gray-400" placeholder="Type your message here..." />
        <button onClick={ !state.dialogExists ? toggleDialog : undefined} className="border-1 border-gray-400 text-gray-500 p-1 ml-1 rounded-md cursor-pointer h">Send</button>
      </div>

      <div className='flex w-fit mt-6 ml-2'>
        <Paperclip className="text-gray-500 lg:size-5 cursor-pointer" />
        <Hammer className="text-gray-500 lg:size-5 cursor-pointer ml-2" />
      </div>
       
     </div>
  )
}

export default ChatInput
