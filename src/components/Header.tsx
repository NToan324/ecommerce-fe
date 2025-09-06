import Link from 'next/link'
import { FiShoppingCart } from 'react-icons/fi'
import Image from 'next/image'

export default function Header() {
  return (
    <header>
      <div className='border-blue-primary/70 flex h-[80px] items-center justify-between gap-12 border-b px-[120px] py-4'>
        <h1 className='text-2xl font-bold'>COMPX</h1>
        <div className='flex w-full max-w-[600px] items-center justify-between gap-4 text-sm font-bold'>
          <Link href='/'>Home</Link>
          <Link href='/categories'>Categories</Link>
          <Link href='/about'>About us</Link>
          <Link href='/contact'>Contact</Link>
        </div>
        <div className='flex items-center justify-between gap-10'>
          <div className='relative'>
            <FiShoppingCart size={40} strokeWidth={1.2} />
            <span className='absolute top-0 -right-1 h-[18px] w-[18px] rounded-full bg-[#738FBD] text-center text-xs font-medium text-black'>
              2
            </span>
          </div>
          <div className='relative h-[45px] w-[45px] overflow-hidden rounded-full'>
            <Image
              src='https://avatar.iran.liara.run/public'
              alt='avatar'
              width={45}
              height={45}
              className='object-cover'
            />
          </div>
        </div>
      </div>
    </header>
  )
}
