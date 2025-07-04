import React from 'react'

const RecipeForm = () => {
  return (
    <div className='w-70 h-120 md:w-180 md:h-130 '>
      <form>
        <input id='title' type="text" className='border-b-1 border-gray-300 p-2 placeholder:text-gray-500 text-2xl focus:outline-none ' placeholder="Please enter a name" required />
      </form>
    </div>
  )
}

export default RecipeForm

