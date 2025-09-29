import React from 'react'

import { CommonLayoutProps } from '@/types/common.type'

export const AdminLayout = ({ children }: CommonLayoutProps) => {
  return (
    <div>
      <h1>Admin Layout</h1>
      <main>{children}</main>
    </div>
  )
}
