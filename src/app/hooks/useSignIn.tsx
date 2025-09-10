import React from 'react'
import { z } from "zod"
import { useForm, Resolver } from 'react-hook-form'
import { SignInCredentials, signInCredentialsSchema, SignUpCredentials, signUpCredentialsSchema } from '@/shemas/auth'

import { zodResolver } from '@hookform/resolvers/zod'
import { signInCredentials, signUpCredentials } from '../constants/uathFormdefaultValues'

export interface AuthProps {
    isSignIn: boolean
}

const useSignIn = ({ isSignIn }: AuthProps) => {

    const { register, handleSubmit, formState, watch, getValues } = useForm<SignInCredentials>({
        defaultValues: isSignIn ? signInCredentials : signUpCredentials,
        resolver: zodResolver(signInCredentialsSchema)
    })

    const onSubmit = async (data: any) => {
        try {
            const res = await fetch("/auth/signin", {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(data)
            })

            if (!res.ok) {
                throw new Error("Res is not ok")
            }
            console.log(res.body)
            return res.body
        } catch (error) {
            console.error("Error during form submission:", error)
            // Handle the error appropriately, e.g., show a toast notification
        }
    }

    return {
        register,
        handleSubmit,
        onSubmit
    }
}

export default useSignIn