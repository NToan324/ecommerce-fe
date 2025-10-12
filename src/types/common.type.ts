import React from 'react'

export interface CommonLayoutProps {
  children: React.ReactNode
}

export interface Image {
  url: string
  public_id?: string
}

export interface avatarPreviewType {
  src: string
  name: string
  size: number
  file?: File
}

export interface SearchParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}
