import React from 'react'

export default function page() {
  return (
    <div className='relative h-[calc(100vh-80px)]'>
      <h2 className='absolute top-[60px] left-[108px] z-10 w-full max-w-[1000px] text-[135px] font-bold'>
        Your Hub{' '}
        <span className='bg-gradient-to-tr from-white via-gray-300 to-black bg-clip-text text-transparent'>For </span>
        Tech{' '}
        <span className='bg-gradient-to-r from-black via-white to-black bg-clip-text text-transparent'>Essentials</span>
      </h2>
      <div className='from-blue-primary via-blue-primary/40 absolute bottom-[50px] left-[83px] block h-[130px] w-[130px] rounded-full bg-gradient-to-tr to-white blur-xs'></div>
      <div className='from-blue-primary via-blue-primary/40 absolute top-[80px] right-[120px] z-20 block h-[360px] w-[360px] rounded-full bg-gradient-to-tr to-white blur-xs'></div>
      <div className='bg-blue-primary absolute bottom-[20px] left-[60px] z-0 block h-[430px] w-[430px] rounded-full blur-[300px]'></div>
      <input
        type='text'
        placeholder='Search for anything...'
        className='shadow-blue-primary focus-visible:ring-blue-primary absolute bottom-[8%] left-[50%] h-[80px] w-[780px] translate-x-[-50%] translate-y-[-50%] rounded-[50px] bg-white px-4 placeholder-[#C3C3C3] shadow-[0_1px_250px_rgba(0,0,0,1)] outline-none focus-visible:ring-1'
      />
    </div>
  )
}
