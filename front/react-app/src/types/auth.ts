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
