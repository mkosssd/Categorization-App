/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Checkbox } from "@/components/ui/checkbox"

interface ICheckBox {
    title: string
    id: number
    onChange: (event: any, id: any) => void
}

export function CustomCheckBox({ title, id, onChange }: ICheckBox) {
    return (
        <div className="items-top flex space-x-2">
            <Checkbox id="title" className="w-6 h-6" 
                  onCheckedChange={(event)=>onChange(event,id)}/>
            <div className="grid gap-1.5 leading-none">
                <label
                    htmlFor="title"
                    className="text-[15px] flex items-center font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {title}
                </label>
            </div>
        </div>
    )
}
