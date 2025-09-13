import { SignUpCredentials, signUpCredentialsSchema, User } from "@/shemas/auth";
import { AUTHService } from "@/types/auth";
import { AuthRepository } from "../repositories/authRepository";
import bcrypt from 'bcrypt'


export class AuthService implements AUTHService {

    private authRepository: AuthRepository

    constructor() { 
        this.authRepository = new AuthRepository()
    }

    async findUserByEmail(email: string): Promise<User | undefined> {
        
        const user = this.authRepository.findUserByEmail(email)

        return user
    }

    async create(credentials: SignUpCredentials): Promise<string | undefined> {

        
        if (credentials.password !== credentials.passwordConfirmation) {
            throw new Error("Passwords don't match")
        }
        
        const {data, success}= signUpCredentialsSchema.safeParse(credentials)

        try {

            if (success) {

                const userExists = await this.authRepository.findUserByEmail(data.email)

                if (userExists) {
                    throw new Error("Email already exists")
                }

                const hashedPassword = await bcrypt.hash(data?.password, 10)
                
                 const user = await this.authRepository.create(data.email, hashedPassword)

                return user
            } else {
                throw new Error("There is a problem with your data")
            }

        } catch (err) { 
            throw new Error(`${err}`)
        }
       
    }

    async createGoogleUser(user: User): Promise<string | undefined> {
        const userId = await this.authRepository.createGoogleUser(user)

        return userId
    }
}