import Cookies from 'js-cookie'
import { create } from 'zustand'

import { Profile } from '@/types/user.type'

export interface AuthState {
  user: Profile | null
  acessToken: string
  refreshToken: string

  setUser: (user: Profile | null) => void
  setAcessToken: (token: string) => void
  setRefreshToken: (token: string) => void

  logout?: () => void
  storeAccessTokenCookie?: (token: string) => void
  storeRefreshTokenCookie?: (token: string) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  acessToken: '',
  refreshToken: '',

  setUser: (user) => set(() => ({ user })),
  setAcessToken: (token) => set(() => ({ acessToken: token })),
  setRefreshToken: (token) => set(() => ({ refreshToken: token })),
  storeAccessTokenCookie: (token) => {
    Cookies.set('accessToken', token, { expires: 7 })
  },
  storeRefreshTokenCookie: (token) => {
    Cookies.set('refreshToken', token, { expires: 7 })
  },

  logout: () => {
    Cookies.remove('accessToken')
    set(() => ({
      user: null,
      acessToken: '',
      refreshToken: '',
    }))
  },
}))
