
import React from 'react'
import { House } from 'lucide-react'
import Link from 'next/link'

const HomeButton = () => {
  
  return (
    <Link href='/'  className="fixed bottom-30 right-0 z-50 m-4 p-3 cursor-auto bg-white rounded-full border border-dashed border-gray-400 shadow-lg">
      <House />
    </Link>
  )
}

export default HomeButton
