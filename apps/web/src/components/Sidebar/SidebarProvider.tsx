import { SidebarContext, useSidebar } from '@/hooks/useSidebar';
import React from 'react';

export default function SidebarProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const sidebar = useSidebar();

    return (
        <SidebarContext.Provider value={sidebar}>
            {children}
        </SidebarContext.Provider>
    );
}
