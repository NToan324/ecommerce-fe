'use client'

import React, { useState } from 'react'
import { DialogCreateAdress } from '@user/(unauth)/(personal)/profile/components/dialogCreateAddress'
import { GoPencil } from 'react-icons/go'

export default function Address() {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-10 w-full">
      <div className="w-full flex justify-end items-center">
        <DialogCreateAdress open={open} onOpenChange={setOpen} />
      </div>
      <div className="grid grid-cols-1 gap-6 w-full">
        <div className="p-[2px] bg-gradient-to-br from-blue-gray to-blue-primary via-blue-primary w-full rounded-2xl">
          <div className="flex gap-4 justify-between items-center p-3 md:p-5 bg-white rounded-[14px] w-full">
            <div className="flex flex-col gap-2 md:gap-4">
              <div className="flex justify-start items-center gap-10">
                <p className="text-[clamp(0.75rem,2vw,1rem)]">Thanh Binh</p>
                <p className="text-[clamp(0.75rem,2vw,1rem)] font-medium text-black/50">(+84) 123 456 789</p>
              </div>
              <p className="text-[clamp(0.75rem,2vw,1rem)] w-full leading-7">
                19 Nguyen Huu Tho Tan Hung Ward, Ho Chi Minh City
              </p>
            </div>
            <GoPencil
              className="cursor-pointer text-blue-secondary md:size-6 size-5"
              onClick={() => setOpen((prev) => !prev)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
