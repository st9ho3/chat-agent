import Header from '@/app/components/recipes/header'
import Pagination from '@/app/components/recipes/pagination'
import Table from '@/app/components/recipes/table'

import {Plus } from 'lucide-react'

const RecipesPage = () => {
  return (
    <div className=' w-full h-screen bg-white'>
     <Header />
      <Table />
     <Pagination />
     <div
          className="fixed bottom-15 right-0 z-49 m-4 p-3 bg-white rounded-full cursor-pointer shadow-lg"
        >
          <Plus />
      </div>
    </div>
  )
}

export default RecipesPage
