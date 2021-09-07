import client from 'lib/apis/client'
import { profileUrl } from 'urls/index'

export const fetchProfileData = (userId: number): Promise<any> => {
  return client
    .get(profileUrl(userId))
    .then((res) => {
      return res.data
    })
    .catch((error) => console.log(error))
}
