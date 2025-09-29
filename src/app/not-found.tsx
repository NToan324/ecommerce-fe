'use client'

import Caveman from '@public/lotties/Caveman - 404 Page.json'
import Lottie from 'lottie-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-start h-screen gap-2 px-7 text-black lg:px-[120px] text-center pt-16 md:pt-4">
      <div className="relative">
        <h1 className="text-[clamp(10rem,8vw,16rem)] min-[1000px]:text-[16rem] font-bold text-center relative z-20">
          404
        </h1>
        <div className="w-full h-2 blur-md bg-black/50 absolute bottom-[70px] rounded-full z-30"></div>
        <Lottie animationData={Caveman} loop={true} className="absolute top-0 z-10 left-[10px] scale-75" />
      </div>
      <p className="uppercase text-[clamp(1.5rem,4vw,2.25rem)] text-center">Page Not Found</p>
      <p className="text-[clamp(1rem,2vw,1.5rem)] max-w-2xl text-center">
        Oops! The page you’re looking for doesn’t exist or may have been moved. Maybe the link is broken, the product is
        no longer available, or a cable got unplugged.
      </p>
    </div>
  )
}
