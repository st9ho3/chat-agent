import React from 'react';
import Image from 'next/image';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import SignInForm from '@/app/components/auth/signInForm';

const SignInPage = async() => {

  const session = await auth()

  if (session?.user) {
    redirect("/")
  }

  return (
    <div className="grid lg:grid-cols-2 min-h-screen bg-[rgb(252,252,252)]">
      <div className="flex flex-col items-center justify-center p-6 sm:p-8 md:p-12">
        <div className="w-full max-w-sm">
           <SignInForm />
        </div>
      </div>

      <div className="hidden lg:block relative">
        <Image
          width={1280}
          height={1280}
          src="/images/auth_photo.png"
          alt="A person working on a laptop in a modern, well-lit office space."
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default SignInPage;

