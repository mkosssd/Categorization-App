import { getLoggedInUser } from '@/lib/actions/auth.action'
import React from 'react'

import { redirect } from "next/navigation";


const layout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const loggedIn = await getLoggedInUser()
    if (!loggedIn) {
        redirect('/sign-in')
        return
    }
    return (
        <div>
            {children}
        </div>
    )
}

export default layout

