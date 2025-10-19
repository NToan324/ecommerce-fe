'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { IoIosArrowDown } from 'react-icons/io'
import { IoLocationOutline } from 'react-icons/io5'
import { z } from 'zod'

import { DialogChangeAddress } from '@/app/(user)/(unauth)/(order)/components/dialogChangeAddress'
import Loading from '@/components/loading'
import { toastError, toastSuccess } from '@/components/toastify'
import { Button } from '@/components/ui/button'
import { FloatingInput, FloatingLabel } from '@/components/ui/floating-label-input'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { PAYMENT_METHOD } from '@/constant'
import useOrder from '@/hooks/useOrder'
import orderSchema from '@/schemas/order.schema'
import { useAuthStore } from '@/stores/auth.store'
import { useCartStore } from '@/stores/cart.store'
import { CartDetail } from '@/types/cart.type'
import { Coupon } from '@/types/coupon.type'
import { formatPrice } from '@/utils/helpers'

interface CheckoutPageProps {
  cart: CartDetail[]
  coupon: Partial<Coupon> | null
}

export default function CheckoutPage({ cart, coupon }: CheckoutPageProps) {
  const form = useForm<z.infer<typeof orderSchema.createOrder>>({
    resolver: zodResolver(orderSchema.createOrder),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      items: [],
      payment_method: PAYMENT_METHOD.CASH,
    },
  })
  const [openSummary, setOpenSummary] = useState(false)
  const [openChangeAddress, setOpenChangeAddress] = useState(false)
  const user = useAuthStore((state) => state.user)
  const setAddressStore = useCartStore((state) => state.setAddress)
  const addressStore = useCartStore((state) => state.address)
  const { mutate: createOrder, isPending: isPendingCreateOrder } = useOrder.createOrder()

  const paymentMethod = form.watch('payment_method')
  const subtotal = cart.reduce((sum, item) => sum + item.original_price * item.quantity, 0)
  const discount = cart.reduce((sum, item) => sum + (item.original_price - item.price) * item.quantity, 0)
  const shippingFee = 49000
  const couponDiscount = coupon?.discount_amount || 0
  const total = subtotal - discount - shippingFee - couponDiscount

  // const route = useRouter()

  const handleChangeAddress = (address: string) => {
    toastSuccess('Address updated successfully')
    setAddressStore(address)
    form.setValue('address', address)
  }

  useEffect(() => {
    if (addressStore) {
      form.setValue('address', addressStore)
    }
  }, [addressStore])

  useEffect(() => {
    if (user) {
      form.setValue('name', user.fullName)
      form.setValue('email', user.email)

      if (addressStore === null && user.address.length > 0) {
        form.setValue('address', user.address[0])
      }
    }
    if (cart.length > 0) {
      const items = cart.map((item) => ({
        product_variant_id: item._id,
        product_variant_name: item.variant_name,
        quantity: item.quantity,
        unit_price: item.price,
        discount: item.discount || 0,
        images: {
          url: item.images[0]?.url || '',
        },
      }))

      form.setValue('items', items)
      if (coupon) {
        form.setValue('coupon_code', coupon.code)
      }
    }
  }, [user, cart, coupon])

  const handleSubmit = (data: z.infer<typeof orderSchema.createOrder>) => {
    console.log('Submitting order with data:', data)
    if (data.items.length === 0) {
      toastError('Your cart is empty. Please add items to your cart before placing an order.')
      return
    }
    createOrder(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="relative flex flex-col items-start justify-start gap-10 overflow-hidden bg-white p-7 lg:px-[120px] lg:pb-20 lg:pt-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-violet-primary to-blue-light">
            Check out
          </h1>
          <div className="flex justify-between items-start gap-16 w-full flex-col md:flex-row">
            {/* Personal Information */}
            <div className="flex flex-col justify-start items-center gap-12 w-full">
              <div className="flex justify-between items-start gap-6 w-full md:flex-row flex-col">
                <div className="relative w-full md:w-1/2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-start items-start w-full">
                        <FormControl>
                          <div className="relative w-full">
                            <FloatingInput {...field} value={field.value} id="name" className="h-12 rounded-[20px]" />
                            <FloatingLabel htmlFor="name">Name</FloatingLabel>
                          </div>
                        </FormControl>
                        {form.formState.errors.name && (
                          <p className="text-red-500 text-sm mt-2">{form.formState.errors.name.message}</p>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
                <div className="relative w-full md:w-1/2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-start items-start w-full">
                        <FormControl>
                          <div className="relative w-full">
                            <FloatingInput
                              {...field}
                              value={field.value}
                              type="email"
                              id="email"
                              className="h-12 rounded-[20px]"
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
                </div>
              </div>
              <div className="flex flex-col justify-start w-full items-center gap-4">
                <div className="w-full flex justify-between items-center gap-2 md:gap-4">
                  <div className="flex justify-start items-center gap-2 md:gap-4 w-full">
                    <IoLocationOutline size={24} className="text-black/40 min-w-6" />
                    <p className="text-[clamp(0.9rem,2vw,1.125rem)] font-medium line-clamp-1">
                      {form.getValues('address') || 'No address selected'}
                    </p>
                  </div>
                  <DialogChangeAddress
                    open={openChangeAddress}
                    setOpen={setOpenChangeAddress}
                    handleChangeAddress={handleChangeAddress}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center w-full gap-6 md:overflow-hidden overflow-auto md:flex-wrap md:pb-0 pb-2">
                <Button
                  title="Cash on Delivery"
                  type="button"
                  onClick={() => {
                    form.setValue('payment_method', PAYMENT_METHOD.CASH)
                  }}
                  className={`${form.getValues('payment_method') === PAYMENT_METHOD.CASH ? 'border-2  bg-blue-primary/50 hover:bg-blue-primary/50' : 'border bg-transparent hover:bg-blue-primary/10'} hover:gap-6 transition-all duration-300 border-blue-primary/90 text-black rounded-2xl p-3 flex justify-center items-center gap-4 min-w-[180px] h-[80px]`}
                >
                  <span className="font-bold text-lg">COD</span>
                  <div className="relative w-[60px] h-[60px] overflow-hidden">
                    <Image src={'/images/cod.png'} alt="COD" fill className="object-contain" />
                  </div>
                </Button>
                <Button
                  title="Cash on Delivery"
                  type="button"
                  onClick={() => {
                    form.setValue('payment_method', PAYMENT_METHOD.BANK_TRANSFER)
                  }}
                  className={`${paymentMethod === PAYMENT_METHOD.BANK_TRANSFER ? 'border-2  bg-blue-primary/50 hover:bg-blue-primary/50' : 'border bg-transparent hover:bg-blue-primary/10'} hover:gap-6 transition-all duration-300 border-blue-primary/90 text-black  rounded-2xl p-3 flex justify-center items-center gap-4 min-w-[180px] h-[80px]`}
                >
                  <span className="font-bold text-lg">VNPay</span>
                  <div className="relative w-[60px] h-[60px] overflow-hidden">
                    <Image src={'/images/vnpay.jpg'} alt="VN Pay" fill className="object-contain" />
                  </div>
                </Button>
                <Button
                  title="Cash on Delivery"
                  type="button"
                  onClick={() => {
                    form.setValue('payment_method', PAYMENT_METHOD.CASH)
                  }}
                  className={`border bg-transparent hover:bg-blue-primary/10 hover:gap-6 transition-all duration-300 border-blue-primary/90 text-black rounded-2xl p-3 flex justify-center items-center gap-4 min-w-[180px] h-[80px]`}
                >
                  <span className="font-bold text-lg">Momo</span>
                  <div className="relative w-[60px] h-[60px] overflow-hidden">
                    <Image src={'/images/momo.webp'} alt="MoMo" fill className="object-contain" />
                  </div>
                </Button>
                <div className="border border-blue-primary/90 rounded-2xl p-3 flex justify-center items-center gap-4 min-w-[180px] h-[80px]">
                  <span className="font-bold text-lg">ZaloPay</span>
                  <div className="relative w-[60px] h-[60px] overflow-hidden">
                    <Image src={'/images/zalopay.webp'} alt="Zalo Pay" fill className="object-contain" />
                  </div>
                </div>
              </div>

              <Button
                disabled={isPendingCreateOrder}
                type="submit"
                className="rounded-4xl bg-violet-primary w-full h-14 hover:bg-violet-primary/90 md:flex hidden"
              >
                Confirm My Order
                {isPendingCreateOrder && <Loading />}
              </Button>
            </div>
            {/* Payment Summary */}
            <div className="p-1 md:shadow-2xl md:bg-gradient-to-br shadow-blue-primary/50 from-white to-blue-primary via-white w-full rounded-2xl max-w-[400px]">
              <div className="relative overflow-hidden flex flex-col gap-6 justify-between items-center p-0 md:p-9 bg-transparent md:bg-gradient-to-b from-white to-blue-secondary/20 rounded-none md:rounded-xl w-full">
                <h2 className="md:block hidden font-bold text-[clamp(1.25rem,2vw,1.5rem)] text-blue-tertiary w-full text-start">
                  Order summary
                </h2>
                <div className="flex flex-col justify-start items-start gap-6 w-full max-h-[450px] overflow-y-auto">
                  {cart.map((item, index) => {
                    const attributes = Object.entries(item.attributes).map(([key, value]) => ({ key, value }))
                    const configuration = attributes
                      .filter((attr) => attr.key.toLowerCase() !== 'color')
                      .slice(0, 3)
                      .map((attr) => `${attr.key} ${attr.value}`)
                      .join(', ')
                    const color = attributes.find((attr) => attr.key.toLowerCase() === 'color')?.value || ''
                    return (
                      <div
                        className="flex justify-start items-center w-full gap-4 border-b border-blue-primary/90 pb-4"
                        key={index}
                      >
                        <div className="relative min-w-[100px] w-[100px] h-[100px] bg-gradient-to-br from-blue-secondary to-white rounded-2xl">
                          <Image src={item.images[0].url} alt="Laptop" fill className="object-cover" />
                        </div>
                        <div className="flex flex-col justify-start items-start gap-2">
                          <h3 className="font-bold text-[clamp(0.625rem,2vw,0.875rem)] line-clamp-2">
                            {item.variant_name}
                          </h3>
                          <p className="font-medium text-[clamp(0.45rem,2vw,0.625rem)]">{configuration}</p>
                          <p className="font-medium text-[clamp(0.45rem,2vw,0.625rem)]">{color}</p>
                          <div className="flex w-full justify-between items-center gap-4">
                            <p className="font-bold text-[clamp(0.625rem,2vw,0.875rem)]">{formatPrice(item.price)}</p>
                            <span className="text-xs">x{item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div
                  className={`${openSummary ? 'flex' : 'hidden md:flex'} flex-col gap-4 justify-between items-center w-full`}
                >
                  <div className="flex justify-between items-center gap-4 w-full">
                    <p className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">Subtotal</p>
                    <span className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center gap-4 w-full">
                    <p className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">Tax</p>
                    <span className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">{formatPrice(0)}</span>
                  </div>
                  <div className="flex justify-between items-center gap-4 w-full">
                    <p className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">Shipping</p>
                    <span className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">{formatPrice(shippingFee)}</span>
                  </div>
                  <div className="flex justify-between items-center gap-4 w-full">
                    <p className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">Discount</p>
                    <span className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">{formatPrice(discount)}</span>
                  </div>
                  <div className="flex justify-between items-center gap-4 w-full">
                    <p className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">Voucher</p>
                    <span className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">
                      {formatPrice(couponDiscount)}
                    </span>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-6">
                  <div className="flex justify-between items-center gap-4 w-full">
                    <p className="font-bold text-xl">Total</p>
                    <div className="flex justify-between items-center gap-2">
                      <span className="font-bold text-xl">{formatPrice(total)}</span>
                      <IoIosArrowDown
                        size={16}
                        className={`${openSummary ? 'rotate-180' : ''} duration-300 transition-all text-black/40 md:hidden cursor-pointer`}
                        onClick={() => setOpenSummary((prev) => !prev)}
                        title="Detail Summary"
                      />
                    </div>
                  </div>
                  <Button
                    disabled={isPendingCreateOrder}
                    type="submit"
                    className="rounded-4xl bg-violet-primary w-full h-14 hover:bg-violet-primary/90 md:hidden"
                  >
                    Confirm My Order
                    {isPendingCreateOrder && <Loading />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}
