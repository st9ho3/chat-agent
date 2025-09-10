import React from 'react'
import {z} from "zod"
import { useForm, Resolver } from 'react-hook-form'
import { SignInCredentials, signInCredentialsSchema, SignUpCredentials, signUpCredentialsSchema } from '@/shemas/auth'

import { zodResolver } from '@hookform/resolvers/zod'
import { signInCredentials, signUpCredentials } from '../constants/uathFormdefaultValues'
export interface AuthProps {
    isSignIn: boolean
}
const useSignIn = ({isSignIn}: AuthProps) => {

    const {register, handleSubmit, formState, watch, getValues} = useForm<SignInCredentials>( {
        defaultValues: isSignIn ? signInCredentials : signUpCredentials,
        resolver: zodResolver(signInCredentialsSchema)
    })
     const onSubmit = async() => {

    }
  return {
    register,
    handleSubmit,
    onSubmit
  }
}

export default useSignIn
