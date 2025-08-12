import { updateIngredient } from "@/db/update";
import { NextRequest, NextResponse } from "next/server";
import { deleteIngredient } from "@/db/delete";
import { sendError, sendSuccess } from "../../utils/responses";


export const PATCH = async (req: NextRequest) => {
    try {
        const request = await req.json();

        // Optional: Add validation logic here for the 'request' body

        const res = await updateIngredient(request);
        
        if (!res) {
            sendError("InvalidData, sorry", 404)
        } else {
           sendSuccess("Ingrediend updated succesflly", res, 201)
        }
    } catch(err) {
        // Log the actual error on the server for debugging
        console.error("Error updating ingredient:", err);

        sendError("An unexpected error occurred on the server.", 500)
    }
}

export const DELETE = async (req: NextRequest, context: {params: Promise<{id: string}>}) => {

    try {
        const {id} = await context.params
        await deleteIngredient(id)
        sendSuccess("Recipe succesfully deleted", 201)
    }catch(err) {
        console.log(err)
    }

}