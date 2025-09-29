import { useQuery } from '@tanstack/react-query'

import { District, ProvinceCity } from '@/types/address.type'

export const useGetProvinceCity = () => {
  return useQuery({
    queryKey: ['provinceCity'],
    queryFn: async () => {
      const res = await fetch('https://provinces.open-api.vn/api/p/')
      return (await res.json()) as ProvinceCity[]
    },
  })
}

export const useGetDistrict = (provinceCode: number) => {
  return useQuery({
    queryKey: ['district', provinceCode],
    queryFn: async () => {
      const res = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
      return (await res.json()) as ProvinceCity
    },
    enabled: !!provinceCode,
  })
}

export const useGetWard = (districtCode: number) => {
  return useQuery({
    queryKey: ['ward', districtCode],
    queryFn: async () => {
      const res = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
      return (await res.json()) as District
    },
    enabled: !!districtCode,
  })
}
