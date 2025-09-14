import Pagination from '@/app/components/recipes/pagination'
import RecipesTable from '@/app/components/recipes/recipestable'
import { RecipeService } from '@/app/services/recipeService'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
export const dynamic = "force-dynamic"

const RecipesPage = async() => {

  const session = await auth()
    
    if (!session?.user) {
      redirect("/signin")
    }

  const service = new RecipeService()

  const rawRecipes = session.user.id && await service.findAll(session.user.id)
  const recipes =rawRecipes ? rawRecipes.map((recipe) => {
    return recipe
  }) : []


  return (
    <div className='relative w-full h-screen px-2 md:px-5 bg-white'>
      
      <RecipesTable items={recipes} />
      <Pagination items={recipes} />
      
    </div>
  )
}

export default RecipesPage
