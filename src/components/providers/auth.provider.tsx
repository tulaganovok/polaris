'use client'

import AuthLoadingView from '@/features/auth/components/auth-loading-view'
import UnauthenticatedView from '@/features/auth/components/unauthenticated-view'
import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react'
import { PropsWithChildren } from 'react'

export default function AuthProvider({ children }: PropsWithChildren) {
  return (
    <>
      <Authenticated>{children}</Authenticated>

      <Unauthenticated>
        <UnauthenticatedView />
      </Unauthenticated>

      <AuthLoading>
        <AuthLoadingView />
      </AuthLoading>
    </>
  )
}
