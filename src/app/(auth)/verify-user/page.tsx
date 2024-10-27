import { VerificationForm } from '@/components/VerificationForm'
import { Loader2 } from 'lucide-react'
import React, { Suspense } from 'react'

const page = () => {
    return (
        <div className='outerBox'>
            <div className='innerBox'>
                <Suspense fallback={<Loader2/>}>
                    <VerificationForm />
                </Suspense>
            </div>
        </div>
    )
}

export default page
