import Image from 'next/image'

import { ProductVariant } from '@/types/product.type'
import { formatPrice } from '@/utils/helpers'

interface CardProductProps {
  data: ProductVariant
}

export default function CardProduct({ data }: CardProductProps) {
  return (
    <div className="min-w-[150px] max-h-[230px] md:max-h-full bg-white hover:z-10 hover:shadow-2xl relative hover:bg-gradient-to-br overflow-hidden from-blue-primary to-white transition-all group hover:scale-125 duration-300 origin-top-left h-[360px] p-4 pb-0 w-full gap-4 rounded-2xl flex flex-col justify-between items-start md:max-w-[300px] border border-black/10">
      <div className="w-[20px] h-[140%] bg-blue-secondary absolute rotate-45 -top-[40px] left-[135px] blur-2xl -translate-y-[500px] group-hover:translate-y-[100px] duration-500"></div>
      <div className="relative flex flex-col justify-start items-start gap-2 ">
        <p className="text-[#D9D9D9] text-xs font-medium group-hover:text-white duration-200">{data.category_name}</p>
        <div className="space-y-1 mt-2">
          <p className="font-medium line-clamp-1 text-[clamp(0.2rem,2vw,1rem)]">{data.variant_name}</p>
          <p className="text-[clamp(0.2rem,2vw,1rem)] font-bold line-clamp-1">{formatPrice(data.price)}</p>
        </div>
        <p className=" text-[clamp(0.31rem,1vw,0.75rem)] line-clamp-3 opacity-100 leading-3 md:leading-5 md:group-hover:opacity-100 md:opacity-0 duration-200 ">
          {data.variant_description}
        </p>
      </div>
      <div className="w-full h-full absolute md:top-[140px] left-0 group-hover:top-[70px] md:group-hover:top-[170px] duration-300 top-[60px]">
        <div className="relative top-[15px] overflow-hidden w-full h-[190px] md:top-0">
          <Image src={data.images[0].url} alt="Laptop" fill objectFit="contain" className="md:scale-100 scale-75" />
        </div>
      </div>
    </div>
  )
}
