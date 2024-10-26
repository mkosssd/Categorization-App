import AuthForm from '@/components/AuthForm'
import React from 'react'

const page = () => {
    return (
        <div className='outerBox'>
            <div className='innerBox'>
                <AuthForm type='sign-up' />
            </div>
        </div>
    )
}

export default page
