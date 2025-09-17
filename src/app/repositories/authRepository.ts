/**
 * @fileoverview AuthRepository - Data access layer for user authentication management
 * 
 * This repository class provides user authentication-related database operations including
 * user lookup, registration, and Google OAuth integration. It implements the AUTHrepository
 * interface and handles all database interactions for user authentication workflows.
 * 
 * Features:
 * - User lookup by email address
 * - Standard user registration with email/password
 * - Google OAuth user creation and management
 * - Comprehensive error handling with proper error propagation
 * - Type-safe database operations using Drizzle ORM
 */

import { db } from "@/db/db";
import { users } from "@/db/schema";
import { User } from "@/shemas/auth";
import { AUTHrepository } from "@/types/auth";
import { eq } from "drizzle-orm";

export class AuthRepository implements AUTHrepository {

    /**
     * Finds a user in the database by their email address
     * @param {string} email - The email address to search for
     * @returns {Promise<User | undefined>} The user object if found, undefined otherwise
     * @throws {Error} When database operation fails
     */
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

    /**
     * Creates a new user with email and password authentication
     * @param {string} email - The user's email address
     * @param {string} password - The user's hashed password
     * @returns {Promise<string | undefined>} The created user's ID or undefined on error
     * @throws {Error} When database operation fails
     */
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

    /**
     * Creates a new user from Google OAuth authentication
     * @param {User} user - The complete user object from Google OAuth
     * @returns {Promise<string | undefined>} The created user's ID or undefined on error
     * @throws {Error} When database operation fails
     */
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