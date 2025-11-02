import React from 'react'

import { Spinner } from '@/components/ui/shadcn-io/spinner'

interface LoadingProps {
  width?: number
  height?: number
  color?: string
  variant?: 'default' | 'circle' | 'pinwheel' | 'circle-filled' | 'ellipsis' | 'ring' | 'bars' | 'infinite'
}

export default function Loading({ variant = 'circle', color = 'text-white', width = 24, height = 24 }: LoadingProps) {
  return <Spinner variant={variant} className={color} width={width} height={height} />
}
