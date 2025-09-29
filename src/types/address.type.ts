export interface ProvinceCity {
  name: string
  code: number
  division_type: string
  codename: string
  phone_code: number
  districts: District[]
  id: string
  status: boolean
}

export interface District {
  name: string
  code: number
  division_type: string
  codename: string
  phone_code: number
  wards: Ward[]
  id: string
  status: boolean
}

export interface Ward {
  name: string
  code: number
  division_type: string
  codename: string
  district_code: number
  id: string
  status: boolean
}
