"use client"
import React from 'react'
import {Plus } from 'lucide-react'
import { useHomeContext } from '@/app/context/homeContext/homeContext'

const CreateButton = () => {
  const {dispatch} = useHomeContext()

  return (
    <div
          className="fixed bottom-15 right-0 z-49 m-4 p-3 bg-white rounded-full border border-dashed border-gray-400 shadow-lg"
          onClick={() => dispatch({type: "OPEN_MODAL"})}
        >
          <Plus />
      </div>
  )
}

export default CreateButton
