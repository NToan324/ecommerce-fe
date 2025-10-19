'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { LuEye, LuEyeOff } from 'react-icons/lu'
import z from 'zod'

import { Combobox } from '@/components/comboBox'
import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { FloatingInput, FloatingLabel } from '@/components/ui/floating-label-input'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import useAuth from '@/hooks/useAuth'
import { useGetDistrict, useGetProvinceCity, useGetWard } from '@/hooks/useProfile'
import { authSchema } from '@/schemas/auth.schema'
import { District, ProvinceCity, Ward } from '@/types/address.type'

export default function page() {
  const form = useForm<z.infer<typeof authSchema.signup>>({
    resolver: zodResolver(authSchema.signup),
    defaultValues: {
      fullName: '',
      email: '',
      provinceCity: '',
      district: '',
      ward: '',
      address: '',
      password: '',
      confirmPassword: '',
    },
  })

  const [selectedProvinceCity, setSelectedProvinceCity] = useState<string>('')
  const [selectedDistrict, setSelectedDistrict] = useState<string>('')
  const [selectedWard, setSelectedWard] = useState<string>('')

  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [enableSignup, setEnableSignup] = useState(false)

  const { mutate: signupMutate, isPending: isSignupPending } = useAuth.signup()

  const {
    data: provinceCityData,
    // isLoading: provinceLoading,
    // isSuccess: provinceSuccess
  } = useGetProvinceCity()
  const {
    data: districtData,
    // isLoading: districtLoading,
    // isSuccess: districtSuccess,
  } = useGetDistrict(selectedProvinceCity ? parseInt(selectedProvinceCity) : 0)
  const {
    data: wardData,
    // isLoading: wardLoading,
    // isSuccess: wardSuccess,
  } = useGetWard(selectedDistrict ? parseInt(selectedDistrict) : 0)

  const handleNextStep = () => {
    setStep((prev) => prev + 1)
    if (step === 2) {
      setEnableSignup(true)
      return
    }
  }

  const handleSignup = (data: z.infer<typeof authSchema.signup>) => {
    const payload = {
      fullName: data.fullName,
      email: data.email,
      address: data.address,
      password: data.password,
    }
    signupMutate(payload)
  }

  useEffect(() => {
    const provinceCity = provinceCityData
      ? provinceCityData.find((item) => item.code === parseInt(selectedProvinceCity))?.name || ''
      : ''
    const district = districtData
      ? districtData?.districts.find((item) => item.code === parseInt(selectedDistrict || '0'))?.name || ''
      : ''
    const ward = wardData ? wardData?.wards.find((item) => item.code === parseInt(selectedWard || '0'))?.name || '' : ''
    form.setValue('address', `${ward}${ward ? ', ' : ''}${district}${district ? ', ' : ''}${provinceCity}`)
  }, [form, provinceCityData, selectedProvinceCity, districtData, selectedDistrict, wardData, selectedWard])

  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] gap-10 w-full px-7 lg:px-[120px] lg:pb-20 p-12">
        <h1 className="text-3xl font-bold">Compx</h1>
        <div className="flex flex-col gap-3 justify-between items-center">
          <p className="text-2xl font-bold text-center">Get access, shop smarter today</p>
          <p className="text-sm text-black/60-">
            Already have an account?
            <Link href="/signin" className="ml-2 text-blue-tertiary">
              Sign in
            </Link>
          </p>
        </div>
        {/* Form login */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignup)}
            className="w-full max-w-[320px] md:max-w-[460px] overflow-hidden"
          >
            <div
              style={{ transform: `translateX(-${(step - 1) * 100}%)` }}
              className={` flex justify-between items-center w-full relative transition-transform duration-500`}
            >
              <div
                className={`flex justify-between gap-7 items-center min-w-[320px] md:min-w-[460px] px-[10px] py-2 flex-col`}
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative w-full">
                          <FloatingInput
                            {...field}
                            id="fullName"
                            className="h-12 rounded-[20px] w-full"
                            value={field.value}
                          />
                          <FloatingLabel htmlFor="fullName">Full name</FloatingLabel>
                        </div>
                      </FormControl>
                      {form.formState.errors.fullName && (
                        <p className="text-red-500 text-sm mt-2">{form.formState.errors.fullName.message}</p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative w-full">
                          <FloatingInput
                            {...field}
                            id="email"
                            className="h-12 rounded-[20px] w-full"
                            value={field.value}
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
              <div
                className={`${step < 2 ? 'hidden' : ''} flex justify-between gap-7 items-center min-w-[320px] md:min-w-[460px] px-[10px] py-2 flex-col`}
              >
                <FormField
                  control={form.control}
                  name="provinceCity"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Combobox<ProvinceCity>
                          data={
                            provinceCityData
                              ? provinceCityData.map((item: ProvinceCity) => {
                                  return {
                                    ...item,
                                    id: item.code.toString(),
                                  }
                                })
                              : []
                          }
                          selectedData={
                            form.getValues('provinceCity') && selectedProvinceCity
                              ? (provinceCityData
                                  ?.filter((item: ProvinceCity) => item.code.toString() === selectedProvinceCity)
                                  .map((item: ProvinceCity) => ({
                                    ...item,
                                    id: item.code.toString(),
                                  })) ?? [])
                              : []
                          }
                          index={0}
                          handleOnChange={(value) => {
                            field.onChange(value)
                            setSelectedProvinceCity(value)
                          }}
                          limitData={provinceCityData ? provinceCityData.length : 0}
                          titleTrigger="Province/city"
                        />
                      </FormControl>
                      {form.formState.errors.provinceCity && (
                        <p className="text-red-500 text-sm mt-2">{form.formState.errors.provinceCity.message}</p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Combobox<District>
                          data={
                            districtData && districtData.districts
                              ? districtData.districts.map((item: District) => ({
                                  ...item,
                                  id: item.code.toString(),
                                }))
                              : []
                          }
                          selectedData={
                            form.getValues('district') && selectedDistrict
                              ? (districtData?.districts
                                  ?.filter((item: District) => item.code.toString() === selectedDistrict)
                                  .map((item: District) => ({
                                    ...item,
                                    id: item.code.toString(),
                                  })) ?? [])
                              : []
                          }
                          index={0}
                          handleOnChange={(value) => {
                            field.onChange(value)
                            setSelectedDistrict(value)
                          }}
                          limitData={districtData && districtData.districts ? districtData.districts.length : 0}
                          isDisabled={!selectedProvinceCity}
                          titleTrigger="District"
                        />
                      </FormControl>
                      {form.formState.errors.district && (
                        <p className="text-red-500 text-sm mt-2">{form.formState.errors.district.message}</p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ward"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Combobox<Ward>
                          data={
                            wardData && wardData.wards
                              ? wardData.wards.map((item: Ward) => {
                                  return {
                                    ...item,
                                    id: item.code.toString(),
                                  }
                                })
                              : []
                          }
                          selectedData={
                            form.getValues('ward') && selectedWard
                              ? (wardData?.wards
                                  ?.filter((item: Ward) => item.code.toString() === selectedWard)
                                  .map((item: Ward) => ({
                                    ...item,
                                    id: item.code.toString(),
                                  })) ?? [])
                              : []
                          }
                          index={0}
                          handleOnChange={(value) => {
                            field.onChange(value)
                            setSelectedWard(value)
                          }}
                          limitData={wardData && wardData.wards ? wardData.wards.length : 0}
                          isDisabled={!selectedDistrict}
                          titleTrigger="Ward"
                        />
                      </FormControl>
                      {form.formState.errors.ward && (
                        <p className="text-red-500 text-sm mt-2">{form.formState.errors.ward.message}</p>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div
                className={`${step < 3 ? 'hidden' : ''} flex justify-between gap-7 items-center min-w-[320px] md:min-w-[460px] px-[10px] py-2 flex-col`}
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative w-full">
                          <FloatingInput
                            {...field}
                            id="fullName"
                            className="h-12 rounded-[20px] w-full"
                            value={field.value}
                          />
                          <FloatingLabel htmlFor="fullName">Full name</FloatingLabel>
                        </div>
                      </FormControl>
                      {form.formState.errors.fullName && (
                        <p className="text-red-500 text-sm mt-2">{form.formState.errors.fullName.message}</p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative w-full">
                          <FloatingInput
                            {...field}
                            id="email"
                            className="h-12 rounded-[20px] w-full"
                            value={field.value}
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
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative w-full">
                          <FloatingInput
                            {...field}
                            id="address"
                            className="h-12 rounded-[20px] w-full"
                            onChange={field.onChange}
                            value={field.value}
                            onFocus={(e) => e.target.setSelectionRange(0, e.target.value.length)}
                          />
                          <FloatingLabel htmlFor="address">Address</FloatingLabel>
                        </div>
                      </FormControl>
                      {form.formState.errors.address && (
                        <p className="text-red-500 text-sm mt-2">{form.formState.errors.address.message}</p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative w-full">
                          <FloatingInput
                            type={showPassword ? 'text' : 'password'}
                            id="password"
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
                          <FloatingLabel htmlFor="password">Password</FloatingLabel>
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
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative w-full">
                          <FloatingInput
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            className="h-12 rounded-[20px]"
                            value={field.value}
                            onChange={field.onChange}
                          />
                          {showConfirmPassword ? (
                            <LuEyeOff
                              className="absolute top-[14px] right-3 cursor-pointer"
                              size={20}
                              onClick={() => setShowConfirmPassword(false)}
                            />
                          ) : (
                            <LuEye
                              className="absolute top-[14px] right-3 cursor-pointer"
                              size={20}
                              onClick={() => setShowConfirmPassword(true)}
                            />
                          )}
                          <FloatingLabel htmlFor="confirmPassword">Confirm Password</FloatingLabel>
                        </div>
                      </FormControl>
                      {form.formState.errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-2">{form.formState.errors.confirmPassword.message}</p>
                      )}
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="px-[10px] mt-6">
              {enableSignup ? (
                <Button
                  disabled={isSignupPending}
                  type="submit"
                  className="w-full text-base font-medium text-white bg-violet-primary hover:bg-violet-primary/90 rounded-2xl h-12"
                >
                  Sign Up
                  {isSignupPending && <Loading />}
                </Button>
              ) : null}

              {step < 3 && (
                <Button
                  type="button"
                  className="w-full text-base font-medium text-white bg-violet-primary hover:bg-violet-primary/90 rounded-2xl h-12"
                  onClick={handleNextStep}
                >
                  Next
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </main>
  )
}
