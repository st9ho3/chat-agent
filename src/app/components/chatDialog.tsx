import React from 'react'
import Message from './message'
const ChatDialog = () => {

  const messages = [
  { user: "me", text: "Hey, how's it going today?" },
  { user: "system", text: "I'm doing well, thanks for asking! How can I assist you?" },
  { user: "me", text: "I'm looking for some information about the weather tomorrow." },
  { user: "system", text: "Sure, I can help with that. What city are you interested in?" },
  { user: "me", text: "New York City, please." },
  { user: "system", text: "The forecast for New York City tomorrow is partly cloudy with a high of 75°F (24°C)." },
  { user: "me", text: "Perfect, thanks!" },
  { user: "system", text: "You're welcome! Is there anything else I can help with?" }
];

console.log(messages);

  return (
   <div className="flex flex-col  w-full lg:w-1/2 h-4/5 p-3 overflow-y-scroll ">
    {messages.map((message) => (
      <Message key={message.text} user={message.user} text={message.text} />
    ))}
  </div>
  )
}

export default ChatDialog
