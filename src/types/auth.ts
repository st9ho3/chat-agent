import { User } from "@/shemas/auth";


export interface AUTHService {
    findUserByEmail(email: string): Promise<User | undefined> 
    create(email: string, password: string): Promise<string | undefined> 
}

export interface AUTHrepository {
    findUserByEmail(email: string): Promise<User | undefined>
    create(email: string, password: string): Promise<string | undefined> 
}