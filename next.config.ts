import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    dirs: ['src']
  },
  images: {
    domains: ['avatar.iran.liara.run']
  }
}

export default nextConfig
