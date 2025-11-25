import { useEffect } from 'react'
import { toastError } from '@components/toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { z } from 'zod'

import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { FloatingInput, FloatingLabel } from '@/components/ui/floating-label-input'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import useCoupon from '@/hooks/useCoupon'
import couponSchema from '@/schemas/coupon.schema'
import { Coupon } from '@/types/coupon.type'

interface UpdateCouponProps {
  coupon: Coupon
}

export default function UpdateCoupon({ coupon }: UpdateCouponProps) {
  const form = useForm<z.infer<typeof couponSchema.updateCoupon>>({
    resolver: zodResolver(couponSchema.updateCoupon),
    defaultValues: {
      code: '',
      discount_amount: 0,
      usage_limit: 0,
      isActive: true,
    },
  })

  useEffect(() => {
    form.reset({
      code: coupon.code,
      discount_amount: coupon.discount_amount,
      usage_limit: coupon.usage_limit || 0,
      isActive: coupon.isActive,
    })
  }, [coupon, form])

  const { mutate: updateCoupon, isPending: isPendingUpdateCoupon } = useCoupon.updateCoupon(coupon.code)

  const handleSubmit = async (data: z.infer<typeof couponSchema.updateCoupon>) => {
    updateCoupon(data)
  }

  const handleError = () => {
    toastError('Please fix the errors in the form')
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit, handleError)}
          className="w-full flex flex-col gap-6 p-4 rounded-2xl border"
        >
          <div className="flex justify-between items-center gap-8 w-full flex-col p-2">
            <div className="w-full flex justify-end items-center">
              <Button
                disabled={isPendingUpdateCoupon}
                type="submit"
                className=" h-12  bg-blue-tertiary hover:bg-blue-tertiary/90 rounded-2xl"
              >
                Update coupon
                {isPendingUpdateCoupon && <Loading />}
              </Button>
            </div>
            <div className="grid grid-cols-2 w-full gap-8">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <div className="relative w-full">
                      <FormControl>
                        <FloatingInput
                          {...field}
                          id="code"
                          className="h-12 rounded-[20px] w-full"
                          value={field.value}
                        />
                      </FormControl>
                      <FloatingLabel htmlFor="code">Code</FloatingLabel>
                    </div>
                    {form.formState.errors.code && (
                      <p className="text-red-500 text-sm mt-2">{form.formState.errors.code.message}</p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discount_amount"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="relative w-full">
                        <NumericFormat
                          value={field.value}
                          thousandSeparator=","
                          suffix=" VND"
                          customInput={Input}
                          onValueChange={(values) => {
                            field.onChange(values.floatValue)
                          }}
                          isAllowed={(values) => {
                            const { floatValue } = values
                            return floatValue === undefined || floatValue >= 0
                          }}
                          className="h-12 rounded-[20px]"
                          placeholder="Enter the original price"
                          id="original_price"
                        />
                        <FloatingLabel htmlFor="original_price">Discount amount</FloatingLabel>
                      </div>
                    </FormControl>
                    {form.formState.errors.discount_amount && (
                      <p className="text-red-500 text-sm mt-2">{form.formState.errors.discount_amount.message}</p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="usage_limit"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          {...field}
                          type="number"
                          min={1}
                          max={10}
                          className="h-12 rounded-[20px]"
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                        <FloatingLabel htmlFor="original_price">Usage limit</FloatingLabel>
                      </div>
                    </FormControl>
                    {form.formState.errors.usage_limit && (
                      <p className="text-red-500 text-sm mt-2">{form.formState.errors.usage_limit.message}</p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="w-full flex justify-start items-center gap-2">
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Active</FormLabel>
                    {form.formState.errors.isActive && (
                      <p className="text-red-500 text-sm mt-2">{form.formState.errors.isActive.message}</p>
                    )}
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
