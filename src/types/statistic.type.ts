export interface StatisticOverview {
  totalUsers: number
  newUsers: number
  totalOrders: number
  totalRevenue: number
}

export interface StatisticAdvanced {
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  totalProfit: number
  statsByInterval: StatisticInterval[]
}

export interface StatisticInterval {
  date: string
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  totalProfit: number
}
