'use client'

import React from 'react'

import 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { FloatingInput, FloatingLabel } from '@/components/ui/floating-label-input'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { useAuth } from '@/hooks/useAuth'
import { authSchema } from '@/schemas/auth.schema'

export default function page() {
  const form = useForm<z.infer<typeof authSchema.forgotPassword>>({
    resolver: zodResolver(authSchema.forgotPassword),
    defaultValues: {
      email: '',
    },
  })

  const { mutate, isPending } = useAuth().forgotPassword

  const handleSubmit = (data: z.infer<typeof authSchema.forgotPassword>) => {
    mutate(data.email)
  }
  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] gap-10 w-full px-7 pb-4 lg:px-[120px] lg:pb-20 pt-12">
        <h1 className="text-3xl font-bold">Compx</h1>
        <div className="flex flex-col gap-3 justify-between items-center">
          <p className="text-2xl font-bold text-center">Reset your password</p>
          <p className="text-sm text-black/60 text-center">
            Enter your email address below and we’ll send you <br /> a verification code to reset your password.
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
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
                        id="email"
                        className="h-12 rounded-[20px]"
                        value={field.value}
                        onChange={field.onChange}
                      />
                      <FloatingLabel htmlFor="email">Email</FloatingLabel>
                    </div>
                  </FormControl>
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-2">{form.formState.errors.email.message}</p>
                  )}
                </FormItem>
              )}
            />
            <Button
              disabled={isPending}
              type="submit"
              className="w-full text-base font-medium text-white bg-violet-primary hover:bg-violet-primary/90 rounded-2xl h-12"
            >
              Send Code
              {isPending && <Loading />}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  )
}
