"use client"

import { Label, Button, GoogleIcon, Input } from '@/app/constants/components'
import useSignIn from '@/app/hooks/useSignIn';
import useSignUp from '@/app/hooks/useSignUp';
import { useState } from 'react';

interface AuthFormProps {
  isSignIn?: boolean;
}

const AuthForm = ({ isSignIn: initialIsSignIn = true }: AuthFormProps) => {
  const [isSignIn, setIsSignIn] = useState(initialIsSignIn);

  const title = isSignIn ? 'Sign In' : 'Create an account';
  const subtitle = isSignIn ? "Enter your email below to sign in to your account." : "Enter your email below to create your account.";
  const buttonText = isSignIn ? 'Sign In' : 'Create Account';
  const switchText = isSignIn ? "Don't have an account?" : 'Already have an account?';
  const switchLinkText = isSignIn ? 'Sign Up' : 'Sign In';

  // Render different forms based on the state to avoid type conflicts
  const RenderForm = () => {
    if (isSignIn) {
      const { register, handleSubmit, onSubmit } = useSignIn({ isSignIn });
      
      return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="name@example.com" 
              register={register}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              register={register}
            />
          </div>
          <Button isSignIn={isSignIn} mode='credentials' type="submit">{buttonText}</Button>
        </form>
      );
    } else {
      const { register, handleSubmit, onSubmit } = useSignUp({ isSignIn });
      
      return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="name@example.com" 
              register={register} 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              register={register} 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input 
              id="passwordConfirmation" 
              type="password" 
              register={register} 
            />
          </div>
          <Button isSignIn={isSignIn} mode='credentials' type="submit">{buttonText}</Button>
        </form>
      );
    }
  };

  return (
    <div className="w-full max-w-sm p-6 md:p-8 space-y-4 bg-white rounded-xl border border-gray-200">
      {/* Card Header */}
      <div className="flex flex-col space-y-1.5 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>

      

      {/* Card Content */}
      <div className="space-y-4">
       
        {RenderForm()}

        {isSignIn && (
          <>
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

            <Button mode='google' isSignIn={isSignIn} variant="outline" type="button">
              <GoogleIcon />
              Google
            </Button>
          </>
        )}
      </div>

      {/* Card Footer */}
      <div className="text-sm text-center text-gray-600">
        {switchText}{' '}
        <button
          onClick={() => setIsSignIn(!isSignIn)}
          className="font-medium text-blue-600 hover:underline focus:outline-none"
        >
          {switchLinkText}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;