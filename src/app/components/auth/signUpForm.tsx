"use client"

import { Label, Button } from '@/app/constants/components'
import useSignUp from '@/app/hooks/useSignUp';
import Link from 'next/link';

const SignUpForm = () => {
  const { register, handleSubmit, onSubmit } = useSignUp({ isSignIn: false });

  return (
    <div className="w-full max-w-sm p-6 md:p-8 space-y-4 bg-white rounded-xl border border-gray-200">
      {/* Card Header */}
      <div className="flex flex-col space-y-1.5 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-sm text-gray-500">Enter your email below to create your account.</p>
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
          <div className="grid gap-2">
            <Label text="confirm-password">Confirm Password</Label>
            <input 
              id="passwordConfirmation" 
              type="password"
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              {...register('passwordConfirmation')}
            />
          </div>
          <Button isSignIn={false} mode='credentials' type="submit">Create Account</Button>
        </form>
      </div>

      {/* Card Footer */}
      <div className="text-sm text-center text-gray-600">
        Already have an account?{' '}
        <Link
          href="/signin"
          className="font-medium text-blue-600 hover:underline focus:outline-none"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;