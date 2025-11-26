'use client'

import { useState } from 'react'
import { ChartBarActive } from '@admin/admin/dashboard/components/barChartOrder'
import { BarChartTotalRevenue } from '@admin/admin/dashboard/components/barChartTotalRevenue'
import { ComparativeChart } from '@admin/admin/dashboard/components/comparativeChart'
import IntervalSelector from '@admin/admin/dashboard/components/intervalSelector'
import { DateRange } from 'react-day-picker'
import { IoIosArrowRoundUp } from 'react-icons/io'

import { CalendarDateRangePicker } from '@/components/ui/date-range-picker'
import { INTERVAL } from '@/constant'
import useStatistic from '@/hooks/useStatistic'
import { useStatisticStore } from '@/stores/statistic.store'
import { convertStringToDate, formatDatePattern } from '@/utils/helpers'

export default function page() {
  const setFromDateStore = useStatisticStore((state) => state.setFromDate)
  const setToDateStore = useStatisticStore((state) => state.setToDate)
  const fromDateStore = useStatisticStore((state) => state.fromDate)
  const toDateStore = useStatisticStore((state) => state.toDate)
  const intervalStore = useStatisticStore((state) => state.interval)
  const setIntervalStore = useStatisticStore((state) => state.setInterval)

  const { data: statisticOverview, isSuccess: isSuccessStatisticOverview } = useStatistic.getStatisticOverview()
  const { data: statisticAdvanced } = useStatistic.getStatisticAdvanced()
  const [fromDate, setFromDate] = useState<Date | undefined>(fromDateStore as Date)
  const [toDate, setToDate] = useState<Date | undefined>(toDateStore as Date)

  const handleSetRangeDate = (date: DateRange | undefined) => {
    setFromDate(date?.from)
    setToDate(date?.to)
    if (date?.from) {
      setFromDateStore(date ? formatDatePattern(date.from) : undefined)
    }
    if (date?.to) {
      setToDateStore(date ? formatDatePattern(date.to) : undefined)
    }
  }

  const handleSetInterval = (interval: INTERVAL) => {
    setIntervalStore(interval as INTERVAL)
  }

  return (
    <div className="overflow-hidden flex justify-start items-center flex-col gap-10">
      <h1 className="font-bold mb-8 text-4xl text-blue-night w-full text-start">Dashboard</h1>
      {/* Profit and Revenue */}
      <div className="flex justify-between items-center w-full gap-6">
        <div className="relative w-[200px] h-[200px] mr-8">
          <div className="bg-blue-light w-full h-full border-dashed-custom border-blue-night rounded-2xl"></div>
          <div className="w-full h-full rotate-6 bg-white bottom-3 left-6 p-8 absolute rounded-2xl flex flex-col justify-between items-start gap-4">
            <div className="flex justify-between items-center gap-2">
              <p className="text-xl font-bold">Profit</p>
              <div className="flex justify-start items-center gap-1">
                <IoIosArrowRoundUp className="text-green-primary" size={18} strokeWidth={10} />
                <span className="text-green-primary font-bold">12.5%</span>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
              <p className="text-3xl font-bold text-complete-foreground">32.423.842</p>
              <span className="w-full text-end font-medium text-complete-foreground/50">VND</span>
            </div>
          </div>
        </div>
        <div className="w-[200px] h-[200px] bg-white rounded-2xl p-8 flex flex-col justify-between items-start gap-4">
          <p className="text-xl font-bold">Revenue</p>
          <div className="flex flex-col justify-center items-center gap-1">
            <p className="text-2xl font-bold text-blue-secondary">
              {isSuccessStatisticOverview
                ? statisticOverview.data.totalRevenue.toLocaleString().replaceAll(',', '.')
                : '0.000.000'}
            </p>
            <span className="w-full text-end font-medium text-blue-secondary/50">VND</span>
          </div>
        </div>
        <div className="w-full min-[400px] h-[200px] bg-white rounded-2xl p-8 flex flex-col justify-between items-start gap-4">
          <div className="flex justify-between items-center gap-4 w-full ">
            <p className="text-violet-primary/50 text-lg font-medium">Number of new users</p>
            <p className="text-black font-medium text-xl">
              {isSuccessStatisticOverview ? statisticOverview.data.newUsers : '0'}
            </p>
          </div>
          <div className="flex justify-between items-center gap-4 w-full">
            <p className="text-violet-primary/50 text-lg font-medium">Total number of users</p>
            <p className="text-black font-medium text-xl">
              {isSuccessStatisticOverview ? statisticOverview.data.totalUsers : '0'}
            </p>
          </div>
          <div className="flex justify-between items-center gap-4 w-full">
            <p className="text-violet-primary/50 text-lg font-medium">Number of orders</p>
            <p className="text-black font-medium text-xl">
              {isSuccessStatisticOverview ? statisticOverview.data.totalOrders : '0'}
            </p>
          </div>
        </div>
        <ChartBarActive />
      </div>
      <div className="flex w-full justify-start items-center flex-col gap-8">
        {/* Datetime Range Picker */}
        <div className="w-full flex justify-end items-center gap-2">
          <CalendarDateRangePicker
            fromDate={fromDate}
            toDate={toDate}
            setRangeDate={(date) => handleSetRangeDate(date)}
          />
          <IntervalSelector onChange={(value) => handleSetInterval(value)} value={intervalStore} />
        </div>
        <div className="grid grid-cols-2 gap-8 w-full">
          {/* Total Revenue */}
          <BarChartTotalRevenue
            data={
              statisticAdvanced?.data.statsByInterval.map((item) => ({
                month: convertStringToDate(item.date),
                value: item.totalRevenue,
              })) || []
            }
            chartDescription="Total annual revenue"
            chartTitle="Total revenue"
            typeFormat="currency"
          />
          <BarChartTotalRevenue
            data={
              statisticAdvanced?.data.statsByInterval.map((item) => ({
                month: convertStringToDate(item.date),
                value: item.totalProfit,
              })) || []
            }
            chartDescription="Overall profit"
            chartTitle="Profit"
            typeFormat="currency"
          />
          <BarChartTotalRevenue
            data={
              statisticAdvanced?.data.statsByInterval.map((item) => ({
                month: convertStringToDate(item.date),
                value: item.totalOrders,
              })) || []
            }
            chartDescription="The number of orders sold"
            chartTitle="Orders"
          />
          <BarChartTotalRevenue
            data={
              statisticAdvanced?.data.statsByInterval.map((item) => ({
                month: convertStringToDate(item.date),
                value: item.totalProducts,
              })) || []
            }
            chartDescription="The number of products sold"
            chartTitle="Products"
          />
          <div className="w-full col-span-2">
            <ComparativeChart
              data={
                statisticAdvanced?.data.statsByInterval.map((item) => ({
                  date: item.date,
                  product: item.totalProducts,
                  orders: item.totalOrders,
                })) || []
              }
              description=""
              title=""
            />
          </div>
        </div>
      </div>
    </div>
  )
}
