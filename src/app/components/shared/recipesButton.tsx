import React from 'react'
import { CookingPot } from 'lucide-react';
import Link from 'next/link';

const RecipesButton = () => {
  return (
    <Link href='/recipes'  className=" m-4 p-3 cursor-auto">
      <CookingPot />
    </Link>
  )
}

export default RecipesButton
