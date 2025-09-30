import React from 'react'
import Search from '@components/search'
import { Button } from '@components/ui/button'
import { CiFilter } from 'react-icons/ci'

interface HeaderTitleAdminProps {
  title: string
}

export default function HeaderTitleAdmin({ title }: HeaderTitleAdminProps) {
  return (
    <div className="flex justify-between items-center w-full gap-2 mb-10">
      <h1 className="font-bold mb-8 text-4xl text-blue-night w-full text-start">{title}</h1>
      <div className="flex justify-end items-center w-full gap-4">
        <Search />
        <Button variant="outline" className="h-12 rounded-2xl px-6">
          <CiFilter strokeWidth={1} />
          Filter
        </Button>
      </div>
    </div>
  )
}
