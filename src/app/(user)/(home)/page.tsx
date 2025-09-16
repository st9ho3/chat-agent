
import { auth } from '@/auth'
import { Carrot, Euro, Percent, ShoppingBasket } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'
import Card from '@/app/components/home/card'
import Header from '@/app/components/layout/header'
import { RecipeService } from '@/app/services/recipeService'
import { IngredientService } from '@/app/services/ingredientService'

const page = async() => {

  const session = await auth()

  if (!session?.user) {
    redirect("/signin")
  }

  const recipeService = new RecipeService()
  const ingredientService = new IngredientService()

  const recipeAnalytics = session.user.id && await recipeService.getRecipesAnalytics(session.user.id) 
  const ingredients = session?.user?.id && await ingredientService.findAll(session.user.id)
  
  const totalRecipes = recipeAnalytics ? recipeAnalytics.totalRecipes : 0
  const avgfoodCost = recipeAnalytics  && recipeAnalytics.avgFoodCost !== null ? Number(recipeAnalytics.avgFoodCost) : 0
  const avgProfitMargin = recipeAnalytics && recipeAnalytics.avgProfitMargin !== null ? Number(recipeAnalytics.avgProfitMargin) : 0

  return (
    <div className=' m-2'>
      <Header session={session} />
      <div className='m-1 p-3 flex justify-between rounded-2xl bg-white h-full'>
        <Card title='Recipes' value={totalRecipes} Icon={ShoppingBasket} color='bg-amber-100' />
        <Card title='Ingredients' value={ingredients ? ingredients.length : 0} Icon={Carrot} color='bg-red-100' />
        <Card title='Avg Food Cost' value={avgfoodCost} Icon={Euro} color='bg-green-100' />
        <Card title='Avg Profit Margin' value={avgProfitMargin} Icon={Percent} color='bg-purple-100' />
      </div>
    </div>
  )
}

export default page
