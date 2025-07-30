import { Apple } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

const IngredientsButton = () => {
  return (
    <Link href='/ingredients'  className=" m-4 p-3 cursor-auto">
      <Apple />
    </Link>
  )
}

export default IngredientsButton
