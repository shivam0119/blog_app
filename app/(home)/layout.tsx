// app/(some-folder)/layout.tsx
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '../../lib/prisma';
import React from 'react';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();

  if (user) {
    const existingUser = await prisma.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          name: user.fullName ?? '',
          clerkUserId: user.id,
          email: user.emailAddresses[0]?.emailAddress ?? '',
          imageUrl: user.imageUrl ?? '',
        },
      });
    }
  }

  return <>{children}</>;
}
