'use client'

import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

export const description = 'A bar chart with a label'

const chartData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 300 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

interface BarChartTotalRevenueProps {
  chartTitle?: string
  chartDescription?: string
}

export function BarChartTotalRevenue({ chartTitle, chartDescription }: BarChartTotalRevenueProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{chartTitle || 'Bar Chart - Label'}</CardTitle>
        <CardDescription>{chartDescription || 'January - June 2024'}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
                <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
              </Bar>
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
