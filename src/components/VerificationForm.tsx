"use client"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { sendVerificationOTP } from "@/lib/actions/auth.action"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { redirect, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"

export function VerificationForm() {
    const [otp, setOtp] = useState('')
    const route = useSearchParams()
    const email = route.get('email')
    const id = route.get('keyId')

    useEffect(() => {
        if (!email) {
            redirect('/')
            return
        }
        const fetchLoggedInUser = async () => {
            await sendVerificationOTP()
        }
        fetchLoggedInUser()
    }, [id, email])

    const handleChange = (e: string) => {
        setOtp(e)
    }

    const submitFn = () => {
        if (otp.length < 6) return
        // verifyAccount()
    }

    return (
        <div className="max-w-[400px] flex flex-col items-center px-5 ">
            <div className="text-center mb-6">
                <h1 className="font-semibold text-[32px] mb-3">Verify your email</h1>
                <p className="text-sm">
                    Enter the 6 digit code you have received on <br /> {email}
                </p>
            </div>
            <div className="text-start w-full">
                <div className="mb-12">
                    <p className="mb-1 text-sm">Code</p>
                    <InputOTP onChange={handleChange} value={otp} maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
                        <InputOTPGroup className="gap-3">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <InputOTPSlot key={index} className="rounded-[6px] border border-[#C1C1C1]" index={index} />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                <div>
                    <Button disabled={otp.length < 6} className="w-full" onClick={submitFn}>Verify</Button>
                </div>
            </div>
        </div>
    )
}
