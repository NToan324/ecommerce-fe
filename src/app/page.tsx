import { redirect } from 'next/navigation'

import HomePage from '@/app/(unauth)/home/page'

export default function Home() {
  return (
    <div className="">
      <HomePage />
    </div>
  )
}
