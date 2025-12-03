'use client'

import React, { useState } from 'react'

import 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { LuEye, LuEyeOff } from 'react-icons/lu'
import z from 'zod'

import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { FloatingInput, FloatingLabel } from '@/components/ui/floating-label-input'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { useAuth } from '@/hooks/useAuth'
import { authSchema } from '@/schemas/auth.schema'

interface ResetPasswordProps {
  userId: string
}

export default function ResetPassword({ userId }: ResetPasswordProps) {
  const form = useForm<z.infer<typeof authSchema.resetPassword>>({
    resolver: zodResolver(authSchema.resetPassword),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)

  const { mutate, isPending } = useAuth().resetPassword

  const handleSubmit = (data: z.infer<typeof authSchema.resetPassword>) => {
    mutate({ id: userId, password: data.password })
  }

  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] gap-10 w-full px-7 pb-4 lg:px-[120px] lg:pb-20 pt-12">
        <h1 className="text-3xl font-bold">Compx</h1>
        <div className="flex flex-col gap-3 justify-between items-center">
          <p className="text-2xl font-bold text-center">Reset your password</p>
          <p className="text-sm text-black/60 text-center">
            Enter your new password below to complete the reset process
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-7 w-full max-w-[320px] md:max-w-[450px] px-[10px]"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative w-full max-w-[420px]">
                      <FloatingInput
                        type={showNewPassword ? 'text' : 'password'}
                        id="newPassword"
                        className="h-12 rounded-[20px]"
                        value={field.value}
                        onChange={field.onChange}
                      />
                      {showNewPassword ? (
                        <LuEyeOff
                          className="absolute top-[14px] right-3 cursor-pointer"
                          size={20}
                          onClick={() => setShowNewPassword(false)}
                        />
                      ) : (
                        <LuEye
                          className="absolute top-[14px] right-3 cursor-pointer"
                          size={20}
                          onClick={() => setShowNewPassword(true)}
                        />
                      )}
                      <FloatingLabel htmlFor="newPassword">New password</FloatingLabel>
                    </div>
                  </FormControl>
                  {form.formState.errors.password && (
                    <p className="text-red-500 text-sm mt-2">{form.formState.errors.password.message}</p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative w-full max-w-[420px]">
                      <FloatingInput
                        type={showConfirmNewPassword ? 'text' : 'password'}
                        id="confirmNewPassword"
                        className="h-12 rounded-[20px]"
                        value={field.value}
                        onChange={field.onChange}
                      />
                      {showConfirmNewPassword ? (
                        <LuEyeOff
                          className="absolute top-[14px] right-3 cursor-pointer"
                          size={20}
                          onClick={() => setShowConfirmNewPassword(false)}
                        />
                      ) : (
                        <LuEye
                          className="absolute top-[14px] right-3 cursor-pointer"
                          size={20}
                          onClick={() => setShowConfirmNewPassword(true)}
                        />
                      )}
                      <FloatingLabel htmlFor="confirmNewPassword">Confirm new password</FloatingLabel>
                    </div>
                  </FormControl>
                  {form.formState.errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-2">{form.formState.errors.confirmPassword.message}</p>
                  )}
                </FormItem>
              )}
            />
            <Button
              disabled={isPending}
              type="submit"
              className="w-full text-base font-medium text-white bg-violet-primary hover:bg-violet-primary/90 rounded-2xl h-12"
            >
              Change Password
              {isPending && <Loading />}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  )
}
