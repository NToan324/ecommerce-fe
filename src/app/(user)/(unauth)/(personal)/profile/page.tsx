'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Address from '@user/(unauth)/(personal)/profile/components/address'
import BasicInformation from '@user/(unauth)/(personal)/profile/components/basicInformation'
import ChangePassword from '@user/(unauth)/(personal)/profile/components/changePassword'

import { PROFILE_MENU } from '@/constant'

export default function page() {
  const [profileMenu, setProfileMenu] = useState<PROFILE_MENU>(PROFILE_MENU.BASIC_INFO)

  return (
    <div className=" bg-white min-h-screen flex flex-col justify-start items-center text-4xl gap-20  p-7 lg:px-[120px] lg:pb-20 lg:pt-10 overflow-hidden w-full">
      {/* Name */}
      <div className="flex justify-center items-center gap-12">
        <div className="relative md:w-[100px] md:h-[100px] w-[70px] h-[70px] rounded-full">
          <Image src="https://avatar.iran.liara.run/public" alt="avatar" fill className="object-cover" />
        </div>
        <div className="flex flex-col justify-start items-start gap-3">
          <h1 className="font-medium text-[clamp(1.125rem,2vw,1.5rem)]">Boy Bóng Đêm</h1>
          <p className="font-medium text-[clamp(0.875rem,1vw,1rem)] text-black/50">
            <span className="font-bold text-orange-primary">100 points</span> available.
          </p>
        </div>
      </div>
      {/* Bio */}
      <div className="flex justify-between items-start gap-10 md:gap-20 w-full md:flex-row flex-col">
        <div className="flex justify-between md:justify-start overflow-x-auto w-full items-start gap-9 flex-1/3 no-scrollbar md:flex-col flex-row">
          {Object.values(PROFILE_MENU).map((item, index) => (
            <p
              key={index}
              className={`${profileMenu === item ? 'font-bold' : 'font-medium'} whitespace-nowrap leading-6 text-[clamp(0.875rem,1.5vw,1.125rem)] cursor-pointer`}
              onClick={() => setProfileMenu(item)}
            >
              {item}
            </p>
          ))}
        </div>
        <div className="flex-2/3 w-full">
          {profileMenu === PROFILE_MENU.BASIC_INFO && <BasicInformation />}
          {profileMenu === PROFILE_MENU.ADDRESS && <Address />}
          {profileMenu === PROFILE_MENU.CHANGE_PASSWORD && <ChangePassword />}
        </div>
      </div>
    </div>
  )
}
