// app/providers.tsx
'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { ProjectProvider } from '@/contexts/ProjectContext';
import { NextUIProvider } from '@nextui-org/react';
import { ProtectedRoutes } from './ProtectedRoutes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ProtectedRoutes>
        <ProjectProvider>
          <NextUIProvider>{children}</NextUIProvider>
        </ProjectProvider>
      </ProtectedRoutes>
    </AuthProvider>
  );
}
