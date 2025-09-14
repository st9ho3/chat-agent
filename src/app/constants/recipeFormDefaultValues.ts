import { auth } from "@/auth"
import { FormFields } from "../hooks/useRecipeForm"



export const defaultValues: FormFields = {
    
      id: '',
      title: '',
      totalCost: 0, 
      category: 'starter',
      createdBy: 'User',
      dateCreated: new Date(),
      tax: 0,
      sellingPrice: 0, 
      profitMargin: 0, 
      imgPath: "https://yqbnjpxj7oneobhf.public.blob.vercel-storage.com/beef%20burger.png",
      userId:  " "
}

