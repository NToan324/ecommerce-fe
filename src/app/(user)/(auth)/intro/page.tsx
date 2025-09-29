'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

export default function page() {
  // const information = [
  //   {
  //     title: 'Latest Technology',
  //     description:
  //       'Discover the latest laptops, PCs, and components tailored for work, gaming, and everyday use at COMPX.',
  //   },
  //   {
  //     title: 'Trusted Quality',
  //     description: 'We provide only genuine products from top brands, ensuring durability and reliable performance.',
  //   },
  //   {
  //     title: 'Affordable Prices',
  //     description: 'Get the best deals on laptops, desktops, and accessories without compromising quality.',
  //   },
  //   {
  //     title: 'Customer Support',
  //     description: 'Our expert team is always ready to assist you with guidance, setup, and after-sales service.',
  //   },
  //   {
  //     title: 'One-Stop Shop',
  //     description: 'From study to gaming to professional work, COMPX has solutions for every need.',
  //   },
  // ]
  const router = useRouter()

  return (
    <main>
      <div className="relative h-screen gap-10 bg-white p-7 lg:px-[120px] lg:pb-20 lg:pt-10">
        <h1 className="text-[clamp(1.25rem,5vw,3rem)] text-violet-primary z-20 leading-10 md:leading-16 max-w-[800px] absolute top-14">
          Where <span className="text-blue-secondary">intelligent</span> design meets ultimate performance
        </h1>
        <div className="absolute w-[600px] h-[600px] blur-3xl bg-blue-primary rounded-full left-6 z-0"></div>
        <div className="absolute w-[250px] h-[250px] blur-md bg-gradient-to-r from-blue-primary/90 to-white via-10% rounded-full md:left-[30%] left-[70%] top-[30%] md:top-[50%] transform-[translate(-50%,-50%)] z-0"></div>
        {/* Information */}
        <div className="border gap-4 -rotate-6 absolute md:bottom-[420px] bottom-[65%] md:scale-100 scale-75 left-[160px] md:left-[400px] rounded-4xl rounded-br-none border-white/50 max-w-[250px] flex flex-col justify-center items-start p-6">
          <p className="font-bold text-xs text-blue-secondary">Thanh Binh</p>
          <p className="font-medium text-[8px] bg-transparent">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis eligendi inventore, in ducimus, nobis
          </p>
        </div>
        <div className="border gap-4 rotate-6 absolute md:bottom-[290px] bottom-[50%] md:scale-100 scale-75 rounded-4xl rounded-br-none border-white/50 max-w-[450px] flex flex-col justify-center items-start p-6">
          <p className="font-bold text-xs text-blue-secondary">Thanh Binh</p>
          <p className="font-medium text-[8px] bg-transparent">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis eligendi inventore, in ducimus, nobis
            adipisci soluta esse laudantium vel unde quae modi, totam qui quia animi veritatis ipsum ratione est.
          </p>
        </div>
        <div className="border gap-4 -rotate-6 absolute bottom-[280px] md:bottom-[170px] scale-50 md:scale-75 left-[10px] md:left-[50px] rounded-4xl rounded-br-none border-white/50 max-w-[250px] flex flex-col justify-center items-start p-6">
          <p className="font-bold text-xs text-blue-secondary">Thanh Binh</p>
          <p className="font-medium text-[8px] bg-transparent">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis eligendi inventore, in ducimus, nobis
          </p>
        </div>
        <div className="border gap-4 rotate-[10deg] bg-gradient-to-r from-blue-primary/20 to-white/30 via-10% absolute md:bottom-[30px] bottom-[200px] scale-50 md:scale-90 -left-[40px] md:left-[50px] rounded-4xl rounded-br-none border-white/50 max-w-[250px] flex flex-col justify-center items-start p-6">
          <p className="font-bold text-xs text-blue-secondary">Thanh Binh</p>
          <p className="font-medium text-[8px] bg-transparent">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis eligendi inventore, in ducimus, nobis
          </p>
        </div>
        <div className="border gap-4 -rotate-[5deg] md:scale-100 scale-75 absolute md:bottom-[100px] bottom-[200px] left-[140px] md:left-[300px] rounded-4xl rounded-br-none border-white/50 max-w-[250px] flex flex-col justify-center items-start p-6">
          <p className="font-bold text-xs text-blue-secondary">Thanh Binh</p>
          <p className="font-medium text-[8px] bg-transparent">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis eligendi inventore, in ducimus, nobis
          </p>
        </div>
        {/* Join now */}
        <div className="w-full flex-col max-w-[550px] absolute md:right-24 right-0 bottom-[75%] md:bottom-44 flex justify-start items-start gap-8">
          <p className="font-medium text-[clamp(0.875rem,1.5vw,1.125rem)] w-full md:block hidden">
            Trusted by over <span className="text-blue-secondary font-bold">10,000+</span> happy customers, with
            countless 5-star reviews and outstanding feedback. We take pride in delivering high-performance products and
            exceptional service that exceed expectations. Your satisfaction is our greatest achievement
          </p>
          <Button
            type="submit"
            variant={'outline'}
            className="w-full text-base text-blue-secondary font-semibold rounded-2xl max-w-[180px] md:max-w-[220px] h-12 md:scale-100 scale-75"
            onClick={() => router.push('/signup')}
          >
            Join Now
          </Button>
        </div>
      </div>
    </main>
  )
}
