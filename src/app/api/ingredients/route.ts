/**
 * API route for creating a new ingredient.
 * This route handles POST requests, expecting the new ingredient's data in the request body.
 * It uses the `IngredientService` to perform the creation operation.
 * Upon a successful creation, it returns a success response with the new ingredient's data and a 201 status code.
 * If the request data is invalid or an error occurs during the process, it returns an appropriate error response.
 */
import { NextRequest } from 'next/server';
import { sendError, sendSuccess } from '../utils/responses';
import { IngredientService } from '@/app/services/ingredientService';
import { Ingredient } from '@/shemas/recipe';

export const POST = async (req: NextRequest) => {
    const ingredient: Ingredient = await req.json();

    const service = new IngredientService();

    try {
        const response = await service.create(ingredient);
        console.log(response);
        if (!response) {
            return sendError('Something wrong with the request', 404);
        }
        return sendSuccess('Ingredient successfully created', response, 201);
    } catch (err) {
        return sendError(`${err}`, 500);
    }
};