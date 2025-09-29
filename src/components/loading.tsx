import React from 'react'

import { Spinner } from '@/components/ui/shadcn-io/spinner'

interface LoadingProps {
  variant?: 'default' | 'circle' | 'pinwheel' | 'circle-filled' | 'ellipsis' | 'ring' | 'bars' | 'infinite'
}

export default function Loading({ variant = 'circle' }: LoadingProps) {
  return (
    <div>
      <Spinner variant={variant} className="text-white" />
    </div>
  )
}
