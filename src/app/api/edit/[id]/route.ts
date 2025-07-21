// src/app/api/edit/[id]/route.ts
import { getRecipeById } from "@/db/read";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  
  const recipe = await getRecipeById(id);
  console.log("Fetched recipe:", recipe);
  
  // return the raw recipe as JSON, with status 200
  return NextResponse.json(
    recipe,
    { status: 200 }
  );
}