"use client"
import React, { use } from 'react'
import Button from '../shared/sharedButton'
import { paginationPages } from '@/app/services/helpers'
import { useHomeContext } from '@/app/context/homeContext/homeContext'


const Pagination = ({items}: {items: Recipe[]}) => {
  const {state, dispatch} = useHomeContext()
  const pages = paginationPages(items, 10)
  console.log(pages)

  return (
    <div className='absolute bottom-5 left-0 right-0 flex justify-center items-center mx-20'>
      <Button text='Prev' />
      <div className=' mx-5'>
        {pages.map((page) => (
          <span key={page} onClick={() => dispatch({type: "CHOOSE_PAGE", payload: page })} className='w-10 h-10 p-1 mx-1 cursor-pointer text-gray-500 rounded-sm'>
            {page}
          </span>
        ))}
      </div>
      <Button text='Next' />
    </div>
  )
}

export default Pagination

