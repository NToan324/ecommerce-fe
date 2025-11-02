import Image from 'next/image'
import { CiKeyboard, CiSpeaker } from 'react-icons/ci'
import { LuSmartphone } from 'react-icons/lu'
import { PiLaptopLight, PiMouseSimpleLight } from 'react-icons/pi'
import { TfiHeadphoneAlt } from 'react-icons/tfi'

export default function page() {
  const products = [
    { icon: <PiLaptopLight size={64} />, name: 'Laptop', description: 'High performance laptop' },
    { icon: <LuSmartphone size={64} strokeWidth={1} />, name: 'Smartphone', description: 'Latest model smartphone' },
    { icon: <PiMouseSimpleLight size={64} />, name: 'Mouse', description: 'Portable tablet with stylus' },
    { icon: <CiSpeaker size={64} />, name: 'Speaker', description: 'Feature-rich smartwatch' },
    {
      icon: <TfiHeadphoneAlt size={64} strokeWidth="0.1" />,
      name: 'Headphones',
      description: 'Noise-cancelling headphones',
    },
    { icon: <CiKeyboard size={64} />, name: 'Keyboard', description: 'High-resolution camera' },
  ]
  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden py-7 md:py-16 space-y-16">
      <div className="w-full text-center md:px-[120px] px-7">
        <h1 className="font-bold text-[clamp(2.75rem,11.2vw,10.75rem)]">
          Tech{' '}
          <span className="bg-gradient-to-r from-black via-50% via-white to-black bg-clip-text text-transparent">
            Essentials
          </span>
        </h1>
        <div className="flex justify-between gap-8 mt-4 text-[clamp(0.875rem,2vw,1.125rem)] w-full">
          <p className="uppercase font-semibold">computers</p>
          <p className="uppercase font-semibold">More...</p>
        </div>
      </div>
      <Image
        src={'/images/wave.png'}
        alt="wave"
        height={1000}
        width={500}
        objectFit="contain"
        className="absolute -left-[50px] hidden md:block"
      />
      <div className="flex justify-between items-center md:px-[120px] px-7">
        <div className="md:w-1/3"></div>
        <div className="flex flex-col justify-start items-start gap-4 md:gap-[60px] w-full md:w-[70%]">
          <h3 className="max-w-[200px] md:max-w-[400px] leading-10 md:leading-16 from-blue-secondary via-blue-secondary bg-gradient-to-r to-black bg-clip-text font-medium text-transparent uppercase text-[clamp(1.875rem,3vw,3.75rem)]">
            Modern Innovation
          </h3>
          <div className="flex justify-between md:flex-row flex-col items-center gap-6 md:gap-20">
            <p className="text-base md:line-clamp-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis consectetur exercitationem quas accusamus
              laboriosam quia enim. Dolorem aliquam voluptas a perspiciatis explicabo, vel consectetur voluptatibus
              officiis, error, atque numquam sint.
            </p>
            <p className="text-base md:line-clamp-6">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse dolore aut labore illum beatae quasi minima
              amet eius, aliquid accusamus. Expedita porro praesentium delectus culpa ducimus iusto ullam neque
              necessitatibus?
            </p>
          </div>
          <div className="w-full flex justify-between items-center">
            <p className="font-black text-black/30">Since</p>
            <p className="font-bold xl:text-[300px] text-[clamp(7.5rem,5vw,12.5rem)] text-black/30">2025</p>
          </div>
        </div>
      </div>
      <div className="relative bg-black w-full px-10 py-6 md:py-[60px] md:px-[120px]">
        <Image
          src="/images/double-quotes.png"
          width={100}
          height={100}
          alt="double-quote"
          className="absolute md:top-0 -left-3 md:left-20 -top-5 md:scale-100 scale-50"
        />
        <p className="text-white text-[clamp(1.25rem,4vw,4.6rem)] uppercase font-bold text-center">
          bringing the <span className="text-blue-secondary">latest tech</span> to your fingertips, making innovation
          accessible.
        </p>
        <Image
          src="/images/double-quotes.png"
          width={100}
          height={100}
          alt="double-quote"
          className="absolute -right-3 md:right-20 -bottom-5 md:bottom-0 rotate-180 md:scale-100 scale-50"
        />
      </div>
      <div className="flex justify-between md:items-center items-start gap-4 relative w-full px-7 md:p-[120px] md:flex-row flex-col-reverse">
        <div className="flex justify-between items-center gap-4 md:gap-16 uppercase text-[clamp(0.875rem,2vw,1.25rem)]">
          <div className="flex flex-col justify-start items-start gap-3">
            <p>Nhat Toan</p>
            <p>Web Interface Developer</p>
          </div>
          <div className="flex flex-col justify-start items-start gap-3">
            <p>Gia Huy</p>
            <p>Server-side Engineer</p>
          </div>
          <div className="flex flex-col justify-start items-start gap-3">
            <p>thanh binh</p>
            <p>Product Designer</p>
          </div>
        </div>
        <h3 className="max-w-[200px] md:max-w-[400px] leading-10 md:leading-16 from-blue-secondary via-blue-secondary bg-gradient-to-r to-black bg-clip-text font-medium text-transparent uppercase text-[clamp(1.875rem,3vw,3.75rem)]">
          The Team.
        </h3>
      </div>
      <div className="flex justify-between items-center gap-8 relative w-full px-7 md:px-[120px] flex-col">
        <div className="flex w-full flex-col justify-start items-start gap-3">
          <h3 className="max-w-[200px] md:max-w-[400px] leading-10 md:leading-16 from-blue-secondary via-blue-secondary bg-gradient-to-r to-black bg-clip-text font-medium text-transparent uppercase text-[clamp(1.875rem,3vw,3.75rem)]">
            Products
          </h3>
          <p className="text-base max-w-[550px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ex velit, ullamcorper ac maximus tristique,
            sollicitudin vitae eros.
          </p>
        </div>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product, index) => (
            <div
              className="flex flex-col justify-between items-center gap-4 py-8 px-20 col-span-1 hover:bg-blue-primary duration-300 cursor-pointer rounded-2xl"
              key={index}
            >
              {product.icon}
              <h4 className="font-semibold text-lg mt-2 text-center">{product.name}</h4>
              <p className="text-sm text-center">{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
