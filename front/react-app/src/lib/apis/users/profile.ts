import client from 'lib/apis/client'
import { ProfileUrl } from 'urls/index'

export const fetchProfileData = (userId: number): Promise<any> => {
  return client
    .get(ProfileUrl(userId))
    .then((res) => {
      return res.data
    })
    .catch((error) => console.log(error))
}
