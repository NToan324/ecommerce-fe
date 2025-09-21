'use client'

import { useState } from 'react'
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'

export default function Footer() {
  const [open, setOpen] = useState('')
  const footerLinks = [
    {
      name: 'About us',
      subs: [
        { name: 'COMPX', href: '#' },
        { name: 'Development team', href: '#' },
      ],
    },
    {
      name: 'Support',
      subs: [
        { name: 'Service', href: '#' },
        { name: 'Purchasing', href: '#' },
      ],
    },
    {
      name: 'Policy',
      subs: [
        { name: 'Term of use', href: '#' },
        { name: 'Warranty policy', href: '#' },
        { name: 'Inspection & Return Policy', href: '#' },
        { name: 'Shipping Policy', href: '#' },
        { name: 'Payment Policy', href: '#' },
        { name: 'Personal Data Protection Policy', href: '#' },
      ],
    },
  ]
  return (
    <footer>
      <div className="flex flex-col items-center justify-between gap-6 bg-black/5 lg:py-0 py-8">
        <div className="flex w-full flex-col items-center justify-between gap-10 px-[30px] py-0 lg:px-[120px] lg:py-10">
          <h1 className="w-full text-start text-2xl font-bold">COMPX</h1>
          <div className="flex w-full flex-col items-stretch justify-between gap-8 sm:flex-row">
            <div className="flex w-full max-w-[520px] flex-col items-start justify-start gap-2 sm:w-1/2 lg:justify-between">
              <h3 className="from-blue-secondary via-blue-secondary hidden bg-gradient-to-r to-black bg-clip-text font-medium text-transparent uppercase sm:block sm:text-[clamp(1.5rem,5vw,3.4rem)]">
                we would love to hear from you
              </h3>
              <div className="flex items-center justify-start gap-4">
                <p>Your needs come first at Compx</p>
                <span className="hidden h-px w-[200px] bg-black md:block"></span>
              </div>
              <p>where shopping feels personal, simple, and caring.</p>
            </div>
            <div className="flex w-full flex-col items-start justify-between gap-4 sm:w-1/2 sm:flex-row sm:flex-wrap sm:gap-18 lg:flex-nowrap">
              {footerLinks.map((link, index) => {
                return (
                  <div
                    className="flex w-full flex-col items-start justify-between gap-2"
                    key={index}
                    onClick={() => setOpen(open === link.name ? '' : link.name)}
                  >
                    <div className="border-blue-primary flex w-full items-center justify-between gap-2 border-b pb-2 sm:justify-start sm:border-none sm:pb-0">
                      <h4 className="text-sm font-bold">{link.name}</h4>
                      <IoIosArrowForward
                        className={`${open === link.name ? '-rotate-90' : 'rotate-90'} text-blue-primary duration-300 sm:hidden`}
                      />
                    </div>
                    <div className="flex w-full flex-col items-start justify-between gap-2">
                      {link.subs.map((sub, subIndex) => (
                        <Link
                          key={subIndex}
                          href={sub.href}
                          className={`text-sm font-medium ${open === link.name ? '' : 'hidden'} sm:block`}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="text-cente py-4 text-base text-black/35">&copy; 2025 Compx. All rights reserved</div>
      </div>
    </footer>
  )
}
