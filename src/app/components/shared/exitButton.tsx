"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'

const ExitButton = () => {

    const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-offset-2 transition-colors"
      aria-label="Close modal"
    >
      <X />
    </button>
  )
}

export default ExitButton
