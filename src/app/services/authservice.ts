/**
 * AuthService - Business logic layer for user authentication and registration
 * 
 * This service class handles user authentication workflows including email/password registration,
 * email lookup, and Google OAuth user creation. It coordinates between the AuthRepository
 * and external utilities (like bcrypt for password hashing) to implement secure authentication
 * business rules and validation logic.
 * 
 * Features:
 * - User registration with password confirmation validation
 * - Email uniqueness enforcement
 * - Secure password hashing using bcrypt
 * - Google OAuth user creation
 * - Input validation using Zod schemas
 */
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