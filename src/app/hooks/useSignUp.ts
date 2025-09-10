import { useForm } from 'react-hook-form'
import { SignUpCredentials, signUpCredentialsSchema } from '@/shemas/auth'

import { zodResolver } from '@hookform/resolvers/zod'
import { signInCredentials, signUpCredentials } from '../constants/uathFormdefaultValues'

export interface AuthProps {
    isSignIn: boolean
}
const useSignUp = ({ isSignIn }: AuthProps) => {

    const { register, handleSubmit, formState, watch, getValues } = useForm<SignUpCredentials>({
        defaultValues: isSignIn ? signInCredentials : signUpCredentials,
        resolver: zodResolver(signUpCredentialsSchema)
    })

    const onSubmit = async (data: SignUpCredentials) => {
        console.log("Data: ",data)
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        if (!res.ok) {
            throw new Error("Res s not ok")
        }
       const response = await res.json()
       console.log(response)
    }

    return {
        register,
        handleSubmit,
        onSubmit
    }
}

export default useSignUp