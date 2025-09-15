"use client"

import { Label, Button, GoogleIcon } from '@/app/constants/components'
import useSignIn from '@/app/hooks/useSignIn';
import Link from 'next/link';

const SignInForm = () => {
  const { register, handleSubmit, onSubmit } = useSignIn({ isSignIn: true });

  return (
    <div className="w-full max-w-sm p-6 md:p-8 space-y-4 bg-white rounded-xl border border-gray-200">
      {/* Card Header */}
      <div className="flex flex-col space-y-1.5 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
        <p className="text-sm text-gray-500">Enter your email below to sign in to your account.</p>
      </div>

      {/* Card Content */}
      <div className="space-y-4">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <Label text="email">Email</Label>
            <input 
              id="email" 
              type="email" 
              placeholder="name@example.com"
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              {...register('email')}
            />
          </div>
          <div className="grid gap-2">
            <Label text="password">Password</Label>
            <input 
              id="password" 
              type="password"
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              {...register('password')}
            />
          </div>
          <Button isSignIn={true} mode='credentials' type="submit">Sign In</Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <Button mode='google' isSignIn={true} variant="outline" type="button">
          <GoogleIcon />
          Google
        </Button>
      </div>

      {/* Card Footer */}
      <div className="text-sm text-center text-gray-600">
        {`Don't have an account?`}{' '}
        <Link
          href="/signup"
          className="font-medium text-blue-600 hover:underline focus:outline-none"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignInForm;