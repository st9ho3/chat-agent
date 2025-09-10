import { User } from "@/shemas/auth";
import { AUTHService } from "@/types/auth";
import { AuthRepository } from "../repositories/authRepository";

export class AuthService implements AUTHService {

    private authRepository: AuthRepository

    constructor() { 
        this.authRepository = new AuthRepository()
    }

    async findUserByEmail(email: string): Promise<User | undefined> {
        
        const user = this.authRepository.findUserByEmail(email)

        return user
    }
}