import { AuthService } from "@/app/services/authservice";
import { NextRequest } from "next/server";
import { sendError, sendSuccess } from "../../utils/responses";



export const POST = async(req: NextRequest) => {

     const service = new AuthService()

    const credentials = await req.json()

    try {
        console.log("Route is passing the credentials: ",credentials )
        const res = await service.create(credentials)

         if (!res) {
            return sendError("Invalid Data")
        } 

        return sendSuccess("Account created succesfully!", res)
       
    } catch(err) {

        return sendError(`${err}`)
    }
    
}