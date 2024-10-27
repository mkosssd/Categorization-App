import React from 'react';
import { redirect } from 'next/navigation';
import { getLoggedInUser } from '@/lib/actions/auth.action';

const Layout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const user = await getLoggedInUser();

    if (user) {
        redirect('/');
    }

    return (
        <div>
            {children}
        </div>
    );
};

export default Layout;
