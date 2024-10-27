/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { getData } from '@/lib/actions/data.action'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import { CustomCheckBox } from './CustomCheckBox'
import { CustomPagination } from './CustomPagination'

const Categories = () => {
    const params = useSearchParams()
    const page = params.get('page')
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {

        const fetchData = async () => {
            setLoading(true)
            const data = await getData(page)
            setData(data.products)
            setLoading(false)
        }

        fetchData()
    }, [page])

    function handleSelected(ev:any, id: any) {
        console.log(ev);
        console.log(id);
    }
    if (loading) return <Loader />
    if (!loading && !data.length) return <p>Data not found</p>
    return (
        <div>
            {data.length && data.map(e =>
                <div key={e['id']} className='mb-4'>
                    <CustomCheckBox  onChange={handleSelected} id={e['id']} title={e['title']}></CustomCheckBox>
                </div>
            )}
            <CustomPagination page={page}/>
        </div>
    )
}

export default Categories
