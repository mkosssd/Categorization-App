import { ChevronLeft, ChevronRight, Search, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <header>
            <div className='py-4 md:px-12 px-4'>
                <div className='flex justify-end py-1'>
                    <ul className='flex gap-4 text-[12px]'>
                        <li>
                            <Link href='/'>Help</Link>
                        </li>
                        <li>
                            <Link href='/'>Orders & Returns</Link>
                        </li>
                        <li>
                            <Link href='/'>Hi, UserName</Link>
                        </li>
                    </ul>
                </div>
                <div className="grid md:grid-cols-12 py-1 grid-cols-auto place-items-stretch items-end">
                    <div className='md:col-span-3 max-md:text-center'>
                        <h1 className='text-[32px] font-bold'>ECOMMERCE</h1>
                    </div>
                    <div className='md:col-span-6'>
                        <ul className='flex md:gap-6 gap-y-1 gap-x-2 flex-wrap font-semibold text-[16px] justify-center'>
                            <li>
                                <Link href='/'>Categories</Link>
                            </li>
                            <li>
                                <Link href='/'>Sale</Link>
                            </li>
                            <li>
                                <Link href='/'>Clearance</Link>
                            </li>
                            <li>
                                <Link href='/'>New stock</Link>
                            </li>
                            <li>
                                <Link href='/'>Trending</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='flex gap-4 md:col-span-3  justify-end'>
                        <button>
                            <Search width={32} height={32} />
                        </button>
                        <button>
                            <ShoppingCart width={32} height={32} />
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center gap-5 py-2 bg-[#F4F4F4]'>
                <ChevronLeft width={20} height={20}/>
                <p className='text-sm font-medium'> Get 10% off on business sign up </p>
                <ChevronRight width={20} height={20}/>
            </div>
        </header>
    )
}

export default Header
