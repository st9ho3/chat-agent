import { SignUpCredentials, User } from "@/shemas/auth";
import { AdapterOptions } from "next/dist/server/web/adapter";


export interface AUTHService {
    findUserByEmail(email: string): Promise<User | undefined> 
    create(credentials: SignUpCredentials): Promise<string | undefined>
    createGoogleUser(user: User): Promise<string | undefined> 
}

export interface AUTHrepository {
    findUserByEmail(email: string): Promise<User | undefined>
    create(email: string, password: string): Promise<string | undefined> 
    createGoogleUser(user: User): Promise<string | undefined> 
}
