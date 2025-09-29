import React from 'react'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa'
import { LuStar } from 'react-icons/lu'

export default function Comment() {
  return (
    <div className="flex justify-between items-start w-full min-h-[100px] gap-5 pb-12 border-b border-black/10 bg-white">
      <div className="w-[60px] h-[60px] relative rounded-full overflow-hidden">
        <Image src="https://avatar.iran.liara.run/public" alt="Laptop" width={100} height={100} objectFit="cover" />
      </div>
      <div className="flex flex-col justify-start items-center w-full gap-4">
        <div className="flex justify-between items-center w-full">
          <div className="flex justify-start items-center gap-2">
            <p className="text-base font-bold">Nhật Toàn</p>
            <span className="text-xs font-medium text-black/50">Today</span>
          </div>
          <div className="flex justify-start items-center gap-2">
            <p className="text-base font-medium pt-1 md:block hidden">4.0</p>
            <div className="flex justify-start items-center">
              {Array.from({ length: 5 }).map((_, index) => {
                const isFilled = index < 4
                return isFilled ? (
                  <FaStar key={index} className="inline-block size-4 text-blue-tertiary ml-1" />
                ) : (
                  <LuStar key={index} className="inline-block size-4 text-blue-tertiary ml-1" />
                )
              })}
            </div>
          </div>
        </div>
        <p className="text-base font-medium">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and.
        </p>
      </div>
    </div>
  )
}
