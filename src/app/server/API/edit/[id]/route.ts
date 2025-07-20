import { getRecipeById } from "@/db/read";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req: Request, {params}: {params:{id: string}}) => {
    const {id} = await params
    
    const recipe = await getRecipeById(id);
    console.log("recipes in GET", recipe);
    // Correctly return a JSON response with the recipes array and a 200 status.
    return NextResponse.json( { status: 200, body: recipe });
};