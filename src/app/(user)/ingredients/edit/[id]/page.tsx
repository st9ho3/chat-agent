import React from 'react'
import { IngredientModal } from '@/app/constants/components'
import { IngredientService } from '@/app/services/ingredientService'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export interface Params {
    params: Promise<{
        id: string
    }>
}

const IngredientEditPage = async ({params}: Params ) => {

const session = await auth()
if (!session?.user) {
redirect("/signin")
}

const service = new IngredientService()
const {id} = await params

const ingredient = await service.findById(id)

return (
<div className="fixed inset-0 z-55 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
<div className={`relative w-full max-w-fit p-9 mx-4 transform transition-all duration-300 bg-white rounded-2xl shadow-xl`}>
{session.user.id && <IngredientModal mode='edit' ingredient={ingredient} userId={session.user.id} />}
</div>
</div>
)
}

export default IngredientEditPage