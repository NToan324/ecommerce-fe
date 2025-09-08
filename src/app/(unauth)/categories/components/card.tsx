import Image from 'next/image'

import { formatPrice } from '@/utils/helpers'

export default function CardProduct() {
  return (
    <div className="bg-white hover:z-10 hover:shadow-2xl relative hover:bg-gradient-to-br overflow-hidden from-blue-primary to-white transition-all group hover:scale-125 duration-300 origin-top-left h-[360px] p-4 pb-0 w-full gap-4 rounded-2xl flex flex-col justify-between items-start md:max-w-[300px] border border-black/10">
      <div className="w-[20px] h-[140%] bg-blue-secondary absolute rotate-45 -top-[40px] left-[135px] blur-2xl -translate-y-[500px] group-hover:translate-y-[100px] duration-500"></div>
      <div className="relative flex flex-col justify-start items-start gap-2 ">
        <p className="text-[#D9D9D9] text-xs font-medium group-hover:text-white duration-200">Laptop</p>
        <div className="space-y-1 mt-2">
          <p className="text-base font-medium line-clamp-1">IdeaPad Slim 3 Notebook</p>
          <p className="text-base font-bold line-clamp-1">{formatPrice(15690000)}</p>
        </div>
        <p className=" text-xs line-clamp-3 leading-5 group-hover:opacity-100 opacity-0 duration-200 ">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga enim error quia ad autem. Qui nemo sit rem esse
          consequuntur aperiam cum, ad corrupti distinctio excepturi vel reprehenderit mollitia enim.
        </p>
      </div>
      <div className="w-full h-full absolute top-[140px] left-0 group-hover:top-[170px] duration-300">
        <div className="relative overflow-hidden w-full h-[190px] ">
          <Image src="/images/laptop.png" alt="Laptop" fill objectFit="contain" className=" scale-125" />
        </div>
      </div>
    </div>
  )
}
