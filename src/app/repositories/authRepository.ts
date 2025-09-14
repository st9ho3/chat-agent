import { db } from "@/db/db";
import { users } from "@/db/schema";
import { User } from "@/shemas/auth";
import { AUTHrepository } from "@/types/auth";
import { eq } from "drizzle-orm";

export class AuthRepository implements AUTHrepository {
    
    async findUserByEmail(email: string): Promise<User | undefined> {
        const [s] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))

        if (!s) {
            return
        }

        return s as User
    }

    async create(email: string, password: string): Promise<string | undefined> {
        
        try {
            const [userId] = await db
        .insert(users)
        .values({
            email: email,
            password: password
        })
        .returning({
            user: users.id
        })
        
        return userId.user

        } catch (err) {
            throw new Error(`${err}`)
        }

    }

    async createGoogleUser(user: User): Promise<string | undefined> {
        
        const [userId] = await db
        .insert(users)
        .values(user)
        .returning({id: users.id})

        return userId.id
    }
}