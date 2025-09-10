'use client'

import Image from 'next/image'
import { FaRegDotCircle, FaStar } from 'react-icons/fa'
import { FiMinus } from 'react-icons/fi'
import { GoPlus } from 'react-icons/go'
import { LuDot, LuStar } from 'react-icons/lu'
import { MdOutlineSdStorage } from 'react-icons/md'
import { RiRam2Line, RiSendPlaneLine } from 'react-icons/ri'
import { RxSize } from 'react-icons/rx'

import { Button } from '@/components/ui/button'
import Comment from './components/comment'

export default function Page() {
  return (
    <div>
      {/* Image Category */}
      <div className="bg-purple-primary min-h-screen relative overflow-hidden">
        <p className="text-[clamp(9.5rem,50vw,34rem)] absolute font-bold text-blue-light uppercase">Lenovo</p>
        <div className="relative overflow-hidden w-full h-[400px] min-h-[250px] md:h-[650px] md:-left-[300px] md:top-0 top-[200px]">
          <Image
            src="/images/laptop.png"
            alt="Laptop"
            fill
            objectFit="contain"
            className="absolute scale-90 md:scale-125 "
          />
        </div>
        <div className="absolute top-[50px] md:top-[25%] md:p-0 p-8 right-[100px] flex flex-col justify-between items-start gap-7 max-w-[300px] md:max-w-[400px]">
          <div className="flex items-center gap-2">
            <span className="block w-[80px] h-px bg-black"></span>
            <h1 className="">Lenovo</h1>
          </div>
          <h2 className="font-medium text-[clamp(1.5rem,5vw,3.125rem)]">IdeaPad Slim 3 Notebook</h2>
          <div className="flex justify-start items-center gap-4">
            {Array.from({ length: 4 }).map((_, index) => {
              const isShowed = index === 0

              return isShowed ? (
                <FaRegDotCircle key={index} className="inline-block size-5 text-black" />
              ) : (
                <LuDot key={index} className="inline-block size-8 text-black/40" />
              )
            })}
          </div>
          <div className="flex justify-start items-center gap-6 w-full mt-4">
            {/* Increase and Descrease */}
            <div className="flex items-center rounded-4xl justify-between w-full h-14 max-w-[150px] border-2 border-blue-secondary">
              <Button variant={'ghost'} className="hover:bg-transparent">
                <FiMinus size={24} className="text-blue-secondary" strokeWidth={3} />
              </Button>
              <span className="text-blue-tertiary text-xl">1</span>
              <Button variant={'ghost'} className="hover:bg-transparent">
                <GoPlus size={24} className="text-blue-secondary" strokeWidth={1} />
              </Button>
            </div>
            {/* Add to Cart  */}
            <Button variant={'default'} className="bg-violet-primary rounded-4xl h-14 px-10 hover:bg-violet-primary/90">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      <div className="lg:px-[120px] px-7 md:space-y-[120px] space-y-20 mt-20 md:mt-[120px]">
        {/* Description */}
        <div className="flex justify-between items-start gap-8 w-full  md:flex-row flex-col">
          <h3 className="uppercase font-medium text-base pt-4">Product Description</h3>
          <div className="max-w-[650px] w-full space-y-2">
            <h2 className="font-semibold text-[clamp(1.5rem,5vw,3.75rem)]">IdeaPad Slim 3 Notebook</h2>
            <p className="text-[clamp(0.75rem,2vw,1.125rem)] font-medium">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and.
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
            <h4 className="font-bold text-[clamp(1.75rem,5vw,4rem)] text-center">15.690.000 VND</h4>
          </div>
          <div className="relative w-[300px] lg:w-[500px] h-full overflow-hidden">
            <Image src="/images/laptop-preview.png" alt="Laptop" objectFit="cover" fill className="" />
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
                  <div className="flex justify-between items-center gap-3">
                    <div className="p-1 rounded-full border-1 border-black w-7 h-7 md:w-10 md:h-10 flex justify-center items-center">
                      <RxSize className="inline-block md:size-5 size-3" />
                    </div>
                    <div className="flex flex-col justify-start items-start font-medium text-[clamp(0.75rem,2vw,1rem)]">
                      <p>Size</p>
                      <p>15.6″</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-3">
                    <div className="p-1 rounded-full border-1 border-black w-7 h-7 md:w-10 md:h-10 flex justify-center items-center">
                      <RiRam2Line className="inline-block md:size-5 size-3" />
                    </div>
                    <div className="flex flex-col justify-start items-start font-medium text-[clamp(0.75rem,2vw,1rem)]">
                      <p>Ram</p>
                      <p>16GB</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-3">
                    <div className="p-1 rounded-full border-1 border-black w-7 h-7 md:w-10 md:h-10 flex justify-center items-center">
                      <MdOutlineSdStorage className="inline-block md:size-5 size-3" />
                    </div>
                    <div className="flex flex-col justify-start items-start font-medium text-[clamp(0.75rem,2vw,1rem)]">
                      <p>Storage</p>
                      <p>SSD 512GB</p>
                    </div>
                  </div>
                </div>
                <p className="font-medium text-[clamp(0.75rem,2vw,1rem)]">Silver</p>
              </div>
            </div>
            <div className="relative w-full md:w-[300px] lg:w-[500px] h-[300px]">
              <div className="bg-conic-90 from-blue-light to-purple-primary rounded-[50%] w-full h-full absolute top-[50%] left-[50%] blur-xl transform translate-x-[-50%] translate-y-[-50%]"></div>
              <Image src="/images/laptop-preview-2.png" alt="Laptop" fill objectFit="cover" />
            </div>
          </div>
        </div>
        {/* Ratings */}
        <div className="flex justify-between flex-col items-start gap-8 w-full ">
          <h3 className="uppercase font-medium text-base pt-4">Ratings</h3>
          <div className="flex justify-between items-center gap-8 w-full">
            <div className=" flex-col justify-between items-start gap-2 hidden md:flex w-full">
              <h4 className="text-lg font-bold">Total reviews</h4>
              <p className="text-3xl font-bold mt-2">10.0k</p>
              <p className="font-medium text-sm text-blue-primary">Impressions up to now</p>
            </div>
            <div className="flex flex-col justify-between items-start gap-2 w-full border-0 md:border-l md:border-black md:pl-14">
              <h4 className="text-lg font-bold hidden md:block">Avarage ratings</h4>
              <div className="flex justify-start items-center gap-2 md:gap-4 md:flex-row flex-col">
                <p className="text-3xl font-bold mt-2">4.0</p>
                <span className="text-[8px] font-medium text-blue-secondary md:hidden">10.0K reviews</span>
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
        <div className="flex justify-center md:justify-between items-center gap-4 md:gap-8 w-full p-4 md:p-10 h-[170px] rounded-[40px] bg-blue-gray flex-col md:flex-row">
          <div className="flex justify-between items-center md:items-start gap-3 md:flex-col">
            <p className="text-[clamp(1rem,2vw,2rem)] font-bold text-blue-tertiary">
              Hello! <span className="text-black">Daniel</span>
            </p>
            <p className="text-[clamp(0.75rem,2vw,0.875rem)] font-medium text-blue-primary">Friday, Aug 29</p>
          </div>
          <div className="rounded-[40px] bg-white flex justify-between items-center gap-4 px-6 py-2 w-full max-w-[600px] h-14 md:h-[72px]">
            <input
              placeholder="Let us know what you think"
              className="bg-white w-full border-none outline-none  text-[clamp(0.75rem,2vw,1.125rem)]"
            />
            <Button
              variant={'ghost'}
              className="hover:bg-transparent border border-blue-gray rounded-full w-[50px] h-[50px]"
            >
              <RiSendPlaneLine size={30} className="text-black/50" />
            </Button>
          </div>
        </div>
        <div className="flex justify-between flex-col items-start gap-8 w-full ">
          <Comment />
          <Comment />
          <Comment />
          <p className="w-full text-center text-base font-medium text-black/50">See more</p>
        </div>
      </div>
    </div>
  )
}
