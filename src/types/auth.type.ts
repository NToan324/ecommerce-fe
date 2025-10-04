export interface Signup {
  email: string
  password: string
  address: string
  fullName: string
}

export interface SigninResponse {
  accessToken: string
  user: User
}

export interface ChangePassword {
  oldPassword: string
  newPassword: string
}

export interface Signin {
  email: string
  password: string
}

export interface User {
  id: string
  email: string
  name: string
  role: string
  loyaltyPoint: number
}
