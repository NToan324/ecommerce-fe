'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import CardProduct from '@user/(unauth)/products/components/card'
import { CgArrowsExchangeV } from 'react-icons/cg'
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2'
import { IoClose } from 'react-icons/io5'

import PaginationCustom from '@/components/paginationCustom'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Brand } from '@/types/brand.type'
import { Category } from '@/types/category.type'
import { ProductVariant } from '@/types/product.type'
import { formatPrice } from '@/utils/helpers'

type Attribute = {
  name: string
  items: { name: string }[]
}

type FiltersItem = {
  categories: string[]
  brands: string[]
  prices: string[]
}

type SliderValue = number[]

interface ProductPageProps {
  products: ProductVariant[]
  categories: Category[]
  brands: Brand[]
}

export default function ProductPage({ products, categories, brands }: ProductPageProps) {
  const [attributes, setAttributes] = useState<Array<Attribute>>([])
  const [sliderValue, setSliderValue] = useState<SliderValue>([0, 100000000])
  const [openFilter, setOpenFilter] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<FiltersItem>({
    categories: [],
    brands: [],
    prices: [],
  })

  const handleSelectCategory = (type: keyof FiltersItem, value: string) => {
    const typeLower = type.toLowerCase()
    setSelectedCategory((prev) => {
      const isExist = prev[typeLower as keyof FiltersItem].includes(value)
      if (isExist) {
        const newFilter = prev[typeLower as keyof FiltersItem].filter((item) => item !== value)
        return {
          ...prev,
          [typeLower]: [...newFilter],
        }
      }
      return {
        ...prev,
        [typeLower]: [...prev[typeLower as keyof FiltersItem], value],
      }
    })
  }

  useEffect(() => {
    if (categories && brands) {
      setAttributes([
        {
          name: 'Categories',
          items: categories.map((category) => ({ name: category.category_name })),
        },
        {
          name: 'Brands',
          items: brands.map((brand) => ({ name: brand.brand_name })),
        },
      ])
    }
  }, [categories, brands])

  return (
    <div className={`${openFilter ? 'pointer-events-auto' : ''} lg:px-[120px] p-7`}>
      <div className={`${openFilter ? '' : 'hidden'} w-full h-full z-100 bg-black/20 inset-0 fixed md:hidden`}></div>
      <div className="relative bg-white">
        <h1 className="text-[clamp(4.5rem,13vw,12rem)] text-[#F5F5F5B2] font-bold uppercase">Laptop</h1>
        <p className="absolute top-[45%] left-0 text-[clamp(1.25rem,3vw,2.25rem)] text-4xl font-bold bg-gradient-to-r from-blue-light via-violet-primary to-blue-tertiary bg-clip-text text-transparent">
          What's hot: <span className="font-medium text-violet-primary">Laptop</span>
        </p>
      </div>
      <div className="flex gap-12">
        {/* Category List */}
        <div
          className={`${openFilter ? 'bottom-0' : '-bottom-[100%]'} bg-white duration-300 overflow-scroll md:p-0 z-200 shadow-2xl md:shadow-none w-full h-[600px] rounded-t-2xl md:rounded-none fixed md:relative left-0 flex-col justify-between items-start gap-4 md:max-w-[300px] flex md:h-fit`}
        >
          {/* Close Button filter */}
          <div className=" w-full md:hidden sticky top-0 bg-white flex justify-end p-2">
            <Button
              variant={'ghost'}
              onClick={() => setOpenFilter((prev) => !prev)}
              className="hover:bg-transparent hover:rotate-90 duration-200"
            >
              <IoClose size={30} />
            </Button>
          </div>
          <div className="space-y-4 p-6 pt-0 w-full">
            {attributes.map((category) => (
              <div key={category.name} className="flex flex-col w-full">
                <h3 className="uppercase font-bold text-lg border-b-2 border-black/5 pb-4 w-full">{category.name}</h3>
                <ul className="list-none list-inside space-y-4 mt-4 ">
                  {category.items.map((item) => {
                    const isSelected = selectedCategory[category.name.toLowerCase() as keyof FiltersItem].includes(
                      item.name
                    )
                    return (
                      <li
                        className={`${isSelected ? 'text-black' : 'text-[#999999]'} cursor-pointer hover:text-black`}
                        key={item.name}
                        onClick={() => handleSelectCategory(category.name as keyof FiltersItem, item.name)}
                      >
                        {item.name}
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
            <h3 className="uppercase font-bold text-lg border-b-2 border-black/5 pb-4 w-full">Price</h3>
            <div className="flex flex-col justify-start items-center w-full gap-8">
              <Slider
                defaultValue={sliderValue}
                step={1000000}
                max={100000000}
                onValueChange={(value) => {
                  console.log(value)
                  setSliderValue(value)
                }}
                className="w-full mt-4"
              />
              <div className="flex justify-between items-center gap-2">
                <div className="h-10 bg-[#F1F1F1] text-center flex items-center justify-center px-4 py-2">
                  <span className="text-sm text-black font-medium">{formatPrice(sliderValue[0])}</span>
                </div>
                <CgArrowsExchangeV className="rotate-90 text-black" />
                <div className="h-10 bg-[#F1F1F1] text-center flex items-center justify-center px-4 py-2">
                  <span className="text-sm text-black font-medium">{formatPrice(sliderValue[1])}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Category Item */}
        <div className="flex flex-col justify-start items-start gap-4 w-full ">
          <div className="w-full flex justify-end gap-2">
            <Select>
              <SelectTrigger className="w-[180px] ">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name_asc">Name: A to Z</SelectItem>
                <SelectItem value="name_desc">Name: Z to A</SelectItem>
                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                <SelectItem value="price_desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            <Button className="md:hidden" variant={'outline'} onClick={() => setOpenFilter((prev) => !prev)}>
              <HiOutlineAdjustmentsHorizontal />
            </Button>
          </div>
          <div className="grid w-full gap-8 content-between lg:grid-cols-3 grid-cols-2">
            {products && products.length > 0 ? (
              products.map((product) => {
                return (
                  <Link href={`/products/${product._id}`} key={product._id} className="w-full">
                    <CardProduct key={product._id} data={product} />
                  </Link>
                )
              })
            ) : (
              <div className="">No data available</div>
            )}
          </div>
          <div className="w-full flex justify-center items-center">
            <PaginationCustom />
          </div>
        </div>
      </div>
    </div>
  )
}
