import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { GoPlus } from 'react-icons/go'
import z from 'zod'

import { Combobox } from '@/components/comboBox'
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
import { useGetDistrict, useGetProvinceCity, useGetWard } from '@/hooks/useProfile'
import useUser from '@/hooks/useUser'
import profileSchema from '@/schemas/profile.schema'
import { useAuthStore } from '@/stores/auth.store'
import { District, ProvinceCity, Ward } from '@/types/address.type'

interface DialogUpdateAdressProps {
  open: boolean
  setOpen: (open: boolean) => void
  defaultValues: number | null
}

export function DialogUpdateAdress({ open, setOpen, defaultValues }: DialogUpdateAdressProps) {
  const form = useForm<z.infer<typeof profileSchema.addressDetails>>({
    resolver: zodResolver(profileSchema.addressDetails),
    defaultValues: {
      provinceCity: '',
      district: '',
      ward: '',
      address: '',
    },
  })

  const user = useAuthStore((state) => state.user)

  const [selectedProvinceCity, setSelectedProvinceCity] = useState<string>('')
  const [selectedDistrict, setSelectedDistrict] = useState<string>('')
  const [selectedWard, setSelectedWard] = useState<string>('')

  const { data: provinceCityData } = useGetProvinceCity()
  const { data: districtData } = useGetDistrict(selectedProvinceCity ? parseInt(selectedProvinceCity) : 0)
  const { data: wardData } = useGetWard(selectedDistrict ? parseInt(selectedDistrict) : 0)

  const { mutate: updateAddress, isPending: isPendingUpdateAddress } = useUser.updateProfile({
    onClose: () => setOpen(false),
  })

  useEffect(() => {
    if (defaultValues !== null && user) {
      const address = user.address[defaultValues] || ''
      form.reset({
        address: address,
      })
    }
  }, [defaultValues, user])

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

  const handleSubmit = (data: z.infer<typeof profileSchema.addressDetails>) => {
    if (defaultValues === null) {
      const payload = user?.address ? [...user.address, data.address] : [data.address]
      updateAddress({ address: payload })
    } else {
      const payload = user?.address.map((address, index) => {
        if (index === defaultValues) {
          return data.address
        }
        return address
      })
      updateAddress({ address: payload })
    }
    form.reset()
    setSelectedProvinceCity('')
    setSelectedDistrict('')
    setSelectedWard('')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
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
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="w-full col-span-1">
                    <FormControl>
                      <div className="relative w-full">
                        <FloatingInput
                          {...field}
                          id="address"
                          className="h-12 rounded-[20px] w-full"
                          value={field.value}
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
            </div>
            <DialogFooter className="flex flex-row justify-end items-center">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  type="button"
                  className="rounded-2xl max-w-[100px]"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                disabled={isPendingUpdateAddress}
                type="submit"
                className="w-full float-end max-w-[100px] bg-violet-primary hover:bg-violet-primary/90 text-white rounded-2xl"
                onClick={form.handleSubmit(handleSubmit)}
              >
                Save
                {isPendingUpdateAddress && <Loading />}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  )
}
