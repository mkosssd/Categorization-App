'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
    Form
} from '@/components/ui/form'
// import { SignIn, SignUp } from '@/lib/actions/user.actions'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import CustomInput from './CustomInput'
// import PlaidLink from './PlaidLink'


const AuthForm = ({ type }: { type: 'sign-in' | 'sign-up' }) => {
    const router = useRouter()
    const [user, setuser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const formSchema = authFormSchema(type)

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
        }
    })

    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {

        setIsLoading(true)
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        try {

            if (type === 'sign-up') {
                const userData = {
                    name: data.name!,
                    email: data.email,
                    password: data.password
                }
                // const newUser = await SignUp(userData);
                // setuser(newUser)
            }
            if (type === 'sign-in') {
                // const user = await SignIn({
                //     email: data.email,
                //     password: data.password
                // })

                if (user) router.push('/')
            }
        } catch (error) {
            console.log(error);
        } finally {
            // setIsLoading(false)
        }
    }
    return (
        <section>
            <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>
                {type == 'sign-up' ? "Create your account" : "Login"}
            </h1>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        {type === 'sign-up' && (
                            <>
                                 <CustomInput control={form.control} name='name' label='First Name' placeholder='Enter your name' />
                            </>
                        )}
                        <CustomInput control={form.control} name='email' label='Email' placeholder='Enter your email' />
                        <CustomInput control={form.control} name='password' label='Password' placeholder='Enter your password' />
                        <div className="flex flex-col gap-4">

                            <Button disabled={isLoading} type='submit' className='form-btn'>
                                {isLoading ?
                                    (<>
                                        <Loader2 size={20} className='animate-spin' /> &nbsp; Loading...
                                    </>)
                                    : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                            </Button>
                        </div>
                    </form>
                </Form>
                <footer className='flex justify-center gap-1'>
                    <p className='text-14 font-normal text-gray-600'>
                        {type === 'sign-in' ? "Don't have an account?" : "Already have an account?"}
                    </p>
                    <Link className='form-link' href={type === 'sign-in' ? '/sign-up' : '/sign-in'}>{type === 'sign-in' ? 'Sign Up' : 'Sign In'}</Link>
                </footer>
            </div>
        </section>
    )
}

export default AuthForm
