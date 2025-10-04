'use client'

import React, { useState } from 'react'
import { DialogUpdateAdress } from '@user/(unauth)/(personal)/profile/components/dialogCreateAddress'
import { GoPencil } from 'react-icons/go'

import { Profile } from '@/types/user.type'

interface AddressProps {
  data: Profile | null
}
export default function Address({ data }: AddressProps) {
  const [open, setOpen] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null)
  return (
    <div className="space-y-10 w-full">
      <div className="w-full flex justify-end items-center">
        <DialogUpdateAdress
          open={selectedAddress !== null || open}
          setOpen={(state) => (!state && setSelectedAddress(null)) || setOpen(state)}
          defaultValues={selectedAddress}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 w-full">
        {data && data.address && data.address.length > 0 ? (
          data.address.map((address, index) => {
            return (
              <div
                key={index}
                className="p-[2px] bg-gradient-to-br from-blue-gray to-blue-primary via-blue-primary w-full rounded-2xl"
              >
                <div className="flex gap-4 justify-between items-center p-3 md:p-5 bg-white rounded-[14px] w-full">
                  <div className="flex flex-col gap-2 md:gap-4">
                    <div className="flex justify-start items-center gap-10">
                      <p className="text-[clamp(0.75rem,2vw,1rem)]">{data.fullName}</p>
                      <p className="text-[clamp(0.75rem,2vw,1rem)] font-medium text-black/50">{data.phone}</p>
                    </div>
                    <p className="text-[clamp(0.75rem,2vw,1rem)] w-full leading-7">{address}</p>
                  </div>
                  <GoPencil
                    className="cursor-pointer text-blue-secondary md:size-6 size-5"
                    onClick={() => setSelectedAddress(index)}
                  />
                </div>
              </div>
            )
          })
        ) : (
          <p className="text-[clamp(0.875rem,1vw,1rem)] text-black/50">No address found. Please add your address.</p>
        )}
      </div>
    </div>
  )
}
