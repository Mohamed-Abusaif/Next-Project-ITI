'use client';

import { SessionProvider } from "next-auth/react";

export default function ClientSideSessionProvider({ children }: { children: React.ReactNode }) {
    return <SessionProvider>{children}</SessionProvider>;
}
