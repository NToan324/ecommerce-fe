import React from 'react'
import { Input } from '@components/ui/input'
import { CiSearch } from 'react-icons/ci'

export default function Search() {
  return (
    <div className="h-12 w-full max-w-[300px] bg-white rounded-2xl relative">
      <Input className="h-12 bg-transparent rounded-2xl pr-10" placeholder="Search" />
      <CiSearch className="absolute right-4 size-6 top-1/2 transform -translate-y-1/2" strokeWidth={0.8} />
    </div>
  )
}
