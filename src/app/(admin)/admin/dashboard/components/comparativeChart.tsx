'use client'

import { Bar, ComposedChart, LabelList, Line, ResponsiveContainer, XAxis } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

export const description = 'A stacked bar chart with a legend'
export const iframeHeight = '600px'
export const containerClassName = '[&>div]:w-full [&>div]:max-w-md flex items-center justify-center min-h-svh'

const chartData = [
  { date: '2024-07-15', running: 450, swimming: 300, runningLine: 450 },
  { date: '2024-07-16', running: 380, swimming: 420, runningLine: 380 },
  { date: '2024-07-17', running: 520, swimming: 120, runningLine: 520 },
  { date: '2024-07-18', running: 140, swimming: 550, runningLine: 140 },
  { date: '2024-07-19', running: 600, swimming: 350, runningLine: 600 },
  { date: '2024-07-20', running: 480, swimming: 400, runningLine: 480 },
]

const chartConfig = {
  running: {
    label: 'Running',
    color: 'var(--color-blue-light)',
  },
  swimming: {
    label: 'Swimming',
    color: 'var(--color-blue-primary)',
  },
} satisfies ChartConfig

export function ComparerativeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Comparative charts</CardTitle>
        <CardDescription>Comparative charts showing revenue, profit, number of products</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer>
          <ChartContainer config={chartConfig}>
            <ComposedChart data={chartData}>
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
              <Bar dataKey="running" stackId="a" fill="var(--color-running)" radius={[0, 0, 4, 4]} />
              <Bar dataKey="swimming" stackId="a" fill="var(--color-swimming)" radius={[4, 4, 0, 0]} />
              <Line
                dataKey="runningLine"
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
                <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
              </Line>

              <ChartTooltip content={<ChartTooltipContent indicator="line" />} cursor={false} defaultIndex={1} />
            </ComposedChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
