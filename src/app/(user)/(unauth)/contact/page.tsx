'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FiPlus } from 'react-icons/fi'
import { LuMinus } from 'react-icons/lu'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function page() {
  const [showFaqAnswers, setShowFaqAnswers] = useState<Array<string>>([])
  const faqs = [
    {
      id: '1',
      question: 'How can I get in touch with COMPX for collaborations?',
      answer:
        'We’re always open to new creative ventures. For partnership or collaboration inquiries, please fill out our form, and our team will review and reach out if there’s a match.',
    },
    {
      id: '2',
      question: 'Where can I find information on COMPX campaigns and releases?',
      answer:
        'You can find the latest updates, campaigns, and product releases on our official website and social media platforms. Subscribe to our newsletter to stay informed.',
    },
    {
      id: '3',
      question: 'How can I reach your customer support team?',
      answer:
        'Our customer support team is available via the “Contact Us” page or by emailing support@compx.com. We typically respond within 24–48 hours.',
    },
    {
      id: '4',
      question: 'How to purchase COMPX products?',
      answer:
        'COMPX products can be purchased directly through our website or authorized retailers. Visit our “Shop” page to explore our latest collections and deals.',
    },
  ]

  const handleShowFaqAnswers = (id: string) => {
    if (showFaqAnswers.includes(id)) {
      setShowFaqAnswers(showFaqAnswers.filter((faqId) => faqId !== id))
    } else {
      setShowFaqAnswers([...showFaqAnswers, id])
    }
  }
  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden py-7 md:pt-16 space-y-16">
      <div className="w-full text-start md:px-[120px] px-7">
        <h1 className="font-bold text-[clamp(2.75rem,11.2vw,10.75rem)] bg-gradient-to-r from-black via-50% via-white to-black bg-clip-text text-transparent">
          Contact Us
        </h1>
      </div>
      <Image
        src={'/images/network.png'}
        alt="wave"
        height={1000}
        width={500}
        objectFit="contain"
        className="absolute right-30 top-[150px] scale-125 hidden md:block"
      />
      <div className="flex justify-between md:flex-row gap-10 flex-col items-start md:px-[120px] md:gap-20 px-7">
        <div className="md:w-1/3">
          <p className="text-base md:line-clamp-6">
            For any inquiries, collaborations, or just to say hello, we’d love to hear from you! Reach out, and let’s
            connect.
          </p>
        </div>
        <div className="flex justify-between flex-col items-start gap-6 md:gap-20">
          <div className="flex flex-col justify-start items-start gap-3">
            <h4 className="uppercase text-[clamp(1rem,2vw,1.75rem)] font-semibold">SALES</h4>
            <p className="text-base md:line-clamp-6">
              TON DUC THANG UNIVERSITY 19 Nguyen Huu Tho, Tan Hung Ward, Ho Chi Minh City, Viet Nam.
            </p>
          </div>
          <div className="flex flex-col justify-start items-start gap-3">
            <h4 className="uppercase text-[clamp(1rem,2vw,1.75rem)] font-semibold">PARTNERSHIPS</h4>
            <p className="text-base md:line-clamp-6">TON DUC THANG UNIVERSITY example@gmail.com.</p>
          </div>
          <div className="flex flex-col justify-start items-start gap-3">
            <h4 className="uppercase text-[clamp(1rem,2vw,1.75rem)] font-semibold">HEAD OFFICE</h4>
            <p className="text-base md:line-clamp-6">
              TON DUC THANG UNIVERSITY 19 Nguyen Huu Tho, Tan Hung Ward, Ho Chi Minh City, Viet Nam.
            </p>
          </div>
        </div>
        <div className="w-1/3"></div>
      </div>
      <div className="flex justify-start items-start gap-10 flex-col relative w-full px-10 py-6 md:py-[60px] md:px-[120px]">
        <h3 className="leading-10 md:leading-16 from-blue-secondary  bg-gradient-to-r to-black bg-clip-text font-medium text-transparent uppercase text-[clamp(1.875rem,3vw,3.75rem)]">
          frequently asked <br /> questions
        </h3>
        <div className="w-full md:w-1/2">
          {faqs.map((faq, index) => (
            <div key={index} onClick={() => handleShowFaqAnswers(faq.id)} className="cursor-pointer">
              <div className="flex justify-between items-center gap-4 w-full p-3 border-y border-gray-300">
                <p className="text-[clamp(1rem,2vw,1.25rem)] font-[500]">{faq.question}</p>
                {showFaqAnswers.includes(faq.id) ? (
                  <LuMinus size={24} className="min-w-6" />
                ) : (
                  <FiPlus size={24} className="min-w-6" />
                )}
              </div>
              {showFaqAnswers.includes(faq.id) && (
                <p className="text-[clamp(0.875rem,2vw,1rem)] p-3 text-black/70">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between w-full items-start gap-10 relative mt-20 md:flex-row flex-col-reverse">
          <div className="border max-w-[600px] rounded-[20px] border-white relative overflow-hidden flex flex-col gap-6 justify-between items-center p-4 md:p-9 bg-transparent md:bg-gradient-to-b from-blue-gray to-blue-secondary/20 w-full">
            <h2 className="uppercase text-[clamp(1.25rem,2vw,1.5rem)] text-blue-tertiary w-full text-start">
              You can reach us anytime.
            </h2>
            <div className="grid grid-cols-2 gap-4 w-full">
              <Input placeholder="First name" className="h-15 rounded-[10px] bg-white border-none outline-0" />
              <Input placeholder="Last name" className="h-15 rounded-[10px] bg-white border-none outline-0" />
              <Input
                placeholder="Your email"
                className="h-15 rounded-[10px] col-span-2 bg-white border-none outline-0"
              />
              <Input
                placeholder="Phone number"
                className="h-15 rounded-[10px] col-span-2 bg-white border-none outline-0"
              />
              <Textarea
                placeholder="How can we help you?"
                className="rounded-[10px] h-[180px] col-span-2 bg-white border-none outline-0 py-4 resize-none"
              />
              <Button className="font-[550] text-blue-secondary h-12 col-span-2 hover:bg-white bg-white">Submit</Button>
              <p className="text-sm col-span-2 text-black/70">
                By contacting us, you agree to our <span className="underline font-[550]">Terms of service</span> and
                <span className="underline font-[550]"> Privacy Policy</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start gap-2">
            <h3 className="leading-10 md:leading-16 from-blue-secondary  bg-gradient-to-r to-black bg-clip-text font-medium text-transparent uppercase text-[clamp(1.875rem,3vw,3.75rem)]">
              get in touch
            </h3>
            <p>
              Fill out the form to learn how COMPX can solve <br /> your messaging problem.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
