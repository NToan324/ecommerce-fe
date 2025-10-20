'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Address from '@user/(unauth)/(personal)/profile/components/address'
import BasicInformation from '@user/(unauth)/(personal)/profile/components/basicInformation'
import ChangePassword from '@user/(unauth)/(personal)/profile/components/changePassword'

import { DialogUpdateAvatarProfile } from '@/app/(user)/(unauth)/(personal)/profile/components/dialogUpdateAvatarProfile'
import { PROFILE_MENU } from '@/constant'
import { useAuthStore } from '@/stores/auth.store'
import { Image as ImageType } from '@/types/common.type'

export default function page() {
  const [open, setOpen] = useState(false)
  const [profileMenu, setProfileMenu] = useState<PROFILE_MENU>(PROFILE_MENU.BASIC_INFO)
  const user = useAuthStore((state) => state.user)

  return (
    <div className=" bg-white min-h-screen flex flex-col justify-start items-center text-4xl gap-20  p-7 lg:px-[120px] lg:pb-20 lg:pt-10 overflow-hidden w-full">
      {/* Name */}
      <div className="flex justify-center items-center gap-12">
        <div className="relative">
          <div className="relative md:w-[100px] border border-blue-gray/50 md:h-[100px] w-[70px] h-[70px] rounded-full overflow-hidden">
            <Image
              src={user?.avatar.url || 'https://avatar.iran.liara.run/public'}
              alt="avatar"
              fill
              objectFit="contain"
              className="absolute"
            />
          </div>
          <div className="absolute bottom-0 right-0">
            <DialogUpdateAvatarProfile open={open} setOpen={setOpen} data={user?.avatar || ({} as ImageType)} />
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-3">
          <h1 className="font-medium text-[clamp(1.125rem,2vw,1.5rem)]">{user?.fullName || 'Unknown User'}</h1>
          <p className="font-medium text-[clamp(0.875rem,1vw,1rem)] text-black/50">
            <span className="font-bold text-orange-primary">{user?.loyalty_points || 0} points</span> available.
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
          {profileMenu === PROFILE_MENU.BASIC_INFO && <BasicInformation data={user} />}
          {profileMenu === PROFILE_MENU.ADDRESS && <Address data={user} />}
          {profileMenu === PROFILE_MENU.CHANGE_PASSWORD && <ChangePassword />}
        </div>
      </div>
    </div>
  )
}
