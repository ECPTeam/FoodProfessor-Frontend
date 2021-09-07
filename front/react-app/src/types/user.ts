export type User = {
  id: number
  uid: string
  provider: string
  email: string
  firstName: string
  lastName: string
  profileImage: {
    url: string
  }
  allowPasswordChange: boolean
  createdAt: Date
  updatedAt: Date
}
