import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { GoPlus } from 'react-icons/go'
import z from 'zod'

import { Combobox } from '@/components/comboBox'
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
import { useGetDistrict, useGetProvinceCity, useGetWard } from '@/hooks/useProfile'
import profileSchema from '@/schemas/profile.schema'
import { District, ProvinceCity, Ward } from '@/types/address.type'
import { ProfileAddress } from '@/types/profile.type'

interface DialogCreateAdressProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultValues?: ProfileAddress
}

export function DialogCreateAdress({ open, onOpenChange, defaultValues }: DialogCreateAdressProps) {
  const form = useForm<z.infer<typeof profileSchema.addressDetails>>({
    resolver: zodResolver(profileSchema.addressDetails),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      provinceCity: '',
      district: '',
      ward: '',
      address: '',
    },
  })

  const [selectedProvinceCity, setSelectedProvinceCity] = useState<string>('')
  const [selectedDistrict, setSelectedDistrict] = useState<string>('')
  const [selectedWard, setSelectedWard] = useState<string>('')

  console.log(selectedWard, defaultValues)
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Form {...form}>
        <form>
          <DialogTrigger asChild>
            <Button
              type="button"
              className="w-full max-w-[80px] text-white bg-violet-primary hover:bg-violet-primary/90 rounded-2xl"
            >
              <GoPlus size={20} strokeWidth={1} />
              Add
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[725px]">
            <DialogHeader>
              <DialogTitle>Address</DialogTitle>
              <DialogDescription>Enter a new address for your profile, then hit Save.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="w-full md:max-w-[420px]">
                    <FormControl>
                      <div className="relative w-full">
                        <FloatingInput
                          {...field}
                          id="floating-customize"
                          className="h-12 rounded-[20px] w-full"
                          value={field.value}
                        />
                        <FloatingLabel htmlFor="floating-customize">Full name</FloatingLabel>
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
                name="provinceCity"
                render={({ field }) => (
                  <FormItem className="w-full md:max-w-[420px]">
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
                  <FormItem className="w-full md:max-w-[420px]">
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
                  <FormItem className="w-full md:max-w-[420px]">
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
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="w-full col-span-1 md:col-span-2">
                    <FormControl>
                      <div className="relative w-full">
                        <FloatingInput
                          {...field}
                          id="floating-customize"
                          className="h-12 rounded-[20px] w-full"
                          value={field.value}
                        />
                        <FloatingLabel htmlFor="floating-customize">Address</FloatingLabel>
                      </div>
                    </FormControl>
                    {form.formState.errors.address && (
                      <p className="text-red-500 text-sm mt-2">{form.formState.errors.address.message}</p>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="flex flex-row justify-end items-center">
              <DialogClose asChild>
                <Button variant="outline" className="rounded-2xl max-w-[100px]">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="w-full float-end max-w-[100px] bg-violet-primary hover:bg-violet-primary/90 text-white rounded-2xl"
              >
                Save
                {/* <Loading /> */}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  )
}
