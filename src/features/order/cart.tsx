'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import EmptyShoppingCart from '@public/images/empty-shopping-cart.png'
import { BsCart2 } from 'react-icons/bs'
import { FiMinus } from 'react-icons/fi'
import { GoPlus } from 'react-icons/go'
import { HiOutlineTrash } from 'react-icons/hi2'
import { IoIosArrowDown, IoIosClose } from 'react-icons/io'

import Loading from '@/components/loading'
import { toastInfo, toastSuccess, toastWarning } from '@/components/toastify'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import useCart from '@/hooks/useCart'
import useCoupon from '@/hooks/useCoupon'
import useProduct from '@/hooks/useProduct'
import { useAuthStore } from '@/stores/auth.store'
import { useCartStore } from '@/stores/cart.store'
import { CartStore } from '@/types/cart.type'
import { formatPrice } from '@/utils/helpers'

interface CartPageProps {
  cart: CartStore[]
}

export default function CartPage({ cart }: CartPageProps) {
  const [openSummary, setOpenSummary] = useState(false)
  const setCartState = useCartStore((state) => state.setCart)
  const setCouponState = useCartStore((state) => state.setCoupon)
  const deleteProductFromCart = useCartStore((state) => state.deleteProductFromCart)
  const couponStore = useCartStore((state) => state.coupon)
  const user = useAuthStore((state) => state.user)
  const [couponCode, setCouponCode] = useState('')
  const [usePoint, setUsePoint] = useState(true)
  const route = useRouter()

  const { mutateAsync: updateCartByUser } = useCart.updateCartByUser(false)
  const {
    mutate: getCouponByCode,
    isPending: isPendingGetCouponByCode,
    data: couponData,
    reset: resetCouponData,
  } = useCoupon.getCouponByCode({
    onClose: () => {},
  })
  const { mutate: deleteCartByUser, isPending: isPendingDeleteCartByUser } = useCart.deleteCartByUser()
  const { mutateAsync: checkProductVariantIdFromCart } = useProduct.checkProductVariantIdFromCart()

  const discountFromVoucher =
    couponData?.data?.usage_count === couponData?.data?.usage_limit ? null : couponData?.data.discount_amount

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }, [cart])

  const discount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.discount * item.quantity, 0)
  }, [cart])

  const taxAmount = useMemo(() => {
    return (subtotal - discount) * 0.1
  }, [subtotal, discount])

  const shippingFee = 49000

  const couponDiscount = useMemo(() => {
    return discountFromVoucher || couponStore?.discount_amount || 0
  }, [discountFromVoucher, couponStore])

  const loyaltyPointDiscount = useMemo(() => {
    return usePoint && user ? user?.loyalty_points * 1000 : 0
  }, [usePoint, subtotal, user])

  const total = useMemo(() => {
    return subtotal - discount + taxAmount + shippingFee - couponDiscount - loyaltyPointDiscount
  }, [subtotal, discount, shippingFee, couponDiscount])

  const handleIncrease = async (quantity: number, product: CartStore) => {
    // if (quantity < product.available_quantity) {
    const quantityFromProductVariantId = await checkProductVariantIdFromCart(product._id)
    if (product.quantity + 1 <= quantityFromProductVariantId.data.productVariant.quantity) {
      setCartState({ ...product, quantity: 1 })
      if (user) {
        updateCartByUser({ id: product._id, payload: { quantity: quantity + 1 } })
      }
    } else {
      toastWarning('Maximum quantity reached')
    }
  }

  const handleDecrease = async (quantity: number, product: CartStore) => {
    if (quantity > 1) {
      setCartState({ ...product, quantity: -1 })
      if (user) {
        updateCartByUser({ id: product._id, payload: { quantity: quantity - 1 } })
      }
    }
    if (quantity === 1) {
      toastWarning('Minimum quantity is 1')
    }
  }
  const handleDelete = (productId: string) => {
    deleteProductFromCart(productId)
    if (user) {
      deleteCartByUser(productId)
    } else {
      toastSuccess(`Delete product from cart successfully`)
    }
  }

  const handleGetCoupon = () => {
    if (couponCode === '') {
      toastWarning('Please enter a coupon code')
      return
    }
    getCouponByCode(couponCode)
  }

  const handleCheckout = () => {
    if (couponData?.data && discountFromVoucher) {
      setCouponState({
        code: couponData.data.code,
        discount_amount: discountFromVoucher,
      })
    }
    route.push('/checkout')
  }

  const handleRemoveCoupon = () => {
    setCouponCode('')
    if (couponStore) {
      setCouponState(null)
    }
    if (couponData) {
      resetCouponData()
    }
    toastInfo('You have removed the coupon code successfully')
  }

  useEffect(() => {
    if (couponStore) {
      setCouponCode(couponStore.code || '')
    }
  }, [couponStore])

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-start justify-start gap-10 overflow-hidden p-7 lg:px-[120px] lg:pb-20 lg:pt-10">
      <h1 className="text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-violet-primary to-blue-light">
        Your Cart
      </h1>
      {/* Product List */}
      <div
        className={`${cart.length > 0 ? 'justify-between' : 'justify-center'} flex items-start gap-16 w-full flex-col md:flex-row`}
      >
        {cart.length > 0 ? (
          <>
            <div className="flex flex-col justify-start items-start gap-12 w-full">
              {cart.map((item, index) => {
                const attributes = Object.entries(item.attributes).map(([key, value]) => ({ key, value }))
                const configuration = attributes
                  .filter((attr) => attr.key.toLowerCase() !== 'color')
                  .slice(0, 3)
                  .map((attr) => `${attr.key} ${attr.value}`)
                  .join(', ')
                const color = attributes.find((attr) => attr.key.toLowerCase() === 'color')?.value || ''
                return (
                  <div className="flex flex-col justify-start items-center gap-4 w-full max-w-[600px]" key={index}>
                    <div className="flex justify-start items-center w-full gap-4 md:gap-16 border-b border-blue-primary/90 pb-4">
                      <div className="relative min-w-[100px] w-[100px] h-[100px] lg:min-w-[160px] lg:w-[160px] lg:h-[160px] bg-gradient-to-br from-blue-secondary to-white rounded-2xl">
                        <Image src={item.images.url} alt="Laptop" fill className="object-cover" />
                      </div>
                      <div className="flex flex-col justify-start items-start gap-2">
                        <h3 className="font-bold text-[clamp(1rem,2vw,1.5rem)] line-clamp-2">{item.variant_name}</h3>
                        <p className="font-medium text-[clamp(0.75rem,2vw,1rem)] line-clamp-2">{configuration}</p>
                        <p className="font-medium text-[clamp(0.75rem,2vw,1rem)]">{color}</p>
                        <div className="flex items-center gap-4">
                          <p className="font-bold text-[clamp(1rem,2vw,1.5rem)]">{formatPrice(item.price)}</p>
                          {/* {item.original_price !== item.price && (
                            <p className="font-bold text-[clamp(0.75rem,2vw,1rem)] text-black/20 line-through">
                              {formatPrice(item.original_price)}
                            </p>
                          )} */}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center gap-4 w-full">
                      <div className="flex items-center justify-between gap-2">
                        <Button
                          variant={'ghost'}
                          className="hover:bg-transparent border border-blue-primary/90 w-9 h-9"
                          onClick={() => handleDecrease(item.quantity, item)}
                        >
                          <FiMinus size={24} className="text-black" strokeWidth={3} />
                        </Button>
                        <span className="text-black text-[clamp(0.875rem,2vw,1.25rem)] text-center w-6">
                          {item.quantity}
                        </span>
                        <Button
                          variant={'ghost'}
                          className="hover:bg-transparent border border-blue-primary/90 w-9 h-9"
                          onClick={() => handleIncrease(item.quantity, item)}
                        >
                          <GoPlus size={24} className="text-black" strokeWidth={1} />
                        </Button>
                      </div>
                      <Button
                        disabled={isPendingDeleteCartByUser}
                        title={'Delete product ' + item.variant_name}
                        variant={'ghost'}
                        className="group hover:bg-transparent border border-blue-primary/90 w-9 h-9"
                        onClick={() => handleDelete(item._id)}
                      >
                        {!isPendingDeleteCartByUser ? (
                          <HiOutlineTrash
                            size={24}
                            className="text-black group-hover:scale-105 transition-all duration-200"
                            strokeWidth={1}
                          />
                        ) : (
                          <Loading color="text-blue-night" />
                        )}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Payment Summary */}
            {cart.length > 0 && (
              <div className="flex md:flex-col flex-col-reverse justify-start items-center gap-10 md:gap-4 w-full md:max-w-[400px]">
                <div className="relative overflow-hidden flex flex-col gap-6 justify-between items-center p-0 md:p-9 bg-transparent md:bg-gradient-to-b from-white to-blue-secondary/20 rounded-none md:rounded-2xl w-full">
                  <h2 className="md:block hidden font-bold text-[clamp(1.25rem,2vw,1.5rem)] text-blue-tertiary w-full text-start">
                    Order summary
                  </h2>
                  <div
                    className={`${openSummary ? 'flex' : 'hidden md:flex'} flex-col gap-4 justify-between items-center w-full`}
                  >
                    <div className="flex justify-between items-center gap-4 w-full">
                      <p className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">Subtotal</p>
                      <span className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between items-center gap-4 w-full">
                      <p className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">Discount</p>
                      <span className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">{formatPrice(discount)}</span>
                    </div>
                    <div className="flex justify-between items-center gap-4 w-full">
                      <p className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">Tax</p>
                      <span className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">{formatPrice(taxAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center gap-4 w-full">
                      <p className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">Shipping</p>
                      <span className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">
                        {formatPrice(shippingFee)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center gap-4 w-full">
                      <p className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">Voucher</p>
                      <span className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">
                        {formatPrice(couponDiscount)}
                      </span>
                    </div>
                    {user && (
                      <div className="flex justify-between items-center gap-4 w-full">
                        <p className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">Loyalty point</p>
                        <span className="font-medium text-[clamp(0.875rem,2vw,1.125rem)]">
                          {formatPrice(loyaltyPointDiscount)}
                        </span>
                      </div>
                    )}
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
                      className="rounded-4xl bg-violet-primary w-full h-14 hover:bg-violet-primary/90"
                      onClick={handleCheckout}
                    >
                      Process to Checkout
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-6 justify-between items-center p-6 md:p-9 bg-gradient-to-b from-white to-blue-secondary/20 rounded-2xl w-full">
                  <h2 className="font-bold text-[clamp(1rem,2vw,1.25rem)] text-blue-tertiary w-full text-start">
                    Have a couponCode?
                  </h2>
                  <div className="rounded-2xl border border-blue-primary p-2 flex justify-between items-center gap-4 w-full">
                    <Input
                      disabled={!!couponStore || !!discountFromVoucher}
                      type="text"
                      placeholder="Coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="border-none outline-none focus-visible:ring-0 shadow-none"
                    />
                    {couponStore || discountFromVoucher ? (
                      <div
                        title={`Remove voucher ${couponStore?.code || couponData?.data?.code}`}
                        className="group rounded-[10px] cursor-pointer bg-green-secondary p-2 flex justify-between items-center gap-2 w-full max-w-[128px]"
                      >
                        <p className="text-sm font-medium text-green-900">-{formatPrice(100000)}</p>
                        <IoIosClose
                          onClick={handleRemoveCoupon}
                          size={20}
                          className="text-black/50 group-hover:scale-110 transition-all duration-150"
                        />
                      </div>
                    ) : (
                      <Button
                        disabled={isPendingGetCouponByCode}
                        onClick={handleGetCoupon}
                        variant={'ghost'}
                        className="text-blue-secondary hover:bg-transparent duration-500 transition-colors"
                      >
                        {isPendingGetCouponByCode ? <Loading color="black" /> : 'Apply'}
                      </Button>
                    )}
                  </div>
                </div>
                {user && (
                  <div className="w-full flex justify-start items-center gap-4">
                    <Checkbox
                      className="size-6"
                      checked={usePoint}
                      onCheckedChange={(value) => {
                        if (value) {
                          setUsePoint(true)
                        } else {
                          setUsePoint(false)
                        }
                      }}
                    />

                    <p className="text-sm">
                      Use your <span className="font-bold text-orange-foreground">{user.loyalty_points}</span> loyalty
                      points to get{' '}
                      <span className="font-bold text-orange-foreground">
                        {' '}
                        {formatPrice(user.loyalty_points * 1000)}
                      </span>{' '}
                      discount
                    </p>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="flex justify-start w-full items-center flex-col">
            <div className="w-full min-w-[300px] md:max-w-[600px] h-[300px] md:h-[450px] relative">
              <Image
                src={EmptyShoppingCart}
                alt="empty-shopping-cart"
                fill
                objectFit="contain"
                className="md:scale-100 scale-80"
              />
            </div>
            <Button
              className="rounded-4xl bg-violet-primary w-full max-w-[250px] h-14 hover:bg-violet-primary/90"
              onClick={() => route.push('/products')}
            >
              Continue Shopping <BsCart2 />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
