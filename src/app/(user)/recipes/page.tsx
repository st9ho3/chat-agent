import Header from '@/app/components/recipes/header'
import Pagination from '@/app/components/recipes/pagination'
import RecipesTable from '@/app/components/recipes/recipestable'
import { RecipeService } from '@/app/services/recipeService'

export const dynamic = "force-dynamic"

const RecipesPage = async() => {

  const service = new RecipeService()

  const rawRecipes = await service.findAll()
  const recipes =rawRecipes ? rawRecipes.map((recipe) => {
    return recipe
  }) : []


  return (
    <div className='relative w-full h-screen px-2 md:px-5 bg-white'>
      <Header />
      <RecipesTable items={recipes} />
      <Pagination items={recipes} />
      
    </div>
  )
}

export default RecipesPage
