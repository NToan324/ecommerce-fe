'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { toastError, toastSuccess } from '@components/toastify'
import { useQueryClient } from '@tanstack/react-query'
import Comment from '@user/(unauth)/products/[id]/components/comment'
import { CarouselProduct } from '@user/(unauth)/products/components/carouselProduct'
import { FaRegDotCircle, FaStar } from 'react-icons/fa'
import { FiMinus, FiShoppingCart } from 'react-icons/fi'
import { GoPlus } from 'react-icons/go'
import { LuDot, LuStar } from 'react-icons/lu'
import { RiSendPlaneLine } from 'react-icons/ri'

import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { CarouselApi } from '@/components/ui/carousel'
import { attributeOptions } from '@/config'
import socketConfig from '@/config/socket'
import useProduct from '@/hooks/useProduct'
import { useAuthStore } from '@/stores/auth.store'
import { ProductVariantDetail } from '@/types/product.type'
import { formatPrice } from '@/utils/helpers'

interface ProductDetailsPageProps {
  product: ProductVariantDetail
}

export default function ProductDetailsPage({ product }: ProductDetailsPageProps) {
  const id = product && product.productVariant?._id
  const queryClient = useQueryClient()
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [comment, setComment] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [ratings, setRatings] = useState(0)

  const user = useAuthStore((state) => state.user)

  const entriesAttributes = Object.entries(product.productVariant?.attributes || {})
  const colorEntry = entriesAttributes.find(([key]) => key === 'Color')
  const otherEntries = entriesAttributes.filter(([key]) => key !== 'Color')

  const {
    data: reviews,
    isSuccess: isSuccessReviews,
    // isPending: isPendingReviews,
    // isFetching: isFetchingReviews,
  } = useProduct.getReviewsProductVariant(id as string, {
    limit: 10,
    page: 1,
  })
  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      console.log('select', api.selectedScrollSnap())
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const handleApi = (index: number) => {
    if (api) {
      api.scrollTo(index)
    }
  }

  useEffect(() => {
    if (product && product.productVariant?.images.length > 0) {
      setCount(product && product.productVariant?.images.length)
    }
  }, [product])

  useEffect(() => {
    socketConfig.connect()
    socketConfig.joinRoom(id)

    const handleNewReview = () => {
      setIsSending(false)
      setComment('')
      setRatings(0)
      toastSuccess('Thank you for your review!')
      queryClient.invalidateQueries({ queryKey: ['getReviewsProductVariant', id, { limit: 10, page: 1 }] })
    }
    socketConfig.on('new_review', handleNewReview)

    return () => {
      socketConfig.off('new_review', handleNewReview)
      socketConfig.leaveRoom(id)
      socketConfig.disconnect()
    }
  }, [id])

  const handleAddToCart = () => {}

  const addReview = (content: string) => {
    if (content.trim() === '') {
      toastError('Comment cannot be empty')
      return
    }

    setIsSending(true)
    try {
      if (user && ratings > 0) {
        socketConfig.addReview(id, content, ratings)
      } else {
        socketConfig.addReview(id, content)
      }
    } catch (error) {
      console.error('Failed to send review', error)
      toastError('Failed to send review')
    }
  }

  return (
    <div>
      {/* Image Category */}
      <div className="bg-purple-primary min-h-screen relative overflow-hidden">
        <p className="text-[clamp(9.5rem,50vw,34rem)] absolute font-bold text-blue-light top-[30%] md:top-0 uppercase">
          Lenovo
        </p>
        <CarouselProduct
          data={product && product.productVariant ? product.productVariant?.images : []}
          setApi={setApi}
        />

        <div className="absolute top-0 md:top-[25%] md:p-0 p-8 right-0 w-full flex flex-col justify-between items-start gap-7 max-w-[400px] md:max-w-[600px]">
          <div className="flex items-center gap-2">
            <span className="block w-[80px] h-px bg-black"></span>
            <h1 className="">{product && product.productVariant?.brand_name}</h1>
          </div>
          <h2 className="font-medium text-[clamp(1.5rem,5vw,3.125rem)] line-clamp-4">
            {product && product.productVariant?.variant_name}
          </h2>
          <div className="flex justify-start items-center gap-2 md:gap-4 md:relative absolute md:bottom-0 md:right-0 -bottom-[280px] right-[40px]">
            {Array.from({ length: count || 4 }).map((_, index) => {
              const isShowed = index === current - 1
              return isShowed ? (
                <FaRegDotCircle
                  key={index}
                  className="inline-block size-4 md:size-5 text-black"
                  onClick={() => handleApi(index)}
                />
              ) : (
                <LuDot
                  key={index}
                  className="inline-block size-6 md:size-8 text-black/40"
                  onClick={() => handleApi(index)}
                />
              )
            })}
          </div>
          <div className="flex justify-start items-center gap-6 w-full mt-4 absolute md:relative md:bottom-0 md:right-0 -right-[180px] -bottom-[350px]">
            {/* Increase and Descrease */}
            <div className="flex items-center rounded-4xl justify-between w-full h-12 md:h-14 max-w-[105px] md:max-w-[150px] border-2 border-blue-secondary">
              <Button variant={'ghost'} className="hover:bg-transparent">
                <FiMinus size={24} className="text-blue-secondary" strokeWidth={3} />
              </Button>
              <span className="text-blue-tertiary text-[clamp(0.875rem,2vw,1.25rem)]">1</span>
              <Button variant={'ghost'} className="hover:bg-transparent">
                <GoPlus size={24} className="text-blue-secondary" strokeWidth={1} />
              </Button>
            </div>
            {/* Add to Cart  */}
            <Button
              variant={'default'}
              onClick={() => handleAddToCart()}
              className="bg-violet-primary rounded-4xl md:w-full max-w-[150px] md:h-14 px-10 hover:bg-violet-primary/90 w-12 h-12"
            >
              <FiShoppingCart className="md:hidden block" />
              <span className="md:block hidden">Add to Cart</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="lg:px-[120px] px-7 md:space-y-[120px] space-y-20 mt-20 mb-10 md:mt-[120px]">
        {/* Description */}
        <div className="flex justify-between items-start gap-8 w-full  md:flex-row flex-col">
          <h3 className="uppercase font-medium text-base pt-4">Product Description</h3>
          <div className="max-w-[650px] w-full space-y-2">
            <h2 className="font-semibold text-[clamp(1.5rem,5vw,3.75rem)]">
              {product && product.productVariant?.variant_name}
            </h2>
            <p className="text-[clamp(0.75rem,2vw,1.125rem)] font-medium">
              {product && product.productVariant?.variant_description}
            </p>
          </div>
        </div>
        {/* Price */}
        <div className="bg-gradient-to-r from-blue-light p-14 gap-4 to-white via-blue-light w-full h-[350px] flex md:flex-row flex-col justify-between items-center">
          <div className="space-y-4">
            <div className="flex justify-start items-center gap-4">
              <span className="block w-[100px] h-px bg-black"></span>
              <p className="text-[clamp(0.75rem,2vw,1.5rem)]">Special price for you, only from</p>
            </div>
            <h4 className="font-bold text-[clamp(1.75rem,5vw,4rem)] text-center">
              {formatPrice(product && product.productVariant?.price)}
            </h4>
          </div>
          <div className="relative w-[300px] lg:w-[500px] h-full overflow-hidden">
            <Image
              src={(product && product.productVariant?.images[1].url) || '/images/laptop.png'}
              alt="Laptop"
              objectFit="contain"
              fill
              className="md:scale-150"
            />
          </div>
        </div>
        {/* Variant Product */}
        <div className="flex justify-between flex-col items-start gap-8 w-full ">
          <div className="flex justify-between items-start gap-8 w-full md:flex-row flex-col">
            <h3 className="uppercase font-medium text-base pt-4">Variant product</h3>
            <h2 className="font-semibold text-[clamp(1.5rem,5vw,3.75rem)] max-w-[650px]">
              Curated to Fit You Perfectly
            </h2>
          </div>
          <div className="flex justify-between items-stretch gap-8 w-full h-full md:flex-row flex-col-reverse">
            <div className="flex justify-between items-start gap-5 md:gap-10 h-full">
              <div className="flex flex-col justify-between self-stretch font-medium items-end gap-4 text-[clamp(0.75rem,2vw,1rem)]">
                <p>Configuration</p>
                <p>Color</p>
              </div>
              <div className="block w-px bg-black self-stretch"></div>
              <div className="flex flex-col justify-between items-start h-full gap-4 md:gap-10">
                <div className="flex flex-row md:flex-col justify-between items-start gap-6 flex-wrap md:gap-8">
                  {otherEntries &&
                    otherEntries.map(([key, value]) => {
                      const IconMap =
                        attributeOptions[
                          product.productVariant.category_name as keyof typeof attributeOptions
                        ]?.attributes.find((attr) => attr.label === key)?.icon ?? null
                      return (
                        <div key={key} className="flex justify-between items-center gap-3">
                          <div className="p-1 rounded-full border-1 border-black w-7 h-7 md:w-10 md:h-10 flex justify-center items-center">
                            {IconMap && <IconMap className="inline-block md:size-5 size-3" />}
                          </div>
                          <div className="flex flex-col justify-start items-start font-medium text-[clamp(0.75rem,2vw,1rem)]">
                            <p>{key}</p>
                            <p>{value}</p>
                          </div>
                        </div>
                      )
                    })}
                  {colorEntry && (
                    <div className="flex justify-between items-center gap-3">
                      <div className="flex flex-col justify-start items-start font-medium text-[clamp(0.75rem,2vw,1rem)]">
                        <p>{colorEntry[1]}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="relative w-full md:w-[300px] lg:w-[500px] h-[300px]">
              <div className="bg-conic-90 from-blue-light to-purple-primary rounded-[50%] w-full h-full absolute top-[50%] left-[50%] blur-xl transform translate-x-[-50%] translate-y-[-50%]"></div>
              <Image
                src={(product && product.productVariant?.images[2].url) || '/images/laptop.png'}
                alt="Laptop"
                fill
                objectFit="contain"
              />
            </div>
          </div>
        </div>
        {/* Ratings */}
        <div className="flex justify-between flex-col items-start gap-8 w-full ">
          <h3 className="uppercase font-medium text-base pt-4">Ratings</h3>
          <div className="flex justify-between items-center gap-8 w-full">
            <div className=" flex-col justify-between items-start gap-2 hidden md:flex w-full">
              <h4 className="text-lg font-bold">Total reviews</h4>
              <p className="text-3xl font-bold mt-2">{isSuccessReviews && reviews.data.review_count}</p>
              <p className="font-medium text-sm text-blue-primary">Impressions up to now</p>
            </div>
            <div className="flex flex-col justify-between items-start gap-2 w-full border-0 md:border-l md:border-black md:pl-14">
              <h4 className="text-lg font-bold hidden md:block">Avarage ratings</h4>
              <div className="flex justify-start items-center gap-2 md:gap-4 md:flex-row flex-col">
                <p className="text-3xl font-bold mt-2">{isSuccessReviews && reviews.data.average_rating.toFixed(1)}</p>
                <span className="text-[8px] font-medium text-blue-secondary md:hidden">
                  {isSuccessReviews && reviews.data.review_count} reviews
                </span>
                <div className="flex justify-start items-center">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const isFilled = index < 4
                    return isFilled ? (
                      <FaStar key={index} className="inline-block size-5 text-blue-tertiary ml-1" />
                    ) : (
                      <LuStar key={index} className="inline-block size-5 text-blue-tertiary ml-1" />
                    )
                  })}
                </div>
              </div>
              <p className="font-medium text-sm text-blue-primary md:block hidden">Impressions up to now</p>
            </div>
            <div className="flex w-full flex-col-reverse justify-between items-start gap-2 border-0 md:border-l border-black md:pl-14">
              {Array.from({ length: 5 }).map((_, index) => {
                return (
                  <div className="flex justify-start items-center gap-4 w-full" key={index}>
                    <span className="w-3 font-medium text-sm ">{index + 1}</span>
                    <div className="w-full max-w-[250px] h-2 rounded-4xl bg-blue-tertiary ml-2"></div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div
          className={`${user ? 'items-start' : ' items-center'} flex justify-center md:justify-between gap-4 md:gap-8 w-full p-6 md:p-10 rounded-[40px] bg-blue-gray flex-col md:flex-row`}
        >
          <div className="flex justify-between w-full items-center md:items-start gap-3 md:flex-col">
            <p className="text-[clamp(1rem,2vw,2rem)] font-bold text-blue-tertiary line-clamp-1">
              Hello! <span className="text-black">{user?.fullName}</span>
            </p>
            <p className="text-[clamp(0.75rem,2vw,0.875rem)] font-medium text-blue-night">Friday, Aug 29</p>
          </div>
          <div className="w-full max-w-[600px] flex flex-col justify-start items-center gap-1">
            {user && (
              <div className="flex justify-start items-center w-full h-10">
                {Array.from({ length: 5 }).map((_, index) => {
                  const isRating = index < ratings
                  return isRating ? (
                    <FaStar
                      onClick={() => setRatings(index + 1 === ratings ? 0 : index + 1)}
                      key={index}
                      title={`${index + 1} star`}
                      className={`hover:size-8 transition-all duration-300 cursor-pointer inline-block size-6 md:size-7 text-blue-tertiary ml-1`}
                    />
                  ) : (
                    <LuStar
                      key={index}
                      title={`${index + 1} star`}
                      onClick={() => setRatings(index + 1 === ratings ? 0 : index + 1)}
                      className={`hover:size-8 transition-all duration-300 cursor-pointer inline-block size-6 md:size-7 text-blue-tertiary ml-1`}
                    />
                  )
                })}
              </div>
            )}

            <div className="rounded-[40px] bg-white flex justify-between items-center gap-4 px-4 md:px-6 py-2 w-full h-14 md:h-[72px]">
              <input
                placeholder="Let us know what you think"
                className="bg-white w-full border-none outline-none  text-[clamp(0.75rem,2vw,1.125rem)]"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              />
              <Button
                disabled={isSending}
                onClick={() => addReview(comment)}
                variant={'ghost'}
                className="hover:bg-transparent border border-blue-gray rounded-full w-9 h-9 md:w-[50px] md:h-[50px]"
              >
                {isSending ? <Loading color="text-black" /> : <RiSendPlaneLine size={30} className="text-black/50" />}
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-between flex-col items-center gap-8 w-full ">
          {isSuccessReviews && reviews.data.data.length > 0 ? (
            <>
              {reviews.data.data.map((review) => (
                <Comment key={review._id} data={review} isSingle={reviews.data.data.length === 1} />
              ))}
            </>
          ) : (
            <div className="flex justify-between items-center gap-2 w-full flex-col text-center mb-12">
              <div className="relative h-40 w-40 md:h-80 md:w-80">
                <Image src={'/images/enclosed.png'} fill alt="enclose" objectFit="cover" />
              </div>
              <p className="font-bold text-[clamp(1.125rem,2vw,1.5rem)]">No reviews yet</p>
              <p className="text-[clamp(0.875rem,2vw,1rem)] font-medium">
                Please add your review for your better experience
              </p>
            </div>
          )}
          {isSuccessReviews && reviews.data.data.length >= 10 && (
            <p className="w-full text-center text-base font-medium text-black/50">See more</p>
          )}
        </div>
      </div>
    </div>
  )
}
