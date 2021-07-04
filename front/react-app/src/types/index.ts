// サインアップ
export type RegisterParams = {
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirmation: string
}

// サインイン
export type LoginParams = {
  email: string
  password: string
}

// ユーザー
export type User = {
  id: number
  uid: string
  provider: string
  email: string
  firstName: string
  lastName: string
  profile_image?: string
  allowPasswordChange: boolean
  created_at: Date
  updated_at: Date
}
