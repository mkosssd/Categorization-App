'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import CustomInput from './CustomInput'
import { SignIn, SignUp } from '@/lib/actions/auth.action'


const AuthForm = ({ type }: { type: 'sign-in' | 'sign-up' }) => {
    const router = useRouter()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        try {

            if (type === 'sign-up') {
                const userData = {
                    name: data.name!,
                    email: data.email,
                    password: data.password
                }
                const newUser = await SignUp(userData);
                setuser(newUser)
                if (newUser) router.push('/verify-user?email=' + data.email)
            }
            if (type === 'sign-in') {
                const loggedUser = await SignIn({
                    email: data.email,
                    password: data.password
                })
                setuser(loggedUser)
                if (loggedUser) router.push('/')
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <section className='w-[400px]'>
            <h1 className='h1 text-center'>
                {type == 'sign-up' ? "Create your account" : "Login"}
            </h1>
            <div className='py-6 border-b'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        {type === 'sign-up' && (
                            <>
                                <CustomInput control={form.control} name='name' label='Name' placeholder='Enter your name' />
                            </>
                        )}
                        <CustomInput control={form.control} name='email' label='Email' placeholder='Enter your email' />
                        <CustomInput control={form.control} name='password' label='Password' placeholder='Enter your password' />
                        <div className="flex flex-col gap-4">

                            <Button disabled={isLoading} type='submit'>
                                {isLoading ?
                                    (<>
                                        <Loader2 size={20} className='animate-spin' /> &nbsp; Loading...
                                    </>)
                                    : type === 'sign-in' ? 'Login' : 'Create account'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
            <div className='flex justify-center gap-1 text-sm pt-6'>
                <p className='font-normal text-gray-600'>
                    {type === 'sign-in' ? "Don’t have an Account?" : "Have an Account?"}
                </p>
                <Link className='font-bold text-black' href={type === 'sign-in' ? '/sign-up' : '/sign-in'}>{type === 'sign-in' ? 'SIGN UP' : 'LOGIN'}</Link>
            </div>
        </section>
    )
}

export default AuthForm
