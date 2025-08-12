import { updateIngredient } from "@/db/update";
import { NextRequest, NextResponse } from "next/server";
import { deleteIngredient } from "@/db/delete";


export const PATCH = async (req: NextRequest) => {
    try {
        const request = await req.json();

        // Optional: Add validation logic here for the 'request' body

        const res = await updateIngredient(request);
        
        if (!res) {
            // Return a 404 Not Found response
            return NextResponse.json({
                message: "Ingredient not found or no changes made."
            }, { status: 404 });
        } else {
            // Return a 200 OK for a successful update
            return NextResponse.json({
                message: "Ingredient updated successfully!",
                body: res
            }, { status: 200 });
        }
    } catch(err) {
        // Log the actual error on the server for debugging
        console.error("Error updating ingredient:", err);

        // Return a generic 500 Internal Server Error
        return NextResponse.json({
            message: "An unexpected error occurred on the server."
        }, { status: 500 });
    }
}

export const DELETE = async (req: NextRequest, context: {params: Promise<{id: string}>}) => {

    try {
        const {id} = await context.params
        await deleteIngredient(id)
        return NextResponse.json({ status: 200, message: "Recipe succesfully deleted" });
    }catch(err) {
        console.log(err)
    }

}