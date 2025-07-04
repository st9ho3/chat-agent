import React from 'react'
import Button from '../shared/sharedButton'

const Pagination = () => {
  return (
    <div className='flex justify-center items-center mx-20'>
      <Button text='Prev' />
      <div className=' mx-5'>
        <span className='w-10 h-10 p-1 mx-1 cursor-pointer border-1 text-gray-500 border-gray-200 rounded-sm'>1</span>
        <span className='w-10 h-10 p-1 mx-1 cursor-pointer text-gray-500 '>2</span>
        <span className='w-10 h-10 p-1 mx-1 cursor-pointer text-gray-500 '>3</span>
        <span className='w-10 h-10 p-1 mx-1 cursor-pointer text-gray-500 '>...</span>
        <span className='w-10 h-10 p-1 mx-1 cursor-pointer text-gray-500 '>5</span>
      </div>
      <Button text='Next' />
    </div>
  )
}

export default Pagination

