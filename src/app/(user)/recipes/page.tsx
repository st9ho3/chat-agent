import Header from '@/app/components/recipes/header'
import Pagination from '@/app/components/recipes/pagination'
import RecipesTable from '@/app/components/recipes/recipestable'
import { getRecipes } from '@/db/read'

export const dynamic = "force-dynamic"

const RecipesPage = async() => {

  const rawRecipes = await getRecipes();
  const recipes = rawRecipes.map((recipe) => {
    
    return {
    ...recipe,
    totalCost: Number(recipe.totalCost),
    dateCreated: new Date(recipe.dateCreated),
    imgPath: recipe.imgPath || undefined, 
  }})


  return (
    <div className='relative w-full h-screen px-2 md:px-5 bg-white'>
      <Header />
      <RecipesTable items={recipes} />
      <Pagination items={recipes} />
      
    </div>
  )
}

export default RecipesPage
