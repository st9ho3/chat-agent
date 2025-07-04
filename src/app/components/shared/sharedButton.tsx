import React from 'react'

const Button = ({text}: {text:string}) => {
  return (
    <div  className="border-1 border-gray-400 text-gray-500 w-fit px-1 ml-1 rounded-md cursor-pointer">
      {text}
    </div>
  )
}

export default Button
