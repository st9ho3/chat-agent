import { NextRequest, NextResponse } from "next/server";
import { createRecipeAndIngredients } from "@/db/crud";
import { zodValidateDataBeforeAddThemToDatabase } from "@/app/services/services";

export const POST = async(req: NextRequest) => {

    try {

        const {validatedRecipe, validatedRecipeIngredients, } = await zodValidateDataBeforeAddThemToDatabase(req)


        if (validatedRecipe && validatedRecipeIngredients) {

            const res = await createRecipeAndIngredients(validatedRecipe, validatedRecipeIngredients )

            console.log(res)
            if  (res) {
                return NextResponse.json({
                message: "Recipe succesfully created!",
                status: 201
            })
            }

        } else {
            return NextResponse.json({
                error: "Invalid Data.",
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