import AuthForm from '@/components/AuthForm'
import CustomInput from '@/components/CustomInput'
import React from 'react'

const page = () => {
    return (
        <div className='p-10 flex justify-center items-center'>
            <div className='border border-[#C1C1C1] rounded-[20px] px-14 py-8'>
                <AuthForm type='sign-up' />
            </div>
        </div>
    )
}

export default page
