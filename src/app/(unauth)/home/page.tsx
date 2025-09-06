'use client'
import { useEffect, useState } from 'react'

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
  "Apple MacBook Air M2 (2023, 8-core CPU, 10-core GPU, 16GB RAM, 512GB SSD, 15.3'' Liquid Retina)"
]

export default function page() {
  const [placeholder, setPlaceholder] = useState('')

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
        }, 1000)
      }
    }, 60)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='relative h-[calc(100vh-80px)]'>
      <h2 className='absolute top-[60px] left-[108px] z-10 w-full max-w-[1000px] text-[135px] font-bold'>
        Your Hub{' '}
        <span className='bg-gradient-to-tr from-white via-gray-300 to-black bg-clip-text text-transparent'>For </span>
        Tech{' '}
        <span className='bg-gradient-to-r from-black via-white to-black bg-clip-text text-transparent'>Essentials</span>
      </h2>
      <div className='from-blue-primary via-blue-primary/40 absolute bottom-[50px] left-[83px] block h-[130px] w-[130px] rounded-full bg-gradient-to-tr to-white blur-xs'></div>
      <div className='from-blue-primary via-blue-primary/40 absolute top-[80px] right-[120px] z-20 block h-[360px] w-[360px] rounded-full bg-gradient-to-tr to-white blur-xs'></div>
      <div className='bg-blue-primary absolute bottom-[20px] left-[60px] z-0 block h-[430px] w-[430px] rounded-full blur-[300px]'></div>
      <input
        type='text'
        placeholder={placeholder}
        className='shadow-blue-primary focus-visible:ring-blue-primary absolute bottom-[8%] left-[50%] h-[80px] w-[780px] translate-x-[-50%] translate-y-[-50%] rounded-[50px] bg-white px-8 placeholder-[#C3C3C3] shadow-[0_1px_250px_rgba(0,0,0,1)] outline-none focus-visible:ring-1'
      />
    </div>
  )
}
