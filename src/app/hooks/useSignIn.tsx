"use client"
import { useForm } from 'react-hook-form'
import { SignInCredentials, signInCredentialsSchema } from '@/shemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInCredentials, signUpCredentials } from '../constants/uathFormdefaultValues'
import { signIn } from 'next-auth/react'

export interface AuthProps {
    isSignIn: boolean
}

const useSignIn = ({ isSignIn }: AuthProps) => {

    const { register, handleSubmit } = useForm<SignInCredentials>({
        defaultValues: isSignIn ? signInCredentials : signUpCredentials,
        resolver: zodResolver(signInCredentialsSchema)
    })

    const onSubmit = async (formData: SignInCredentials) => {

        console.log(formData)

        try {
            const {data, success, error} = signInCredentialsSchema.safeParse(formData)

            if (success) {
                 const user = await signIn("credentials", {
                    email: data.email,
                    password: data.password,
                    redirectTo: "/" 
                 })
                 console.log(user)
                 return user
                 
            }
           
            if (error) {
                console.log(error)
                throw new Error(`${error}`)
            }
        } catch(err) {
            console.log(err)
        }
    }

    return {
        register,
        handleSubmit,
        onSubmit
    }
}

export default useSignIn