'use client'

import React, { useEffect, useRef, useState } from 'react'

import 'next/navigation'

import Loading from '@/components/loading'
import { toastError } from '@/components/toastify'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/useAuth'
import { formatTimeSecondToMinute } from '@/utils/helpers'

interface VerifyCodeProps {
  userId: string
}

export default function VerifyCode({ userId }: VerifyCodeProps) {
  const { mutate, isPending } = useAuth().verifyOtp
  const refs = useRef<Array<HTMLInputElement | null>>([])
  const [timeLeft, setTimeLeft] = useState(120)

  const handleOnchangeInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value
    if (value && index < refs.current.length - 1) {
      refs.current[index + 1]?.focus()
    }
  }

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isNumeric = /[0-9]/.test(e.key)
    const isFunctionKey = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)

    if (!isNumeric && !isFunctionKey) {
      e.preventDefault()
    }
    if (e.key === 'Backspace' && !e.currentTarget.value) {
      const index = refs.current.findIndex((input) => input === e.currentTarget)
      if (index > 0) {
        refs.current[index - 1]?.focus()
      }
    }
  }

  const handleSubmit = () => {
    const otpCode = refs.current.map((input) => input?.value).join('')
    if (otpCode.length < 4) {
      toastError('Please enter the complete 4-digit code.')
      return
    }
    mutate({ user_id: userId, otp_code: otpCode })
  }

  useEffect(() => {
    if (timeLeft === 0) return
    const timer = setInterval(() => {
      console.log(timeLeft)
      setTimeLeft((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] gap-10 w-full px-7 pb-4 lg:px-[120px] lg:pb-20 pt-12">
        <h1 className="text-3xl font-bold">Compx</h1>
        <div className="flex flex-col gap-3 justify-between items-center">
          <p className="text-2xl font-bold text-center">Verify OTP</p>
          <p className="text-sm text-black/60 text-center">
            Enter the verification code we’ve sent to your email address <br />
            to verify your identity and reset your password.
          </p>
        </div>
        <div className="space-y-7 w-full max-w-[320px] md:max-w-[450px] px-[10px]">
          <div className="flex justify-center items-center gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <Input
                tabIndex={index}
                ref={(el) => {
                  refs.current[index] = el
                }}
                onChange={(e) => handleOnchangeInput(e, index)}
                key={index}
                className="w-16 h-16 text-center text-2xl"
                maxLength={1}
                onKeyDown={(e) => {
                  handleKeydown(e)
                }}
              />
            ))}
          </div>
          <Button
            disabled={isPending}
            type="submit"
            onClick={() => handleSubmit()}
            className="w-full text-base font-medium text-white bg-violet-primary hover:bg-violet-primary/90 rounded-2xl h-12"
          >
            Send Code
            {isPending && <Loading />}
          </Button>
          {timeLeft > 0 ? (
            <p className="text-sm text-black/60 text-center">
              You can resend OTP in {formatTimeSecondToMinute(timeLeft)} seconds
            </p>
          ) : (
            <p className="text-sm text-black/60 text-center">
              Didn’t receive the code? <span className="text-violet-primary cursor-pointer">Resend</span>
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
