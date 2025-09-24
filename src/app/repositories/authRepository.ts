/**
 * AuthRepository - Data access layer for user authentication management
 * 
 * This repository class provides user authentication-related database operations including
 * user lookup, registration, and Google OAuth integration. It implements the AUTHrepository
 * interface and handles all database interactions for user authentication workflows.
 * 
 * Features:
 * - User lookup by email address
 * - Standard user registration with email/password
 * - Google OAuth user creation and management
 */

import { db } from "@/db/db";
import { users } from "@/db/schema";
import { User } from "@/shemas/auth";
import { AUTHrepository } from "@/types/auth";
import { eq } from "drizzle-orm";

export class AuthRepository implements AUTHrepository {

    async findUserByEmail(email: string): Promise<User | undefined> {
        try {
            const [user] = await db
                .select()
                .from(users)
                .where(eq(users.email, email));

            if (!user) {
                return undefined;
            }

            return user as User;
        } catch (err) {
            console.error("Failed to find user by email:", err);
            throw new Error(`AuthRepository.findUserByEmail: Failed to find user with email ${email}: ${err}`);
        }
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
                });

            return userId.user;
        } catch (err) {
            console.error("Failed to create user:", err);
            throw new Error(`AuthRepository.create: Failed to create user with email ${email}: ${err}`);
        }
    }
    
    async createGoogleUser(user: User): Promise<string | undefined> {
        try {
            const [userId] = await db
                .insert(users)
                .values(user)
                .returning({
                    id: users.id
                });

            return userId.id;
        } catch (err) {
            console.error("Failed to create Google user:", err);
            throw new Error(`AuthRepository.createGoogleUser: Failed to create Google user with email ${user.email}: ${err}`);
        }
    }
}