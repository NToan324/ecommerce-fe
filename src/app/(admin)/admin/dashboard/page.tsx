'use client'

import { ChartBarActive } from '@admin/admin/dashboard/components/barChartOrder'
import { BarChartTotalRevenue } from '@admin/admin/dashboard/components/barChartTotalRevenue'
import { ComparerativeChart } from '@admin/admin/dashboard/components/comparativeChart'
import { IoIosArrowRoundUp } from 'react-icons/io'

import { CalendarDateRangePicker } from '@/components/ui/date-range-picker'

export default function page() {
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
            <p className="text-3xl font-bold text-blue-secondary">32.423.842</p>
            <span className="w-full text-end font-medium text-blue-secondary/50">VND</span>
          </div>
        </div>
        <div className="w-full min-[400px] h-[200px] bg-white rounded-2xl p-8 flex flex-col justify-between items-start gap-4">
          <div className="flex justify-between items-center gap-4 w-full ">
            <p className="text-violet-primary/50 text-lg font-medium">Number of new users</p>
            <p className="text-black font-medium text-xl">17</p>
          </div>
          <div className="flex justify-between items-center gap-4 w-full">
            <p className="text-violet-primary/50 text-lg font-medium">Total number of users</p>
            <p className="text-black font-medium text-xl">100</p>
          </div>
          <div className="flex justify-between items-center gap-4 w-full">
            <p className="text-violet-primary/50 text-lg font-medium">Number of orders</p>
            <p className="text-black font-medium text-xl">79</p>
          </div>
        </div>
        <ChartBarActive />
      </div>
      <div className="flex w-full justify-start items-center flex-col gap-8">
        {/* Datetime Range Picker */}
        <div className="w-full flex justify-end items-center">
          <CalendarDateRangePicker />
        </div>
        <div className="grid grid-cols-2 gap-8 w-full">
          {/* Total Revenue */}
          <BarChartTotalRevenue chartDescription="Total annual revenue" chartTitle="Total revenue" />
          <BarChartTotalRevenue chartDescription="Overall profit" chartTitle="Profit" />
          <BarChartTotalRevenue chartDescription="The number of orders sold" chartTitle="Orders" />
          <BarChartTotalRevenue chartDescription="The number of new users" chartTitle="New users" />
          <div className="w-full col-span-2">
            <ComparerativeChart />
          </div>
        </div>
      </div>
    </div>
  )
}
