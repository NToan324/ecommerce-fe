import { useEffect, useState } from 'react'

import { Combobox } from '@/components/comboBox'
import { toastError } from '@/components/toastify'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import { useGetDistrict, useGetProvinceCity, useGetWard } from '@/hooks/useProfile'
import { useAuthStore } from '@/stores/auth.store'
import { District, ProvinceCity, Ward } from '@/types/address.type'

interface DialogChangeAddressProps {
  open: boolean
  setOpen: (open: boolean) => void
  handleChangeAddress: (address: string) => void
}

export function DialogChangeAddress({ open, setOpen, handleChangeAddress }: DialogChangeAddressProps) {
  const [selectedProvinceCity, setSelectedProvinceCity] = useState<string>('')
  const [selectedDistrict, setSelectedDistrict] = useState<string>('')
  const [selectedWard, setSelectedWard] = useState<string>('')
  const [address, setAddress] = useState('')
  const user = useAuthStore((state) => state.user)
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null)

  const { data: provinceCityData } = useGetProvinceCity()
  const { data: districtData } = useGetDistrict(selectedProvinceCity ? parseInt(selectedProvinceCity) : 0)
  const { data: wardData } = useGetWard(selectedDistrict ? parseInt(selectedDistrict) : 0)

  useEffect(() => {
    if (selectedProvinceCity || selectedDistrict || selectedWard) {
      const provinceCity = provinceCityData?.find((item) => item.code.toString() === selectedProvinceCity)?.name || ''
      const district = districtData?.districts.find((item) => item.code.toString() === selectedDistrict)?.name || ''
      const ward = wardData?.wards.find((item) => item.code.toString() === selectedWard)?.name || ''
      setAddress(
        ward ? `${ward}, ${district}, ${provinceCity}` : district ? `${district}, ${provinceCity}` : provinceCity
      )
    }
  }, [selectedProvinceCity, selectedDistrict, selectedWard])

  const handleSubmit = () => {
    if (user?.address && selectedAddress !== null) {
      handleChangeAddress(user?.address[selectedAddress])
      setOpen(false)
    } else if (address !== '') {
      handleChangeAddress(address)
      setOpen(false)
    } else {
      toastError('Please select or enter an address')
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div>
        <div>
          <DialogTrigger asChild>
            <Button
              variant={'ghost'}
              className="text-violet-primary/50 text-[clamp(0.9rem,2vw,1.125rem)] font-medium hover:bg-transparent duration-500 transition-colors"
            >
              Change Address
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[725px] !max-h-[500px] overflow-scroll">
            <DialogHeader>
              <DialogTitle>Address</DialogTitle>
              <DialogDescription>Please choose your address</DialogDescription>
            </DialogHeader>
            <div className="w-full flex justify-start items-center gap-6 flex-col">
              <div className="grid grid-cols-1 gap-6 w-full">
                {user && user?.address.length > 0
                  ? user.address.map((address, index) => {
                      return (
                        <div
                          key={index}
                          className="p-[2px] bg-gradient-to-br from-blue-gray to-blue-primary via-blue-primary w-full rounded-2xl"
                        >
                          <div className="flex gap-4 justify-between items-center p-3 md:p-5 bg-white rounded-[14px] w-full">
                            <div className="flex flex-col gap-2 md:gap-4">
                              <div className="flex justify-start items-center gap-10">
                                <p className="text-[clamp(0.75rem,2vw,1rem)]">{user.fullName}</p>
                                <p className="text-[clamp(0.75rem,2vw,1rem)] font-medium text-black/50">{user.phone}</p>
                              </div>
                              <p className="text-[clamp(0.75rem,2vw,1rem)] w-full leading-7">{address}</p>
                            </div>
                            <Checkbox
                              className="w-6 h-6 cursor-pointer"
                              checked={selectedAddress === index}
                              onCheckedChange={(value) => {
                                if (value) {
                                  setSelectedAddress(index)
                                  setAddress('')
                                  setSelectedProvinceCity('')
                                  setSelectedDistrict('')
                                  setSelectedWard('')
                                } else {
                                  setSelectedAddress(null)
                                }
                              }}
                            />
                          </div>
                        </div>
                      )
                    })
                  : null}
              </div>
              {user?.address && (
                <div className="w-full flex items-center gap-2">
                  <hr className="flex-1 border-gray-300" />
                  <p className="text-[clamp(0.875rem,1vw,1rem)] uppercase text-black/50 whitespace-nowrap">
                    Or enter a new address
                  </p>
                  <hr className="flex-1 border-gray-300" />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {selectedAddress !== null && (
                  <p className="col-span-1 md:col-span-2 text-red-500 text-xs">
                    Please unselect the current address before adding a new one.
                  </p>
                )}
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
                    selectedProvinceCity
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
                    setSelectedProvinceCity(value)
                  }}
                  limitData={provinceCityData ? provinceCityData.length : 0}
                  titleTrigger="Province/city"
                  isDisabled={!!selectedAddress}
                />
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
                    selectedDistrict
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
                    setSelectedDistrict(value)
                  }}
                  limitData={districtData && districtData.districts ? districtData.districts.length : 0}
                  isDisabled={!selectedProvinceCity || !!selectedAddress}
                  titleTrigger="District"
                />
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
                    selectedWard
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
                    setSelectedWard(value)
                  }}
                  limitData={wardData && wardData.wards ? wardData.wards.length : 0}
                  isDisabled={!selectedDistrict || !!selectedAddress}
                  titleTrigger="Ward"
                />
                <div className="relative w-full">
                  <FloatingInput
                    value={address}
                    id="address"
                    className={`${selectedAddress ? 'bg-disabled' : ''} h-12 text-sm rounded-[20px] w-full`}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={!!selectedAddress}
                  />
                  <FloatingLabel htmlFor="address">Address</FloatingLabel>
                </div>
              </div>
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
                onClick={() => handleSubmit()}
                className="w-full float-end max-w-[150px] bg-violet-primary hover:bg-violet-primary/90 text-white rounded-2xl"
              >
                Change Address
              </Button>
            </DialogFooter>
          </DialogContent>
        </div>
      </div>
    </Dialog>
  )
}
