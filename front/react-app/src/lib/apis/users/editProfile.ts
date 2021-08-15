import client from 'lib/apis/client'
import { EditProfileUrl } from 'urls/index'

export const fetchEditProfileData = (userId: number): Promise<any> => {
  return client
    .get(EditProfileUrl(userId))
    .then((res) => {
      console.log(res.data)
      return res.data
    })
    .catch((error) => console.log(error))
}
