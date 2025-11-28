'use client'

import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { formatCurrencyToMillion } from '@/utils/helpers'

export const description = 'A bar chart with a label'

export type chartData = {
  month: string
  value: number
}

const chartConfig = {
  desktop: {
    label: 'value',
    color: 'var(--color-blue-primary)',
  },
} satisfies ChartConfig

interface BarChartTotalRevenueProps {
  chartTitle?: string
  chartDescription?: string
  data: chartData[]
  typeFormat?: 'currency' | 'number'
}

export function BarChartTotalRevenue({
  chartTitle,
  chartDescription,
  data,
  typeFormat = 'number',
}: BarChartTotalRevenueProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{chartTitle || 'Bar Chart - Label'}</CardTitle>
        <CardDescription>{chartDescription || 'January - June 2024'}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer className={'min-h-[250px]'}>
          <ChartContainer config={chartConfig}>
            <BarChart
              className="min-h-[250px]"
              accessibilityLayer
              data={data}
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
                tickFormatter={(value) => value}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    hideLabel
                    formatter={(value) =>
                      typeFormat === 'currency' ? formatCurrencyToMillion(value as number) : value
                    }
                  />
                }
              />
              <Bar dataKey="value" fill="var(--color-blue-secondary)" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                  formatter={(value: number) =>
                    typeFormat === 'currency' ? formatCurrencyToMillion(value as number) : value
                  }
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
