'use client'

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, XAxis } from 'recharts'

import { Card, CardContent } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

export const description = 'A bar chart with an active bar'

const chartData = [
  { label: 'users', value: 63 },
  { label: 'products', value: 100 },
  { label: 'orders', value: 173 },
  { label: 'other', value: 90 },
]

const chartConfig = {
  value: {
    label: 'value',
    color: 'var(--chart-4)',
  },
  users: {
    label: 'User',
    color: 'var(--chart-1)',
  },
  products: {
    label: 'Product',
    color: 'var(--chart-2)',
  },
  orders: {
    label: 'Orders',
    color: 'var(--chart-3)',
  },
  other: {
    label: 'Other',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig

export function ChartBarActive() {
  return (
    <Card className="h-[200px] w-full max-w-[400px]">
      <CardContent>
        <ResponsiveContainer>
          <ChartContainer config={chartConfig} className="max-h-[200px]">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => chartConfig[value as keyof typeof chartConfig]?.label}
              />

              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />

              <Bar dataKey="value" strokeWidth={1} radius={8}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartConfig[entry.label as keyof typeof chartConfig]?.color} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
