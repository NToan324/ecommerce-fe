'use client'

import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { LuEye, LuEyeOff } from 'react-icons/lu'
import z from 'zod'

import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { FloatingInput, FloatingLabel } from '@/components/ui/floating-label-input'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import useAuth from '@/hooks/useAuth'
import profileSchema from '@/schemas/profile.schema'

export default function ChangePassword() {
  const form = useForm<z.infer<typeof profileSchema.changePassword>>({
    resolver: zodResolver(profileSchema.changePassword),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  })
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
  const { mutate: changePassword, isPending } = useAuth.changePassword()

  const handleSubmit = (data: z.infer<typeof profileSchema.changePassword>) => {
    const payload = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    }
    changePassword(payload)
    form.reset()
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-1 gap-6 w-full">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative w-full max-w-[420px]">
                    <FloatingInput
                      type={showOldPassword ? 'text' : 'password'}
                      id="oldPassword"
                      className="h-12 rounded-[20px]"
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {showOldPassword ? (
                      <LuEyeOff
                        className="absolute top-[14px] right-3 cursor-pointer"
                        size={20}
                        onClick={() => setShowOldPassword(false)}
                      />
                    ) : (
                      <LuEye
                        className="absolute top-[14px] right-3 cursor-pointer"
                        size={20}
                        onClick={() => setShowOldPassword(true)}
                      />
                    )}
                    <FloatingLabel htmlFor="oldPassword">Old password</FloatingLabel>
                  </div>
                </FormControl>
                {form.formState.errors.oldPassword && (
                  <p className="text-red-500 text-sm mt-2">{form.formState.errors.oldPassword.message}</p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
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
                {form.formState.errors.newPassword && (
                  <p className="text-red-500 text-sm mt-2">{form.formState.errors.newPassword.message}</p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmNewPassword"
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
                {form.formState.errors.confirmNewPassword && (
                  <p className="text-red-500 text-sm mt-2">{form.formState.errors.confirmNewPassword.message}</p>
                )}
              </FormItem>
            )}
          />
          <Button
            disabled={isPending}
            type="submit"
            className="w-full text-base font-medium max-w-[420px] text-white bg-violet-primary hover:bg-violet-primary/90 rounded-2xl h-12"
            onClick={() => {}}
          >
            Change password
            {isPending && <Loading />}
          </Button>
        </form>
      </Form>
    </div>
  )
}
