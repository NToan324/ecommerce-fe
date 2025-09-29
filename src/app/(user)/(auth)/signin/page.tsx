'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { LuEye, LuEyeOff } from 'react-icons/lu'
import z from 'zod'

import { Button } from '@/components/ui/button'
import { FloatingInput, FloatingLabel } from '@/components/ui/floating-label-input'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { authSchema } from '@/schemas/auth.schema'

export default function page() {
  const form = useForm<z.infer<typeof authSchema.login>>({
    resolver: zodResolver(authSchema.login),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = (data: z.infer<typeof authSchema.login>) => {
    console.log(data)
  }

  return (
    <main>
      <div className="flex flex-col items-center justify-start h-screen gap-10 w-full px-7 pb-4 lg:px-[120px] lg:pb-20 pt-12">
        <h1 className="text-3xl font-bold">Compx</h1>
        <div className="flex flex-col gap-3 justify-between items-center">
          <p className="text-2xl font-bold text-center">Log in to your account</p>
          <p className="text-sm text-black/60-">
            Don’t have an account?
            <Link href="/intro" className="ml-2 text-blue-tertiary">
              Join now
            </Link>
          </p>
        </div>
        {/* Form login */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLogin)}
            className="space-y-7 w-full max-w-[320px] md:max-w-[450px] px-[10px]"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative w-full">
                      <FloatingInput
                        id="floating-customize"
                        className="h-12 rounded-[20px]"
                        value={field.value}
                        onChange={field.onChange}
                      />
                      <FloatingLabel htmlFor="floating-customize">Email</FloatingLabel>
                    </div>
                  </FormControl>
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-2">{form.formState.errors.email.message}</p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative w-full">
                      <FloatingInput
                        type={showPassword ? 'text' : 'password'}
                        id="floating-customize"
                        className="h-12 rounded-[20px]"
                        value={field.value}
                        onChange={field.onChange}
                      />
                      {showPassword ? (
                        <LuEyeOff
                          className="absolute top-[14px] right-3 cursor-pointer"
                          size={20}
                          onClick={() => setShowPassword(false)}
                        />
                      ) : (
                        <LuEye
                          className="absolute top-[14px] right-3 cursor-pointer"
                          size={20}
                          onClick={() => setShowPassword(true)}
                        />
                      )}
                      <FloatingLabel htmlFor="floating-customize">Password</FloatingLabel>
                    </div>
                  </FormControl>
                  {form.formState.errors.password && (
                    <p className="text-red-500 text-sm mt-2">{form.formState.errors.password.message}</p>
                  )}
                </FormItem>
              )}
            />
            <a href="#" className="text-sm text-black/60 float-right">
              Forgot your password?
            </a>
            <Button
              type="submit"
              className="w-full text-base font-medium text-white bg-violet-primary hover:bg-violet-primary/90 rounded-2xl h-12"
              onClick={() => form.handleSubmit(handleLogin)}
            >
              Sign In
            </Button>
            <div className="flex justify-center items-center gap-4">
              <span className="inline-block w-full max-w-[80px] h-px bg-blue-primary/90"></span>
              <span className="text-black/50 text-sm text-center whitespace-nowrap">or continue with</span>
              <span className="inline-block w-full max-w-[80px] h-px bg-blue-primary/90"></span>
            </div>
            <div className="flex justify-center items-center gap-5">
              <Button variant="outline" className="rounded-2xl h-14">
                <Image src="/images/google.svg" alt="Google" width={30} height={30} />
                Google
              </Button>
              <Button variant="outline" className="rounded-2xl h-14">
                <Image src="/images/facebook.svg" alt="Facebook" width={30} height={30} />
                Facebook
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  )
}
