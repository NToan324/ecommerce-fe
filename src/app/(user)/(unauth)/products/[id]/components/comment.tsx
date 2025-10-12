import React from 'react'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa'
import { LuStar } from 'react-icons/lu'

import { Review } from '@/types/product.type'
import { formatDateWithSuffix } from '@/utils/helpers'

interface CommentProps {
  data: Review
}

export default function Comment({ data }: CommentProps) {
  return (
    <div className="flex justify-between items-start w-full min-h-[100px] gap-5 pb-12 border-b border-black/10 bg-white">
      <div className="w-[60px] h-[60px] relative rounded-full overflow-hidden">
        <Image
          src={data.user_id ? data.user.avatar : 'https://avatar.iran.liara.run/public'}
          alt={data.user_id ? data.user.name : 'Anonymous'}
          width={100}
          height={100}
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col justify-start items-center w-full gap-4">
        <div className="flex justify-between items-center w-full">
          <div className="flex justify-start items-center gap-2">
            <p className="text-base font-bold">{data.user_id ? data.user.name : 'Anonymous'}</p>
            <span className="text-xs font-medium text-black/50">{formatDateWithSuffix(data.createdAt)}</span>
          </div>
          <div className="flex justify-start items-center gap-2">
            {data.user_id && (
              <>
                <p className="text-base font-medium pt-1 md:block hidden">{data.rating.toFixed(1)}</p>
                <div className="flex justify-start items-center">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const isFilled = index < (data.user_id ? data.rating : 0)
                    return isFilled ? (
                      <FaStar key={index} className="inline-block size-4 text-blue-tertiary ml-1" />
                    ) : (
                      <LuStar key={index} className="inline-block size-4 text-blue-tertiary ml-1" />
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </div>
        <p className="text-base font-medium w-full">{data.content}</p>
      </div>
    </div>
  )
}
