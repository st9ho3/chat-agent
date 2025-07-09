import Header from '@/app/components/recipes/header'
import Pagination from '@/app/components/recipes/pagination'
import Table from '@/app/components/recipes/table'
import { recipes } from '@/app/constants/data'


const RecipesPage = () => {
  return (
    <div className='relative w-full h-screen px-2 md:px-5 bg-white'>
      <Header />
      <Table />
      <Pagination items={recipes} />
      
    </div>
  )
}

export default RecipesPage
