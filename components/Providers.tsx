'use client'

import { SessionProvider } from "next-auth/react";

// recoil, themeproviders 
export function Providers({ children }: { children: React.ReactNode }) {
    return <SessionProvider>{children}</SessionProvider>;
}