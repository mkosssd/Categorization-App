/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const authFormSchema = (type: string) =>
  z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: type === 'sign-in' ? z.string().optional() : z.string().min(3)
  })

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value))
