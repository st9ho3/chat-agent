/**
 * Renders a full-screen overlay for creating a new ingredient.
 * It first checks for an authenticated user session. If no session is found,
 * it redirects the user to the sign-in page. If a user is authenticated,
 * it renders the `IngredientModal` component, configured for 'create' mode.
 * The modal is passed the authenticated user's ID to associate the new
 * ingredient with their account.
 */
import React from 'react';
import { IngredientModal } from '@/app/constants/components';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const Page = async () => {
    const session = await auth();

    if (!session?.user) {
        redirect('/signin');
    }

    return (
        <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
            <div className={`relative w-full max-w-fit p-9 mx-4 transform transition-all duration-300 bg-white rounded-2xl shadow-xl`}>
                {session.user.id && <IngredientModal mode="create" ingredient={undefined} userId={session.user.id} />}
            </div>
        </div>
    );
};

export default Page;