'use client'

import { Bar, ComposedChart, LabelList, Line, ResponsiveContainer, XAxis } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

interface ComparativeChartData {
  date: string
  product: number
  orders: number
}

interface ComparativeChartProps {
  data: ComparativeChartData[]
  title?: string
  description?: string
}

const chartConfig = {
  product: {
    label: 'Products',
    color: 'var(--color-blue-primary)',
  },
  orders: {
    label: 'Orders',
    color: 'var(--color-orange-primary)',
  },
}

export function ComparativeChart({
  data,
  title = 'Product & Orders Comparison',
  description = 'Comparing total products sold and number of orders',
}: ComparativeChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer>
          <ChartContainer config={chartConfig}>
            <ComposedChart data={data}>
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => {
                  return new Date(value).toLocaleDateString('en-US', {
                    weekday: 'short',
                  })
                }}
              />

              {/* Product */}
              <Bar dataKey="product" stackId="a" fill="var(--color-blue-primary)" radius={[4, 4, 0, 0]} />

              {/* Orders */}
              <Line
                dataKey="orders"
                type="natural"
                stroke="var(--color-orange-primary)"
                strokeWidth={2}
                dot={{
                  fill: 'var(--color-orange-primary)',
                }}
                activeDot={{
                  r: 6,
                }}
              >
                <LabelList position="top" offset={12} fontSize={12} />
              </Line>

              <ChartTooltip content={<ChartTooltipContent indicator="line" />} cursor={false} defaultIndex={1} />
            </ComposedChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
