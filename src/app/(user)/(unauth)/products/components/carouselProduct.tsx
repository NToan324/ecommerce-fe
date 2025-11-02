import * as React from 'react'
import Image from 'next/image'
import { EmblaCarouselType } from 'embla-carousel'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Image as ImageType } from '@/types/common.type'

interface CarouselProductProps {
  data: ImageType[]
  setApi?: (api: EmblaCarouselType | undefined) => void
}

export function CarouselProduct({ data, setApi }: CarouselProductProps) {
  return (
    <Carousel setApi={setApi} className="w-full md:w-1/2">
      <CarouselContent>
        {data.map((image, index) => (
          <CarouselItem key={index} className="w-full">
            <div className="relative overflow-hidden w-full h-screen min-h-[50px] md:h-[650px] md:-left-[0] md:top-0">
              <Image
                src={image.url || '/images/laptop.png'}
                alt="Laptop"
                fill
                objectFit="contain"
                className="absolute scale-80 md:scale-100"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
