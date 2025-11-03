import React from 'react'
import { useRouter } from 'next/navigation'
import { RxExternalLink } from 'react-icons/rx'

import Loading from '@/components/loading'
import { ProductVariant } from '@/types/product.type'

interface SearchComponentProps {
  placeholder: string
  searchValue: string
  isSearching: boolean
  searchResult: ProductVariant[] | null
  setSearchValue: (value: string) => void
}

export default function SearchComponent({
  placeholder,
  searchValue,
  isSearching,
  setSearchValue,
  searchResult,
}: SearchComponentProps) {
  const router = useRouter()
  return (
    <div className="z-100 absolute md:bottom-[8%] bottom-[20%] left-[50%]  w-[340px] min-w-[340px] translate-x-[-50%] translate-y-[-50%] sm:w-[600px] lg:w-[780px]">
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        type="text"
        placeholder={placeholder}
        className="shadow-blue-primary focus-visible:ring-blue-primary rounded-[50px] w-full h-[80px] bg-white px-8 placeholder-[#C3C3C3] shadow-[0_1px_250px_rgba(0,0,0,1)] outline-none focus-visible:ring-1 "
      />
      {isSearching && (
        <div className="absolute top-1/2 right-6 translate-y-[-50%]">
          <Loading color="text-blue-primary" width={32} height={32} />
        </div>
      )}

      {searchResult ? (
        searchResult.length > 0 ? (
          <div className="absolute bg-white w-full mt-2 rounded-2xl p-4 shadow-2xl">
            {searchResult.map((item) => (
              <div
                key={item._id}
                className="flex cursor-pointer justify-between items-center py-2 border-b last:border-b-0"
                onClick={() => router.push(`products?page=1&limit=12&name=${searchValue}`)}
              >
                <div>
                  <p className="font-semibold text-base line-clamp-1">{item.variant_name}</p>
                  <p className="text-sm text-gray-500 line-clamp-1">{item.variant_description}</p>
                </div>

                <div className="w-10 h-10">
                  <RxExternalLink className="text-2xl text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="absolute bg-white w-full mt-2 rounded-2xl p-4 shadow-2xl">
            <p className="text-center text-gray-500">Oops! Nothing here</p>
          </div>
        )
      ) : null}
    </div>
  )
}
