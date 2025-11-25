import React from 'react'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { CiFilter, CiSearch } from 'react-icons/ci'

interface HeaderTitleAdminProps {
  title: string
  search?: string
  setSearch?: (value: string) => void
}

export default function HeaderTitleAdmin({ title, search, setSearch }: HeaderTitleAdminProps) {
  return (
    <div className="flex justify-between items-center w-full gap-2 mb-10">
      <h1 className="font-bold mb-8 text-4xl text-blue-night w-full text-start">{title}</h1>
      <div className="flex justify-end items-center w-full gap-4">
        <div className="h-12 w-full max-w-[300px] bg-white rounded-2xl relative">
          <Input
            value={search}
            onChange={(e) => setSearch && setSearch(e.target.value)}
            className="h-12 bg-transparent rounded-2xl pr-10"
            placeholder="Search"
          />
          <CiSearch className="absolute right-4 size-6 top-1/2 transform -translate-y-1/2" strokeWidth={0.8} />
        </div>
        <Button variant="outline" className="h-12 rounded-2xl px-6">
          <CiFilter strokeWidth={1} />
          Filter
        </Button>
      </div>
    </div>
  )
}
