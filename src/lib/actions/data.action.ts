'use server'

export const getData = async (page: string | null): Promise<{ products: [] }> => {
  try {
    let skip = 10
    if (page && +page > 1) skip = +page * 10

    const response = await fetch(
      `https://dummyjson.com/products?limit=7&skip=${skip}&select=title`
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Failed to fetch data')
  }
}
  
  