import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col'>
      <h1 className='p-5'> This is About page</h1>
      <Link href="/" className='px-3 py-2 bg-slate-400 rounded-xl w-fit ml-5' > Go to Home </Link>
    </div>
  )
}

export default page