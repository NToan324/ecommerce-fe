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
    <Carousel setApi={setApi} className="w-full">
      <CarouselContent>
        {data.map((image, index) => (
          <CarouselItem key={index} className="w-full">
            <div className="relative overflow-hidden w-full h-screen min-h-[50px] md:h-[650px] md:-left-[300px] md:top-0">
              <Image
                src={image.url || '/images/laptop.png'}
                alt="Laptop"
                fill
                objectFit="contain"
                className="absolute scale-90 md:scale-125 "
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
