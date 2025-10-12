import React from 'react'

import { Spinner } from '@/components/ui/shadcn-io/spinner'

interface LoadingProps {
  color?: string
  variant?: 'default' | 'circle' | 'pinwheel' | 'circle-filled' | 'ellipsis' | 'ring' | 'bars' | 'infinite'
}

export default function Loading({ variant = 'circle', color = 'text-white' }: LoadingProps) {
  return <Spinner variant={variant} className={color} />
}
