"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getLoggedInUser } from '@/lib/actions/auth.action';
import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            const currentUser = await getLoggedInUser();
            if (!currentUser) {
                router.push('/sign-in');
            } else {
                setUser(currentUser);
                setLoading(false);
            }
        };

        checkUser();
    }, []); 

    if (loading) return <Loader />;

    return <div>{children}</div>;
};

export default Layout;
