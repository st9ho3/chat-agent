import { NextRequest, NextResponse } from "next/server";
import { RecipeIngredientsSchema, RecipeSchema } from "@/shemas/recipe";
import { createRecipeToDatabase } from "@/db/crud";


export const POST = async(req: NextRequest) => {

    try {
        const {recipe, ingredients} = await req.json();

        if (typeof recipe.dateCreated === 'string') {
            recipe.dateCreated = new Date(recipe.dateCreated);
        }
        console.log(recipe)
        const validatedRecipe = RecipeSchema.parse(recipe);
        
        /* const validatedIngredient = ingredients.forEach(ingredient: RecipeIngredients => {
            RecipeIngredientsSchema.parse(ingredient)
        }); */

        

        if (validatedRecipe) {
            
            //Create the recipe with createRecipe()
                createRecipeToDatabase(validatedRecipe)

            if (validatedRecipe.title === "cake") {
                console.log('Thank you for the cake');
                return NextResponse.json({
                    message: "You sent cake to the server",
                    status: 201
                });
            } else {
                return NextResponse.json({
                    message: "You didn't send cake to the server",
                    status: 400
                });
            }
        } else {
            return NextResponse.json({
                error: "Ivalid Data. You need to send something",
                status: 422
            });
        }
    } catch(err) {
        return NextResponse.json({
            error: `Oops, something went wrong on our side, ${err}`,
            status: 500
        });
    }

}; 

export const GET = async() => {

}