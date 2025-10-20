import Cookies from 'js-cookie'
import { create } from 'zustand'

import { Profile } from '@/types/user.type'

export interface AuthState {
  user: Profile | null
  accessToken: string
  refreshToken: string

  setUser: (user: Profile | null) => void
  setAccessToken: (token: string) => void
  setRefreshToken: (token: string) => void

  logout: () => void
  storeAccessTokenCookie?: (token: string) => void
  storeRefreshTokenCookie?: (token: string) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: '',
  refreshToken: '',

  setUser: (user) => set(() => ({ user })),
  setAccessToken: (token) => set(() => ({ accessToken: token })),
  setRefreshToken: (token) => set(() => ({ refreshToken: token })),
  storeAccessTokenCookie: (token) => {
    Cookies.set('accessToken', token, { expires: 7 })
  },
  storeRefreshTokenCookie: (token) => {
    Cookies.set('refreshToken', token, { expires: 7 })
  },

  logout: () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    set(() => ({
      user: null,
      accessToken: '',
      refreshToken: '',
    }))
  },
}))
