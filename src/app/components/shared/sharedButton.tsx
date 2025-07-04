import React from 'react'

const Button = ({text, action}: {text:string, action: any}) => {
  return (
    <div onClick={action} className="border-1 border-gray-400 text-gray-500 w-fit px-1 ml-1 rounded-md cursor-pointer">
      {text}
    </div>
  )
}

export default Button
