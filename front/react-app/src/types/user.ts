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
