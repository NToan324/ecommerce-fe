'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { IoIosArrowForward } from 'react-icons/io'

import SearchComponent from '@/app/(user)/(unauth)/home/components/search'
import { useDebounce } from '@/hooks/useDebounce'
import useProduct from '@/hooks/useProduct'
import { useProductVariantStore } from '@/stores/product.store'
import { ProductVariant } from '@/types/product.type'

const PLACEHOLDER_TEXT = [
  "Asus ROG Strix G16 (2024, i9-13980HX, RTX 4080, 16GB RAM, 1TB SSD, 16'' QHD+ 240Hz)",
  "Asus Zenbook 14 OLED (UX3402, i7-1360P, 16GB RAM, 512GB SSD, 14'' 2.8K OLED Touch)",
  "Dell XPS 13 Plus (9320, i7-1360P, 32GB RAM, 1TB SSD, 13.4'' 3.5K OLED)",
  "Dell Alienware m16 (R1, i9-13900HX, RTX 4090, 32GB RAM, 2TB SSD, 16'' QHD+ 240Hz)",
  "HP Spectre x360 14 (2023, i7-1355U, 16GB RAM, 1TB SSD, 13.5'' OLED Touch)",
  "Lenovo IdeaPad Slim 5 (14IRL8, i5-13420H, 16GB RAM, 512GB SSD, 14'' FHD IPS)",
  "Acer Aspire 7 (A715-76G, i5-12450H, RTX 3050, 8GB RAM, 512GB SSD, 15.6'' FHD 144Hz)",
  "Acer Nitro 5 (AN16-41, Ryzen 7 7840HS, RTX 4060, 16GB RAM, 1TB SSD, 16'' QHD 165Hz)",
  "MSI Stealth 15M (A13VF, i7-13700H, RTX 4060, 16GB RAM, 1TB SSD, 15.6'' FHD 144Hz)",
  "Apple MacBook Air M2 (2023, 8-core CPU, 10-core GPU, 16GB RAM, 512GB SSD, 15.3'' Liquid Retina)",
]

export default function page() {
  const [placeholder, setPlaceholder] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [searchResult, setsearchResult] = useState<ProductVariant[]>([])
  const searchDebounce = useDebounce(searchValue, 500)
  const setName = useProductVariantStore((state) => state.setName)
  const router = useRouter()
  const { data: productVariants } = useProduct.getProductVariantsByUser(searchDebounce.trim().length > 3)

  useEffect(() => {
    if (searchDebounce.trim().length > 3) {
      setName(searchDebounce)
    }
  }, [searchDebounce])

  useEffect(() => {
    if (productVariants?.data && searchDebounce.trim().length > 3) {
      setsearchResult(productVariants.data.data)
    } else {
      setsearchResult([])
    }
  }, [searchDebounce, productVariants, setsearchResult])

  useEffect(() => {
    let id = 0
    let i = 0
    const interval = setInterval(() => {
      setPlaceholder(PLACEHOLDER_TEXT[id].slice(0, i))
      i++
      if (i > PLACEHOLDER_TEXT[id].length) {
        setTimeout(() => {
          i = 0
          if (id === PLACEHOLDER_TEXT.length - 1) id = 0
          else id++
        }, 800)
      }
    }, 60)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="overflow-hidden">
      <div className="relative min-h-[calc(100vh-80px)]">
        <h2 className="absolute top-[195px] left-[30px] z-10 w-full max-w-[300px] text-[clamp(2.5rem,8.8vw,8.5rem)] font-bold sm:top-[60px] sm:left-[108px] sm:max-w-[500px] md:max-w-[1000px]">
          Your Hub{' '}
          <span className="bg-gradient-to-tr from-white via-gray-300 to-black bg-clip-text text-transparent">For </span>
          Tech{' '}
          <span className="bg-gradient-to-r from-black via-white to-black bg-clip-text text-transparent">
            Essentials
          </span>
        </h2>
        <div className="animate-bounce-slow-50 from-blue-primary via-blue-primary/40 absolute bottom-[200px] left-[40px] block h-[130px] w-[130px] rounded-full bg-gradient-to-tr to-white blur-xs sm:bottom-[50px] sm:left-[83px]"></div>
        <div className="from-blue-primary via-blue-primary/40 animate-bounce-slow-70 absolute top-[80px] -right-[250px] z-20 block h-[360px] w-[360px] rounded-full bg-gradient-to-tr to-white blur-xs md:right-[20px] lg:right-[120px]"></div>
        <div className="bg-blue-primary absolute bottom-[20px] left-[60px] z-0 block h-[430px] w-[430px] rounded-full blur-[300px]"></div>
        <SearchComponent
          searchResult={searchResult}
          placeholder={placeholder}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          isSearching={searchValue.trim().length > 3 && !productVariants}
        />
      </div>
      <div className="relative flex flex-col items-center justify-center gap-10 overflow-hidden p-7 lg:justify-start lg:p-[120px]">
        <h2 className="text-gradient w-full text-start text-[clamp(1.875rem,5vw,3.75rem)] uppercase">about</h2>
        <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">
          <p className="line-clamp-4 w-full text-justify text-base leading-7 font-medium lg:w-1/2">
            Our computer store is a trusted destination for technology enthusiasts, offering authentic PCs, laptops, and
            components. Since our first day, we have been committed to delivering quality products, competitive prices,
            and dedicated service. Over the years, we have built lasting trust with customers who rely on us for both
            work and life.
          </p>
          <div className="flex w-full items-center justify-between gap-10 lg:w-1/2 lg:justify-end lg:gap-20">
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-gradient text-[clamp(1.5rem,5vw,3rem)]">100+</p>
              <span className="text-base text-[clamp(0.75rem,3vw,1rem)] text-black/40">products</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-[clamp(1.5rem,5vw,3rem)]">5</p>
              <span className="text-[clamp(0.75rem,3vw,1rem)] text-black/40">categories</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-[clamp(1.5rem,5vw,3rem)]">4.9</p>
              <span className="text-[clamp(0.75rem,3vw,1rem)] text-black/40">rating</span>
            </div>
          </div>
        </div>
        <div className="from-blue-primary absolute top-[230px] right-[400px] -z-10 h-[100px] w-[100px] rounded-full bg-gradient-to-br to-white blur-md"></div>
        <div className="from-blue-primary absolute -right-[50px] bottom-10 -z-10 h-[180px] w-[180px] rounded-full bg-gradient-to-tr via-white/90 to-white blur-md"></div>
      </div>
      {/* Our Product */}
      <div className="relative flex flex-col items-start justify-start gap-10 overflow-hidden p-7 lg:p-[120px]">
        <h2 className="text-gradient w-full text-start text-[clamp(1.875rem,5vw,3.75rem)] uppercase">our product</h2>
        <p className="line-clamp-3 w-full text-start text-base leading-7 font-medium lg:w-1/2">
          Our computer store is a trusted destination for technology enthusiasts, offering authentic PCs, laptops, and
          standard dummy text ever since the 1500s.
        </p>
        <div className="relative flex w-full items-center justify-between gap-6 overflow-x-auto pb-6 lg:h-full xl:overflow-hidden xl:pb-0">
          <div className="flex h-[300px] min-w-[900px] flex-row items-center justify-between gap-6 lg:h-full lg:w-1/2 lg:min-w-[400px] lg:flex-col">
            {/* Best Seller */}
            <div className="to-blue-primary min-h-[240px] w-full min-w-[400px] rounded-2xl bg-gradient-to-r from-white via-white p-[2px]">
              <div className="relative overflow-hidden rounded-[14px] bg-white">
                <div className="from-blue-primary inset bg-blue-primary absolute top-[50%] left-[50%] h-[300px] w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-full blur-[80px]"></div>
                <div className="relative h-[160px] w-full overflow-hidden lg:h-[300px]">
                  <Image
                    src="/images/products.png"
                    alt="Laptop"
                    width={500}
                    height={400}
                    objectFit="cover"
                    className="absolute -top-[150px] -right-[60px] scale-[60%] -rotate-6 lg:-top-[150px] lg:-right-[50px] lg:scale-100"
                  />
                </div>
                <p className="text-blue-tertiary absolute top-10 left-10 w-[100px] text-3xl font-bold">Best Sellers</p>
                <p className="relative z-10 p-6 text-sm leading-7 text-black lg:p-8">
                  Discover our best-selling computers and accessories, chosen by hundreds of customers for their
                  quality, performance, and great value.
                </p>
              </div>
            </div>
            {/* Computers */}
            <div className="to-blue-primary h-full w-full min-w-[400px] rounded-2xl bg-gradient-to-r from-white via-white p-[2px]">
              <div className="relative flex h-full flex-col items-start justify-between gap-8 overflow-hidden rounded-[14px] bg-white p-8">
                <div className="from-blue-primary inset bg-blue-primary absolute top-[50%] right-0 h-[100px] w-[200px] translate-x-[-50%] translate-y-[-50%] rounded-full blur-[80px]"></div>
                <p className="text-blue-primary text-3xl font-bold">Computers</p>
                <p className="line-clamp-2 text-sm leading-7 font-medium text-black">
                  Computers are essential tools in the modern world, powering everything from work and study to
                  entertainment and creativity. They have become a cornerstone of technology and daily life.
                </p>
              </div>
            </div>
          </div>
          <div className="flex h-[300px] w-full items-center justify-between gap-6 lg:h-full lg:w-1/2 lg:flex-col">
            {/* New Products */}
            <div className="from-blue-primary h-full min-h-[240px] w-full min-w-[400px] rounded-2xl bg-gradient-to-r via-white to-white p-[2px]">
              <div className="relative h-full overflow-hidden rounded-[14px] bg-white">
                <div className="from-blue-primary inset bg-blue-primary absolute top-[50%] left-[50%] h-[300px] w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-full opacity-20 blur-[80px]"></div>
                <div className="relative h-[140px] w-full overflow-hidden lg:h-[250px]">
                  <Image
                    src="/images/backdrop.png"
                    alt="Laptop"
                    fill
                    objectFit="cover"
                    className="absolute inset-0 scale-150 opacity-50"
                  />
                </div>
                <p className="text-blue-tertiary absolute top-10 left-10 w-[100px] text-3xl font-bold">New Products</p>
                <p className="relative z-10 line-clamp-2 p-8 text-sm leading-7 text-black">
                  Explore our latest arrivals featuring modern computers, accessories, and components designed to meet
                  today’s technology needs.
                </p>
              </div>
            </div>
            {/* Categories */}
            <div className="flex h-full min-h-[240px] w-full items-center justify-between gap-6">
              <div className="from-blue-primary h-full w-full min-w-[400px] flex-1 rounded-2xl bg-gradient-to-r via-white to-white p-[2px] lg:max-w-[200px] lg:min-w-[50px]">
                <div className="via-blue-primary/5 relative h-full overflow-hidden rounded-[14px] bg-conic from-white from-10% via-10% to-white p-8">
                  <p className="text-blue-primary text-3xl font-bold">Laptops</p>
                  <p className="mt-14 line-clamp-3 text-sm leading-7 font-medium text-black">
                    Laptop is simply a powerful tool of the modern era. It has become the standard device for work,
                    study, and entertainment across the world.
                  </p>
                </div>
              </div>
              <div className="from-blue-primary h-full w-full min-w-[400px] flex-1 rounded-2xl bg-gradient-to-r via-white to-white p-[2px] lg:max-w-[200px] lg:min-w-[50px]">
                <div className="via-blue-primary/5 relative h-full overflow-hidden rounded-[14px] bg-gradient-to-r from-white from-40% via-60% to-white p-8">
                  <p className="text-blue-primary text-3xl font-bold">Keyboards</p>
                  <p className="mt-14 line-clamp-3 text-sm leading-7 font-medium text-black">
                    Keyboards are essential input devices for computers, allowing users to interact with their systems
                    efficiently. They come in various layouts and designs to suit different preferences and needs.
                  </p>
                </div>
              </div>
              <div className="p-8">
                <div
                  className="bg-blue-primary/25 relative flex h-16 w-16 items-center justify-center rounded-full cursor-pointer"
                  onClick={() => router.push('/products')}
                >
                  <div className="bg-blue-primary animation-duration-[1s] absolute inset-0 h-full w-full animate-ping rounded-full"></div>
                  <IoIosArrowForward className="text-blue-primary text-4xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
