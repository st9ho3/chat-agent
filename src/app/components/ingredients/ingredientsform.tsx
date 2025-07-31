import React from 'react'
import AddIngredient from './ingredient'

const IngredientsForm = () => {
  return (
    <div>
      ingredient
      <AddIngredient onAddIngredient={() => console.log("Ingredient added")}/>
    </div>
  )
}

export default IngredientsForm
