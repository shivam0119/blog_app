import {BlogDashboard} from '@/components/dashboard/blog-dashboard'
import { currentUser } from '@clerk/nextjs/server';
import React from 'react'

export default async function Dashboard() {
  const user = await currentUser();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-muted-foreground mb-4">
          Only logged-in users can use the dashboard.
        </p>
        {/* Optional: Add sign in button/link here */}
      </div>
    );
  }

  return <BlogDashboard />;
}
