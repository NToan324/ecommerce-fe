'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import CardProduct from '@user/(unauth)/products/components/card'
import { CgArrowsExchangeV } from 'react-icons/cg'
import { FiSearch } from 'react-icons/fi'
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2'
import { IoClose } from 'react-icons/io5'

import PaginationCustom from '@/components/paginationCustom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { useProductVariantStore } from '@/stores/product.store'
import { Brand } from '@/types/brand.type'
import { Category } from '@/types/category.type'
import { ProductVariantPagination } from '@/types/product.type'
import { formatPrice } from '@/utils/helpers'

type Attribute = {
  name: string
  items: { name: string; id: string }[]
}

type FiltersItem = {
  categories: string[]
  brands: string[]
  prices: string[]
}

type SliderValue = number[]

interface ProductPageProps {
  products: ProductVariantPagination
  categories: Category[]
  brands: Brand[]
  search: string
  setSearch: (value: string) => void
}

export default function ProductPage({ products, categories, brands, search, setSearch }: ProductPageProps) {
  const categoryIds = useProductVariantStore((state) => state.category_ids)
  const brandIds = useProductVariantStore((state) => state.brand_ids)
  const minPrice = useProductVariantStore((state) => state.min_price)
  const maxPrice = useProductVariantStore((state) => state.max_price)
  const sortName = useProductVariantStore((state) => state.sort_name)
  const sortPrice = useProductVariantStore((state) => state.sort_price)
  const limit = useProductVariantStore((state) => state.limit)

  const totalPages = products.totalPages || 1
  const currentPage = products.page || 1

  const [attributes, setAttributes] = useState<Array<Attribute>>([])
  const [sliderValue, setSliderValue] = useState<SliderValue>([minPrice, maxPrice])
  const [openFilter, setOpenFilter] = useState(false)

  const setCategoryIds = useProductVariantStore((state) => state.setCategoryIds)
  const setBrandIds = useProductVariantStore((state) => state.setBrandIds)
  const setMinPrice = useProductVariantStore((state) => state.setMinPrice)
  const setMaxPrice = useProductVariantStore((state) => state.setMaxPrice)
  const setSortName = useProductVariantStore((state) => state.setSortName)
  const setSortPrice = useProductVariantStore((state) => state.setSortPrice)
  const setPage = useProductVariantStore((state) => state.setPage)
  const router = useRouter()

  const filterItems = [
    {
      name: 'Name - A to Z',
      value: 'name_asc',
    },
    {
      name: 'Name - Z to A',
      value: 'name_desc',
    },
    {
      name: 'Price - Low to High',
      value: 'price_asc',
    },
    {
      name: 'Price - High to Low',
      value: 'price_desc',
    },
  ]

  const [selectedCategory, setSelectedCategory] = useState<FiltersItem>({
    categories: categoryIds || [],
    brands: brandIds || [],
    prices: [],
  })

  const handlePageChange = (page: number) => {
    setPage(page)
    router.push(`/products?page=${page}&limit=${limit}`)
  }

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
    const element = document.getElementById('container')
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - 100
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    setCategoryIds(selectedCategory.categories)
  }, [selectedCategory.categories, setCategoryIds])

  useEffect(() => {
    setBrandIds(selectedCategory.brands)
  }, [selectedCategory.brands, setBrandIds])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMinPrice(sliderValue[0])
      setMaxPrice(sliderValue[1])
    }, 300)

    return () => clearTimeout(timeout)
  }, [sliderValue, setMinPrice, setMaxPrice])

  useEffect(() => {
    if (categories && brands) {
      setAttributes([
        {
          name: 'Categories',
          items: categories.map((category) => ({ name: category.category_name, id: category._id })),
        },
        {
          name: 'Brands',
          items: brands.map((brand) => ({ name: brand.brand_name, id: brand._id })),
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
      <div id="container" className="flex gap-12">
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
                      item.id
                    )
                    return (
                      <li
                        className={`${isSelected ? 'text-black' : 'text-black/30'} cursor-pointer hover:text-black w-fit`}
                        key={item.name}
                        onClick={() => handleSelectCategory(category.name as keyof FiltersItem, item.id)}
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
          <div className="w-full flex justify-end gap-2 py-2">
            <div className="relative flex w-full max-w-sm md:max-w-[250px]">
              <Input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
              <FiSearch className="absolute right-3 top-2 text-gray-500 size-5" />
            </div>
            <Select
              onValueChange={(value) => {
                if (value.includes('name')) {
                  setSortName(value === 'name_asc' ? 'asc' : 'desc')
                  setSortPrice(undefined)
                } else if (value.includes('price')) {
                  setSortPrice(value === 'price_asc' ? 'asc' : 'desc')
                  setSortName(undefined)
                }
              }}
              value={
                sortName
                  ? sortName === 'asc'
                    ? 'name_asc'
                    : 'name_desc'
                  : sortPrice
                    ? sortPrice === 'asc'
                      ? 'price_asc'
                      : 'price_desc'
                    : ''
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                {filterItems.map((item) => (
                  <SelectItem value={item.value} key={item.value}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="md:hidden" variant={'outline'} onClick={() => setOpenFilter((prev) => !prev)}>
              <HiOutlineAdjustmentsHorizontal />
            </Button>
          </div>
          <div className="grid w-full gap-8 content-between lg:grid-cols-3 grid-cols-2">
            {products && products.data.length > 0 ? (
              products.data.map((product) => {
                return (
                  <Link href={`/products/${product._id}`} key={product._id} className="w-full">
                    <CardProduct key={product._id} data={product} />
                  </Link>
                )
              })
            ) : (
              <div className=" col-span-2 lg:col-span-3 flex justify-center items-center text-center min-h-[350px]">
                No data available
              </div>
            )}
          </div>
          <div className="w-full flex justify-center items-center">
            <PaginationCustom
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={(page) => handlePageChange(page)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
