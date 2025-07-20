import React from 'react'
import { CookingPot } from 'lucide-react';
import Link from 'next/link';

const RecipesButton = () => {
  return (
    <Link href='/recipes'  className="fixed bottom-45 right-0 z-50 m-4 p-3 cursor-auto bg-white rounded-full border border-dashed border-gray-400 shadow-lg">
      <CookingPot />
    </Link>
  )
}

export default RecipesButton
