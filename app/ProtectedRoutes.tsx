'use client';

import { usePathname } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

export type ProtectedRoutesProps = {
  children: React.ReactNode;
};

export const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const pathname = usePathname();
  const { state } = useAuth(); // remember where we got this

  if (!state.isAuthenticated && pathname.startsWith('/projects')) {
    return (
      <div className="flex h-screen flex-col justify-center bg-zinc-950 text-center">
        <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
        <p className="mb-4 text-lg text-gray-200">Oops! Looks like you're lost.</p>
        <div className="animate-bounce">
          <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </div>
        <p className="mt-4 text-gray-200">
          Let's get you back{' '}
          <a href="/" className="text-blue-500">
            home
          </a>
          .
        </p>
      </div>
    );
  }

  return children;
};
