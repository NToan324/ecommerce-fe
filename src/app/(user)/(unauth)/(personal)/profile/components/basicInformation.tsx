'use client'

import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { GoPencil } from 'react-icons/go'
import { z } from 'zod'

import { Combobox } from '@/components/comboBox'
import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { FloatingInput, FloatingLabel } from '@/components/ui/floating-label-input'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { useGetDistrict, useGetProvinceCity, useGetWard } from '@/hooks/useProfile'
import useUser from '@/hooks/useUser'
import profileSchema from '@/schemas/profile.schema'
import { District, ProvinceCity, Ward } from '@/types/address.type'
import { Profile } from '@/types/user.type'

interface BasicInformationProps {
  data: Profile | null
}

export default function BasicInformation({ data }: BasicInformationProps) {
  const form = useForm<z.infer<typeof profileSchema.basicInfo>>({
    resolver: zodResolver(profileSchema.basicInfo),
    defaultValues: {
      fullName: '',
      email: '',
      provinceCity: '',
      district: '',
      phone: '',
      ward: '',
      address: '',
    },
  })

  const [editMode, setEditMode] = useState(false)

  const [selectedProvinceCity, setSelectedProvinceCity] = useState<string>('')
  const [selectedDistrict, setSelectedDistrict] = useState<string>('')
  const [selectedWard, setSelectedWard] = useState<string>('')

  const { mutate: updateProfile, isPending, isSuccess } = useUser.updateProfile({ onClose: () => {} })

  const { data: provinceCityData } = useGetProvinceCity()
  const { data: districtData } = useGetDistrict(selectedProvinceCity ? parseInt(selectedProvinceCity) : 0)
  const { data: wardData } = useGetWard(selectedDistrict ? parseInt(selectedDistrict) : 0)

  const handleSubmit = (data: z.infer<typeof profileSchema.basicInfo>) => {
    const payload = {
      fullName: data.fullName,
      address: data.address ? [data.address] : [],
      phone: data.phone || '',
    }
    updateProfile(payload)
  }

  useEffect(() => {
    if (data) {
      form.reset({
        fullName: data.fullName,
        email: data.email,
        address: data.address[0],
        phone: data.phone || '',
      })
    }
    if (isSuccess) {
      setSelectedDistrict('')
      setSelectedProvinceCity('')
      setSelectedWard('')
      form.reset()
    }
    if (editMode) {
      setEditMode(!editMode)
    }
  }, [data, form])

  useEffect(() => {
    if (selectedProvinceCity || selectedDistrict || selectedWard) {
      const provinceCity = provinceCityData?.find((item) => item.code.toString() === selectedProvinceCity)?.name || ''
      const district = districtData?.districts.find((item) => item.code.toString() === selectedDistrict)?.name || ''
      const ward = wardData?.wards.find((item) => item.code.toString() === selectedWard)?.name || ''
      form.setValue(
        'address',
        ward ? `${ward}, ${district}, ${provinceCity}` : district ? `${district}, ${provinceCity}` : provinceCity
      )
    }
  }, [selectedProvinceCity, selectedDistrict, selectedWard])

  return (
    <div className="space-y-10 w-full">
      <div className="flex justify-end items-center gap-4">
        {editMode && (
          <Button
            type="button"
            variant={'outline'}
            className="w-full float-end max-w-[80px] rounded-2xl"
            onClick={() => setEditMode(!editMode)}
          >
            Exit
          </Button>
        )}
        <Button
          type="button"
          disabled={isPending}
          className="w-full float-end max-w-[80px] text-white bg-violet-primary hover:bg-violet-primary/90 rounded-2xl"
          onClick={() => {
            if (editMode) {
              form.handleSubmit(handleSubmit)()
            } else {
              setEditMode(!editMode)
            }
          }}
        >
          {editMode ? (
            <>Save {isPending && <Loading />}</>
          ) : (
            <>
              <GoPencil />
              Edit
            </>
          )}
          {/* <Loading /> */}
        </Button>
      </div>
      <Form {...form}>
        <form action="" className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="w-full max-w-[420px]">
                <FormControl>
                  <div className="relative w-full">
                    <FloatingInput
                      {...field}
                      disabled={!editMode}
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
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full max-w-[420px]">
                <FormControl>
                  <div className="relative w-full">
                    <FloatingInput
                      {...field}
                      disabled={!editMode}
                      id="fullName"
                      className="h-12 rounded-[20px] w-full"
                      value={field.value}
                    />
                    <FloatingLabel htmlFor="phone">Phone</FloatingLabel>
                  </div>
                </FormControl>
                {form.formState.errors.phone && (
                  <p className="text-red-500 text-sm mt-2">{form.formState.errors.phone.message}</p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full max-w-[420px]">
                <FormControl>
                  <div className="relative w-full">
                    <FloatingInput
                      {...field}
                      disabled
                      id="email"
                      className="h-12 rounded-[20px] w-full bg-disabled"
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
            name="provinceCity"
            render={({ field }) => (
              <FormItem className="w-full max-w-[420px]">
                <FormControl>
                  <Combobox
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
                    isDisabled={!editMode}
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
              <FormItem className="w-full max-w-[420px]">
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
                    isDisabled={!selectedProvinceCity || !editMode}
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
              <FormItem className="w-full max-w-[420px]">
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
                    isDisabled={!selectedDistrict || !editMode}
                    titleTrigger="Ward"
                  />
                </FormControl>
                {form.formState.errors.ward && (
                  <p className="text-red-500 text-sm mt-2">{form.formState.errors.ward.message}</p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full col-span-2">
                <FormControl>
                  <div className="relative w-full">
                    <FloatingInput
                      {...field}
                      id="address"
                      className="h-12 rounded-[20px] w-full"
                      value={field.value}
                      disabled={!editMode}
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
        </form>
      </Form>
      
    </div>
  )
}
