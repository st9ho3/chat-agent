
import React from 'react'
import { House } from 'lucide-react'
import Link from 'next/link'

const HomeButton = () => {
  
  return (
    <Link href='/'  className="z-50 m-4 p-3 cursor-auto">
      <House />
    </Link>
  )
}

export default HomeButton
