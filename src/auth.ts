import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { AuthService } from "./app/services/authservice"
import { signInCredentialsSchema } from "./shemas/auth"
import bcrypt from "bcrypt"

export const service = new AuthService()

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {strategy: "jwt"},
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      authorize: async (credentials) => {

        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const { data, success } = signInCredentialsSchema.safeParse(credentials)
        let user = null

        if (!success) {
          return null
        }

        user = await service.findUserByEmail(data?.email)

        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.")
        }

        
        if (!user.password) {
          return null
        }
          
        const passwordsMatch = await bcrypt.compare(data?.password, user.password)

        if (!passwordsMatch) {
          return null
        }
      
        return user
    
      },
    }),
  ],
  callbacks: {
  async signIn({ user, account }) {
    
    if (account?.provider === "google") {
      if (!user.email) {
        return false
      }

      try {
        const existingUser = await service.findUserByEmail(user.email)

        if (!existingUser) {
          const googleUser = {
            email: user.email,
            name: user.name,
            image: user.image
          }

          const userId = await service.createGoogleUser(googleUser)
          user.id = userId
        } else {
          user.id = existingUser.id
        }
      } catch (err) {
        console.error(err)
        return false
      }
    }
    return true
  },
  async jwt({token, user}) {
   
    if (user) {
      
      token.lastAccessed = Date.now()
    }
    
    console.log(token)
    return token
  },
  async session({session, token}) {

    if (token.sub) {
      session.user.id = token.sub
    }
    
    return session
  },
  async redirect({url}) {
    url = "/"
    return url
  }
}
})