import LeftSidebar from "@/components/dashboard/LeftSidebar";
import React, { ReactNode } from "react";
import { currentUser } from "@clerk/nextjs/server";


const layout = async ({ children }: { children: ReactNode }) => {

    const user = await currentUser();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-muted-foreground mb-4">
          Only logged-in users can use the dashboard.
        </p>
        {/* Optional: add a SignInButton or Link to login page here */}
      </div>
    );
  }
  

  return (
    <div className="min-h-screen w-full">
      <div className="flex">
        <LeftSidebar/>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default layout;