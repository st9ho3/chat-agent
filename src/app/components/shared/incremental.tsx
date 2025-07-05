"use client"
import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const Incremental = () => {
  const [count, setCount] = useState<number>(0)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value === '' ? 0 : Number(e.target.value)
    setCount(value)
  }

  const handleClick = (action: 'minus' | 'plus') => {
    setIsEditing(false)             
    if (action === 'plus') {
      setCount(count + 1)
    } else if (count > 0) {
      setCount(count - 1)
    }
  }

  const handleFocus = () => {
    setIsEditing(true)
  }

  const handleBlur = () => {
    if (count === 0) {
      setIsEditing(false)
    }
  }

  
  const displayValue = isEditing && count === 0
    ? ''
    : count

  return (
    <div className="flex items-center ">
      <button
        type="button"
        className="w-6 h-6 flex justify-center items-center bg-gray-100 rounded-full hover:bg-gray-200 active:bg-gray-300 transition-colors duration-200"
        aria-label="Decrement count"
        onClick={() => handleClick('minus')}
      >
        <Minus color="gray" size={16} />
      </button>

      <input
        type="number"
        className="focus:outline-none px-2 w-18 text-center font-semibold text-2xl text-gray-800"
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      <button
        type="button"
        className="w-6 h-6 flex justify-center items-center bg-gray-100 rounded-full hover:bg-gray-200 active:bg-gray-300 transition-colors duration-200"
        aria-label="Increment count"
        onClick={() => handleClick('plus')}
      >
        <Plus color="gray" size={16} />
      </button>
    </div>
  )
}

export default Incremental
