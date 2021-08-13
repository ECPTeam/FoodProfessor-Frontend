type ProfileImage = {
  url: string | null
}

export type User = {
  id: number
  uid: string
  provider: string
  email: string
  firstName: string
  lastName: string
  profileImage?: ProfileImage
  allowPasswordChange: boolean
  createdAt: Date
  updatedAt: Date
}
