'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { GoPencil } from 'react-icons/go'
import { z } from 'zod'

import { Combobox } from '@/components/comboBox'
import { Button } from '@/components/ui/button'
import { FloatingInput, FloatingLabel } from '@/components/ui/floating-label-input'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { useGetDistrict, useGetProvinceCity, useGetWard } from '@/hooks/useProfile'
import profileSchema from '@/schemas/profile.schema'
import { District, ProvinceCity, Ward } from '@/types/address.type'

export default function BasicInformation() {
  const form = useForm<z.infer<typeof profileSchema.basicInfo>>({
    resolver: zodResolver(profileSchema.basicInfo),
    defaultValues: {
      fullName: '',
      email: '',
      provinceCity: '',
      district: '',
      ward: '',
      address: '',
    },
  })

  const [editMode, setEditMode] = useState(false)

  const [selectedProvinceCity, setSelectedProvinceCity] = useState<string>('')
  const [selectedDistrict, setSelectedDistrict] = useState<string>('')
  const [selectedWard, setSelectedWard] = useState<string>('')

  console.log(selectedWard)
  const {
    data: provinceCityData,
    // isLoading: provinceLoading,
    //  isSuccess: provinceSuccess
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
          className="w-full float-end max-w-[80px] text-white bg-violet-primary hover:bg-violet-primary/90 rounded-2xl"
          onClick={() => {
            if (editMode) {
              console.log('Saved', form.getValues())
            } else {
              setEditMode(!editMode)
            }
          }}
        >
          {editMode ? (
            'Save'
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
            name="email"
            render={({ field }) => (
              <FormItem className="w-full max-w-[420px]">
                <FormControl>
                  <div className="relative w-full">
                    <FloatingInput
                      {...field}
                      disabled={!editMode}
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
            name="provinceCity"
            render={({ field }) => (
              <FormItem className="w-full max-w-[420px]">
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
                    selectedData={[]}
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
                    selectedData={[]}
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
                    selectedData={[]}
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
              <FormItem className="w-full max-w-[420px]">
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
