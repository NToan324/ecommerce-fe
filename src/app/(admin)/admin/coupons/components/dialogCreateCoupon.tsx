'ues client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { GoPlus } from 'react-icons/go'
import { NumericFormat } from 'react-number-format'
import z from 'zod'

import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FloatingInput, FloatingLabel } from '@/components/ui/floating-label-input'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useCoupon from '@/hooks/useCoupon'
import couponSchema from '@/schemas/coupon.schema'

interface DialogCreatCouponProps {
  open: boolean
  setOpen: (open: boolean) => void
}
export function DialogCreateCoupon({ open, setOpen }: DialogCreatCouponProps) {
  const form = useForm<z.infer<typeof couponSchema.createCoupon>>({
    resolver: zodResolver(couponSchema.createCoupon),
    defaultValues: {
      code: '',
      discount_amount: 0,
      usage_limit: 0,
    },
  })

  const { mutate: createCoupon, isPending: isPendingcreateCoupon } = useCoupon.createCoupon({
    onClose: () => {
      form.reset()
      setOpen(false)
    },
  })

  const handleSubmit = async (data: z.infer<typeof couponSchema.createCoupon>) => {
    createCoupon(data)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogTrigger asChild>
            <Button type="button" className="w-full h-12 bg-blue-tertiary hover:bg-blue-tertiary/90 rounded-2xl">
              <GoPlus size={20} strokeWidth={1} />
              Add Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[725px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Category</DialogTitle>
              <DialogDescription>Enter a new category for your inventory, then hit Save.</DialogDescription>
            </DialogHeader>
            <div className="flex justify-between items-center gap-8 w-full flex-col p-2">
              <div className="flex flex-col w-full justify-center items-center gap-4">
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
                            onChange={(e) => field.onChange(e.target.value.toUpperCase())}
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
              </div>
            </div>

            <DialogFooter className="flex flex-row justify-end items-center">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  type="button"
                  className="rounded-2xl max-w-[100px]"
                  onClick={() => form.reset()}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                disabled={isPendingcreateCoupon}
                type="submit"
                className="w-full float-end max-w-[100px] bg-violet-primary hover:bg-violet-primary/90 text-white rounded-2xl"
                onClick={form.handleSubmit(handleSubmit)}
              >
                Create
                {isPendingcreateCoupon && <Loading />}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  )
}
